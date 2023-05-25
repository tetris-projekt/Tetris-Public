/*----------------------------------------------------------------------------------------------------*/

/*                                            GAME DATA                                               */

/*----------------------------------------------------------------------------------------------------*/

class GameData
{
    
    constructor(game_mode, game_speed, settings)
    {
        this.game_mode = game_mode
        this.speed = game_speed
        this.settings = settings
        this.modified = this.get_modified()
        this.brick_types = this.get_brick_types()
        this.bricks_array = this.bricks_array_init()
        this.default_brick_array = this.get_bricks(data.default_brick_type)
        this.modifiers_array = this.modifiers_array_init(data.modifiers)
        this.normal_mode = this.game_mode == GameMode.normal
    }

    get_modified()
    {
        const modified = data.GameModeToModified[this.game_mode]
        if(modified == null)
            return BrickEditor.get_modified()
        else
            return modified
    }

    find_enabled_brick_types(brick_types)
    {
        let enabled = new Array()
        for(let elem in brick_types)
        {
            if(brick_types[elem] == true)
                enabled.push(elem)
        }
        return enabled
    }

    get_brick_types()
    {
        const brick_types = data.GameModeToBrickTypes[this.game_mode]
        if(brick_types == null)
            return this.find_enabled_brick_types(BrickEditor.get_brick_types())
        else
            return brick_types
    }

    get_bricks(brick_type)
    {
        const bricks = data.bricks[brick_type].bricks
        if(bricks == null)
            return BrickEditor.get_custom_bricks()
        else
            return bricks
    }
    
    modifiers_array_init()
    {
        let separator = 0
        let modifier_array = new Array()
        for(const type in ModifierType)
        {
            let elem = new Object()
            const modifier_type = ModifierType[type]
            elem.value = modifier_type
            separator += data.modifiers_chance[modifier_type]
            elem.separator = separator
            modifier_array.push(elem)
        }
        return modifier_array
    }

    bricks_array_init()
    {
        let separator = 0
        let bricks_array = new Array()
        for(let i = 0; i < this.brick_types.length; ++i)
        {
            let elem = new Object()
            const brick_type = this.brick_types[i]
            elem.value = this.get_bricks(brick_type)
            separator += data.bricks[brick_type].chance
            elem.separator = separator
            bricks_array.push(elem)
        }
        return bricks_array
    }
}