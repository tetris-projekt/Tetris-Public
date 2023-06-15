/*----------------------------------------------------------------------------------------------------*/

/*                                               GAME                                                 */

/*----------------------------------------------------------------------------------------------------*/

const GameSpeedList = [GameSpeed.slow, GameSpeed.normal, GameSpeed.fast]

const GameButtons =
{
    pause: get_src("game", "pause"),
    menu: get_src("game", "menu"),
}

const GameModeList = [GameMode.classic, GameMode.modified, GameMode.extended, GameMode.extreme, GameMode.custom, GameMode.normal]

class Game
{
    constructor(game_data, ui, brick_generator)
    {
        this.data = game_data
        this.ui = ui
        this.brick_generator = brick_generator
        this.next_brick = null
        this.cur_brick = null
        this.ghost = null
        this.burn_preview = null
        this.score_counter = new ScoreCounter(this.ui)
        this.score = 0
        this.lines = 0
        this.state = GameState.ready_to_start
        this.board = new Board(data.board_sizes.board.width, data.board_sizes.board.height)
        this.preview_board = new Board(data.board_sizes.preview.width, data.board_sizes.preview.height)
        this.button = GameButtons.pause
        this.setup()
    }
    
    setup()
    {
        this.ui.create_board("board", this.data.normal_mode)
        this.ui.create_board("preview", this.data.normal_mode)
        keyboard.reverse_controls = this.data.normal_mode
        this.ui.create_digits("score")
        this.ui.create_digits("lines")
        this.ui.refresh_board(this.board)
        this.ui.refresh_preview_board(this.preview_board)
        this.ui.refresh_value("score", this.score)
        this.ui.refresh_value("lines", this.lines)
        this.ui.refresh_game_mode(this.data.game_mode)
        this.ui.refresh_speed(this.data.speed)
        this.ui.refresh_button(this.button)
        this.ui.refresh_controls(this.data.normal_mode)
        this.ui.hide_bonus_display()
        main_ui.set_music(this.data.game_mode)
    }
    
    start()
    {
        const x = get_center_index(this.preview_board.width)
        const y = get_center_index(this.preview_board.height)
        this.next_brick = this.brick_generator.generate_brick(this.data.bricks_bags_array, this.data.default_bricks_bag, this.data.colors_bag, x, y)
        this.spawn_next_brick()
        this.state = GameState.active
        this.try_to_play_music()
        try_to_play_sound("start")
    }

    pause()
    {
        this.state = GameState.paused
        main_ui.pause_music()
    }

    try_to_play_music()
    {
        if(Settings.get_property("music") == true)
            main_ui.play_music()
    }

    resume()
    {
        this.state = GameState.active
        this.try_to_play_music()
        try_to_play_sound("resume")
    }
    
    end()
    {
        this.state = GameState.end
        this.button = GameButtons.menu
        this.ui.refresh_button(this.button)
        this.ui.bonus_display_game_over()
        ScoreBoard.add(this.score, this.lines, this.data.game_mode, this.data.speed)
        control.timer.stop()
        main_ui.pause_music()
    }

    generate_next_brick()
    {
        this.preview_board.remove_brick(this.next_brick)
        const x = get_center_index(this.preview_board.width)
        const y = get_center_index(this.preview_board.height)
        this.next_brick = this.brick_generator.generate_brick(this.data.bricks_bags_array, this.data.default_bricks_bag, this.data.colors_bag, x, y)
        this.try_to_add_multiplier(this.next_brick)
        this.preview_board.add_brick(this.next_brick)
        this.ui.refresh_preview_board(this.preview_board)
    }

    create_cur_brick()
    {
        this.cur_brick = Brick.copy(this.next_brick)
        this.cur_brick.x = get_center_index(this.board.width)
        this.cur_brick.y = this.board.find_new_brick_y(this.cur_brick)
    }

    try_to_modify(brick)
    {
        const modifier = this.brick_generator.try_to_generate_modifier(this.data.modifiers_array)
        if(modifier != null)
        {
            brick.set_modifier(modifier) 
            try_to_play_sound(data.ModifierTypeToSoundNames[modifier]) 
        }
    }

