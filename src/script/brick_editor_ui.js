/*----------------------------------------------------------------------------------------------------*/

/*                                          BRICK EDITOR UI                                           */

/*----------------------------------------------------------------------------------------------------*/

class BrickEditorUI
{
    create_board()
    {
        let html = ""
        const display = get_id("edit")
        for(let y = 0; y < data.board_sizes["edit"].height; ++y)
        {
            for(let x = 0; x < data.board_sizes["edit"].width; ++x)
            {
                html += `<div id="editor${x};${y}" class="pixel empty" onclick="editor.toggle_pixel(${x}, ${y})"></div>\n`
            }
        }
        display.innerHTML += html
    }

    create_properties()
    {
        let html = ""
        for(let i = 0; i < data.BrickEditorPropertyNames.length; ++i)
        {
            const property_name = data.BrickEditorPropertyNames[i]
            html += html_creator.property(data.BrickEditorPropertyNamesToImg[property_name], property_name, "editor.toggle_property(this.id)")
        }
        for(const type in ModifierType)
        {
            const modifier_type = ModifierType[type]
            html += html_creator.property(data.ModifierTypeToImgs[modifier_type], `modifier-${modifier_type}`, `editor.toggle_modifier_type(${modifier_type})`)
        }
        const display = get_id("editor-properties")
        display.innerHTML = html
        disable_dragging_imgs(display)

    }

    refresh_board(board)
    {
        for(let y = 0; y < board.length; ++y)
        {
            for(let x = 0; x < board[y].length; ++x)
            {
                let pixel = board[y][x]
                const board_pixel = get_id(`editor${x};${y}`)
                if(pixel == true)
                    board_pixel.classList.remove("empty")
                else
                    board_pixel.classList.add("empty")
            }
        }
    }

    refresh_cross(move_center)
    {
        if(move_center == true)
            get_id("cross").classList.add("move")
        else
            get_id("cross").classList.remove("move")
    }

    refresh_modifier_types(modifier_types)
    {
        for(const type in ModifierType)
        {
            const modifier_type = ModifierType[type]
            refresh_checkbox(`modifier-${modifier_type}`, modifier_types[modifier_type])
        }
    }

    refresh_properties(properties)
    {
        for(const property_name in properties)
        {
            const property_value = properties[property_name]
            refresh_checkbox(property_name, property_value)
        }
    }

    refresh_brick_index_and_number(index, number)
    {
        const display = get_first_from_class("brick display")
        display.innerHTML = str_number_to_div_tag(index + data.brick_index_separator + number)
        disable_dragging_imgs(display)
        disable_animation("edit-board", number == 0)
        disable_animation("brick selector", number == 0)
        disable_animation("property move-center", number == 0)
        disable_animation("button delete", number == 0)
    }
}