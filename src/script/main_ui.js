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
        this.music.main.play()
        this.music.bass.play()
    }

    // play_music()
    // {
    //     this.music.main.oncanplay = () =>
    //     {
    //         this.try_to_play()
    //     }
    //     this.music.bass.oncanplay = () =>
    //     {
    //         this.try_to_play()
    //     }
    //     this.try_to_play()
    // }

    // try_to_play()
    // {
    //     if(game != null && game.state != GameState.end && game.properties.settings.music == true)
    //     {
    //         if(this.music.main.readyState == 4 && this.music.bass.readyState == 4)
    //         {
    //             this.music.main.play()
    //             this.music.bass.play()
    //         }
    //     }
    // }

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
            html += main_ui.to_img_tag(`${data.img_dir}digits/${digits[i]}.png`, "digit")
        }
        return main_ui.to_div_tag(html, "value")
    }

    date_to_div_tag(string)
    {
        let html = ""
        for(let i = 0; i < string.length; ++i)
        {
            let char = string[i]
            if(char == "-")
                char = "dash"
            html += main_ui.to_img_tag(`${data.img_dir}digits/${char}.png`, "char")
        }
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
        this.get_first_from_class("speed display").src = data.img_dir + "speed/" + 
            data.GameSpeedToImgs[speed]
    }

    refresh_menu_game_mode(game_mode)
    {
        this.get_first_from_class("game-mode display").src = data.img_dir + "game_mode/" + 
            data.GameModeToImgs[game_mode]
    }

    refresh_page(page_suffix)
    {
        this.get_first_from_class("page display").src = data.img_dir + "how_to_play/page" + page_suffix + ".png"
        let page_number = this.get_first_from_class("page-number display")
        page_number.innerHTML = this.number_to_div_tag(page_suffix)
        this.turn_off_dragging_imgs(page_number)
    }

    display_add_opacity(display_type)
    {
        this.get_first_from_class(`display ${display_type}`).classList.add("transparent")
    }

    display_remove_opacity(display_type)
    {
        this.get_first_from_class(`display ${display_type}`).classList.remove("transparent")
    }
}