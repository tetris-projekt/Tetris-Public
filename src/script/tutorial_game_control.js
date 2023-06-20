/*----------------------------------------------------------------------------------------------------*/

/*                                      TUTORIAL GAME CONTROL                                         */

/*----------------------------------------------------------------------------------------------------*/

class TutorialGameControl
{
    constructor(timer)
    {
        this.cur_page_name = ""
        this.timer = timer
        this.animation_timeout = 0
    }
    
    setup()
    {
        tutorial = this.create_new_game_object()
        this.timer.tick_delay = data.delays.tutorial_animation_frame
        const display = get_id("tutorial")
        display.innerHTML += html_creator.button(get_src("controls", "rotate"), "tutorial_control.instant_restart()", "restart-animation")
        disable_dragging_imgs(display)
    }
    
    create_new_game_object()
    {
        let game_data = new TutorialGameData(data.board_sizes.tutorial)
        let ui = new TutorialGameUI()
        let bonus_display_ui = new TutorialBonusDisplayUI()
        let bonus_display = new TutorialBonusDisplay(bonus_display_ui)
        let score_counter = new ScoreCounter(bonus_display)
        let brick_generator = new TutorialBrickGenerator()
        return new Game(ui, score_counter, game_data, brick_generator, this)
    }

    clear_tutorial_board()
    {
        for(let x = 0; x < tutorial.board.width; ++x)
        {
            for(let y = 0; y < tutorial.board.height; ++y)
                tutorial.board.get_pixel(x, y).clear()
        }
        tutorial.ui.refresh_board(tutorial.board)
    }

    remove_brick_and_ghost()
    {
        tutorial.board.remove_brick(tutorial.cur_brick)
        tutorial.remove_ghost()
        tutorial.ghost = null
    }

    cut_normal()
    {
        let copy = Brick.copy(tutorial.cur_brick)
        while(tutorial.board.brick_is_in_range(copy))
        {
            tutorial.board.remove_brick(copy)
            copy.y++
        }
    }

    cut_recursive()
    {
        let copy = Brick.copy(tutorial.cur_brick)
        copy.transform(0, -1)
        const brick_height = copy.get_height()
        const widest_y = copy.get_widest_y()
        copy.y = tutorial.board.height - brick_height - widest_y
        tutorial.board.remove_brick(copy)
        let tail = Brick.copy(copy)
        tail.pixels = copy.get_pixels_from_y(widest_y + 1)
        while(tutorial.board.brick_is_in_range(tail))
        {
            tutorial.board.remove_brick(tail)
            ++tail.y
        }
    }

    cut_push()
    {
        this.cut_normal()
        let brick_height = tutorial.cur_brick.get_height()
        const y = tutorial.board.height - 1 - brick_height
        tutorial.brick_generator.generate_line(tutorial.board, y)
        for(let i = 0; i < tutorial.board.width; ++i)
            tutorial.brick_generator.generate_modifier_in_line(tutorial.board, y)
        tutorial.brick_generator.generate_gap_in_line(tutorial.board, y)
    }

    fill_board(page_name)
    {
        const preset = data.TutorialPageNameToFillBoardPreset[page_name]
        this.remove_brick_and_ghost()
        const brick_height = tutorial.cur_brick.get_height()
        for(let i = 0; i < brick_height; ++i)
        {
            const y = tutorial.board.height - i - 1
            if(preset.lines)
                tutorial.brick_generator.generate_line(tutorial.board, y)
            for(let i = 0; i < preset.modifiers; ++i)
                tutorial.brick_generator.generate_modifier_in_line(tutorial.board, y)
            for(let i = 0; i < preset.multipliers; ++i)
                tutorial.brick_generator.generate_multiplier_in_line(tutorial.board, y)
            for(let i = 0; i < preset.gaps; ++i)
                tutorial.brick_generator.generate_gap_in_line(tutorial.board, y)
        }
        if(preset.cut_normal)
            this.cut_normal()
        if(preset.cut_recursive)
            this.cut_recursive()
        if(preset.cut_push)
            this.cut_push()
        tutorial.commit_move()
        tutorial.ui.refresh_board(tutorial.board)
    }
    
    start_new_animation(page_name)
    {
        this.kill_animation()
        this.cur_page_name = page_name
        tutorial.brick_generator.preset = data.TutorialPageNameToBrickGeneratorPreset[page_name]
        tutorial.start()
        this.timer.start()
        this.fill_board(page_name)
    }

    kill_animation()
    {
        this.timer.stop()
        clearTimeout(this.animation_timeout)
        this.clear_tutorial_board()
        tutorial.score_counter.sumup()
        tutorial.score_counter.bonus_display.clear()
        tutorial.score_counter.bonus_display.ui.instant_hide()
    }

    restart_cur_animation()
    {
        let self = this
        this.animation_timeout = setTimeout(function () {
            self.start_new_animation(self.cur_page_name)
        }, data.delays.between_tutorial_animations)
    }

    instant_restart()
    {
        this.start_new_animation(this.cur_page_name)
        try_to_play_sound("normal_click")
    }

    game_step()
    {
        if(tutorial.state == GameState.end)
        {
            this.timer.stop()
            tutorial.end()
            this.restart_cur_animation()
        }
        if(this.cur_page_name != "end")
        {
            this.timer.stop()
            this.remove_brick_and_ghost()
            tutorial.ui.refresh_board(tutorial.board)
            this.restart_cur_animation()
        }
    }               

    game_over()
    {
        this.timer.stop()
    }
}