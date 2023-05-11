const data =
{
    edit_board_width: 9,
    edit_board_height: 9,
    img_dir: "img/",
    preview_board_width: 7,
    preview_board_height: 4,
}

special = false

function get_id(id)
{
    return document.getElementById(id)
}

function get_class_from(element, class_name)
{
    return element.getElementsByClassName(class_name)
}

function get_center_index(length)
{
    let max_index = length - 1
    return ((max_index - max_index % 2) / 2)
}

function board_init(board, width, height, editable)
{
    const center_x = get_center_index(width)
    const center_y = get_center_index(height)
    for(let y = 0; y < height; ++y)
    {
        for(let x = 0; x < width; ++x)
        {
            let pixel_x = -center_x + x
            let pixel_y = -center_y + y
            let onclick = ""
            let id_prefix = ""
            if(editable == true)
            {
                id_prefix = "e"
                onclick = `onclick="toggle(this)"`    
            }
            board.innerHTML += `<div class="pixel" id="${id_prefix}${pixel_x}, ${pixel_y}" ${onclick}></div>`
        }
    }
}

function turn_off_dragging_imgs()
{
    const imgs = document.getElementsByTagName("img")
    for(let i = 0; i < imgs.length; ++i)
        imgs[i].draggable = false
}

function setup()
{
    turn_off_dragging_imgs()
    board_init(get_id("edit-board"), data.edit_board_width, data.edit_board_height, true)
    board_init(get_id("preview-board"), data.preview_board_width, data.preview_board_height, false)
    refresh_vectors_list()
    refresh_checkbox()
    get_id("display").onkeydown = (event) =>
    {
        if(event.key == "Enter")
            event.target.blur()
    }
}

function turn_on_pixel(pixel)
{
    pixel.classList.add("on")
}

function turn_off_pixel(pixel)
{
    pixel.classList.remove("on")
}

function is_pixel_on(pixel)
{
    return pixel.classList.contains("on")
}

function toggle(pixel)
{
    if(is_pixel_on(pixel))
        turn_off_pixel(pixel)
    else
        turn_on_pixel(pixel)
    refresh_vectors_list()
    refresh_preview()
}

function refresh_vectors_list()
{
    let vectors_list = read_screen()
    if(vectors_list.length == 0)
        display.value = ""
    else
        display.value = "\"[[" + vectors_list.join("], [") + "], " + special + "],\""
}

function copy_to_clipboard()
{
    const display = get_id("display")
    navigator.clipboard.writeText(display.value)
}

function clear_pixels(board)
{
    const pixels = get_class_from(board, "pixel")
    for(let i = 0; i < pixels.length; ++i)
    {
        const pixel = pixels[i]
        if(pixel.classList.contains("on"))
        {
            pixel.classList.remove("on")
        }
    }
    refresh_vectors_list()
    refresh_preview()
}

function move_x(vectors_list, by)
{
    for(let i = 0; i < vectors_list.length; ++i)
    {
        vectors_list[i][0] += by
    }
}

function move_y(vectors_list, by)
{
    for(let i = 0; i < vectors_list.length; ++i)
    {
        vectors_list[i][1] += by
    }
}

function rotate_right(vectors_list)
{
    for(let i = 0; i < vectors_list.length; ++i)
    {
        let x = vectors_list[i][1] * -1
        vectors_list[i][1] = vectors_list[i][0]
        vectors_list[i][0] = x
    }
    if(special == true)
        move_x(vectors_list, 1)
}

function rotate_left(vectors_list)
{
    for(let i = 0; i < vectors_list.length; ++i)
    {
        let y = vectors_list[i][0] * -1
        vectors_list[i][0] = vectors_list[i][1]
        vectors_list[i][1] = y
    }
    if(special == true)
        move_y(vectors_list, 1)
}

function is_space_for_vectors(vectors_list)
{
    const range = Math.round((data.size) / 2) - 1
    for(let i = 0; i < vectors_list.length; ++i)
    {
        if(Math.abs(vectors_list[i][0]) > range ||
            Math.abs(vectors_list[i][1]) > range)
            return false
    }
    return true
}

function read_screen()
{
    const pixels = get_class_from(get_id("edit-board"), "pixel")
    let vectors_list = new Array()
    for(let i = 0; i < pixels.length; ++i)
    {
        if(is_pixel_on(pixels[i]))
        {
            let id = pixels[i].id
            id = id.replace(/e/g, "")
            let vectors = id.split(", ")
            for(let i = 0; i < vectors.length; ++i)
            {
                vectors[i] = parseInt(vectors[i])
            }
            vectors_list.push(vectors) 
        }
    }
    return vectors_list
}

function refresh_preview()
{
    const pixels = get_class_from(get_id("preview-board"), "pixel")
    for(let i = 0; i < pixels.length; ++i)
    {
        let pixel = pixels[i]
        if(is_pixel_on(get_id("e" + pixel.id)))
            turn_on_pixel(pixel)
        else
            turn_off_pixel(pixel)
    }
}

function try_to_rotate()
{
    vectors_list = read_screen()
    rotate_right(vectors_list)
    if(!is_space_for_vectors(vectors_list))
        rotate_left(vectors_list)
    print_vector_list(vectors_list)
}

function print_vector_list(vectors_list)
{
    clear_pixels(get_id("edit-board"))
    for(let i = 0; i < vectors_list.length; ++i)
    {
        let vect = vectors_list[i]
        let pixel = get_id("e" + vect[0] + ", " + vect[1])
        turn_on_pixel(pixel)
    }
    refresh_vectors_list()
    refresh_preview()
}

function refresh_checkbox()
{
    if(special == true)
    {
        get_id("checkbox").src = data.img_dir + "checkbox_on.png"
        get_id("cross").className = "center2"
    }
    else
    {
        get_id("checkbox").src = data.img_dir + "checkbox_off.png"
        get_id("cross").className = "center1"
    }
}

function check()
{
    if(special == true)
        special = false
    else
        special = true
    refresh_checkbox()
    refresh_vectors_list()
}

function load_from_display()
{
    try
    {
        let input = read_display()
        let vectors_list = input.vectors_list
        special = input.special
        refresh_checkbox()
        print_vector_list(vectors_list)
    }
    catch(e)
    {
        return
    }
}

function read_display()
{
    let text = get_id("display").value
    text = text.replace(/ /g, "")
    text = text.replace(/\[/g, "")
    text = text.replace(/\]/g, "")
    text = text.replace(/\"/g, "")
    if(text[text.length - 1] == ",")
        text = text.substring(0, text.length - 1)
    let unpacked_list = text.split(",")
    let packed_list = new Array()
    for(let i = 0; i < unpacked_list.length - 1; i += 2)
    {
        let vect = new Array()
        vect.push(parseInt(unpacked_list[i]))
        vect.push(parseInt(unpacked_list[i + 1]))
        packed_list.push(vect)
    }
    let input = {}
    input.vectors_list = packed_list
    if(unpacked_list[unpacked_list.length - 1] === "true")
        input.special = true
    else
        input.special = false
    return input
    
}