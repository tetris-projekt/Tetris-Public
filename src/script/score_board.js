/*----------------------------------------------------------------------------------------------------*/

/*                                          SCORE BOARD                                               */

/*----------------------------------------------------------------------------------------------------*/

class ScoreBoard
{
    constructor(ui)
    {
        this.ui = ui
        this.score_board = ScoreBoard.read_scoreboard()
        if(this.score_board.length > 0)
            this.ui.show_score_board(this.score_board)
        else
            this.ui.show_empty()
    }

    static check_property(property_name, value)
    {
        if(isIn(property_name, ["score", "lines"]))
            return (typeof(value) == "number" && value >= 0)
        if(property_name == "game_mode")
            return (typeof(value) == "number" && value >= 0 && value < Object.keys(GameMode).length)
        if(property_name == "speed")
            return (typeof(value) == "number" && value >= 0 && value < Object.keys(GameSpeed).length)
        if(property_name == "date")
        {
            if(typeof(value) != "string")
                return false
            else
            {
                for(let i = 0; i < value.length; ++i)
                {
                    if(!isIn(value[i], data.value_chars))
                        return false
                }
                return true
            }
        }
    }

    static check_score(score)
    {
        if(typeof(score) != "object" || score == null)
            return false
        for(let j = 0; j < data.ScorePropertyNames.length; ++j)
        {
            let property_name = data.ScorePropertyNames[j]
            if(ScoreBoard.check_property(property_name, score[property_name]) == false)
                return false
        }
        return true
    }

    static read_scoreboard()
    {
        score_board = new Array()
        let score_board_storage = storage_get("score_board")
        if(typeof(score_board_storage) == "object" && score_board_storage != null && score_board_storage.length > 0)
        {
            for(let i = 0; i < score_board_storage.length; ++i)
            {
                let score = score_board_storage[i]
                if(ScoreBoard.check_score(score) == true)
                    score_board.push(score)
            }
        }
        return score_board
    }

    static get_cur_date()
    {
        let now = new Date()
        let day = setw(now.getDate(), 2)
        let month = setw(now.getMonth() + 1, 2)
        let year = now.getFullYear()
        let date = day + data.date_separator + month + data.date_separator + year
        return date
    }

    static find_key(score_board, score)
    {
        for(let i = 0; i < score_board.length; ++i)
        {
            if(score >= score_board[i]["score"])
                return i
        }
        return score_board.length
    }

    static make_gap(score_board, index)
    {
        if(index == score_board.length)
            return
        for(let i = score_board.length - 1; i >= index; --i)
            score_board[i + 1] = score_board[i]
    }

    static add(score, lines, game_mode, speed)
    {
        if(score == 0)
            return
        score_board = ScoreBoard.read_scoreboard()
        let new_score = 
        {
            "score": score,
            "lines": lines,
            "game_mode": game_mode,
            "speed": speed,
            "date": this.get_cur_date(),
        }
        let index = ScoreBoard.find_key(score_board, score)
        ScoreBoard.make_gap(score_board, index)
        score_board[index] = new_score
        if(score_board.length > data.max_score_board_length)
            score_board.pop()
        ScoreBoard.save(score_board)
    }

    clear()
    {
        this.score_board = new Array()
        ScoreBoard.save(this.score_board)       
        this.ui.show_empty()
        control.set_window(WindowName.best_scores)
        try_to_play_sound("clear_scores")
    }

    static save(score_board)
    {
        storage_set("score_board", score_board)
    }
}