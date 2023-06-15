/*----------------------------------------------------------------------------------------------------*/

/*                                           HOW TO PLAY                                              */

/*----------------------------------------------------------------------------------------------------*/

class HowToPlay
{
    constructor(ui)
    {
        this.ui = ui
        control.open_window("windows", "how-to-play")
        this.page_index = 0
        this.ui.create_page_number_display(data.tutorial_page_names.length)
        this.ui.refresh_page(this.page_index)
        refresh_arrows("page-number", this.page_index == 0, this.page_index == data.tutorial_page_names.length - 1)
    }

    turn_page(by)
    {
        const new_page_index = this.page_index + by
        if(new_page_index >= 0 && new_page_index < data.tutorial_page_names.length)
        {
            this.page_index = new_page_index
            this.ui.refresh_page(this.page_index)
            refresh_arrows("page-number", this.page_index == 0, this.page_index == data.tutorial_page_names.length - 1)
            try_to_play_sound("selector")
        }
    }
}