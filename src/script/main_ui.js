/*----------------------------------------------------------------------------------------------------*/

/*                                             MAIN UI                                                */

/*----------------------------------------------------------------------------------------------------*/

class MainUI
{
    constructor()
    {
        this.music = null
        document.body.innerHTML = windows["main_windows"]
        disable_dragging_imgs(document.body)
    }

    set_music(game_mode)
    {
        this.music = new Audio(data.GameModeToMusic[game_mode])
        this.music.loop = true
    }

    pause_music()
    {
        this.music.pause()
    }

    play_music()
    {
        this.music.play()
    }

    play_sound(sound_name)
    {
        let sound = new Audio(get_src("sounds", sound_name, "audio"))
        sound.play()
    }

    is_display_hidden(display)
    {
        return display.classList.contains("disabled")
    }

    refresh_window(display_type, window_name)
    {
        const display = get_first_from_class(`${display_type} display`)
        if(this.is_display_hidden(display))
            this.show_display(display_type)
        display.innerHTML = windows[window_name]
        disable_dragging_imgs(display)
    }

    hide_display(display_type)
    {
        const display = get_first_from_class(`${display_type} display`)
        display.classList.add("disabled")
    }

    show_display(display_type)
    {
        const display = get_first_from_class(`${display_type} display`)
        display.classList.remove("disabled")
    }

    display_add_opacity(cls)
    {
        get_first_from_class(`display ${cls}`).classList.add("transparent")
    }

    display_remove_opacity(cls)
    {
        get_first_from_class(`display ${cls}`).classList.remove("transparent")
    }
}