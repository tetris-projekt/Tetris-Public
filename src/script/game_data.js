/*----------------------------------------------------------------------------------------------------*/

/*                                            GAME DATA                                               */

/*----------------------------------------------------------------------------------------------------*/

class GameData
{
    
    constructor(game_mode, game_speed, board_size, preview_board_size)
    {
        this.game_mode = game_mode
        this.speed = game_speed
        this.board_sizes =
        {
            board: board_size,
            preview: preview_board_size,
        }
        this.multipliers = this.get_multipliers()
        this.colors_bag = this.colors_bag_init()
        this.modifiers_array = this.modifiers_array_init()
        this.bricks_bags_array = this.bricks_bags_array_init()
        this.default_bricks_bag = this.get_bricks_bag(data.default_brick_type)
        this.normal_mode = this.game_mode == GameMode.normal
    }

    get_multipliers()
    {
        const multipliers = data.GameModeToMultipliers[this.game_mode]
        if(multipliers == null)
            return BrickEditor.get_property("multipliers")
        else
            return multipliers
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

    find_enabled_modifier_types(modifier_types)
    {
        let enabled = new Array()
        for(const elem in modifier_types)
        {
            if(modifier_types[elem] == true)
                enabled.push(parseInt(elem))
        }
        return enabled
    }

    get_modifier_types()
    {
        const brick_types = data.GameModeToModifierTypes[this.game_mode]
        if(brick_types == null)
            return this.find_enabled_modifier_types(BrickEditor.get_modifier_types())
        else
            return brick_types
    }
    
    modifiers_array_init()
    {
        let separator = 0
        let modifier_array = new Array()
        const modifier_types = this.get_modifier_types()
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

    get_brick_types()
    {
        let brick_types = data.GameModeToBrickTypes[this.game_mode]
        if(brick_types == null)
        {
            brick_types = new Array()
            brick_types.push(BrickType.custom)
            if(BrickEditor.get_property("p1_5") == true)
                brick_types = brick_types.concat([BrickType.p1, BrickType.p2, BrickType.p3, BrickType.p4, BrickType.p5])
            else if(BrickEditor.get_property("p4") == true)
                brick_types.push(BrickType.p4)
        }
        return brick_types
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
}