    try_to_add_multiplier(brick)
    {
        if(this.data.multipliers == true)
        {
            const multiplier = this.brick_generator.try_to_generate_multiplier()
            if(multiplier > 0)
               this.brick_generator.random_element(brick.pixels).content = multiplier
        }
    }

    spawn_next_brick()
    {
        control.timer.decrease_delay()
        this.score_counter.reset()
        this.create_cur_brick()
        this.generate_next_brick()    
        this.try_to_modify(this.cur_brick)
        if(this.board.is_space_for_brick(this.cur_brick))
        {
            this.commit_move()
            this.try_to_stick()
        }
        else
        {
            this.board.add_brick(this.cur_brick)
            this.remove_ghost()
            this.ui.refresh_board(this.board)
            this.end()
            control.game_over()
        }
    }

    substract_bricks(brick1, brick2)
    {
        let new_pixels = new Array()
        for(let i1 = 0; i1 < brick1.pixels.length; ++i1)
        {
            let collides = false
            for(let i2 = 0; i2 < brick2.pixels.length; ++i2)
            {
                if(brick1.get_pixel_x(i1) == brick2.get_pixel_x(i2) &&
                    brick1.get_pixel_y(i1) == brick2.get_pixel_y(i2))
                {
                    collides = true
                    break
                }
            }
            if(!collides)
                new_pixels.push(brick1.pixels[i1])
        }
        brick1.pixels = new_pixels
    }

    generate_ghost()
    {
        let new_ghost = Brick.copy(this.cur_brick)
        new_ghost.ghostify()
        this.board.hard_drop(new_ghost)
        this.ghost = new_ghost
        if(this.ghost.modifier == ModifierType.fire)
        {
            this.burn_preview = this.board.find_pixels_to_burn(this.ghost)
            this.board.show_burn_preview(this.burn_preview)
        }
        else
        {
            this.burn_preview = null
        }
        this.substract_bricks(this.ghost, this.cur_brick)
        this.board.add_brick(this.ghost)
    }

    remove_ghost()
    {
        if(this.burn_preview != null)
            this.board.hide_burn_preview(this.burn_preview)
        if(this.ghost != null)
            this.board.remove_brick(this.ghost)
    }
    
    refresh_ghost()
    {
        this.remove_ghost()
        if(Settings.get_property("ghost") == true)
            this.generate_ghost()
        else
        {
            this.ghost = null
            this.burn_preview = null
        }
    }

    refresh_brick(brick)
    {
        this.board.remove_brick(brick)
        this.commit_move()
    }
    
    refresh_settings()
    {
        if(Settings.get_property("bonus_display") == false)
            this.ui.bonus_messages = new Array()
        this.board.remove_brick(this.cur_brick)
        this.commit_move()
        if(Settings.get_property("music") == false)
            main_ui.pause_music()
    }

    try_to_move_x(vect)
    {
        if(this.cur_brick.can_move == true && this.can_move_brick(this.cur_brick, vect))
        {
            this.board.remove_brick(this.cur_brick)
            this.cur_brick.x += vect
            this.commit_move()
            this.try_to_stick()
        }
    }

    can_move_brick(brick, x = 0, y = 0)
    {
        if(this.board.check_stick(brick) == true)
            return false
        this.board.remove_brick(brick)
        let test = Brick.copy(brick)
        test.x += x
        test.y += y
        const can_move = this.board.is_space_for_brick(test)
        this.board.add_brick(brick)
        return can_move
    }

    can_rotate_brick(brick)
    {
        if(this.board.check_stick(brick) == true)
            return false
        this.board.remove_brick(brick)
        let test = Brick.copy(brick)
        test.rotate()
        const can_move = this.board.is_space_for_brick(test)
        this.board.add_brick(brick)
        return can_move
    }

    try_to_move_down()
    {
        if(this.can_move_brick(this.cur_brick, 0, 1))
        {
            this.board.remove_brick(this.cur_brick)
            ++this.cur_brick.y
            this.commit_move()
            this.try_to_stick()
        }
        else
        {
            this.place()
            try_to_play_sound("place")
        }
    }

