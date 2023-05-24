/*----------------------------------------------------------------------------------------------------*/

/*                                         SCORE BOARD UI                                             */

/*----------------------------------------------------------------------------------------------------*/

class ScoreBoardUI
{
    make_header()
    {
        let cols = new Array()
        cols.push(main_ui.img_to_div_tag(get_src("game", "score"), "header") + "<br>\n")
        cols.push(main_ui.img_to_div_tag(get_src("game", "lines"), "header") + "<br>\n")
        cols.push(main_ui.img_to_div_tag(get_src("game_mode", "game_mode"), "header") + "<br>\n")
        cols.push(main_ui.img_to_div_tag(get_src("speed", "speed"), "header") + "<br>\n")
        cols.push(main_ui.img_to_div_tag(get_src("best_scores", "date"), "header") + "<br>\n")
        return cols
    }

    create_clear_button()
    {
        const display = main_ui.get_id("clear-box")
        display.innerHTML = `<img src="${get_src("best_scores", "clear_best_scores")}" id="clear"
        class="button" onclick="score_board.clear()"></img>` + line("short")
        main_ui.turn_off_dragging_imgs(display)
    }

    remove_clear_button()
    {
        main_ui.get_id("clear-box").innerHTML = ""
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
            cols[0] += main_ui.number_to_div_tag(score) + "<br>\n"
            cols[1] += main_ui.number_to_div_tag(lines) + "<br>\n"
            cols[2] += main_ui.img_to_div_tag(game_mode, "value") + "<br>\n"
            cols[3] += main_ui.img_to_div_tag(speed, "value") + "<br>\n"
            cols[4] += main_ui.str_number_to_div_tag(date) + "<br>\n"
        }
        const display = main_ui.get_id("score-board")
        for(let i = 0 ; i < cols.length; ++i)
        {
            display.innerHTML += main_ui.to_div_tag(cols[i], "column")
        }
        main_ui.turn_off_dragging_imgs(display)
        this.create_clear_button()
    }

    show_empty()
    {
        const display = main_ui.get_id("score-board")
        display.innerHTML = main_ui.to_img_tag(get_src("best_scores", "empty"), "empty")
        main_ui.turn_off_dragging_imgs(display)
        this.remove_clear_button()
    }
}