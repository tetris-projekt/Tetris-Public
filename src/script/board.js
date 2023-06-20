/*----------------------------------------------------------------------------------------------------*/

/*                                              BOARD                                                 */

/*----------------------------------------------------------------------------------------------------*/

class Board
{
    constructor(size)
    {
        this.width = size.width
        this.height = size.height
        this.board = new Array()
        for(let y = 0; y < this.height; ++y)
        {
            let row = new Array()
            for(let x = 0; x < this.width; ++x)
                row.push(Pixel.create(x, y))
            this.board.push(row)
        }
    }

    get_pixel(x, y)
    {
        return this.board[y][x]
    }

    coords_exist(x, y)
    {
        return (x >= 0 && x < this.width && y >= 0 && y < this.height)
    }

    set_pixel(pixel)
    {
        this.board[pixel.y][pixel.x] = Pixel.copy(pixel)
    }

    add_brick(brick)
    {
        for(let i = 0; i < brick.pixels.length; ++i)
        {
            let pixel = Pixel.copy(brick.pixels[i])
            pixel.x = brick.get_pixel_x(i)
            pixel.y = brick.get_pixel_y(i)
            if(this.coords_exist(pixel.x, pixel.y))
                this.set_pixel(pixel)
        }
    }

    is_space_for_new_brick(farthest_vector)
    {
        for(let x = 0; x < this.width; ++x)
        {
            for(let y = 0; y <= farthest_vector * 2 + 1; ++y)
            {
                if(!this.coords_exist(x, y) || !this.get_pixel(x, y).is_empty())
                    return false
            }
        }
        return true
    }

    find_new_brick_y(brick)
    {
        let farthest_vector = brick.get_farthest_vector()
        if(this.is_space_for_new_brick(farthest_vector))
            return farthest_vector
        let test_brick = Brick.copy(brick)
        test_brick.y = 0
        while(!this.brick_is_in_range(test_brick))
            ++test_brick.y
        return test_brick.y
    }

    select_brick(brick)
    {
        for(let i = 0; i < brick.pixels.length; ++i)
        {
            let pixel = Pixel.copy(brick.pixels[i])
            let x = brick.get_pixel_x(i)
            let y = brick.get_pixel_y(i)
            if(this.coords_exist(x, y))
                this.get_pixel(x, y).selected = true
        }
    }

    get_selected_pixels()
    {
        let pixels = new Array()
        for(let y = 0; y < this.height; ++y)
        {
            for(let x = 0; x < this.width; ++x)
            {
                let pixel = this.get_pixel(x, y)
                if(pixel.selected == true)
                {
                    pixel.selected = false
                    pixels.push(Pixel.copy(pixel))
                }
            }
        }
        return pixels
    }

    remove_brick(brick)
    {
        for(let i = 0; i < brick.pixels.length; ++i)
        {
            let x = brick.get_pixel_x(i)
            let y = brick.get_pixel_y(i)
            if(this.coords_exist(x, y))
                this.get_pixel(x, y).clear()
        }
    }
   
    remove_lines(lines)
    {
        for(let i = 0; i < lines.length; ++i)
        {
            let line = lines[i]
            for(let j = 0; j < line.length; ++j)
                this.slide_all_above(line[j], 0)
        }
    }

    hard_drop(brick)
    {
        if(!this.is_space_for_brick(brick))
            return
        while(this.is_space_for_brick(brick))
        {
            if(this.check_stick(brick) == true)
                return
            ++brick.y
        }
        --brick.y
    }

    slide_all_above(pixel, max_height)
    {
        if(this.coords_exist(pixel.x, pixel.y))
        {
            const x = pixel.x
            for(let y = pixel.y - 1; y >= max_height; --y)
            {
                let new_pixel = Pixel.copy(this.get_pixel(x, y))
                ++new_pixel.y
                if(this.coords_exist(new_pixel.x, new_pixel.y))
                    this.set_pixel(new_pixel)
            }
            this.get_pixel(x, max_height).clear()
        }
    }

    is_space_for_brick(brick)
    {
        for(let i = 0; i < brick.pixels.length; ++i)
        {
            let x = brick.get_pixel_x(i)
            let y = brick.get_pixel_y(i)
            if(!this.coords_exist(x, y) || !this.get_pixel(x, y).is_empty())
                return false
        }
        return true
    }

    brick_is_in_range(brick)
    {
        for(let i = 0; i < brick.pixels.length; ++i)
        {
            let x = brick.get_pixel_x(i)
            let y = brick.get_pixel_y(i)
            if(!this.coords_exist(x, y))
                return false
        }
        return true
    }

    get_pixel_neighbours(pixel)
    {
        let pixels = new Array()
        for(let y = pixel.y - 1; y <= pixel.y + 1; ++y)
        {
            for(let x = pixel.x - 1; x <= pixel.x + 1; ++x)
            {
                if(x == pixel.x && y == pixel.y)
                    continue
                if(this.coords_exist(x, y))
                {
                    if(!this.get_pixel(x, y).is_empty())
                        pixels.push(this.get_pixel(x, y))
                }
            }
        }
        return pixels
    }

    get_pixel_neighbours_no_corners(pixel)
    {
        let vectors = [[0, -1], [0, 1], [-1, 0], [1, 0]]
        let pixels = new Array()
        for(let i = 0; i < vectors.length; ++i)
        {
            let x = pixel.x + vectors[i][0]
            let y = pixel.y + vectors[i][1]
            if(this.coords_exist(x, y))
            {
                if(!this.get_pixel(x, y).is_empty())
                    pixels.push(this.get_pixel(x, y))
            }
        }
        return pixels
    }

