/*----------------------------------------------------------------------------------------------------*/

/*                                        TUTORIAL GAME DATA                                          */

/*----------------------------------------------------------------------------------------------------*/

class TutorialGameData
{
    constructor(board_size)
    {
        this.board_sizes =
        {
            board: board_size,
            preview: {width: 0, height: 0}
        }
        this.multipliers = false
        this.colors_bag = this.colors_bag_init()
        this.modifiers_array = null
        this.all_modifiers_array = this.modifiers_array_init()
        this.bricks_bags_array = this.bricks_bags_array_init()
        this.default_bricks_bag = this.get_bricks_bag(data.default_brick_type)
        this.normal_mode = false
    }

    colors_bag_init()
    {
        let colors_bag = 
        {
            array: data.colors,
            index: 0,
        }
        return colors_bag
    }

    get_bricks_bag(brick_type)
    {
        let bricks_bag = 
        {
            array: data.bricks[brick_type].bricks,
            index: 0,
        }
        if(bricks_bag.array == null)
            bricks_bag.array = BrickEditor.get_custom_bricks()
        return bricks_bag
    }

    get_brick_types()
    {
        return new Array(BrickType.p1, BrickType.p2, BrickType.p3, BrickType.p4, BrickType.p5) 
    }

    get_brick_chance(brick_type, bricks_bag)
    {
        const chance = data.bricks[brick_type].chance
        if(chance == null)
            return bricks_bag.array.length
        else
            return chance
    }

    bricks_bags_array_init()
    {
        let separator = 0
        let bricks_bags_array = new Array()
        const brick_types = this.get_brick_types()
        for(let i = 0; i < brick_types.length; ++i)
        {
            const brick_type = brick_types[i]
            const brick_bag = this.get_bricks_bag(brick_type)
            if(brick_bag.array.length > 0)
            {
                let elem = new Object()
                elem.value = brick_bag
                separator += this.get_brick_chance(brick_type, brick_bag)
                elem.separator = separator
                bricks_bags_array.push(elem)
            }
        }
        return bricks_bags_array
    }

    modifiers_array_init()
    {
        let separator = 0
        let modifier_array = new Array()
        const modifier_types = [ModifierType.fire, ModifierType.ice, ModifierType.glue, ModifierType.steel]
        for(let i = 0; i < modifier_types.length; ++i)
        {
            let elem = new Object()
            const modifier_type = modifier_types[i]
            elem.value = modifier_type
            separator += data.modifiers_chance[modifier_type]
            elem.separator = separator
            modifier_array.push(elem)
        }
        return modifier_array
    }
}