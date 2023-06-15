/*----------------------------------------------------------------------------------------------------*/

/*                                          BRICK GENERATOR                                           */

/*----------------------------------------------------------------------------------------------------*/

class BrickGenerator
{
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
        let random_bricks_bag = default_bricks_bag
        if(bricks_bags_array.length > 0)
        {
            random_bricks_bag = this.get_random_from_chances_table(bricks_bags_array)           
            if(random_bricks_bag == null || random_bricks_bag.array.length == 0)
                random_bricks_bag = default_bricks_bag
        }
        const vectors_list = this.pick_from_bag(random_bricks_bag)
        const color = this.pick_from_bag(colors_bag)
        let brick = Brick.create(vectors_list, color, x, y)
        return brick
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
        if(modifiers_array.length > 0)
        {
            if(this.random_number(data.random_range) < data.chance_to_modify)
                return this.get_random_from_chances_table(modifiers_array)
        }
    }
}