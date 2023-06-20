/*----------------------------------------------------------------------------------------------------*/

/*                                           BRICK EDITOR                                             */

/*----------------------------------------------------------------------------------------------------*/

class BrickEditor
{
    constructor(ui)
    { 
        this.ui = ui
        this.bricks = new Array()
        this.add_empty_brick()
        this.bricks = this.bricks.concat(BrickEditor.get_custom_bricks())
        this.properties = BrickEditor.get_properties()
        this.modifier_types = BrickEditor.get_modifier_types()
        this.edit_board = this.init_board(data.board_sizes.edit.width, data.board_sizes.edit.height)
        this.cur_brick_index = this.bricks.length - 1
        control.open_window("windows", WindowName.editor)
        this.ui.create_board()
        this.ui.create_properties()
        this.ui.refresh_modifier_types(this.modifier_types)
        this.ui.refresh_properties(this.properties)
        this.load_cur_brick()
    }
    
    init_board(width, height)
    {
        let board = new Array()
        for(let y = 0; y < height; ++y)
        {
            let row = new Array()
            for(let x = 0; x < width; ++x)
                row.push(false)
            board.push(row)
        }
        return board
    }

    get_pixel(x, y)
    {
        return this.edit_board[y][x]
    }

    set_pixel(x, y, value)
    {
        this.edit_board[y][x] = value
    }

    static get_modifier_types()
    {
        let modifier_types = new Object()
        const storage_modifier_types = storage_get("editor_modifiers")
        if(storage_modifier_types != null && typeof(storage_modifier_types) == "object")
        {
            for(const type in ModifierType)
            {
                let modifier_type = ModifierType[type]
                if(isIn(storage_modifier_types[modifier_type], [true, false]))
                    modifier_types[modifier_type] = storage_modifier_types[modifier_type]
                else
                    modifier_types[modifier_type] = data.default_brick_editor_modifiers[modifier_type]
            }
        }
        else
        {
            for(const type in ModifierType)
            {
                let modifier_type = ModifierType[type]
                modifier_types[modifier_type] = data.default_brick_editor_modifiers[modifier_type]
            }
        }
        return modifier_types
    }

    static get_properties()
    {
        let properties = new Object()
        const storage_properties = storage_get("editor_properties")
        if(storage_properties != null && typeof(storage_properties) == "object")
        {
            for(let i = 0; i < data.BrickEditorPropertyNames.length; ++i)
            {
                const property_name = data.BrickEditorPropertyNames[i]
                if(isIn(storage_properties[property_name], [true, false]))
                    properties[property_name] = storage_properties[property_name]
                else
                    properties[property_name] = data.default_brick_editor_properties[property_name]
            }
        }
        else
        {
            for(let i = 0; i < data.BrickEditorPropertyNames.length; ++i)
            {
                const property_name = data.BrickEditorPropertyNames[i]
                properties[property_name] = data.default_brick_editor_properties[property_name]
            }
        }
        return properties
    }

    static get_property(name)
    {
        return BrickEditor.get_properties()[name]
    }

    static validate_brick(brick)
    {
        if(brick == null || typeof(brick) != "object" || brick.length <= 1)
            return false
        for(let i = 0; i < brick.length - 1; ++i)
        {
            let vectors = brick[i]
            if(typeof(vectors[0]) != "number" || typeof(vectors[1]) != "number")
                return false
        }
        return(isIn(brick[brick.length - 1], [true, false]))
    }

    static get_custom_bricks()
    {
        const storage_bricks = storage_get("custom_bricks")
        let bricks = new Array()
        if(storage_bricks != null && typeof(storage_bricks) == "object" && storage_bricks.length > 0)
        {
            for(let i = 0; i < storage_bricks.length; ++i)
            {
                let brick = storage_bricks[i]
                if(BrickEditor.validate_brick(brick) == true)
                    bricks.push(brick)
            }
        }
        return bricks
    }

    create_vectors_list(board, move_center)
    {
        let vectors_list = new Array()
        const center_x = get_center_index(this.edit_board[0].length)
        const center_y = get_center_index(this.edit_board.length)
        for(let y = 0; y < board.length; ++y)
        {
            for(let x = 0; x < board[y].length; ++x)
            {
                if(this.get_pixel(x, y) == true)
                {
                    let vector_x = -center_x + x
                    let vector_y = -center_y + y
                    vectors_list.push([vector_x, vector_y])
                }
            }
        }
        vectors_list.push(move_center)
        return vectors_list
    }

    save_cur_brick()
    {
        const vectors_list = this.create_vectors_list(this.edit_board, this.move_center)
        this.bricks[this.cur_brick_index] = vectors_list
    }

