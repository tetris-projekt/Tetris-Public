/*----------------------------------------------------------------------------------------------------*/

/*                                         TUTORIAL GAME UI                                           */

/*----------------------------------------------------------------------------------------------------*/

class TutorialGameUI
{
    try_to_play_sound(){}

    set_music(){}

    pause_music(){}

    play_music(){}

    create_digits(){}

    create_board(size, reverse)
    {
        this.create_any_board("tutorial", size, reverse)
    }
    
    create_preview_board(){}

    create_any_board(id_prefix, size, reverse)
    {
        let html = ""
        if(reverse == false)
        {
            for(let y = 0; y < size.height; ++y)
            {
                for(let x = 0; x < size.width; ++x)
                    html += `<div id="${id_prefix}${y};${x}" class="pixel"></div>\n`
            }
        }
        else
        {
            for(let y = data.board_sizes[id_prefix].height - 1; y >= 0 ; --y)
            {
                for(let x = 0; x < data.board_sizes[id_prefix].width; ++x)
                    html += `<div id="${id_prefix}${y};${x}" class="pixel"></div>\n`
            }
        }
        get_id(id_prefix).innerHTML += html
    }

    refresh_controls(){}

    refresh_speed(){}

    refresh_game_mode(){}  

    refresh_board(board)
    {
        this.refresh_any_board("tutorial", board)
    }

    refresh_preview_board(){}

    refresh_any_board(id_prefix, board)
    {
        for(let y = 0; y < board.height; ++y)
        {
            for(let x = 0; x < board.width; ++x)
            {
                const screen_pixel = get_id(`${id_prefix + y};${x}`)
                let board_pixel = board.get_pixel(x, y)
                screen_pixel.className = "pixel"
                if(board_pixel.modifier != null)
                    screen_pixel.classList.add(data.ModifierTypeToClass[board_pixel.modifier], "modified")
                else
                    screen_pixel.classList.add(board_pixel.color)
                if(board_pixel.transparent == true)
                    screen_pixel.classList.add("transparent")
                if(board_pixel.content == 0 || isIn(board_pixel.modifier, [ModifierType.ice, ModifierType.fire]))
                    screen_pixel.textContent = ""
                else
                    screen_pixel.textContent = board_pixel.content
            }
        }
    }

    refresh_score_value(){}

    refresh_lines_value(){}

    get_max_value(){}

    instant_value_refresh(){}

    calculate_step(){}

    smooth_value_refresh(){}

    refresh_value(){}

    refresh_button(){}
}