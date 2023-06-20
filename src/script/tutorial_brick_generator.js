/*----------------------------------------------------------------------------------------------------*/

/*                                      TUTORIAL BRICK GENERATOR                                      */

/*----------------------------------------------------------------------------------------------------*/

class TutorialBrickGenerator
{
    constructor()
    {
        this.preset = null
        this.recursive_gravity_bricks_bag =
        {
            array:
            [
                [[0, -1], [0, 0], [-1, 1], [0, 1], false],
                [[0, -1], [0, 0], [0, 1], [1, 1], false],
                [[0, -1], [-1, 0], [0, 0], [1, 0], false],
                [[-1, -1], [-1, 0], [0, 0], [1, 0], false],
                [[1, -1], [-1, 0], [0, 0], [1, 0], false],
                [[0, -1], [0, 0], [1, 0], [0, 1], false],
                [[0, -1], [-1, 0], [0, 0], [0, 1], false],
                [[-1, 0], [0, 0], [0, 1], [1, 1], false],
                [[0, 0], [1, 0], [-1, 1], [0, 1], false],
            ],
            index: 0,
        }
        this.modifiers_for_lines = 
        [
            ModifierType.ice,
            ModifierType.glue,
            ModifierType.steel,
        ]
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
        return null
    }

    shuffle_array(array)
    {
        for(let cur_index = array.length - 1; cur_index > 0; --cur_index)
        {
            let random_index = this.random_number(cur_index + 1)
            swap(array, random_index, cur_index)
        }
    }

    pick_from_bag(bag)
    {
        if(bag.index == 0)
            this.shuffle_array(bag.array)
        const old_index = bag.index
        bag.index = (bag.index + 1) % bag.array.length
        return bag.array[old_index]
    }

    generate_brick(bricks_bags_array, default_bricks_bag, colors_bag, x, y)
    {
        let vectors_list = null
        if(this.preset.gravity_bricks)
        {
            vectors_list = this.pick_from_bag(this.recursive_gravity_bricks_bag)
        }
        else
        {
            let bricks_bag = null
            if(this.preset.extended)
                bricks_bag = this.get_random_from_chances_table(bricks_bags_array)
            else
                bricks_bag = default_bricks_bag
            vectors_list = this.pick_from_bag(bricks_bag)
        }
        const color = this.pick_from_bag(colors_bag)
        let brick = Brick.create(vectors_list, color, x, y)
        for(let i = 0; i < this.preset.rotation; ++i)
            brick.rotate()
        if(this.preset.multipliers)
            this.random_element(brick.pixels).content = this.generate_multiplier()
        if(this.preset.const_modifier != null)
            brick.set_modifier(this.preset.const_modifier)
        if(this.preset.modified)
        {
            this.try_to_modify(brick)
            this.try_to_add_multiplier(brick)
        }
        return brick
    }

    try_to_modify(brick)
    {
        const modifier = this.try_to_generate_modifier(tutorial.data.all_modifiers_array)
        if(modifier != null)
            brick.set_modifier(modifier) 
    }

    try_to_add_multiplier(brick)
    {
        const multiplier = this.try_to_generate_multiplier()
        if(multiplier > 0)
            this.random_element(brick.pixels).content = multiplier
    }

    generate_multiplier()
    {
        return this.random_number(9) + 1
    }

    generate_line(board, y)
    {
        for(let x = 0; x < board.width; ++x)
            board.get_pixel(x, y).color = this.random_element(data.colors)
    }

    generate_gap_in_line(board, y)
    {
        board.get_pixel(this.random_number(board.width), y).clear()
    }

    generate_modifier_in_line(board, y)
    {
        let pixel = board.get_pixel(this.random_number(board.width), y)
        if(!pixel.is_empty())
            pixel.modifier = this.random_element(this.modifiers_for_lines)
    }

    generate_multiplier_in_line(board, y)
    {
        let pixel = board.get_pixel(this.random_number(board.width), y)
        if(!pixel.is_empty())
            pixel.content = this.generate_multiplier()
    }

    try_to_generate_multiplier()
    {
        if(data.max_multiplier > 0)
        {
            if(this.random_number(data.random_range) < data.multiplier_chance)
                return this.random_number(data.max_multiplier - 1) + 2
        }
        else
            return 0
    }

    try_to_generate_modifier(modifiers_array)
    {
        if(modifiers_array == null)
            return null
        if(modifiers_array.length > 0)
        {
            if(this.random_number(data.random_range) < data.chance_to_modify)
                return this.get_random_from_chances_table(modifiers_array)
        }
    }
}