/*----------------------------------------------------------------------------------------------------*/

/*                                          GAME TIMER                                                */

/*----------------------------------------------------------------------------------------------------*/

class GameTimer
{
    constructor()
    {
        this.game_tick_interval = 0
        this.tick_delay = 0
    }
    
    start()
    {
        this.stop()
        this.game_tick_interval = setInterval(function () {
            game.try_to_move_down()
        }, this.tick_delay)
    }

    stop()
    {
        clearInterval(this.game_tick_interval)
    }

    restart()
    {
        this.stop()
        this.start()
    }

    decrease_delay()
    {
        this.tick_delay -= data.delays.tick_step
        if(this.tick_delay < data.delays.min_tick)
            this.tick_delay = data.delays.min_tick
    }
}