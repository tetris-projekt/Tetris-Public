/*----------------------------------------------------------------------------------------------------*/

/*                                            PROPERTIES                                              */

/*----------------------------------------------------------------------------------------------------*/

class Properties
{
    constructor(game_mode, game_speed, settings)
    {
        this.brick_type_chances = this.table_of_chances_init(data.bricks)
        this.modifier_type_chances = this.table_of_chances_init(data.modifiers)
        this.speed = game_speed
        this.game_mode = game_mode
        this.settings = settings
        this.modified = isIn(this.game_mode, [GameMode.modified, GameMode.extreme])
        this.extended = isIn(this.game_mode, [GameMode.extended, GameMode.extreme])
        this.normal_mode = this.game_mode == GameMode.normal
    }

    table_of_chances_init(source)
    {
        let separator = 0
        let brick_type_chances = new Array()
        const brick_types = Object.keys(source)
        for(let i = 0; i < brick_types.length; ++i)
        {
            let elem = {}
            elem.type = brick_types[i]
            separator += source[elem.type].chance
            elem.separator = separator
            brick_type_chances.push(elem)
        }
        return brick_type_chances
    }
}