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
        this.brick_types = BrickEditor.get_brick_types()
        this.modified = BrickEditor.get_modified()
        this.edit_board = this.init_board(data.board_sizes["edit"].width, data.board_sizes["edit"].height)
        this.cur_brick_index = this.bricks.length - 1
    }
    
    init_board(width, height)
    {
        let board = new Array()
        for(let y = 0; y < height; ++y)
        {
            let row = new Array()
            for(let x = 0; x < width; ++x)
            {
                row.push(false)
            }
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

    static get_brick_types()
    {
        let brick_types = new Object()
        const storage_brick_types = storage_get("editor_brick_types")
        if(storage_brick_types != null && typeof(storage_brick_types) == "object")
        {
            for(let type in BrickType)
            {
                let brick_type = BrickType[type]
                if(isIn(storage_brick_types[brick_type], [true, false]))
                    brick_types[brick_type] = storage_brick_types[brick_type]
                else
                    brick_types[brick_type] = data.default_editor_brick_types[brick_type]
            }
        }
        else
        {
            for(let type in BrickType)
            {
                let brick_type = BrickType[type]
                brick_types[brick_type] = data.default_editor_brick_types[brick_type]
            }
        }
        return brick_types
    }

    static get_modified()
    {
        const storage_modified = storage_get("editor_modified")
        if(isIn(storage_modified, [true, false]))
            return storage_modified
        else
            return data.default_modified
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
        this.bricks = full_bricks
    }

    save()
    {
        this.save_cur_brick()
        this.remove_empty_bricks()
        storage_set("custom_bricks", this.bricks)
        storage_set("editor_brick_types", this.brick_types)
        storage_set("editor_modified", this.modified)
    }

    toggle_brick_type(type)
    {
        if(this.brick_types[type] == true)
            this.brick_types[type] = false
        else
            this.brick_types[type] = true
        this.ui.refresh_checkbox(type, this.brick_types[type])
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
        this.ui.refresh_checkbox("move-center", this.move_center)
        this.ui.refresh_cross(this.move_center)
        try_to_play_sound("toggle")
    }

    toggle_modified()
    {
        if(this.modified == true)
            this.modified = false
        else
            this.modified = true
        this.ui.refresh_checkbox("modified", this.modified)
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
        this.refresh_all()
    }
    
    refresh_all()
    {
        this.ui.refresh_board(this.edit_board)
        this.ui.refresh_checkbox("move-center", this.move_center)
        this.ui.refresh_cross(this.move_center)
        this.ui.refresh_brick_index_and_number(this.cur_brick_index, this.bricks.length - 1)
        main_ui.refresh_arrows("brick", this.cur_brick_index <= 1, this.cur_brick_index == this.bricks.length - 1)
    }

    change_brick_index(by)
    {
        let new_index = this.cur_brick_index + by
        if(new_index > 0 && new_index < this.bricks.length)
        {
            this.save_cur_brick()
            this.cur_brick_index = new_index
            this.load_cur_brick()
            try_to_play_sound("select")
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

    edit()
    {
        open_window("windows", "editor")
        this.ui.create_board()
        this.ui.create_properties()
        this.ui.refresh_brick_types(this.brick_types)
        this.ui.refresh_checkbox("modified", this.modified)
        this.load_cur_brick()
    }
}