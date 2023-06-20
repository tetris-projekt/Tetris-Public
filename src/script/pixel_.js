/*----------------------------------------------------------------------------------------------------*/

/*                                              PIXEL                                                 */

/*----------------------------------------------------------------------------------------------------*/

class Pixel
{
    static create(x, y, color = "empty")
    {
        let pixel = new Pixel()
        pixel.x = x
        pixel.y = y
        pixel.color = color
        pixel.content = 0
        pixel.selected = false
        pixel.ghost = false
        pixel.transparent = false
        pixel.modifier = null
        return pixel
    }
    static copy(pixel)
    {
        let copy = new Pixel()
        copy.x = pixel.x
        copy.y = pixel.y
        copy.color = pixel.color
        copy.content = pixel.content
        copy.selected = pixel.selected
        copy.ghost = pixel.ghost
        copy.transparent = pixel.transparent
        copy.modifier = pixel.modifier
        return copy
    }

    is_empty()
    {
        return (this.color == "empty" || this.ghost == true)
    }

    clear()
    {
        this.modifier = null
        this.color = "empty"
        this.content = 0
        this.selected = false
        this.transparent = false
        this.ghost = false
    }

    burn()
    {
        const melted = this.modifier == ModifierType.ice
        this.clear()
        return melted
    }
}