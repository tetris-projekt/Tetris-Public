/*----------------------------------------------------------------------------------------------------*/

/*                                             GAME UI                                                */

/*----------------------------------------------------------------------------------------------------*/

class GameUI
{
    create_digits(id_prefix)
    {
        let html = ""
        for(let i = 0; i < data.digits_in_values; ++i)
            html += `<img id="${id_prefix}_d${i}" class="digit"></img>\n`
        main_ui.get_first_from_class(`value ${id_prefix}`).innerHTML = html
    }

    create_board(id_prefix, reverse)
    {
        let html = ""
        if(reverse == false)
        {
            for(let y = 0; y < data.board_sizes[id_prefix].height; ++y)
            {
                for(let x = 0; x < data.board_sizes[id_prefix].width; ++x)
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
        main_ui.get_id(id_prefix).innerHTML += html
    }

    refresh_controls(reverse)
    {
        if(reverse == true)
            main_ui.get_id("controls").classList.add("reverse")
    }

    refresh_speed(speed)
    {
        main_ui.get_id("speed-img-value").src = data.GameSpeedToImgs[speed]
    }

    refresh_game_mode(game_mode)
    {
        main_ui.get_id("game-mode-img-value").src = data.GameModeToImgs[game_mode]
    }  

    refresh_board(board)
    {
        this.refresh_any_board(board, "board")
    }

    refresh_preview_board(preview_board)
    {
        this.refresh_any_board(preview_board, "preview")
    }

    refresh_any_board(board, id_prefix)
    {
        for(let y = 0; y < board.height; ++y)
        {
            for(let x = 0; x < board.width; ++x)
            {
                const screen_pixel = main_ui.get_id(`${id_prefix + y};${x}`)
                let board_pixel = board.get_pixel(x, y)
                screen_pixel.className = "pixel"
                if(board_pixel.modifier != null)
                    screen_pixel.classList.add(data.ModifierTypeToClass[board_pixel.modifier])
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

    get_max_value()
    {
        let score = 0;
        for(let i = 0; i < data.digits_in_values; ++i)
        {
            score *= 10
            score += 9
        }
        return score
    }

    refresh_any_value(id_prefix, value)
    {
        let digits = main_ui.slice_number(value)
        let number_of_digits = digits.length
        if(number_of_digits > data.digits_in_values)
        {
            this.refresh_any_value(id_prefix, this.get_max_value())
        }
        else
        {
            for(let i = 0; i < number_of_digits; ++i)
                main_ui.get_id(id_prefix + i).src = get_src("digits", digits[i])
        }
    }

    refresh_score(score)
    {
        this.refresh_any_value("score_d", score)
    }
    
    refresh_lines(lines)
    {
        this.refresh_any_value("lines_d", lines)
    }

    refresh_button(button)
    {
        main_ui.get_id("game-button").src = button
    }
}