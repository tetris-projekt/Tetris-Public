/*----------------------------------------------------------------------------------------------------*/

/*                                             KEYBOARD                                               */

/*----------------------------------------------------------------------------------------------------*/

class Keyboard
{
    constructor()
    {
        this.key_states =
        {
            soft_drop: false,
            move_left: false,
            move_right: false,
            rotate: false,
            restart: false,
            hard_drop: false,
            pause: false,
            select_next: false,
            select_previous: false,
            click_selected: false,
        }

        this.key_intervals = 
        {
            soft_drop: 0,
            move_left: 0,
            move_right: 0,
        }

        this.reverse_controls = false
        
        document.onkeydown = event =>
        {
            const key = event.key
            if(isIn(key, data.keys.pause))
                this.try_to_pause()
            if(isIn(key, data.keys.restart))
                this.try_to_restart()
            if(isIn(key, data.keys.move_left))
                this.try_to_move_left()
            if(isIn(key, data.keys.move_right))
                this.try_to_move_right()
            if(isIn(key, data.keys.rotate))
            {
                if(this.reverse_controls == false)
                    this.try_to_rotate()
                else
                    this.try_to_soft_drop()
            }
            if(isIn(key, data.keys.hard_drop))
                this.try_to_hard_drop()
            if(isIn(key, data.keys.soft_drop))
            {
                if(this.reverse_controls == false)
                    this.try_to_soft_drop()
                else
                    this.try_to_rotate()
            }
            if(isIn(key, data.keys.select_next))
                this.try_to_select_next()
            if(isIn(key, data.keys.select_previous))
                this.try_to_select_previous()
            if(isIn(key, data.keys.click_selected))
                this.try_to_click_selected()
        }

        document.onkeyup = event =>
        {
            const key = event.key
            if(isIn(key, data.keys.pause))
                this.reset_pause()
            if(isIn(key, data.keys.restart))
                this.reset_restart()
            if(isIn(key, data.keys.soft_drop))
            {
                if(this.reverse_controls == false)
                    this.reset_soft_drop()
                else
                    this.reset_rotate()
            }
            if(isIn(key, data.keys.move_left))
                this.reset_move_left()
            if(isIn(key, data.keys.move_right))
                this.reset_move_right()
            if(isIn(key, data.keys.rotate))
            {
                if(this.reverse_controls == false)
                    this.reset_rotate()
                else
                    this.reset_soft_drop()
            }
            if(isIn(key, data.keys.hard_drop))
                this.reset_hard_drop()       
            if(isIn(key, data.keys.select_next))
                this.reset_select_next()
            if(isIn(key, data.keys.select_previous))
                this.reset_select_previous()
            if(isIn(key, data.keys.click_selected))
                this.reset_click_selected()
        }
    }    

    try_to_pause()
    {
        if(this.key_states.pause == false)
        {
            control.try_to_pause()
            this.key_states.pause = true
        }
    }

    reset_pause()
    {
        this.key_states.pause = false
    }

    try_to_restart()
    {
        if(this.key_states.restart == false)
        {
            control.try_to_restart()
            this.key_states.restart = true
        }
    }

    reset_restart()
    {
        this.key_states.restart = false
    }

    try_to_soft_drop()
    {
        if(this.key_states.soft_drop == false)
        {
            control.soft_drop_start()
            control.soft_drop()
            this.key_intervals.soft_drop = setInterval("control.soft_drop()", data.delays.soft_drop)
            this.key_states.soft_drop = true
        }
    }

    reset_soft_drop()
    {
        control.soft_drop_end()
        clearInterval(this.key_intervals.soft_drop)
        this.key_states.soft_drop = false
    }

    try_to_move_left()
    {
        if(this.key_states.move_left == false)
        {
            clearInterval(this.key_intervals.move_right)
            control.move_left()
            this.key_intervals.move_left = setInterval("control.move_left()", data.delays.move)
            this.key_states.move_left = true
        }
    }

    reset_move_left()
    {
        clearInterval(this.key_intervals.move_left)
        this.key_states.move_left = false
    }

    try_to_move_right()
    {
        if(this.key_states.move_right == false)
        {
            clearInterval(this.key_intervals.move_left)
            control.move_right()
            this.key_intervals.move_right = setInterval("control.move_right()", data.delays.move)
            this.key_states.move_right = true
        }
    }

    reset_move_right()
    {
        clearInterval(this.key_intervals.move_right)
        this.key_states.move_right = false
    }

    try_to_rotate()
    {
        if(this.key_states.rotate == false)
        {
            control.rotate()
            this.key_states.rotate = true
        }
    }

    reset_rotate()
    {
        this.key_states.rotate = false
    }

    try_to_hard_drop()
    {
        if(this.key_states.hard_drop == false)
        {
            control.hard_drop()
            this.key_states.hard_drop = true
        }
    }

    reset_hard_drop()
    {
        clearInterval(this.key_intervals.soft_drop)
        this.key_states.hard_drop = false
    }

    try_to_select_next()
    {
        if(this.key_states.select_next == false)
        {
            control.select_next()
            this.key_states.select_next = true
        }
    }

    reset_select_next()
    {
        this.key_states.select_next = false
    }

    try_to_select_previous()
    {
        if(this.key_states.select_previous == false)
        {
            control.select_previous()
            this.key_states.select_previous = true
        }
    }

    reset_select_previous()
    {
        this.key_states.select_previous = false
    }

    try_to_click_selected()
    {
        if(this.key_states.click_selected == false)
        {
            control.click_selected()
            this.key_states.click_selected = true
        }
    }

    reset_click_selected()
    {
        this.key_states.click_selected = false
    }
}