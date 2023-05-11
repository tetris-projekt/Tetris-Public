/*----------------------------------------------------------------------------------------------------*/

/*                                               GAME                                                 */

/*----------------------------------------------------------------------------------------------------*/

const GameState = 
{
    ready_to_start: 0,
    active: 1,
    paused: 2,
    end: 3,
}

const GameSpeed = 
{
    slow: 0,
    normal: 1,
    fast: 2,
}

const GameSpeedList = [GameSpeed.slow, GameSpeed.normal, GameSpeed.fast]

const GameMode = 
{
    classic: 0,
    modified: 1,
    extended: 2,
    extreme: 3,
    normal: 4,
}

const GameButtons =
{
    pause: "game/pause.png",
    menu: "menu/menu.png",
}

const GameModeList = [GameMode.classic, GameMode.modified, GameMode.extended, GameMode.extreme, GameMode.normal]

class Game
{
    constructor(properties, ui)
    {
        this.score_counter = new ScoreCounter()
        this.properties = properties
        this.ui = ui
        this.score = 0
        this.lines = 0
        this.state = GameState.ready_to_start
        this.board = new Board(data.board_sizes.board.width, data.board_sizes.board.height)
        this.preview_board = new Board(data.board_sizes.preview.width, data.board_sizes.preview.height)
        this.button = GameButtons.pause
        this.setup()
    }
    
    setup()
    {
        this.ui.create_board("board", this.properties.normal_mode)
        this.ui.create_board("preview", this.properties.normal_mode)
        this.ui.create_digits("score")
        this.ui.create_digits("lines")
        this.ui.refresh_board(this.board)
        this.ui.refresh_preview_board(this.preview_board)
        this.ui.refresh_score(this.score)
        this.ui.refresh_lines(this.lines)
        this.ui.refresh_game_mode(this.properties.game_mode)
        this.ui.refresh_speed(this.properties.speed)
        this.ui.refresh_button(this.button)
        this.ui.refresh_controls(this.properties.normal_mode)
        main_ui.set_music(this.properties.game_mode)
    }
    
    start()
    {
        this.next_brick = this.generate_brick()
        this.spawn_next_brick()
        this.state = GameState.active
        if(this.properties.settings.music == true)
            main_ui.play_music()
    }

    pause()
    {
        this.state = GameState.paused
        main_ui.mute_bass()
    }

    resume()
    {
        this.state = GameState.active
        main_ui.unmute_bass()
    }
    
    end()
    {
        this.button = GameButtons.menu
        this.ui.refresh_button(this.button)
        this.state = GameState.end
        main_ui.stop_music()
    }

    random_number(range)
    {
        if(range > 0)
            return Math.round(Math.random() * (range - 1))
        else
            return 0
    }

    random_element(array)
    {
        return array[this.random_number(array.length)]
    }

    get_random_from_chances_table(chances_table)
    {
        let number_of_types = chances_table.length
        let max_separator = chances_table[number_of_types - 1].separator
        let separator = this.random_number(max_separator)
        for(let i = 0; i < number_of_types; i++)
        {
            let elem = chances_table[i]
            if(separator < elem.separator)
                return elem.type
        }
    }

    try_to_generate_multiplier(brick)
    {
        if(data.max_multiplier > 0)
        {
            if(this.random_number(data.random_range) < data.multiplier_chance)
            {
                let multiplier = this.random_number(data.max_multiplier - 1) + 2
                let random_pixel = this.random_element(brick.pixels)
                random_pixel.content = multiplier
            }
        }
    }

    generate_brick()
    {
        let brick_type = data.default_brick_type
        if(this.properties.extended == true)
            brick_type = this.get_random_from_chances_table(this.properties.brick_type_chances)
        let vectors_list = this.random_element(data.bricks[brick_type].vectors_list)
        if(!vectors_list)
            vectors_list = this.random_element(data.bricks[data.default_brick_type].vectors_list)
        let color = this.random_element(data.colors)
        let x = this.get_center_index(this.preview_board.width)
        let y = this.get_center_index(this.preview_board.height)
        let brick = Brick.create(x, y, color, vectors_list)
        return brick
    }

    get_center_index(length)
    {
        let max_index = length - 1
        return ((max_index - max_index % 2) / 2)
    }

