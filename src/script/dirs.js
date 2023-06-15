/*----------------------------------------------------------------------------------------------------*/

/*                                              DIRS                                                  */

/*----------------------------------------------------------------------------------------------------*/

function get_src(dir, element, parent_dir = "img")
{
    return "src/" + parent_dir + "/" + dir + "/" + dirs[parent_dir][dir][element]
}

const dirs = 
{
    audio:
    {
        music:
        {
            classic: "classic.ogg",
            modified: "classic.ogg",
            extended: "classic.ogg",
            extreme: "classic.ogg",
            custom: "classic.ogg",
            normal: ".sus/secret.ogg",
        },
        sounds:
        {
            add: "add.ogg",
            back: "back.ogg",
            burn: "burn.ogg",
            compress: "compress.ogg",
            clear_scores: "clear_scores.ogg",
            bonus_message: "bonus_message.ogg",
            delete: "delete.ogg",
            end: "end.ogg",
            froze: "froze.ogg",
            glue: "glue.ogg",
            hard_drop: "hard_drop.ogg",
            lines: "lines.ogg",
            normal_click: "normal_click.ogg",
            normal_mode: "normal_mode.ogg",
            no_rotate: "no_rotate.ogg",
            open: "open.ogg",
            pause: "pause.ogg",
            place: "place.ogg",
            really: "really.ogg",
            resume: "resume.ogg",
            rotate: "rotate.ogg",
            select: "select.ogg",
            selector: "selector.ogg",
            set_on_fire: "set_on_fire.ogg",
            start: "start.ogg",
            steel: "steel.ogg",
            stick: "stick.ogg",
            toggle: "toggle.ogg",
            toggle_pixel: "toggle_pixel.ogg"
        },
    },
    img:
    {
        best_scores: 
        {
            best_scores: "best_scores.png",
            clear_best_scores: "clear_best_scores.png",
            date: "date.png",
            empty: "empty.png",
            
        },

        bonus_display:
        {
            burning: "burning.png",
            compressing: "compressing.png",
            game_over: "game_over.png",
            melting: "melting.png",
            multipliers: "multipliers.png",
            recursive_gravity: "recursive_gravity.png",
            single: "single.png",
            double: "double.png",
            triple: "triple.png",
            tetris: "tetris.png",
            pentatris: "pentatris.png",
            hexatris: "hexatris.png",
            heptatris: "heptatris.png",
            octotris: "octotris.png",
            enneatris: "enneatris.png",
            dekatris: "dekatris.png",
            impossibletris: "impossibletris.png",
        },

        brick_editor:
        {
            add: "add.png",
            brick_editor: "brick_editor.png",
            cross: "cross.png",
            delete: "del.png",
            move_center: "move_center.png",
            multipliers: "multipliers.png",
            p1_5: "p1_5.png",
            p4: "p4.png",
        },

        controls:
        {
            hard_drop: "hard_drop.png",
            move_left: "move_left.png",
            move_right: "move_right.png",
            rotate: "rotate.png",
        },
        
        digits:
        {
            "0": "num_0.png",
            "1": "num_1.png",
            "2": "num_2.png",
            "3": "num_3.png",
            "4": "num_4.png",
            "5": "num_5.png",
            "6": "num_6.png",
            "7": "num_7.png",
            "8": "num_8.png",
            "9": "num_9.png",
            "-": "dash.png",
            "+": "plus.png",
            "/": "slash.png",
            " ": "space.png",
        },

        game:
        {
            pixel_fire: "pixels/fire.png",
            pixel_glue: "pixels/glue.png",
            pixel_ice: "pixels/ice.png",
            pixel_steel: "pixels/steel.png",
            lines: "lines.png",
            next: "next.png",
            pause: "pause.png",
            score: "score.png",
            menu: "menu.png",
        },

        game_mode:
        {
            classic: "classic.png",
            custom: "custom.png",
            modified: "modified.png",
            extended: "extended.png",
            extreme: "extreme.png",
            game_mode: "game_mode.png",
            secret: ".sus/secret.png",
        },

        game_over:
        {
            game_over: "game_over.png",
        },

        how_to_play:
        {
            back: "back.png",
            how_to_play: "how_to_play.png",
        },

        main:
        {
            baner: "baner.png",
            checkbox_off: "checkbox_off.png",
            checkbox_on: "checkbox_on.png",
            cursor: "cursor.png",
            footer: "footer.png",
            left_arrow: "left_arrow.png",
            line: "line.png",
            right_arrow: "right_arrow.png",
        },

        menu:
        {
            play: "play.png",
        },

        modifier_type:
        {
            fire: "fire.png",
            glue: "glue.png",
            ice: "ice.png",
            steel: "steel.png",
        },

        quit:
        {
            cancel: "cancel.png",
            quit: "quit.png",
            really_quit: "really_quit.png",
        },

        pause:
        {
            game_paused: "game_paused.png",
            restart: "restart.png",
            resume: "resume.png",
        },

        restart:
        {
            cancel: "cancel.png",
            really_restart: "really_restart.png",
            restart: "restart.png",
        },

        settings:
        {
            auto_pause: "auto_pause.png",
            bonus_display: "bonus_display.png",
            ghost: "ghost.png",
            music: "music.png",
            save: "save.png",
            settings: "settings.png",
            sounds: "sounds.png",
        },

        speed:
        {
            fast: "fast.png",
            normal: "normal.png",
            slow: "slow.png",
            speed: "speed.png",
        },

        tutorial_pages:
        {
            controls: "controls.png",
            goal: "goal.png",
            end: "end.png",
            recursive_gravity: "recursive_gravity.png",
            game_modes: "game_modes.png",
            modifiers: "modifiers.png",
        },
    }
}