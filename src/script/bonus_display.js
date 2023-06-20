/*----------------------------------------------------------------------------------------------------*/

/*                                          BONUS DISPLAY                                             */

/*----------------------------------------------------------------------------------------------------*/

class BonusDisplay
{
    constructor(ui)
    {
        this.ui = ui
        this.timeout = 0
        this.displaying = false
        this.messages = new Array()
    }

    try_to_add_message(for_what, score = 0)
    {
        if(Settings.get_property("bonus_display") == true)
        {
            this.messages.push({text: for_what, bonus: score})
            if(this.displaying == false)
                this.show_message(0)
        }
    }

    show_message(index)
    {
        const message = this.messages[index]
        this.displaying = true
        this.ui.set_message(message)
        try_to_play_sound("bonus_message")
        let self = this
        this.timeout = setTimeout( function() {
            self.messages.shift()
            if(self.messages.length == 0)
            {
                self.ui.hide()
                self.displaying = false
            }
            else
            {
                self.show_message(0)
            }
        }, data.delays.bonus_display)
    }

    clear()
    {
        this.messages = new Array()
        clearTimeout(this.timeout)
        this.displaying = false
    }

    game_over()
    {
        this.ui.game_over()
    }
}