    generate_next_brick()
    {
        this.preview_board.remove_brick(this.next_brick)
        this.next_brick = this.generate_brick()
        this.preview_board.add_brick(this.next_brick)
        this.ui.refresh_preview_board(this.preview_board)
    }

    create_cur_brick()
    {
        this.cur_brick = Brick.copy(this.next_brick)
        this.cur_brick.x = this.get_center_index(this.board.width)
        this.cur_brick.y = 0
    }

    try_to_modify(brick)
    {
        this.try_to_generate_multiplier(brick)
        if(this.random_number(data.random_range) < data.chance_to_modify)
            this.modify_brick(brick)
    }

    spawn_next_brick()
    {
        start_game_tick()
        step()
        this.score_counter.reset()  
        this.create_cur_brick()
        if(game.properties.modified == true)
            this.try_to_modify(this.cur_brick)
        if(!this.board.is_space_for_brick(this.cur_brick))
        {
            this.board.add_brick(this.cur_brick)
            this.ui.refresh_board(this.board)
            this.generate_next_brick()
            game_end()
            this.end()
        }
        this.commit_move()
        this.generate_next_brick()
    }

    modify_brick(brick)
    {
        let modifier = this.get_random_from_chances_table(this.properties.modifier_type_chances)
        switch(modifier)
        {
            case "froze":
                brick.set_modifier(ModifierType.ice)
            break
            case "burn":
                brick.set_modifier(ModifierType.fire)
            break
            case "steel":
                brick.set_modifier(ModifierType.steel)
            break
            case "glue":
                brick.set_modifier(ModifierType.glue)
            break
        }   
    }

    substract_bricks(brick1, brick2)
    {
        let delete_indexes = new Array()
        for(let i1 = 0; i1 < brick1.pixels.length; ++i1)
        {
            for(let i2 = 0; i2 < brick2.pixels.length; ++i2)
            {
                if(brick1.get_pixel_x(i1) == brick2.get_pixel_x(i2) &&
                    brick1.get_pixel_y(i1) == brick2.get_pixel_y(i2))
                {
                    delete_indexes.push(i1)
                    break
                }
            }
        }
        let new_pixels = new Array()
        for(let i = 0; i < brick1.pixels.length; ++i)
        {
            if(!delete_indexes.includes(i))
                new_pixels.push(brick1.pixels[i])
        }
        brick1.pixels = new_pixels
    }

    generate_ghost()
    {
        this.ghost = Brick.copy(this.cur_brick)
        this.ghost.ghostify()
        this.board.hard_drop(this.ghost)
        if(this.ghost.modifier == ModifierType.fire)
            this.board.show_burn_preview(this.ghost)
        this.substract_bricks(this.ghost, this.cur_brick)
        this.board.add_brick(this.ghost)
    }
    
    refresh_ghost()
    {
        if(this.ghost != null)
        {
            this.board.remove_brick(this.ghost)
            if(this.cur_brick.modifier == ModifierType.fire)
                this.board.hide_burn_preview()
        }
        if(this.properties.settings["ghost"] == true)
            this.generate_ghost()
        else
            this.ghost = null
    }
    
    refresh_settings(settings)
    {
        this.properties.settings = settings
        this.board.remove_brick(this.cur_brick)
        this.commit_move()
        if(this.properties.settings.music == true)
            main_ui.play_music()
        else
            main_ui.stop_music()
    }

    move_x(vect)
    {
        if(this.cur_brick.move == true)
        {
            this.board.remove_brick(this.cur_brick)
            this.cur_brick.x += vect
            if(!this.board.is_space_for_brick(this.cur_brick))
            {
                this.cur_brick.x += -vect
                this.commit_move()
            }
            else if(this.board.check_stick(this.cur_brick) == true)
            {
                this.place()
            }
            else
            {
                this.commit_move()
            }
        }
    }

    move_down()
    {
        this.board.remove_brick(this.cur_brick)
        ++this.cur_brick.y
        if(!this.board.is_space_for_brick(this.cur_brick))
        {
            --this.cur_brick.y
            this.place()
        }
        else
        {
            if(this.board.check_stick(this.cur_brick) == true)
                this.place()
            else
                this.commit_move()
        }
    }

