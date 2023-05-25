/*----------------------------------------------------------------------------------------------------*/

/*                                          BRICK EDITOR UI                                           */

/*----------------------------------------------------------------------------------------------------*/

class BrickEditorUI
{
    create_board()
    {
        let html = ""
        const display = main_ui.get_id("edit")
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
        for(let name in BrickType)
        {
            let brick_type = BrickType[name]
            html += 
            `
                <br>
                <div class="property">
                    <img src="${data.BrickTypeToImgs[brick_type]}" class="property-name"></img>
                    <img id="${brick_type}" class="button toggle" onclick="editor.toggle_brick_type(this.id)"></img>
                </div>\n
            ` 
        }
        html +=
        `
        <br>
        <div class="property">
            <img src="${get_src("brick_editor", "modified")}" class="property-name"></img>
            <img id="modified" class="button toggle" onclick="editor.toggle_modified()"></img>
        </div>\n
        `
        const display = main_ui.get_id("editor-properties")
        display.innerHTML = html
        main_ui.turn_off_dragging_imgs(display)

    }

    refresh_board(board)
    {
        for(let y = 0; y < board.length; ++y)
        {
            for(let x = 0; x < board[y].length; ++x)
            {
                let pixel = board[y][x]
                const board_pixel = main_ui.get_id(`editor${x};${y}`)
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
            main_ui.get_id("cross").classList.add("move")
        else
            main_ui.get_id("cross").classList.remove("move")
    }

    refresh_checkbox(property_name, is_on)
    {
        if(is_on == true)
            main_ui.get_id(property_name).src = get_src("main", "checkbox_on")
        else
            main_ui.get_id(property_name).src = get_src("main", "checkbox_off")
        if(property_name == BrickType.custom)
            main_ui.refresh_interaction("edit-section", !is_on)
    }

    refresh_brick_types(brick_types)
    {
        for(let name in BrickType)
        {
            const brick_type = BrickType[name]
            this.refresh_checkbox(brick_type, brick_types[brick_type])
        }
    }

    refresh_brick_index_and_number(index, number)
    {
        const display = main_ui.get_id("brick-index")
        display.innerHTML = main_ui.str_number_to_div_tag(index + data.brick_index_separator + number)
        main_ui.turn_off_dragging_imgs(display)
        main_ui.refresh_interaction("edit-board", number == 0)
        main_ui.refresh_interaction("brick selector", number == 0)
        main_ui.refresh_interaction("property move-center", number == 0)
        main_ui.refresh_interaction("button delete", number == 0)
    }
}