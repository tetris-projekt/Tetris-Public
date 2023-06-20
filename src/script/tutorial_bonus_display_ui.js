/*----------------------------------------------------------------------------------------------------*/

/*                                     TUTORIAL BONUS DISPLAY UI                                      */

/*----------------------------------------------------------------------------------------------------*/

class TutorialBonusDisplayUI
{
    constructor()
    {
        this.instant_hide()
    }

    instant_hide()
    {
        const display = get_id("tutorial-bonus-display")
        display.style.animationDuration = "0ms"
        display.classList.add("hidden")
    }

    hide()
    {
        const display = get_id("tutorial-bonus-display")
        display.style.animationDuration = data.delays.bonus_display_fade_out + "ms"
        display.classList.add("hidden")
    }

    show()
    {
        const display = get_id("tutorial-bonus-display")
        display.classList.remove("hidden")
    }

    set_message(message)
    {
        let html = to_img_tag(get_src("bonus_display", message.text), "for-what")
        html += str_number_to_div_tag("+" + message.bonus + " ")
        const display = get_id("tutorial-bonus-display")
        display.innerHTML = html
        disable_dragging_imgs(display)
        this.show()
    }

    game_over()
    {
        const display = get_id("tutorial-bonus-display")
        display.innerHTML = to_img_tag(get_src("bonus_display", "game_over"))
        disable_dragging_imgs(display)
        this.show()
    }
}