    commit_move()
    {
        this.refresh_ghost()
        this.board.add_brick(this.cur_brick)
        this.ui.refresh_board(this.board)
    }

    read_selected_brick()
    {
        let modifier = this.cur_brick.modifier
        this.cur_brick = new Brick()
        this.cur_brick.pixels = this.board.get_selected_pixels()
        this.cur_brick.rotate = false
        this.cur_brick.move = false
        this.cur_brick.modifier = modifier
    }

    apply_gravity()
    {
        this.read_selected_brick()
        if(this.cur_brick.pixels.length == 0 || this.board.check_stick(this.cur_brick) == true)
        {
            this.spawn_next_brick()
            return
        }
        this.board.remove_brick(this.cur_brick)
        if(this.cur_brick.modifier == ModifierType.steel)
        {
            let compressed = this.board.compress(this.cur_brick)
            this.commit_move()
            if(!compressed)
                this.spawn_next_brick()
            return
        }
        ++this.cur_brick.y
        let can_move = this.board.is_space_for_brick(this.cur_brick)
        --this.cur_brick.y
        this.commit_move()
        if(!can_move)
            this.spawn_next_brick()
    }

    try_to_apply_gravity()
    {
        this.board.select_brick(this.cur_brick)
        this.remove_lines()
        this.apply_gravity()
    }

    add_score(score)
    {
        this.score += score
        this.ui.refresh_score(this.score)
    }

    remove_lines()
    {
        let lines = this.try_to_create_lines()
        if(lines.length > 0)
        {
            this.board.remove_lines(lines)
            this.add_score(this.score_counter.count_score_for_lines(lines))
            this.lines += lines.length
            this.ui.refresh_lines(this.lines)
        }
    }

    try_to_compress()
    {
        if(this.cur_brick.modifier == ModifierType.steel)
        {
            this.cur_brick.rotate = false
            this.cur_brick.move = false
            this.board.remove_brick(this.cur_brick)
            let compressed = this.board.compress(this.cur_brick)
            this.commit_move()
            if(compressed)
            {
                this.add_score(this.score_counter.count_score_for_compress())
                return true
            }
        }
        return false
    }

    try_to_burn()
    {
        if(this.cur_brick.modifier == ModifierType.fire)
        {
            this.board.hide_burn_preview()
            this.board.remove_brick(this.cur_brick)
            let stats = this.board.burn_around(this.cur_brick)
            this.add_score(this.score_counter.count_score_for_burning(stats.burned))
            this.add_score(this.score_counter.count_score_for_melting(stats.melted))
            this.spawn_next_brick()
            return true
        }
        return false
    }

    place()
    {
        this.commit_move()
        if(this.try_to_burn() == true)
            return
        if(this.try_to_compress() == true)
            return
        this.try_to_apply_gravity()
    }

    try_to_create_lines()
    {
        let lines = new Array()
        for(let y = 0; y < this.board.height; ++y)
        {
            let line = new Array()
            for(let x = 0; x < this.board.width; ++x)
            {
                if(!this.board.get_pixel(x, y).is_empty())
                    line.push(Pixel.copy(this.board.get_pixel(x, y)))
                else
                {
                    line = new Array()
                    break
                }
            }
            if(line.length > 0)
                lines.push(line)
        }
        return lines
    }

    try_to_hard_drop()
    {
        this.board.remove_brick(this.cur_brick)
        let distance = this.board.hard_drop(this.cur_brick)
        this.add_score(this.score_counter.count_score_for_hard_drop(distance))
        this.place()
    }

    try_to_stick()
    {
        if(this.board.check_stick(this.cur_brick) == true)
            this.place()
        else
            this.commit_move()
    }

    try_to_rotate()
    {
        if(this.cur_brick.rotate == true)
        {
            this.board.remove_brick(this.cur_brick)
            this.cur_brick.rotate_right()
            if(!this.board.is_space_for_brick(this.cur_brick))
            {
                this.cur_brick.rotate_left()
                this.commit_move()
            }
            else if(this.board.check_stick(this.cur_brick) == true)
            {
                this.place()
            }
            else
            {
                this.commit_move()
            }
        }
    }
}