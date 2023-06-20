/*----------------------------------------------------------------------------------------------------*/

/*                                               MAIN                                                 */

/*----------------------------------------------------------------------------------------------------*/

const html_creator = new HTMLCreator()
let main_ui = null
let keyboard = null
let game_control = null
let tutorial_control = null
let control = null
let menu = null
let game = null
let tutorial = null
let editor = null
let score_board = null
let settings = null
let how_to_play = null

function setup()
{
    preload_content()
    main_ui = new MainUI()
    keyboard = new Keyboard()
    let game_timer = new GameTimer()
    game_control = new GameControl(game_timer)
    let tutorial_timer = new TutorialTimer()
    tutorial_control = new TutorialGameControl(tutorial_timer)
    control = new Control()
    control.menu()
    set_listeners()
}

function preload_content()
{
    for(const dir in dirs["img"])
    {
        for(const img in dirs["img"][dir])
        {
            let preloader = new Image()
            preloader.src = get_src(dir, img, "img")
        }
    }

    for(const dir in dirs["audio"])
    {
        for(const audio in dirs["audio"][dir])
        {
            const preloader = new Audio()
            preloader.src = get_src(dir, audio, "audio")
            preloader.preload = true
        }
    }
}

function set_listeners()
{
    document.body.onblur = () =>
    {
        if(Settings.get_property("auto_pause") == true)
        {
            if(state_of_game_is(GameState.active))
                game_control.pause()
        }
    }
    document.body.oncontextmenu = () =>
    {
        return false
    }
    document.onclick = () =>
    {
        control.try_to_unselect()
    }
    document.ondblclick = (event) =>
    {
        event.preventDefault()
    }
}

function isIn(element, array)
{
    return array.includes(element)
}

function storage_set(name, item)
{
    localStorage.setItem(name, JSON.stringify(item))
}

function storage_get(name)
{
    return JSON.parse(localStorage.getItem(name))
}

function try_to_play_sound(sound_name)
{
    if(Settings.get_property("sounds") == true)
        main_ui.play_sound(sound_name)
}

function get_id(id)
{
    return document.getElementById(id)
}

function get_first_from_class(cls)
{
    return document.getElementsByClassName(cls)[0]
}

function get_all_class_from_class(all_cls, from_cls)
{
    return get_first_from_class(from_cls).getElementsByClassName(all_cls)
}

function disable_dragging_imgs(element)
{
    const imgs = element.getElementsByTagName("img")
    for(let i = 0; i < imgs.length; ++i)
        imgs[i].draggable = false
}

function refresh_arrows(cls, disable_left, disable_right)
{
    disable_animation(`${cls} left`, disable_left)
    disable_animation(`${cls} right`, disable_right)
}

function disable_animation(cls, disabled)
{
    if(disabled == true)
        get_first_from_class(cls).classList.add("disabled-animation")
    else
        get_first_from_class(cls).classList.remove("disabled-animation")
}

function swap(array, index1, index2)
{
    const pom = array[index1]
    array[index1] = array[index2]
    array[index2] = pom
}

function slice_number(number)
{
    let digits = [0]
    for(let index = 0; number > 0; ++index)
    {
        const digit = number % 10
        digits[index] = digit
        number = Math.floor(number / 10)
    }
    return digits
}

function to_img_tag(src, cls)
{
    return `<img class="${cls}" src="${src}"></img>`
}

function to_div_tag(html, cls)
{
    return `<div class="${cls}">${html}</div>`
}

function number_to_div_tag(number)
{
    let html = ""
    const digits = slice_number(number)
    for(let i = 0; i < digits.length; ++i)
        html += to_img_tag(get_src("digits", digits[i]), "digit")
    return to_div_tag(html, "value")
}

function str_number_to_div_tag(string)
{
    let html = ""
    for(let i = 0; i < string.length; ++i)
        html += to_img_tag(get_src("digits", string[i]), "char")
    return to_div_tag(html, "value")
}

function img_to_div_tag(src, cls)
{
    return to_div_tag(to_img_tag(src, ""), cls)
}

function refresh_checkbox(id, is_on)
{
    if(is_on)
        get_id(id).src = get_src("main", "checkbox_on")
    else
        get_id(id).src = get_src("main", "checkbox_off")
}

function setw(number, length)
{
    let string = number.toString()
    while(string.length < length)
        string = "0" + string
    return string
}

function get_center_index(length)
{
    return Math.floor((length - 1) / 2)
}

function state_of_game_is(state)
{
    return game != null && game.state == state
}