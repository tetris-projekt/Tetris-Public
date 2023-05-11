/*----------------------------------------------------------------------------------------------------*/

/*                                             CONTROL                                                */

/*----------------------------------------------------------------------------------------------------*/

let key_states =
{
    soft_drop: false,
    move_left: false,
    move_right: false,
    rotate: false,
    restart: false,
    hard_drop: false,
    pause: false,
}

let key_intervals = 
{
    soft_drop: 0,
    move_left: 0,
    move_right: 0,
}

document.onkeydown = event =>
{
    if(game != null)
    {
        switch(event.key)
        {
            case data.keys.pause:
                try_to_pause()
            return
            case data.keys.restart:
                try_to_restart()
            return
            case data.keys.move_left:
                try_to_move_left()
            return
            case data.keys.move_right:
                try_to_move_right()
            return
            case data.keys.rotate:
                if(game.properties.normal_mode == false)
                    try_to_rotate()
                else
                    try_to_soft_drop()
            return
            case data.keys.hard_drop:
                try_to_hard_drop()
            return
            case data.keys.soft_drop:
                if(game.properties.normal_mode == false)
                    try_to_soft_drop()
                else
                    try_to_rotate()
            return
        }
    }
}

document.onkeyup = event =>
{
    if(game != null)
    {
        switch(event.key)
        {
            case data.keys.pause:
                key_states.pause = false
            return
            case data.keys.restart:
                key_states.restart = false
            return
            case data.keys.soft_drop:
                if(game.properties.normal_mode == false)
                    reset_soft_drop()
                else
                    reset_rotate()
            return
            case data.keys.move_left:
                reset_move_left()
            return
            case data.keys.move_right:
                reset_move_right()
            return
            case data.keys.rotate:
                if(game.properties.normal_mode == false)
                    reset_rotate()
                else
                    reset_soft_drop()
            return
            case data.keys.hard_drop:
                reset_hard_drop()
            return
        }
    }
}

function reset_soft_drop()
{
    if(game.state == GameState.active)
        start_game_tick()
    clearInterval(key_intervals.soft_drop)
    key_states.soft_drop = false
}

function reset_move_left()
{
    clearInterval(key_intervals.move_left)
    key_states.move_left = false
}

function reset_move_right()
{
    clearInterval(key_intervals.move_right)
    key_states.move_right = false
}

function reset_rotate()
{
    key_states.rotate = false
}

function reset_hard_drop()
{
    if(game.state == GameState.active)
        start_game_tick()
    clearInterval(key_intervals.soft_drop)
    key_states.hard_drop = false
}

function try_to_pause()
{
    if(key_states.pause == false)
    {
        if(game.state == GameState.active)
            pause()
        else if(game.state == GameState.paused)
            resume()
        key_states.pause = true
    }
}

function try_to_restart()
{
    if(key_states.restart == false)
    {
        really_restart()
        key_states.restart = true
    }
}

function try_to_soft_drop()
{
    if(key_states.soft_drop == false)
    {
        if(game.state == GameState.active)
        {
            stop_game_tick()
            game.move_down()
            game.add_score(game.score_counter.count_score_for_soft_drop())
            key_intervals.soft_drop = setInterval(soft_drop_tick, data.delays.soft_drop)
        }
        key_states.soft_drop = true
    }
}

function try_to_hard_drop()
{
    if(key_states.hard_drop == false)
    {
        if(game.state == GameState.active)
        {
            game.try_to_hard_drop()
            key_states.soft_drop = false
        }  
        key_states.hard_drop = true
    }
}

const soft_drop_tick = () =>
{
    if(game.state == GameState.active)
    {
        game.move_down()
        game.add_score(game.score_counter.count_score_for_soft_drop())
    }
    else
        clearInterval(key_intervals.soft_drop)
}

const move_to_left = () =>
{
    if(game.state == GameState.active)
        game.move_x(-1)
    else
        clearInterval(key_intervals.move_left)
}

const move_to_right = () =>
{
    if(game.state == GameState.active)
        game.move_x(1)
    else
        clearInterval(key_intervals.move_right)
}

function try_to_move_left()
{
    if(key_states.move_left == false)
    {
        clearInterval(key_intervals.move_right)
        move_to_left()
        key_intervals.move_left = setInterval(move_to_left, data.delays.move)
        key_states.move_left = true
    }
}

function try_to_move_right()
{
    if(key_states.move_right == false)
    {
        clearInterval(key_intervals.move_left)
        move_to_right()
        key_intervals.move_right = setInterval(move_to_right, data.delays.move)
        key_states.move_right = true
    }
}

function try_to_rotate()
{
    if(key_states.rotate == false && game.state == GameState.active)
        game.try_to_rotate()
    key_states.rotate = true    
}