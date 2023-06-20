/*----------------------------------------------------------------------------------------------------*/

/*                                          GAME CONTROL                                              */

/*----------------------------------------------------------------------------------------------------*/

class GameControl
{
    constructor(timer)
    {
        this.timer = timer
    }
    
    try_to_pause()
    {
        if(state_of_game_is(GameState.active))
        {
            this.pause()
            try_to_play_sound("pause")
        }
        else if(control.cur_window == WindowName.pause)
        {
            this.resume()
        }
    }

    try_to_restart()
    {
        if(state_of_game_is(GameState.end))
        {
            this.play()
        }
        else
        {
            if(state_of_game_is(GameState.active))
                this.pause()
            if((state_of_game_is(GameState.active) || state_of_game_is(GameState.paused))
                && control.cur_window != WindowName.really_restart)
                this.really_restart()
        }
    }

    soft_drop_start()
    {
        if(state_of_game_is(GameState.active))
            this.timer.stop()
    }

    soft_drop()
    {
        if(state_of_game_is(GameState.active))
            game.try_to_soft_drop()
    }

    soft_drop_end()
    {
        if(state_of_game_is(GameState.active))
            this.timer.start()
    }

    move_left()
    {
        if(state_of_game_is(GameState.active))
            game.try_to_move_x(-1)
    }

    move_right()
    {
        if(state_of_game_is(GameState.active))
            game.try_to_move_x(1)
    }

    rotate()
    {
        if(state_of_game_is(GameState.active))
            game.try_to_rotate()
    }

    hard_drop()
    {
        if(state_of_game_is(GameState.active))
            game.try_to_hard_drop()
        if(state_of_game_is(GameState.active))
            this.timer.restart()
    }

    game_button_click()
    {
        if(state_of_game_is(GameState.active))
        {
            this.pause()
            try_to_play_sound("pause")
        }    
        else
        {
            control.menu()
            try_to_play_sound("open")
        }
    }

    create_new_game_object()
    {
        let game_mode = GameModeList[Menu.get_game_mode_index()]
        let speed = GameSpeedList[Menu.get_speed_index()]
        let game_data = new GameData(game_mode, speed, data.board_sizes.board, data.board_sizes.preview)
        let ui = new GameUI()
        let bonus_display_ui = new BonusDisplayUI()
        let bonus_display = new BonusDisplay(bonus_display_ui)
        let score_counter = new ScoreCounter(bonus_display)
        let brick_generator = new BrickGenerator()
        return new Game(ui, score_counter, game_data, brick_generator, this)
    }

    play()
    {
        control.open_window("game", WindowName.game)
        this.hide_window_display()
        game = this.create_new_game_object()
        this.timer.tick_delay = data.GameSpeedToDelays[game.data.speed]
        this.timer.start()
        game.start()
    }

    hide_window_display()
    {
        main_ui.hide_display("windows")
        control.set_window(WindowName.game)
    }

    show_ended_game()
    {
        this.hide_window_display()
        try_to_play_sound("back")
    }

    pause()
    {
        control.open_window("windows", WindowName.pause)
        game.pause()
        this.timer.stop()
    }

    resume()
    {
        this.hide_window_display()
        game.resume()
        this.timer.start()
    }

    restart()
    {
        game.end()
        this.play()
    }

    really_restart()
    {
        control.open_window("windows", WindowName.really_restart)
        try_to_play_sound("really")
    }

    really_quit()
    {
        control.open_window("windows", WindowName.really_quit)
        try_to_play_sound("really")
    }

    quit()
    {
        game.end()
        control.menu()
        try_to_play_sound("end")
    }

    game_step()
    {
        if(game.state == GameState.end)
        {
            this.timer.stop()
            game.end()
            ScoreBoard.add(game.score, game.lines, game.data.game_mode, game.data.speed)
            control.open_window("windows", WindowName.game_over)
            try_to_play_sound("end")
        }
        else
        {
            this.timer.decrease_delay()
            this.timer.restart()
        }
    }
}