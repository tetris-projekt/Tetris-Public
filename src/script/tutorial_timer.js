/*----------------------------------------------------------------------------------------------------*/

/*                                        TUTORIAL TIMER                                              */

/*----------------------------------------------------------------------------------------------------*/

class TutorialTimer
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
            tutorial.try_to_move_down()
        }, this.tick_delay)
    }

    stop()
    {
        clearInterval(this.game_tick_interval)
    }
}