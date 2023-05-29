/*----------------------------------------------------------------------------------------------------*/

/*                                          SCORE COUNTER                                             */

/*----------------------------------------------------------------------------------------------------*/

class ScoreCounter
{
    constructor(ui)
    {
        this.cur_lines_number = 0
        this.cur_compressing_score = 0
        this.ui = ui
    }

    reset()
    {
        this.cur_lines_number = 0
        this.compressing = 0
    }

    count_score_for_making_lines(lines)
    {
        let score = 0
        if(lines > 0)
        {
            score = data.score.first_line
            for(let i = 0; i < lines; ++i)
                score *= data.score.line_combo_multiplier
        }
        return score
    }

    count_score_for_multipliers(lines)
    {
        let score_for_all_lines = 0
        for(let l = 0; l < lines.length; ++l)
        {
            let score_for_line = 0
            let line = lines[l]
            for(let i = 0; i < line.length; ++i)
            {
                let pixel = line[i]
                if(pixel.content > 0 && pixel.modifier != ModifierType.ice
                    && pixel.modifier != ModifierType.fire)
                {
                    if(score_for_line == 0)
                        score_for_line = pixel.content
                    else
                        score_for_line *= pixel.content
                }
            }
            score_for_all_lines += score_for_line
        }
        return score_for_all_lines
    }
    
    count_score_for_lines(lines)
    {
        let score = 0
        let all_lines_number = lines.length + this.cur_lines_number
        score = this.count_score_for_making_lines(all_lines_number)
        this.ui.add_combo_message("line", score, all_lines_number)
        score -= this.count_score_for_making_lines(this.cur_lines_number)
        let multipliers_score = this.count_score_for_multipliers(lines)
        score += multipliers_score
        if(multipliers_score > 0)
            this.ui.add_combo_message("multipliers", multipliers_score)
        this.cur_lines_number = lines.length
        return score
    }

    count_score_for_soft_drop()
    {
        return data.score.soft_drop
    }

    count_score_for_hard_drop(distance)
    {
        return distance * data.score.hard_drop
    }

    count_score_for_compress()
    {
        let score = data.score.compressing
        this.cur_compressing_score += score
        this.ui.add_combo_message("compressing", this.cur_compressing_score)
        return score
    }

    count_score_for_burning(quantity)
    {
        let score = quantity * data.score.burning
        this.ui.add_combo_message("burning", score)
        return score
    }

    count_score_for_melting(quantity)
    {
        let score = quantity * data.score.melting
        this.ui.add_combo_message("melting", score)
        return score
    }

    count_score_for_recursive_gravity()
    {
        let score = data.score.recursive_gravity
        this.ui.add_combo_message("recursive_gravity", score)
        return score
    }
}