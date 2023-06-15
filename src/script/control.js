/*----------------------------------------------------------------------------------------------------*/

/*                                             CONTROL                                                */

/*----------------------------------------------------------------------------------------------------*/

class Control
{
    constructor(timer)
    {
        this.cur_window = null
        this.selected_button_index = null
        this.buttons = null
        this.timer = timer
    }

    /*------------------------GAME------------------------*/

    state_of_game_is(state)
    {
        return game != null && game.state == state
    }
    
    try_to_pause()
    {
        if(this.state_of_game_is(GameState.active))
        {
            this.pause()
            try_to_play_sound("pause")
        }
        else if(this.state_of_game_is(GameState.paused))
        {
            this.resume()
        }
    }

    try_to_restart()
    {
        if(this.state_of_game_is(GameState.end))
        {
            this.play()
        }
        else
        {
            if(this.state_of_game_is(GameState.active))
                this.pause()
            if((this.state_of_game_is(GameState.active) || this.state_of_game_is(GameState.paused))
                && this.cur_window != "really-restart")
                this.really_restart()
        }
    }

    soft_drop_start()
    {
        if(this.state_of_game_is(GameState.active))
            this.timer.stop()
    }

    soft_drop()
    {
        if(this.state_of_game_is(GameState.active))
            game.try_to_soft_drop()
    }

    soft_drop_end()
    {
        if(this.state_of_game_is(GameState.active))
            this.timer.start()
    }

    move_left()
    {
        if(this.state_of_game_is(GameState.active))
            game.try_to_move_x(-1)
    }

    move_right()
    {
        if(this.state_of_game_is(GameState.active))
            game.try_to_move_x(1)
    }

    rotate()
    {
        if(this.state_of_game_is(GameState.active))
            game.try_to_rotate()
    }

    hard_drop()
    {
        if(this.state_of_game_is(GameState.active))
            game.try_to_hard_drop()
        if(this.state_of_game_is(GameState.active))
            this.timer.restart()
    }

    /*------------------------GAME------------------------*/



    /*-----------------------GENERAL----------------------*/

    open_window(display, window)
    {
        this.try_to_unselect()
        main_ui.refresh_window(display, window)
        this.cur_window = window
        this.selected_button_index = null
        this.buttons = get_all_class_from_class("button", `${this.cur_window} window`)
        if(isIn(window, data.transparent_windows))
            main_ui.display_add_opacity(display)
        else
            main_ui.display_remove_opacity(display)
    }

    increase_selected_brick_index()
    {
        if(this.selected_button_index == null)
            this.selected_button_index = this.buttons.length - 1
        else
            this.selected_button_index = (this.selected_button_index + 1) % this.buttons.length
    }

    decrease_selected_brick_index()
    {
        if(this.selected_button_index == null)
            this.selected_button_index = 0
        else
        {
            this.selected_button_index = (this.selected_button_index - 1 + this.buttons.length) % this.buttons.length
        }
    }

    select_next()
    {
        if(this.cur_window != "game")
        {
            this.try_to_unselect()
            do
                this.increase_selected_brick_index()
            while(getComputedStyle(this.buttons[this.selected_button_index]).pointerEvents == "none")
            this.select(this.buttons[this.selected_button_index])
        }
    }

    select_previous()
    {
        if(this.cur_window != "game")
        {
            this.try_to_unselect()
            do
                this.decrease_selected_brick_index()
            while(getComputedStyle(this.buttons[this.selected_button_index]).pointerEvents == "none")
            this.select(this.buttons[this.selected_button_index])
        }
    }

    select(button)
    {
        button.classList.add("selected")
        try_to_play_sound("select")
    }

    try_to_unselect()
    {
        const button = get_first_from_class("selected")
        if(button != null)   
            this.unselect(button)
    }

    unselect(button)
    {
        button.classList.remove("selected")
    }

    click_selected()
    {
        const button = get_first_from_class("selected")
        if(button != null)   
            button.click()
    }

    menu()
    {
        game = null
        let menu_ui = new MenuUI()
        menu = new Menu(menu_ui)
    }

    create_new_game_object()
    {
        let game_mode = GameModeList[Menu.get_game_mode_index()]
        let speed = GameSpeedList[Menu.get_speed_index()]
        let properties = new GameData(game_mode, speed)
        let ui = new GameUI()
        let brick_generator = new BrickGenerator()
        return new Game(properties, ui, brick_generator)
    }

    brick_editor()
    {
        let brick_editor_ui = new BrickEditorUI()
        editor = new BrickEditor(brick_editor_ui)
        try_to_play_sound("open")
    }

    save_editor()
    {
        editor.save()
        this.menu()
        try_to_play_sound("back")
    }

    play()
    {
        this.open_window("game", "game")
        main_ui.hide_display("windows")
        game = this.create_new_game_object()
        game.start()
        this.timer.tick_delay = data.GameSpeedToDelays[game.data.speed]
        this.timer.start()
    }

    pause()
    {
        this.open_window("windows", "pause")
        game.pause()
        this.timer.stop()
    }

    resume()
    {
        main_ui.hide_display("windows")
        this.cur_window = "game"
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
        this.open_window("windows", "really-restart")
        try_to_play_sound("really")
    }

    how_to_play()
    {
        let how_to_play_ui = new HowToPlayUI
        how_to_play = new HowToPlay(how_to_play_ui)
        try_to_play_sound("open")
    }

    go_back()
    {
        if(game != null)
        {
            if(game.state == GameState.paused)
            {
                this.open_window("windows", "pause")
            }
            else
            {
                main_ui.hide_display("windows")
                this.cur_window = "game"
            }
        }
        else
        {
            this.menu()
        }
        try_to_play_sound("back")
    }

    settings()
    {
        let settings_ui = new SettingsUI()
        settings = new Settings(settings_ui)
        try_to_play_sound("open")
    }

    save_settings()
    {
        settings.save()
        settings = null
        if(game != null)
            game.refresh_settings()
        this.go_back()
    }

    really_quit()
    {
        this.open_window("windows", "really-quit")
        try_to_play_sound("really")
    }

    quit()
    {
        game.end()
        this.menu()
        try_to_play_sound("end")
    }

    best_scores()
    {
        this.open_window("windows", "best-scores")
        let score_board_ui = new ScoreBoardUI()
        score_board = new ScoreBoard(score_board_ui)
        try_to_play_sound("open")
    }

    game_over()
    {
        this.open_window("windows", "game-over")
        try_to_play_sound("end")
    }

    game_button_click()
    {
        if(this.state_of_game_is(GameState.active))
        {
            this.pause()
            try_to_play_sound("pause")
        }    
        else
        {
            this.menu()
            try_to_play_sound("open")
        }
    }

    /*-----------------------GENERAL----------------------*/
}