/*----------------------------------------------------------------------------------------------------*/

/*                                          SCORE BOARD                                               */

/*----------------------------------------------------------------------------------------------------*/

class ScoreBoard
{
    constructor(ui)
    {
        this.ui = ui
        this.read()
    }

    check_property(property_name, value)
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

    check_score(score)
    {
        if(typeof(score) != "object" || score == null)
            return false
        for(let j = 0; j < data.ScorePropertyNames.length; ++j)
        {
            let property_name = data.ScorePropertyNames[j]
            if(this.check_property(property_name, score[property_name]) == false)
                return false
        }
        return true
    }

    read()
    {
        this.score_board = new Array()
        let score_board_storage = storage_get("score_board")
        if(typeof(score_board_storage) == "object" && score_board_storage != null && score_board_storage.length > 0)
        {
            for(let i = 0; i < score_board_storage.length; ++i)
            {
                let score = score_board_storage[i]
                if(this.check_score(score) == true)
                    this.score_board.push(score)
            }
        } 
    }

    get_cur_date()
    {
        let now = new Date()
        let day = setw(now.getDate(), 2)
        let month = setw(now.getMonth() + 1, 2)
        let year = now.getFullYear()
        let date = day + data.date_separator + month + data.date_separator + year
        return date
    }

    find_key(score)
    {
        if(this.score_board.length == 0)
            return 0
        for(let i = 0; i < this.score_board.length; ++i)
        {
            if(score >= this.score_board[i]["score"])
                return i
        }
        return this.score_board.length
    }

    make_gap(index)
    {
        if(index == this.score_board.length)
            return
        for(let i = this.score_board.length - 1; i >= index; --i)
            this.score_board[i + 1] = this.score_board[i]
    }

    add(score, lines, game_mode, speed)
    {
        let new_score = 
        {
            "score": score,
            "lines": lines,
            "game_mode": game_mode,
            "speed": speed,
            "date": this.get_cur_date(),
        }
        let index = this.find_key(score)
        this.make_gap(index)
        this.score_board[index] = new_score
        if(this.score_board.length > data.max_score_board_length)
            this.score_board.pop()
        this.save()
    }

    show()
    {
        if(this.score_board.length > 0)
            this.ui.show_score_board(this.score_board)
        else
            this.ui.show_empty()
    }

    clear()
    {
        this.score_board = new Array()
        this.save()       
        this.show()
        try_to_play_sound("clear_scores")
    }

    save()
    {
        storage_set("score_board", this.score_board)
    }
}