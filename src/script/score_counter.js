/*----------------------------------------------------------------------------------------------------*/

/*                                          SCORE COUNTER                                             */

/*----------------------------------------------------------------------------------------------------*/

class ScoreCounter
{
    constructor(ui)
    {
        this.ui = ui
        this.cur_lines_number = 0
        this.cur_compressing_score = 0
        this.bonus_display_timeout = 0
        this.displaying_bonus_messages = false
        this.bonus_messages = new Array()
    }

    reset()
    {
        this.cur_lines_number = 0
        this.cur_compressing_score = 0
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
        this.try_to_add_bonus_message(data.LinesNumberToName[all_lines_number], score)
        score -= this.count_score_for_making_lines(this.cur_lines_number)
        let multipliers_score = this.count_score_for_multipliers(lines)
        score += multipliers_score
        if(multipliers_score > 0)
            this.try_to_add_bonus_message("multipliers", multipliers_score)
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
        this.try_to_add_bonus_message("compressing", this.cur_compressing_score)
        return score
    }

    count_score_for_burning(quantity)
    {
        let score = quantity * data.score.burning
        this.try_to_add_bonus_message("burning", score)
        return score
    }

    count_score_for_melting(quantity)
    {
        let score = quantity * data.score.melting
        this.try_to_add_bonus_message("melting", score)
        return score
    }

    count_score_for_recursive_gravity()
    {
        let score = data.score.recursive_gravity
        this.try_to_add_bonus_message("recursive_gravity", score)
        return score
    }

    try_to_add_bonus_message(a_for_what, a_score = 0)
    {
        if(Settings.get_property("bonus_display") == true)
        {
            this.bonus_messages.push({for_what: a_for_what, score: a_score})
            if(this.displaying_bonus_messages == false)
                this.show_bonus_message(0)
        }
    }

    show_bonus_message(index)
    {
        const message = this.bonus_messages[index]
        this.displaying_bonus_messages = true
        let html = to_img_tag(get_src("bonus_display", message.for_what), "for-what")
        html += str_number_to_div_tag("+" + message.score + " ")
        const display = get_id("bonus-display")
        display.innerHTML = html
        disable_dragging_imgs(display)
        this.ui.show_bonus_display()
        try_to_play_sound("bonus_message")
        let self = this
        this.bonus_display_timeout = setTimeout( function() {
            self.bonus_messages.shift()
            if(self.bonus_messages.length == 0)
            {
                self.ui.hide_bonus_display()
                self.displaying_bonus_messages = false
            }
            else
            {
                self.show_bonus_message(0)
            }
        }, data.delays.bonus_display)
    }
}