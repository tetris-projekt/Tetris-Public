/*----------------------------------------------------------------------------------------------------*/

/*                                          SCORE COUNTER                                             */

/*----------------------------------------------------------------------------------------------------*/

class ScoreCounter
{
    constructor(bonus_display)
    {
        this.lines = new Array()
        this.compressing = 0
        this.recursive_gravity = 0
        this.bonus_display = bonus_display
    }

    sumup()
    {
        const score_for_lines = this.count_score_for_lines(this.lines.length)
        const score_for_multipliers = this.count_score_for_multipliers(this.lines)
        const score_for_compressing = this.count_score_for_compressing(this.compressing)
        const score_for_gravity = this.count_score_for_recursive_gravity(this.recursive_gravity)
        const sum = score_for_lines + score_for_multipliers + score_for_compressing + score_for_gravity
        if(this.lines.length > 0)
            this.bonus_display.try_to_add_message(data.LinesNumberToName[this.lines.length], score_for_lines)
        if(this.recursive_gravity > 0)
            this.bonus_display.try_to_add_message("recursive_gravity", score_for_gravity)
        if(score_for_multipliers > 0)
            this.bonus_display.try_to_add_message("multipliers", score_for_multipliers)
        if(this.compressing > 0)
            this.bonus_display.try_to_add_message("compressing", score_for_compressing)
        this.lines = new Array()
        this.compressing = 0
        this.recursive_gravity = 0
        return sum
    }

    count_lines(lines)
    {
        this.lines = this.lines.concat(lines)
    }

    count_compressing()
    {
        ++this.compressing
    }

    count_gravity()
    {
        ++this.recursive_gravity
    }

    count_score_for_lines(lines)
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

    count_score_for_compressing(compressing)
    {
        return compressing * data.score.compressing
    }

    count_score_for_recursive_gravity(recursive)
    {
        return recursive * data.score.recursive_gravity
    }

    count_score_for_soft_drop()
    {
        return data.score.soft_drop
    }

    count_score_for_hard_drop(distance)
    {
        return distance * data.score.hard_drop
    }

    count_score_for_burning(quantity)
    {
        let score = quantity * data.score.burning
        this.bonus_display.try_to_add_message("burning", score)
        return score
    }

    count_score_for_melting(quantity)
    {
        let score = quantity * data.score.melting
        this.bonus_display.try_to_add_message("melting", score)
        return score
    }
}