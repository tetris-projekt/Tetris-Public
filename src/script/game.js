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
    custom: 4,
    normal: 5,
}

const GameButtons =
{
    pause: get_src("game", "pause"),
    menu: get_src("game", "menu"),
}

const GameModeList = [GameMode.classic, GameMode.modified, GameMode.extended, GameMode.extreme, GameMode.custom, GameMode.normal]

class Game
{
    constructor(game_data, ui)
    {
        this.next_brick = null
        this.cur_brick = null
        this.ghost = null
        this.burn_preview = null
        this.score_counter = new ScoreCounter()
        this.data = game_data
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
        this.ui.create_board("board", this.data.normal_mode)
        this.ui.create_board("preview", this.data.normal_mode)
        this.ui.create_digits("score")
        this.ui.create_digits("lines")
        this.ui.refresh_board(this.board)
        this.ui.refresh_preview_board(this.preview_board)
        this.ui.refresh_score(this.score)
        this.ui.refresh_lines(this.lines)
        this.ui.refresh_game_mode(this.data.game_mode)
        this.ui.refresh_speed(this.data.speed)
        this.ui.refresh_button(this.button)
        this.ui.refresh_controls(this.data.normal_mode)
        main_ui.set_music(this.data.game_mode)
    }
    
    start()
    {
        this.next_brick = this.generate_brick()
        this.spawn_next_brick()
        this.state = GameState.active
        this.try_to_play_music()
        this.try_to_play_sound("start")
    }

    pause()
    {
        this.state = GameState.paused
        main_ui.pause_music()
    }

    try_to_play_sound(sound_name)
    {
        if(this.data.settings.sounds == true)
            main_ui.play_sound(sound_name)
    }

    try_to_play_music()
    {
        if(this.data.settings.music == true)
            main_ui.play_music()
    }

    resume()
    {
        this.state = GameState.active
        this.try_to_play_music()
        this.try_to_play_sound("resume")
    }
    
    end()
    {
        this.state = GameState.end
        this.button = GameButtons.menu
        this.ui.refresh_button(this.button)
        main_ui.pause_music()
        game_end()
    }

