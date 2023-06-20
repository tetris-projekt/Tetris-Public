/*----------------------------------------------------------------------------------------------------*/

/*                                             MAIN UI                                                */

/*----------------------------------------------------------------------------------------------------*/

class MainUI
{
    constructor()
    {
        document.body.innerHTML = windows[WindowName.main_windows]
        disable_dragging_imgs(document.body)
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

    refresh_window(display_type, window)
    {
        const display = get_first_from_class(`${display_type} display`)
        if(this.is_display_hidden(display))
            this.show_display(display_type)
        display.innerHTML = windows[window]
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