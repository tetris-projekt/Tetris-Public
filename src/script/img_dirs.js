function get_src(dir, element)
{
    return "src/img/" + dir + "/" + img_dirs[dir][element]
}

const img_dirs = 
{
    best_scores: 
    {
        best_scores: "best_scores.png",
        clear_best_scores: "clear_best_scores.png",
        date: "date.png",
        empty: "empty.png",
        
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
        "/": "slash.png",
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
        modified: "modified.png",
        extended: "extended.png",
        extreme: "extreme.png",
        game_mode: "game_mode.png",
        secret: ".sus/secret.png",
    },

    how_to_play:
    {
        back: "back.png",
        how_to_play: "how_to_play.png",
        page1: "page1.png",
        page2: "page2.png",
        page3: "page3.png",
        page4: "page4.png",
        page5: "page5.png",
    },

    info:
    {
        info: "info.png",
        ok: "ok.png",
    },

    main:
    {
        baner: "baner.png",
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

    pause:
    {
        game_paused: "game_paused.png",
        restart: "restart.png",
        resume: "resume.png",
    },

    quit:
    {
        cancel: "cancel.png",
        quit: "quit.png",
        really_quit: "really_quit.png",
    },

    restart:
    {
        cancel: "cancel.png",
        really_restart: "really_restart.png",
        restart: "restart.png",
    },

    settings:
    {
        checkbox_off: "checkbox_off.png",
        checkbox_on: "checkbox_on.png",
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
}