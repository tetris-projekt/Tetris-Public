/*----------------------------------------------------------------------------------------------------*/

/*                                         HOW TO PLAY UI                                             */

/*----------------------------------------------------------------------------------------------------*/

class HowToPlayUI
{
    create_page_number_display(page_number)
    {
        const page_number_display = get_first_from_class("page-number display")
        page_number_display.innerHTML = `<img class="cur-page value"></img>`
        page_number_display.innerHTML += str_number_to_div_tag(data.page_number_separator + page_number)
        disable_dragging_imgs(page_number_display)
    }

    refresh_page(index)
    {
        get_first_from_class("page display").src = get_src("tutorial_pages", `${data.tutorial_page_names[index]}`)
        get_first_from_class("cur-page").src = get_src("digits", index + 1)
    }
}