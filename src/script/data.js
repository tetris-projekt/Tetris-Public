/*----------------------------------------------------------------------------------------------------*/

/*                                               DATA                                                 */

/*----------------------------------------------------------------------------------------------------*/

const incorrect_value = property => `property "${property}" in config has incorrect value`

function get_config_number(property, min, max, default_value)
{
    let value = config[property]
    if(value >= min && value <= max)
        return value
    else
    {
        console.log(incorrect_value(property))
        return default_value
    }
}

function get_config_bool(property, default_value)
{
    let value = config[property]
    if(isIn(value, [true, false]))
        return value
    else
    {
        console.log(incorrect_value(property))
        return default_value
    }
}

const data = 
{
    date_separator: "-",
    page_number_separator: "/",
    brick_index_separator: "/",
    value_chars: "0123456789-/",
    number_of_tutorial_pages: 5,
    max_score_board_length: 10,
    digits_in_values: 10,
    max_custom_bricks_number: 99,
    normal_number: 8,

    transparent_windows: ["pause", "really-quit", "really-restart", "end-screen"],

    keys:
    {
        move_left: "ArrowLeft",
        move_right: "ArrowRight",
        rotate: "ArrowUp",
        soft_drop: "ArrowDown",
        hard_drop: " ",
        pause: "Escape",
        restart: "r",
    },
    
    board_sizes:
    {
        "board": {width: 10, height: 20},
        "preview": {width: 7, height: 5,},
        "edit": {width: 7, height: 5,},
    },

    colors: ["light-blue", "blue", "pink", "green", "yellow", "orange", "red"],
    
    delays:
    {
        move: get_config_number("move_delay", 50, 200, 100),
        soft_drop: get_config_number("soft_drop_delay", 40, 60, 50),
        tick_step: get_config_number("tick_delay_step", 1, 20, 5),
        min_tick: get_config_number("min_tick_delay", 100, 300, 150),
    },

    score:
    {
        first_line: get_config_number("score_for_first_line", 0, 1000, 250),
        line_combo_multiplier: get_config_number("line_combo_multiplier", 2, 10, 2),
        recursive_gravity_multiplier: get_config_number("recursive_gravity_multiplier", 2, 10, 2),
        soft_drop: get_config_number("score_for_soft_drop", 0, 1000, 1),
        hard_drop: get_config_number("score_for_hard_drop", 0, 1000, 2),
        compressing: get_config_number("score_for_compressing", 0, 1000, 50),
        burning: get_config_number("score_for_burning", 0, 1000, 5),
        melting: get_config_number("score_for_melting", 0, 1000, 100),
    },

    ScorePropertyNames: ["score", "lines", "game_mode", "speed", "date"],

    SettingsPropertyNames: ["sounds","music","ghost"],
    
    SettingsPropertyNamesToImgs:
    {
        "sounds": get_src("settings", "sounds"),
        "music": get_src("settings", "music"),
        "ghost": get_src("settings", "ghost"),
    },

    default_settings_properties:
    {
        "sounds": get_config_bool("sounds", true),
        "music": get_config_bool("music", true),
        "ghost": get_config_bool("ghost", true),
    },
    
    BrickTypeToImgs:
    {
        0: get_src("brick_type", "custom"),
        1: get_src("brick_type", "p1"),
        2: get_src("brick_type", "p2"),
        3: get_src("brick_type", "p3"),
        4: get_src("brick_type", "p4"),
        5: get_src("brick_type", "p5"),
    },

    default_editor_brick_types:
    {
        0: get_config_bool("custom", true),
        1: get_config_bool("all_1px", false),
        2: get_config_bool("all_2px", false),
        3: get_config_bool("all_3px", false),
        4: get_config_bool("all_4px", true),
        5: get_config_bool("all_5px", false),
    },

    default_modified: get_config_bool("modified", false),

    default_move_center: get_config_bool("move_center", false),
    
    GameSpeedToImgs: 
    {
        0: get_src("speed", "slow"),
        1: get_src("speed", "normal"),
        2: get_src("speed", "fast"),
    },

    GameSpeedToDelays: 
    {
        0: get_config_number("start_delay_easy", 900, 1100, 1000),
        1: get_config_number("start_delay_medium", 700, 900, 800),
        2: get_config_number("start_delay_hard", 500, 700, 600),
    },

    GameModeToImgs:
    {
        0: get_src("game_mode", "classic"),
        1: get_src("game_mode", "modified"),
        2: get_src("game_mode", "extended"),
        3: get_src("game_mode", "extreme"),
        4: get_src("game_mode", "custom"),
        5: get_src("game_mode", "secret"),
    },

    GameModeToMusic:
    {
        0: get_src("music", "classic", "audio"),
        1: get_src("music", "modified", "audio"),
        2: get_src("music", "extended", "audio"),
        3: get_src("music", "extreme", "audio"),
        4: get_src("music", "custom", "audio"),
        5: get_src("music", "normal", "audio"),
    },

    GameModeToBrickTypes:
    {
        0: [BrickType.p4],
        1: [BrickType.p4],
        2: [BrickType.p1, BrickType.p2, BrickType.p3, BrickType.p4, BrickType.p5],
        3: [BrickType.p1, BrickType.p2, BrickType.p3, BrickType.p4, BrickType.p5],
        4: null,
        5: [BrickType.p4],
    },

    GameModeToModified:
    {
        0: false,
        1: true,
        2: false,
        3: true,
        4: null,
        5: false,
    },

    ModifierTypeToClass:
    {
        1: "ice",
        2: "fire",
        3: "steel",
        4: "glue",
    },

    ModifierTypeToSoundNames:
    {
        1: "froze",
        2: "set_on_fire",
        3: "steel",
        4: "glue",
    },

    random_range: 1001,
    multiplier_chance: get_config_number("multiplier", 0, 1000, 0),
    max_multiplier: get_config_number("max_multiplier", 2, 9, 2),
    chance_to_modify: get_config_number("modifier", 0, 1000, 0),
    
    modifiers_chance: 
    {
        1: get_config_number("frozen", 0, 1000, 0),
        2: get_config_number("burning", 0, 1000, 0),
        3: get_config_number("steel", 0, 1000, 0),
        4: get_config_number("glue", 0, 1000, 0),
    },
    
    bricks:
    {
        0:
        {
            chance: get_config_number("bricks_custom", 0, 1000, 0),
            bricks: null,
        },
        1:
        {
            chance: get_config_number("bricks_1px", 0, 1000, 0),
            bricks:
            [
                [[0, 0], false],
            ]
        },
        2:
        {
            chance: get_config_number("bricks_2px", 0, 1000, 0),
            bricks:
            [
                [[0, 0], [1, 0], false],
            ]
        },
        3:
        {
            chance: get_config_number("bricks_3px", 0, 1000, 0),
            bricks:
            [
                [[0, 0], [1, 0], [0, 1], false],
                [[-1, 0], [0, 0], [1, 0], false],
            ]
        },
        4:
        {
            chance: get_config_number("bricks_4px", 0, 1000, 0),
            bricks:
            [
                [[-1, 0], [0, 0], [1, 0], [2, 0], true],
                [[0, 0], [1, 0], [0, 1], [1, 1], true],
                [[-1, 0], [0, 0], [0, 1], [1, 1], false],
                [[0, 0], [1, 0], [-1, 1], [0, 1], false],
                [[-1, 0], [0, 0], [1, 0], [-1, 1], false],
                [[-1, 0], [0, 0], [1, 0], [1, 1], false],
                [[-1, 0], [0, 0], [1, 0], [0, 1], false],
            ]
        },
        5:
        {
            chance: get_config_number("bricks_5px", 0, 1000, 0),
            bricks:
            [
                [[-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1], false],
                [[1, -1], [-1, 0], [0, 0], [1, 0], [0, 1], false],
                [[-1, -1], [-1, 0], [0, 0], [1, 0], [0, 1], false],
                [[0, 0], [1, 0], [-1, 1], [0, 1], [1, 1], true],
                [[-1, 0], [0, 0], [1, 0], [0, 1], [1, 1], true],
                [[1, -1], [1, 0], [-1, 1], [0, 1], [1, 1], false],
                [[-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], false],
                [[-1, 0], [0, 0], [1, 0], [2, 0], [-1, 1], true],
                [[-1, 0], [0, 0], [1, 0], [2, 0], [2, 1], true],
                [[0, -1], [-1, 0], [0, 0], [1, 0], [0, 1], false],
                [[1, -1], [-1, 0], [0, 0], [1, 0], [-1, 1], false],
                [[0, -1], [1, -1], [0, 0], [-1, 1], [0, 1], false],
                [[1, -1], [0, 0], [1, 0], [-1, 1], [0, 1], false],
                [[1, -1], [-1, 0], [0, 0], [1, 0], [1, 1], false],
                [[0, 0], [1, 0], [2, 0], [-1, 1], [0, 1], true],
                [[-1, 0], [0, 0], [1, 0], [1, 1], [2, 1], true],
            ]
        },
    },

    default_brick_type: BrickType.p4,
}