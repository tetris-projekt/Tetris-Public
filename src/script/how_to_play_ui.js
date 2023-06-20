/*----------------------------------------------------------------------------------------------------*/

/*                                         HOW TO PLAY UI                                             */

/*----------------------------------------------------------------------------------------------------*/

class HowToPlayUI
{
    create_page_number_display(page_number)
    {
        const page_number_display = get_first_from_class("page-number display")
        page_number_display.innerHTML = `<div class="cur-page value"></div>`
        page_number_display.innerHTML += str_number_to_div_tag(data.page_number_separator + page_number)
        disable_dragging_imgs(page_number_display)
    }

    refresh_page(index)
    {
        get_first_from_class("page display").src = get_src("tutorial_pages", `${data.TutorialPageNameList[index]}`)
        const display = get_first_from_class("cur-page")
        const page_number = index + 1
        display.innerHTML = str_number_to_div_tag(setw(page_number, 2))
        disable_dragging_imgs(display)
    }

    refresh_display(show_board)
    {
        if(show_board)
        {
            get_id("tutorial").classList.remove("disabled")
            get_id("restart-animation").classList.remove("disabled")
            get_first_from_class("page display").classList.remove("wide")
        }
        else
        {
            get_id("tutorial").classList.add("disabled")
            get_first_from_class("page display").classList.add("wide")
            get_id("restart-animation").classList.add("disabled")
        }
    }
}