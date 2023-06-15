/*----------------------------------------------------------------------------------------------------*/

/*                                             MENU UI                                                */

/*----------------------------------------------------------------------------------------------------*/

class MenuUI
{
    refresh_speed(speed)
    {
        get_first_from_class("speed display").innerHTML = `<img src="${data.GameSpeedToImgs[speed]}"</img>`
    }

    refresh_game_mode(game_mode)
    {
        get_first_from_class("game-mode display").innerHTML = `<img src="${data.GameModeToImgs[game_mode]}"</img>`
        disable_animation("button editor", game_mode != GameMode.custom)
    }
}