    random_number(range)
    {
        return Math.floor(Math.random() * range)
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
                return elem.value
        }
        return new Array()
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
        let random_bricks_array = game.data.default_brick_array
        if(this.data.bricks_array.length > 0)
            random_bricks_array = this.get_random_from_chances_table(this.data.bricks_array)            
        if(random_bricks_array.length == 0)
            random_bricks_array = game.data.default_brick_array
        const vectors_list = this.random_element(random_bricks_array)
        const color = this.random_element(data.colors)
        const x = get_center_index(this.preview_board.width)
        const y = get_center_index(this.preview_board.height)
        let brick = Brick.create(x, y, color, vectors_list)
        return brick
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
        this.cur_brick.x = get_center_index(this.board.width)
        this.cur_brick.y = this.cur_brick.get_farthest_vector()
        if(!this.board.is_space_for_brick(this.cur_brick))
        {
            this.cur_brick.y = 0
            while(!this.board.brick_is_in_range(this.cur_brick))
                ++this.cur_brick.y
        }
    }

    try_to_modify(brick)
    {
        this.try_to_generate_multiplier(brick)
        if(this.random_number(data.random_range) < data.chance_to_modify)
        {
            let modifier = this.get_random_from_chances_table(this.data.modifiers_array)
            brick.set_modifier(modifier) 
            this.try_to_play_sound(data.ModifierTypeToSoundNames[modifier]) 
        }
    }

    spawn_next_brick()
    {
        start_game_tick()
        step()
        this.score_counter.reset()  
        this.create_cur_brick()
        this.generate_next_brick()
        if(game.data.modified == true)
            this.try_to_modify(this.cur_brick)
        if(this.board.is_space_for_brick(this.cur_brick))
        {
            this.commit_move()
        }
        else
        {
            this.board.add_brick(this.cur_brick)
            this.remove_ghost()
            this.ui.refresh_board(this.board)
            this.end()
            show_end_screen()
            this.try_to_play_sound("end")
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
        {
            this.burn_preview = this.board.find_pixels_to_burn(this.ghost)
            this.board.show_burn_preview(this.burn_preview)
        }
        else
        {
            this.burn_preview = null
        }
        this.substract_bricks(this.ghost, this.cur_brick)
        this.board.add_brick(this.ghost)
    }

    remove_ghost()
    {
        if(this.burn_preview != null)
            this.board.hide_burn_preview(this.burn_preview)
        if(this.ghost != null)
            this.board.remove_brick(this.ghost)
    }
    
    refresh_ghost()
    {
        this.remove_ghost()
        if(this.data.settings["ghost"] == true)
            this.generate_ghost()
        else
        {
            this.ghost = null
            this.burn_preview = null
        }
    }
    
    refresh_settings(settings)
    {
        this.data.settings = settings
        this.board.remove_brick(this.cur_brick)
        this.commit_move()
        if(this.data.settings.music == false)
            main_ui.pause_music()
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
                this.try_to_play_sound("stick")
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
            this.try_to_play_sound("place")
        }
        else
        {
            if(this.board.check_stick(this.cur_brick) == true)
            {
                this.place()
                this.try_to_play_sound("stick")
            }
            else
            {
                this.commit_move()
            }
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

    try_to_enable_gravity(brick)
    {
        if(brick.pixels.length == 0)
            return false
        if(this.board.check_stick(brick) == true)
        {
            this.try_to_play_sound("stick")
            return false
        }
        this.board.remove_brick(brick)
        if(brick.modifier == ModifierType.steel)
        {
            let compressed = this.board.compress(brick)
            this.commit_move()
            return compressed
        }
        ++brick.y
        let can_move = this.board.is_space_for_brick(brick)
        --brick.y
        this.commit_move()
        return can_move
    }

    add_score(score)
    {
        this.score += score
        this.ui.refresh_score(this.score)
    }

    remove_lines(lines)
    {
        if(lines.length > 0)
        {
            this.board.remove_lines(lines)
            this.add_score(this.score_counter.count_score_for_lines(lines))
            this.lines += lines.length
            this.ui.refresh_lines(this.lines)
            this.try_to_play_sound("lines")
        }
    }

    try_to_compress()
    {
        this.cur_brick.rotate = false
        this.cur_brick.move = false
        this.board.remove_brick(this.cur_brick)
        let compressed = this.board.compress(this.cur_brick)
        this.commit_move()
        if(compressed)
        {
            this.add_score(this.score_counter.count_score_for_compress())
            this.try_to_play_sound("compress")
            return true
        }
        return false
    }

    burn_brick(brick)
    {
        let stats = this.board.burn_brick(brick)
        this.add_score(this.score_counter.count_score_for_burning(stats.burned))
        this.add_score(this.score_counter.count_score_for_melting(stats.melted))
        this.spawn_next_brick()
        this.try_to_play_sound("burn")
    }

    place()
    {
        this.commit_move()
        switch(this.cur_brick.modifier)
        {
            case ModifierType.fire:
                this.burn_brick(this.cur_brick)
            break
            case ModifierType.steel:
                if(this.try_to_compress() == true)
                    break
            default:
                this.board.select_brick(this.cur_brick)
                this.remove_lines(this.find_lines())
                this.read_selected_brick()
                if(this.try_to_enable_gravity(this.cur_brick) == true)
                    this.score_counter.recursive_gravity_multiplier = true
                else
                    this.spawn_next_brick()
        }
    }

    find_lines()
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
        this.try_to_play_sound("hard_drop")
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
                this.try_to_play_sound("no_rotate")  
            }
            else 
            {
                if(this.board.check_stick(this.cur_brick) == true)
                {
                    this.place()
                    this.try_to_play_sound("stick")
                }
                else
                {
                    this.commit_move()
                }
                this.try_to_play_sound("rotate")        
            }
        }
        else
        {
            this.try_to_play_sound("no_rotate")
        }
    }
}