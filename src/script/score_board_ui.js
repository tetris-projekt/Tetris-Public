/*----------------------------------------------------------------------------------------------------*/

/*                                         SCORE BOARD UI                                             */

/*----------------------------------------------------------------------------------------------------*/

class ScoreBoardUI
{
    make_header()
    {
        let cols = new Array()
        cols.push(img_to_div_tag(get_src("game", "score"), "header") + "<br>\n")
        cols.push(img_to_div_tag(get_src("game", "lines"), "header") + "<br>\n")
        cols.push(img_to_div_tag(get_src("game_mode", "game_mode"), "header") + "<br>\n")
        cols.push(img_to_div_tag(get_src("speed", "speed"), "header") + "<br>\n")
        cols.push(img_to_div_tag(get_src("best_scores", "date"), "header") + "<br>\n")
        return cols
    }

    create_clear_button()
    {
        const display = get_id("clear-box")
        display.innerHTML = `<img src="${get_src("best_scores", "clear_best_scores")}" id="clear"
        class="button" onclick="score_board.clear()"></img>` + html_creator.line("short")
        disable_dragging_imgs(display)
    }

    remove_clear_button()
    {
        get_id("clear-box").innerHTML = ""
    }

    show_score_board(score_board)
    {
        let cols = this.make_header()
        for(let i = 0; i < score_board.length; ++i)
        {
            let cur_score = score_board[i]
            let score = cur_score.score
            let lines = cur_score.lines
            let game_mode = data.GameModeToImgs[cur_score.game_mode]
            let speed = data.GameSpeedToImgs[cur_score.speed]
            let date = cur_score.date
            cols[0] += number_to_div_tag(score) + "<br>\n"
            cols[1] += number_to_div_tag(lines) + "<br>\n"
            cols[2] += img_to_div_tag(game_mode, "value") + "<br>\n"
            cols[3] += img_to_div_tag(speed, "value") + "<br>\n"
            cols[4] += str_number_to_div_tag(date) + "<br>\n"
        }
        const display = get_id("score-board")
        for(let i = 0 ; i < cols.length; ++i)
        {
            display.innerHTML += to_div_tag(cols[i], "column")
        }
        disable_dragging_imgs(display)
        this.create_clear_button()
    }

    show_empty()
    {
        const display = get_id("score-board")
        display.innerHTML = to_img_tag(get_src("best_scores", "empty"), "empty")
        disable_dragging_imgs(display)
        this.remove_clear_button()
    }
}