    get_move_center(brick_index)
    {
        return this.bricks[brick_index][this.bricks[brick_index].length - 1]
    }

    remove_empty_bricks()
    {
        let full_bricks = new Array()
        for(let i = 0, cur_index = 0; i < this.bricks.length; ++i, ++cur_index)
        {
            const brick = this.bricks[i]
            if(brick.length == 1)
                continue
            else
                full_bricks.push(brick)
        }
        return full_bricks
    }

    save()
    {
        this.save_cur_brick()
        this.bricks = this.remove_empty_bricks()
        storage_set("custom_bricks", this.bricks)
        storage_set("editor_modifiers", this.modifier_types)
        storage_set("editor_properties", this.properties)
    }

    toggle_modifier_type(type)
    {
        if(this.modifier_types[type] == true)
            this.modifier_types[type] = false
        else
            this.modifier_types[type] = true
        refresh_checkbox(`modifier-${type}`, this.modifier_types[type])
        try_to_play_sound("toggle")
    }

    toggle_property(name)
    {
        if(this.properties[name] == true)
            this.properties[name] = false
        else
            this.properties[name] = true
        refresh_checkbox(name, this.properties[name])
        if(name == "p4")
        {
            this.properties["p1_5"] = false
            refresh_checkbox("p1_5", this.properties["p1_5"])
        }
        if(name == "p1_5")
        {
            this.properties["p4"] = false
            refresh_checkbox("p4", this.properties["p4"])
        }
        try_to_play_sound("toggle")
    }

    toggle_move_center()
    {
        if(this.cur_brick_index == 0)
            return
        if(this.move_center == true)
            this.move_center = false
        else
            this.move_center = true
        refresh_checkbox("move-center", this.move_center)
        this.ui.refresh_cross(this.move_center)
        try_to_play_sound("toggle")
    }

    toggle_pixel(x, y)
    {
        if(this.cur_brick_index == 0)
            return
        let pixel_value = this.get_pixel(x, y)
        if(pixel_value == true)
            this.set_pixel(x, y, false)
        else
            this.set_pixel(x, y, true)
        this.ui.refresh_board(this.edit_board)
        try_to_play_sound("toggle_pixel")
    }

    clear_edit_board()
    {
        for(let y = 0; y < this.edit_board.length; ++y)
        {
            for(let x = 0; x < this.edit_board[y].length; ++x)
                this.set_pixel(x, y, false)
        }
    }

    load_cur_brick()
    {
        this.clear_edit_board()
        let brick = this.bricks[this.cur_brick_index]
        const center_x = get_center_index(this.edit_board[0].length)
        const center_y = get_center_index(this.edit_board.length)
        for(let i = 0; i < brick.length - 1; ++i)
            this.set_pixel(center_x + brick[i][0], center_y + brick[i][1], true)
        this.move_center = this.get_move_center(this.cur_brick_index)
        this.refresh_edit_section()
    }
    
    refresh_edit_section()
    {
        this.ui.refresh_board(this.edit_board)
        refresh_checkbox("move-center", this.move_center)
        this.ui.refresh_cross(this.move_center)
        this.ui.refresh_brick_index_and_number(this.cur_brick_index, this.bricks.length - 1)
        refresh_arrows("brick", this.cur_brick_index <= 1, this.cur_brick_index == this.bricks.length - 1)
    }

    change_brick_index(by)
    {
        let new_index = this.cur_brick_index + by
        if(new_index > 0 && new_index < this.bricks.length)
        {
            this.save_cur_brick()
            this.cur_brick_index = new_index
            this.load_cur_brick()
            try_to_play_sound("selector")
        }
    }

    add_empty_brick()
    {
        this.bricks.push([data.default_move_center])
    }

    add_brick()
    {
        if(this.cur_brick_index == data.max_custom_bricks_number)
            return
        this.save_cur_brick()
        this.add_empty_brick()
        this.cur_brick_index = this.bricks.length - 1
        this.load_cur_brick()
        try_to_play_sound("add")
    }

    remove_brick()
    {
        if(this.cur_brick_index == 0)
            return
        let new_bricks = new Array()
        for(let i = 0, cur_index = 0; i < this.bricks.length; ++i, ++cur_index)
        {
            if(i == this.cur_brick_index)
                --cur_index
            else
                new_bricks[cur_index] = this.bricks[i]
        }
        this.bricks = new_bricks
        if(this.cur_brick_index >= this.bricks.length)
            --this.cur_brick_index
        this.load_cur_brick()
        try_to_play_sound("delete")
    }
}