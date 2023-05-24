/*----------------------------------------------------------------------------------------------------*/

/*                                          SCORE COUNTER                                             */

/*----------------------------------------------------------------------------------------------------*/

class ScoreCounter
{
    constructor()
    {
        this.prev_lines = 0
        this.recursive_gravity_multiplier = false
    }

    reset()
    {
        this.prev_lines = 0
        this.recursive_gravity_multiplier = false
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
        if(lines.length > 0)
        {
            score = this.count_score_for_making_lines(lines.length + this.prev_lines)
            if(this.recursive_gravity_multiplier == true)
                score *= data.score.recursive_gravity_multiplier
            score -= this.count_score_for_making_lines(this.prev_lines)
            score += this.count_score_for_multipliers(lines)
            this.prev_lines = lines.length
        }
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
        return data.score.compressing
    }

    count_score_for_burning(quantity)
    {
        return quantity * data.score.burning
    }

    count_score_for_melting(quantity)
    {
        return quantity * data.score.melting
    }
}