    try_to_stick()
    {
        if(this.board.check_stick(this.cur_brick) == true)
        {
            this.place()
            try_to_play_sound("stick")
            return true
        }
        return false
    }

    commit_move()
    {
        this.refresh_ghost()
        this.board.add_brick(this.cur_brick)
        this.ui.refresh_board(this.board)
    }

    read_selected_brick()
    {
        let selected_pixels = this.board.get_selected_pixels()
        if(selected_pixels.length > 0)
        {
            let selected_brick = new Brick()
            selected_brick.modifier = selected_pixels[0].modifier
            selected_brick.pixels = selected_pixels
            return selected_brick
        }
        return null
    }

    add_score(score)
    {
        this.score += score
        this.ui.refresh_value("score", this.score)
    }

    remove_lines(lines)
    {
        if(lines.length > 0)
        {
            this.board.remove_lines(lines)
            this.ui.refresh_board(this.board)
            this.add_score(this.score_counter.count_score_for_lines(lines))
            this.lines += lines.length
            this.ui.refresh_value("lines", this.lines)
            try_to_play_sound("lines")
        }
    }

    try_to_compress()
    {
        this.cur_brick.can_rotate = false
        this.cur_brick.can_move = false
        this.board.remove_brick(this.cur_brick)
        let compressed = this.board.compress(this.cur_brick)
        this.commit_move()
        if(compressed)
        {
            this.add_score(this.score_counter.count_score_for_compress())
            try_to_play_sound("compress")
            return true
        }
        return false
    }

    burn_brick(brick)
    {
        let stats = this.board.burn_brick(brick)
        this.add_score(this.score_counter.count_score_for_burning(stats.burned))
        if(stats.melted > 0)
            this.add_score(this.score_counter.count_score_for_melting(stats.melted))
        this.spawn_next_brick()
        try_to_play_sound("burn")
    }

    try_to_enable_gravity()
    {
        this.cur_brick.can_rotate = false
        this.cur_brick.can_move = false
        if(this.can_move_brick(this.cur_brick, 0, 1))
        {
            this.add_score(this.score_counter.count_score_for_recursive_gravity())
            return true
        }
        return false
    }

    place()
    {
        this.commit_move()
        switch(this.cur_brick.modifier)
        {
            case ModifierType.fire:
                this.burn_brick(this.cur_brick)
            break
            case ModifierType.steel:
                if(this.try_to_compress() == true)
                    break
            default:
                this.board.select_brick(this.cur_brick)
                this.remove_lines(this.find_lines())
                let selected_brick = this.read_selected_brick()
                if(selected_brick != null)
                {
                    this.cur_brick = selected_brick
                    this.refresh_brick(this.cur_brick)
                    if(this.try_to_enable_gravity() == true)
                        break
                }
                this.spawn_next_brick()
        }
    }

    find_lines()
    {
        let lines = new Array()
        for(let y = 0; y < this.board.height; ++y)
        {
            let line = new Array()
            for(let x = 0; x < this.board.width; ++x)
            {
                if(!this.board.get_pixel(x, y).is_empty())
                    line.push(Pixel.copy(this.board.get_pixel(x, y)))
                else
                {
                    line = new Array()
                    break
                }
            }
            if(line.length > 0)
                lines.push(line)
        }
        return lines
    }

    try_to_hard_drop()
    {
        this.board.remove_brick(this.cur_brick)
        let distance = this.board.hard_drop(this.cur_brick)
        this.add_score(this.score_counter.count_score_for_hard_drop(distance))
        this.place()
        try_to_play_sound("hard_drop")
    }

    try_to_soft_drop()
    {
        this.try_to_move_down()
        this.add_score(this.score_counter.count_score_for_soft_drop())
    }

    try_to_rotate()
    {
        if(this.cur_brick.can_rotate == true && this.can_rotate_brick(this.cur_brick))
        {
            this.board.remove_brick(this.cur_brick)
            this.cur_brick.rotate()
            this.commit_move()
            this.try_to_stick()
            try_to_play_sound("rotate")        
        }
        else
        {
            try_to_play_sound("no_rotate")
        }
    }
}