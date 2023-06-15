/*----------------------------------------------------------------------------------------------------*/

/*                                              BRICK                                                 */

/*----------------------------------------------------------------------------------------------------*/

const BurnableModifiers = 
[
    null,
    ModifierType.glue,
    ModifierType.ice,
    ModifierType.fire,
]

const StickableModifiers = 
[
    ModifierType.glue,
    null,
]

class Brick
{
    constructor()
    {
        this.pixels = new Array()
        this.x = 0
        this.y = 0
    }

    static create(vectors_list, color, x, y)
    {
        let brick = new Brick()
        brick.x = x
        brick.y = y
        brick.can_rotate = true
        brick.can_move = true
        brick.modifier = null
        for(let i = 0; i < vectors_list.length - 1; ++i)
        {
            let vect = vectors_list[i]
            brick.pixels.push(Pixel.create(vect[0], vect[1], color))
        }
        brick.special_rotate = vectors_list[vectors_list.length - 1]
        return brick
    }

    static copy(brick)
    {
        let copy = new Brick()
        Brick.copy_vectors_list(copy.pixels, brick.pixels)
        copy.x = brick.x
        copy.y = brick.y
        copy.can_rotate = brick.can_rotate
        copy.can_move = brick.can_move
        copy.modifier = brick.modifier
        copy.special_rotate = brick.special_rotate
        return copy
    }

    static copy_vectors_list(target, vectors_list)
    {
        for(let i = 0; i < vectors_list.length; ++i)
            target[i] = Pixel.copy(vectors_list[i])
    }

    rotate()
    {
        for(let i = 0; i < this.pixels.length; ++i)
        {
            let pixel = this.pixels[i]
            swap(pixel, "x", "y")
            pixel.x *= -1
            if(this.special_rotate == true)
                ++pixel.x
        }
    }

    get_pixel_x(index)
    {
        return this.x + this.pixels[index].x
    }

    get_pixel_y(index)
    {
        return this.y + this.pixels[index].y
    }

    get_board_pixels()
    {
        let pixel_list = new Array()
        Brick.copy_vectors_list(pixel_list, this.pixels)
        for(let i = 0; i < this.pixels.length; ++i)
        {
            pixel_list[i].x = this.get_pixel_x(i)
            pixel_list[i].y = this.get_pixel_y(i)
        }
        return pixel_list
    }

    set_modifier(modifier)
    {
        this.can_rotate = !(modifier == ModifierType.ice)
        this.modifier = modifier
        for(let i = 0; i < this.pixels.length; ++i)
        {
            this.pixels[i].modifier = modifier
        }
    }

    get_farthest_vector()
    {
        let farthest_vector = 0
        for(let i = 0; i < this.pixels.length; ++i)
        {
            let pixel = this.pixels[i]
            if(Math.abs(pixel.x) > farthest_vector)
                farthest_vector = Math.abs(pixel.x)
            if(Math.abs(pixel.y) > farthest_vector)
                farthest_vector = Math.abs(pixel.y)
        }
        return farthest_vector
    }

    ghostify()
    {
        for(let i = 0; i < this.pixels.length; ++i)
        {
            this.pixels[i].ghost = true
            this.pixels[i].transparent = true
        }
    }
}