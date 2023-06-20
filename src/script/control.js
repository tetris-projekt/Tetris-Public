/*----------------------------------------------------------------------------------------------------*/

/*                                             CONTROL                                                */

/*----------------------------------------------------------------------------------------------------*/

class Control
{
    constructor()
    {
        this.cur_window = null
        this.buttons = null
        this.selected_button_index = null
    }

    set_window(window)
    {
        this.try_to_unselect()
        this.cur_window = window
        this.buttons = get_all_class_from_class("button", `${data.WindowNameToClass[this.cur_window]} window`)
        this.selected_button_index = null
    }

    open_window(display, window)
    {
        main_ui.refresh_window(display, window)
        this.set_window(window)
        if(isIn(window, data.transparent_windows))
            main_ui.display_add_opacity(display)
        else
            main_ui.display_remove_opacity(display)
    }

    button_index_exist(index)
    {
        return (index >= 0 && index < this.buttons.length)
    }

    try_to_change_selected_button_index(by)
    {
        if(!(state_of_game_is(GameState.active) && this.cur_window == WindowName.game))
        {
            let new_index = null
            if(this.selected_button_index == null)
            {
                if(by > 0)
                    new_index = this.buttons.length - 1
                else
                    new_index = 0
                by = -by
            }
            else
            {
                new_index = this.selected_button_index
                if(this.is_selected(this.buttons[this.selected_button_index]))
                    new_index += by
            }
            while(this.button_index_exist(new_index))
            {
                const button = this.buttons[new_index]
                const button_style = getComputedStyle(button)
                if(button_style.pointerEvents == "none" || button_style.display == "none" || button.classList.contains("control"))
                    new_index += by
                else
                    break
            }
            if(this.button_index_exist(new_index))
            {
                this.try_to_unselect()
                this.selected_button_index = new_index
                this.select(this.buttons[this.selected_button_index])
                try_to_play_sound("select")
            }
        }
    }

    is_selected(button)
    {
        return (button != null && button.classList.contains("selected"))
    }

    select(button)
    {
        if(button != null)
            button.classList.add("selected")
    }

    try_to_unselect()
    {
        const button = get_first_from_class("selected")
        if(button != null) 
            button.classList.remove("selected")
    }

    click_selected()
    {
        const button = get_first_from_class("selected")
        if(button != null)
        {
            let window = this.cur_window
            button.click()
            if(this.cur_window == window)
                this.select(button)
        }
    }

    menu()
    {
        game = null
        let menu_ui = new MenuUI()
        menu = new Menu(menu_ui)
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
        editor = null
    }

    how_to_play()
    {
        let how_to_play_ui = new HowToPlayUI
        how_to_play = new HowToPlay(how_to_play_ui)
        try_to_play_sound("open")
    }

    go_back()
    {
        if(isIn(this.cur_window, [WindowName.menu, WindowName.pause, WindowName.game]))
            return
        if(this.cur_window == WindowName.editor)
            this.save_editor()
        if(this.cur_window == WindowName.settings)
            this.save_settings()
        if(this.cur_window == WindowName.how_to_play)
            tutorial_control.kill_animation()
        if(state_of_game_is(GameState.paused))
            this.open_window("windows", WindowName.pause)
        else
            this.menu()
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
    }

    best_scores()
    {
        this.open_window("windows", WindowName.best_scores)
        let score_board_ui = new ScoreBoardUI()
        score_board = new ScoreBoard(score_board_ui)
        try_to_play_sound("open")
    }
}