/*----------------------------------------------------------------------------------------------------*/

/*                                           HOW TO PLAY                                              */

/*----------------------------------------------------------------------------------------------------*/

class HowToPlay
{
    constructor(ui)
    {
        this.ui = ui
        control.open_window("windows", WindowName.how_to_play)
        this.page_index = 0
        this.ui.create_page_number_display(data.TutorialPageNameList.length)
        this.ui.refresh_page(this.page_index)
        refresh_arrows("page-number", this.page_index == 0, this.page_index == data.TutorialPageNameList.length - 1)
        tutorial_control.setup()
        this.refresh_page()
    }

    refresh_page()
    {
        const cur_page = data.TutorialPageNameList[this.page_index]
        const animate = data.TutorialPageNameListToAnimate[cur_page]
        this.ui.refresh_display(animate)
        if(animate)
            tutorial_control.start_new_animation(cur_page)
        else
            tutorial_control.kill_animation()
    }

    turn_page(by)
    {
        const new_page_index = this.page_index + by
        if(new_page_index >= 0 && new_page_index < data.TutorialPageNameList.length)
        {
            this.page_index = new_page_index
            this.ui.refresh_page(this.page_index)
            refresh_arrows("page-number", this.page_index == 0, this.page_index == data.TutorialPageNameList.length - 1)
            this.refresh_page()
            try_to_play_sound("selector")
        }
    }
}