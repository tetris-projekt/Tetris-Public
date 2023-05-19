/*----------------------------------------------------------------------------------------------------*/

/*                                             MAIN UI                                                */

/*----------------------------------------------------------------------------------------------------*/

class MainUI
{
    constructor()
    {
        this.music =
        {
            main: null,
            bass: null,
        }
    }

    set_music(game_mode)
    {
        let music = data.GameModeToMusic[game_mode]
        this.music.main = new Audio(`src/audio/music/${music.main}`)
        this.music.bass = new Audio(`src/audio/music/${music.bass}`)
        this.music.main.preload = true
        this.music.bass.preload = true
        this.music.main.loop = true
        this.music.bass.loop = true
    }

    mute_bass()
    {
        this.music.bass.volume = 0.001
    }

    unmute_bass()
    {
        this.music.bass.volume = 1
    }

    play_music()
    {
        this.music.main.oncanplay = () =>
        {
            this.try_to_play()
        }
        this.music.bass.oncanplay = () =>
        {
            this.try_to_play()
        }
        this.try_to_play()
    }

    try_to_play()
    {
        if(game != null && game.state != GameState.end && game.properties.settings.music == true)
        {
            if(this.music.main.readyState == 4 && this.music.bass.readyState == 4)
            {
                this.music.main.play()
                this.music.bass.play()
            }
        }
    }

    stop_music()
    {
        this.music.main.pause()
        this.music.bass.pause()
    }

    slice_number(number)
    {
        let digits = [0]
        for(let index = 0; number > 0; ++index, number /= 10)
        {
            let digit = number % 10
            digits[index] = digit
            number -= digit
        }
        return digits
    }

    to_img_tag(src, cls)
    {
        return `<img class="${cls}" src="${src}"></img>`
    }

    to_div_tag(html, cls)
    {
        return `<div class="${cls}">${html}</div>`
    }

    number_to_div_tag(number)
    {
        let html = ""
        let digits = main_ui.slice_number(number)
        for(let i = 0; i < digits.length; ++i)
        {
            html += main_ui.to_img_tag(get_src("digits", digits[i]), "digit")
        }
        return main_ui.to_div_tag(html, "value")
    }

    str_number_to_div_tag(string)
    {
        let html = ""
        for(let i = 0; i < string.length; ++i)
            html += main_ui.to_img_tag(get_src("digits", string[i]), "char")
        return main_ui.to_div_tag(html, "value")
    }

    img_to_div_tag(src, cls)
    {
        return main_ui.to_div_tag(main_ui.to_img_tag(src, ""), cls)
    }

    setup()
    {
        document.body.innerHTML = windows["main_windows"]
        this.turn_off_dragging_imgs(document.body)
    }

    get_id(id)
    {
        return document.getElementById(id)
    }

    get_first_from_class(class_name)
    {
        return document.getElementsByClassName(class_name)[0]
    }

    is_display_hidden(display)
    {
        return display.classList.contains("disabled")
    }

    refresh_window(display_type, window_name)
    {
        const display = this.get_first_from_class(`${display_type} display`)
        if(this.is_display_hidden(display))
            this.show_display(display_type)
        display.innerHTML = windows[window_name]
        this.turn_off_dragging_imgs(display)
        if(isIn(window_name, ["pause", "really-quit", "really-restart"]))
            this.display_add_opacity(display)
        else
            this.display_remove_opacity(display)
    }

    hide_display(display_type)
    {
        const display = this.get_first_from_class(`${display_type} display`)
        display.classList.add("disabled")
    }

    show_display(display_type)
    {
        const display = this.get_first_from_class(`${display_type} display`)
        display.classList.remove("disabled")
    }

    turn_off_dragging_imgs(element)
    {
        const imgs = element.getElementsByTagName("img")
        for(let i = 0; i < imgs.length; ++i)
            imgs[i].draggable = false
    }

    refresh_menu_speed(speed)
    {
        this.get_first_from_class("speed display").src = data.GameSpeedToImgs[speed]
    }

    refresh_menu_game_mode(game_mode)
    {
        this.get_first_from_class("game-mode display").src = data.GameModeToImgs[game_mode]
    }

    create_page_number()
    {
        let page_number = this.get_first_from_class("page-number display")
        page_number.innerHTML = `<img class="cur-page value"></img>`
        page_number.innerHTML += this.str_number_to_div_tag(data.page_number_separator + data.number_of_tutorial_pages)
        this.turn_off_dragging_imgs(page_number)
    }

    refresh_page(page_suffix)
    {
        this.get_first_from_class("page display").src = get_src("how_to_play", `page${page_suffix}`)
        this.get_first_from_class("cur-page").src = get_src("digits", page_suffix)
    }

    refresh_arrow(cls, disabled)
    {
        if(disabled == true)
            this.get_first_from_class(cls).classList.add("disabled-animation")
        else
            this.get_first_from_class(cls).classList.remove("disabled-animation")
    }

    refresh_arrows(cls_selector, disable_left, disable_right)
    {
        this.refresh_arrow(`${cls_selector} left`, disable_left)
        this.refresh_arrow(`${cls_selector} right`, disable_right)
    }

    display_add_opacity(display)
    {
        display.classList.add("transparent")
    }

    display_remove_opacity(display)
    {
        display.classList.remove("transparent")
    }
}