    get_brick_neighbours(brick)
    {
        let neighbours_list = new Array()
        let brick_pixels = brick.get_board_pixels()
        for(let i = 0; i < brick.pixels.length; ++i)
        {
            if(this.coords_exist(brick.get_pixel_x(i), brick.get_pixel_y(i)))
            {
                let pixel = this.get_pixel(brick.get_pixel_x(i), brick.get_pixel_y(i))
                let neighbours = this.get_pixel_neighbours(pixel)
                for(let i = 0; i < neighbours.length; ++i)
                {
                    let pixel = neighbours[i]
                    if(!this.is_in_pixel_list(pixel, neighbours_list) && !this.is_in_pixel_list(pixel, brick_pixels))
                        neighbours_list.push(pixel)
                }
            }
        }
        return neighbours_list
    }

    get_brick_neighbours_no_corners(brick)
    {
        let brick_pixels = brick.get_board_pixels()
        let neighbours_list = new Array()
        for(let i = 0; i < brick.pixels.length; ++i)
        {
            if(this.coords_exist(brick.get_pixel_x(i), brick.get_pixel_y(i)))
            {
                let pixel = this.get_pixel(brick.get_pixel_x(i), brick.get_pixel_y(i))
                let neighbours = this.get_pixel_neighbours_no_corners(pixel)
                for(let i = 0; i < neighbours.length; ++i)
                {
                    let pixel = neighbours[i]
                    if(!this.is_in_pixel_list(pixel, neighbours_list) && !this.is_in_pixel_list(pixel, brick_pixels))
                        neighbours_list.push(pixel)
                }
            }
        }
        return neighbours_list
    }

    is_in_pixel_list(pixel, pixel_list)
    {
        for(let i = 0; i < pixel_list.length; ++i)
        {
            if(pixel_list[i].x == pixel.x && pixel_list[i].y == pixel.y)
                return true
        }
        return false
    }

    burn_brick(brick)
    {
        let pixels_to_burn = this.find_pixels_to_burn(brick)
        this.remove_brick(brick)
        let burned_pixels_stats = 
        {
            burned: brick.pixels.length,
            melted: 0,
        }
        for(let i = 0; i < pixels_to_burn.length; ++i)
        {
            const melted = pixels_to_burn[i].burn()
            if(melted)
                ++burned_pixels_stats.melted
            else
                ++burned_pixels_stats.burned
        }
        brick.pixels = new Array()
        return burned_pixels_stats
    }

    get_pixels_from_brick_shape(brick)
    {
        let brick_pixels = new Array()
        for(let i = 0 ; i < brick.pixels.length; ++i)
        {
            if(this.coords_exist(brick.get_pixel_x(i), brick.get_pixel_y(i)))
            {
                let pixel = this.get_pixel(brick.get_pixel_x(i), brick.get_pixel_y(i))
                if(!pixel.is_empty())
                    brick_pixels.push(pixel)
            }
            else return new Array()
        }
        return brick_pixels
    }

    find_spot_to_compress(pixel)
    {
        if(this.coords_exist(pixel.x, pixel.y))
        {
            if(pixel.y < this.height - 1)
            {
                if(this.get_pixel(pixel.x, pixel.y).modifier == ModifierType.steel)
                    return null
                let x = pixel.x
                for(let y = pixel.y + 1; y < this.height; ++y)
                {
                    if(this.get_pixel(x, y).modifier == ModifierType.steel)
                        return null
                    if(this.get_pixel(x, y).is_empty())
                        return this.get_pixel(x, y)
                }
            }

        }
        return null
    }

    can_compress(brick)
    {
        let test = Brick.copy(brick)
        ++test.y
        let coliding_pixels = this.get_pixels_from_brick_shape(test)
        if(coliding_pixels.length == 0)
            return false
        for(let i = 0; i < coliding_pixels.length; ++i)
        {
            const empty_pixel = this.find_spot_to_compress(coliding_pixels[i])
            if(empty_pixel == null)
                return false
        }
        return true
        
    }

    compress(brick)
    {
        ++brick.y
        let coliding_pixels = this.get_pixels_from_brick_shape(brick)
        let empty_pixels = new Array()
        for(let i = 0; i < coliding_pixels.length; ++i)
        {
            const empty_pixel = this.find_spot_to_compress(coliding_pixels[i])
            empty_pixels.push(empty_pixel)
        }
        for(let i = 0; i < empty_pixels.length; ++i)
            this.slide_all_above(empty_pixels[i], coliding_pixels[i].y)
    }

    find_pixels_to_burn(brick)
    {
        let brick_neighbours = this.get_brick_neighbours(brick)
        let pixels_to_burn = new Array()
        for(let i = 0; i < brick_neighbours.length; ++i)
        {
            let neighbour = brick_neighbours[i]
            if(isIn(neighbour.modifier, BurnableModifiers))
                pixels_to_burn.push(neighbour)
        }
        return pixels_to_burn
    }

    show_burn_preview(burn_preview)
    {
        for(let i = 0; i < burn_preview.length; ++i)
            burn_preview[i].transparent = true
    }

    hide_burn_preview(burn_preview)
    {
        for(let i = 0; i < burn_preview.length; ++i)
            burn_preview[i].transparent = false
    }

    check_stick(brick)
    {
        if(!isIn(brick.modifier, StickableModifiers))
            return false
        let neighbours = this.get_brick_neighbours_no_corners(brick)
        for(let i = 0; i < neighbours.length; ++i)
        {
            let neighbour = neighbours[i]
            if(isIn(neighbour.modifier, StickableModifiers))
            {
                if(neighbour.modifier == ModifierType.glue || brick.modifier == ModifierType.glue)
                    return true
            }
        }
        return false
    }
}