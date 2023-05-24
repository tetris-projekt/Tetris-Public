/*----------------------------------------------------------------------------------------------------*/

/*                                              BRICK                                                 */

/*----------------------------------------------------------------------------------------------------*/

const BrickType = 
{
    custom: 0,
    p1: 1,
    p2: 2,
    p3: 3,
    p4: 4,
    p5: 5,
}

const ModifierType = 
{
    ice: 1,
    fire: 2,
    steel: 3,
    glue: 4,
}

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

    static create(x, y, color, vectors_list)
    {
        let brick = new Brick()
        brick.x = x
        brick.y = y
        brick.rotate = true
        brick.move = true
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
        copy.rotate = brick.rotate
        copy.move = brick.move
        copy.modifier = brick.modifier
        copy.special_rotate = brick.special_rotate
        return copy
    }

    static copy_vectors_list(target, vectors_list)
    {
        for(let i = 0; i < vectors_list.length; ++i)
            target[i] = Pixel.copy(vectors_list[i])
    }

    rotate_right()
    {
        for(let i = 0; i < this.pixels.length; ++i)
        {
            let pixel = this.pixels[i]
            let x = pixel.y * -1
            pixel.y = pixel.x
            pixel.x = x
        }
        if(this.special_rotate == true)
        {
            for(let i = 0; i < this.pixels.length; ++i)
                ++this.pixels[i].x
        }
    }

    rotate_left()
    {
        for(let i = 0; i < this.pixels.length; ++i)
        {
            let pixel = this.pixels[i]
            let y = pixel.x * -1
            pixel.x = pixel.y
            pixel.y = y
        }
        if(this.special_rotate == true)
        {
            for(let i = 0; i < this.pixels.length; ++i)
                ++this.pixels[i].y
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
        this.rotate = !(modifier == ModifierType.ice)
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