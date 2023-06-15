/*----------------------------------------------------------------------------------------------------*/

/*                                               DATA                                                 */

/*----------------------------------------------------------------------------------------------------*/

const incorrect_value = (property, min = "", max = "") => `property "${property}" in config has incorrect value (${min}${max != "" ? ("-" + max) : max})`

function get_config_number(property, min, max)
{
    let value = config[property]
    if(value >= min && value <= max)
        return value
    else
        throw new Error(incorrect_value(property, min, max))
}

function get_config_bool(property)
{
    let value = config[property]
    if(isIn(value, [true, false]))
        return value
    else
        throw new Error(incorrect_value(property, "bool"))
}

const data = 
{
    date_separator: "-",
    page_number_separator: "/",
    brick_index_separator: "/",
    value_chars: "0123456789-/",
    max_score_board_length: 10,
    digits_in_values: 10,
    max_custom_bricks_number: 99,
    normal_number: 8,
    
    transparent_windows: ["pause", "really-quit", "really-restart", "game-over"],
    
    tutorial_page_names: 
    [
        "controls",
        "goal",
        "end",
        "recursive_gravity",
        "game_modes",
        "modifiers",
    ],
    
    keys:
    {
        move_left: ["ArrowLeft", "a"],
        move_right: ["ArrowRight", "d"],
        rotate: ["ArrowUp", "w"],
        soft_drop: ["ArrowDown", "s"],
        hard_drop: [" "],
        pause: ["Escape"],
        restart: ["r"],
        select_next: ["ArrowRight", "ArrowDown"],
        select_previous: ["ArrowLeft", "ArrowUp"],
        click_selected: ["Enter", " "],
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
        move: get_config_number("move_delay", 50, 200),
        soft_drop: get_config_number("soft_drop_delay", 50, 100),
        tick_step: get_config_number("tick_delay_step", 1, 20),
        min_tick: get_config_number("min_tick_delay", 100, 300),
        value_update: get_config_number("value_update_delay", 0, 100),
        bonus_display: get_config_number("bonus_display_delay", 100, 2000),
        bonus_display_fade_out: get_config_number("bonus_display_fade_out_delay", 100, 2000),
    },

    LinesNumberToName:
    {
        1: "single",
        2: "double",
        3: "triple",
        4: "tetris",
        5: "pentatris",
        6: "hexatris",
        7: "heptatris",
        8: "octotris",
        9: "enneatris",
        10: "dekatris",
        11: "impossibletris",
        12: "impossibletris",
        13: "impossibletris",
        14: "impossibletris",
        15: "impossibletris",
        16: "impossibletris",
        17: "impossibletris",
        18: "impossibletris",
        19: "impossibletris",
        20: "impossibletris",
    },
    
    score:
    {
        first_line: get_config_number("score_for_first_line", 0, 1000),
        line_combo_multiplier: get_config_number("line_combo_multiplier", 2, 10),
        recursive_gravity: get_config_number("score_for_recursive_gravity", 0, 1000),
        soft_drop: get_config_number("score_for_soft_drop", 0, 1000),
        hard_drop: get_config_number("score_for_hard_drop", 0, 1000),
        compressing: get_config_number("score_for_compressing", 0, 1000),
        burning: get_config_number("score_for_burning", 0, 1000),
        melting: get_config_number("score_for_melting", 0, 1000),
    },
    
    ScorePropertyNames: ["score", "lines", "game_mode", "speed", "date"],
    
    SettingsPropertyNames: ["music", "sounds", "ghost", "auto_pause", "bonus_display"],
    
    SettingsPropertyNamesToImgs:
    {
        "music": get_src("settings", "music"),
        "sounds": get_src("settings", "sounds"),
        "ghost": get_src("settings", "ghost"),
        "auto_pause": get_src("settings", "auto_pause"),
        "bonus_display": get_src("settings", "bonus_display"),
    },
    
    default_settings_properties:
    {
        "sounds": get_config_bool("sounds"),
        "music": get_config_bool("music"),
        "ghost": get_config_bool("ghost"),
        "auto_pause": get_config_bool("auto_pause"),
        "bonus_display": get_config_bool("bonus_display"),
    },
    
    GameSpeedToImgs: 
    {
        [GameSpeed.slow]: get_src("speed", "slow"),
        [GameSpeed.normal]: get_src("speed", "normal"),
        [GameSpeed.fast]: get_src("speed", "fast"),
    },
    
    GameSpeedToDelays: 
    {
        [GameSpeed.slow]: get_config_number("start_delay_slow", 1000, 1300),
        [GameSpeed.normal]: get_config_number("start_delay_normal", 700, 1000),
        [GameSpeed.fast]: get_config_number("start_delay_fast", 400, 700),
    },
    
    default_speed_index: get_config_number("speed_index", 0, 2),
    
    GameModeToImgs:
    {
        [GameMode.classic]: get_src("game_mode", "classic"),
        [GameMode.modified]: get_src("game_mode", "modified"),
        [GameMode.extended]: get_src("game_mode", "extended"),
        [GameMode.extreme]: get_src("game_mode", "extreme"),
        [GameMode.custom]: get_src("game_mode", "custom"),
        [GameMode.normal]: get_src("game_mode", "secret"),
    },
    
    GameModeToMusic:
    {
        [GameMode.classic]: get_src("music", "classic", "audio"),
        [GameMode.modified]: get_src("music", "modified", "audio"),
        [GameMode.extended]: get_src("music", "extended", "audio"),
        [GameMode.extreme]: get_src("music", "extreme", "audio"),
        [GameMode.custom]: get_src("music", "custom", "audio"),
        [GameMode.normal]: get_src("music", "normal", "audio"),
    },

    GameModeToBrickTypes:
    {
        [GameMode.classic]: [BrickType.p4],
        [GameMode.modified]: [BrickType.p4],
        [GameMode.extended]: [BrickType.p1, BrickType.p2, BrickType.p3, BrickType.p4, BrickType.p5],
        [GameMode.extreme]: [BrickType.p1, BrickType.p2, BrickType.p3, BrickType.p4, BrickType.p5],
        [GameMode.custom]: null,
        [GameMode.normal]: [BrickType.p4],
    },

    GameModeToModifierTypes:
    {
        [GameMode.classic]: [],
        [GameMode.modified]: [ModifierType.fire, ModifierType.ice, ModifierType.glue, ModifierType.steel],
        [GameMode.extended]: [],
        [GameMode.extreme]: [ModifierType.fire, ModifierType.ice, ModifierType.glue, ModifierType.steel],
        [GameMode.custom]: null,
        [GameMode.normal]: [],
    },
    
    GameModeToMultipliers:
    {
        [GameMode.classic]: false,
        [GameMode.modified]: true,
        [GameMode.extended]: false,
        [GameMode.extreme]: true,
        [GameMode.custom]: null,
        [GameMode.normal]: false,
    },
    
    default_game_mode_index: get_config_number("game_mode_index", 0, 5),
    
    BrickEditorPropertyNames: ["p4", "p1_5", "multipliers"],
    
    BrickEditorPropertyNamesToImg:
    {
        "p4": get_src("brick_editor", "p4"),
        "p1_5": get_src("brick_editor", "p1_5"),
        "multipliers": get_src("brick_editor", "multipliers"),
    },

    default_brick_editor_properties:
    {
        "p4": get_config_bool("4px_bricks"),
        "p1_5": get_config_bool("1_5px_bricks"),
        "multipliers": get_config_bool("multipliers"),
    },

    default_brick_editor_modifiers:
    {
        [ModifierType.fire]: get_config_bool("fire_modifier"),
        [ModifierType.ice]: get_config_bool("ice_modifier"),
        [ModifierType.glue]: get_config_bool("glue_modifier"),
        [ModifierType.steel]: get_config_bool("steel_modifier"),
    },
    
    default_move_center: get_config_bool("move_center"),

    ModifierTypeToImgs:
    {
        [ModifierType.fire]: get_src("modifier_type", "fire"),
        [ModifierType.ice]: get_src("modifier_type", "ice"),
        [ModifierType.glue]: get_src("modifier_type", "glue"),
        [ModifierType.steel]: get_src("modifier_type", "steel"),
    },
    
    ModifierTypeToClass:
    {
        [ModifierType.fire]: "fire",
        [ModifierType.ice]: "ice",
        [ModifierType.glue]: "glue",
        [ModifierType.steel]: "steel",
    },
    
    ModifierTypeToSoundNames:
    {
        [ModifierType.fire]: "set_on_fire",
        [ModifierType.ice]: "froze",
        [ModifierType.glue]: "glue",
        [ModifierType.steel]: "steel",
    },

    random_range: 1001,
    multiplier_chance: get_config_number("multiplier", 0, 1000),
    max_multiplier: get_config_number("max_multiplier", 2, 9),
    chance_to_modify: get_config_number("modifier", 0, 1000),
    
    modifiers_chance: 
    {
        [ModifierType.ice]: get_config_number("frozen", 0, 1000),
        [ModifierType.fire]: get_config_number("burning", 0, 1000),
        [ModifierType.steel]: get_config_number("steel", 0, 1000),
        [ModifierType.glue]: get_config_number("glue", 0, 1000),
    },
    
    bricks:
    {
        [BrickType.custom]:
        {
            chance: null,
            bricks: null,
        },
        [BrickType.p1]:
        {
            chance: get_config_number("bricks_1px", 0, 1000),
            bricks:
            [
                [[0, 0], false],
            ]
        },
        [BrickType.p2]:
        {
            chance: get_config_number("bricks_2px", 0, 1000),
            bricks:
            [
                [[0, 0], [1, 0], true],
            ]
        },
        [BrickType.p3]:
        {
            chance: get_config_number("bricks_3px", 0, 1000),
            bricks:
            [
                [[0, 0], [1, 0], [0, 1], true],
                [[-1, 0], [0, 0], [1, 0], false],
            ]
        },
        [BrickType.p4]:
        {
            chance: get_config_number("bricks_4px", 0, 1000),
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
        [BrickType.p5]:
        {
            chance: get_config_number("bricks_5px", 0, 1000),
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