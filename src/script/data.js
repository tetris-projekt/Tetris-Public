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

function try_to_read_vectors_list(text)
{
    text = text.replace(/ /g, "")
    text = text.replace(/\[/g, "")
    text = text.replace(/]/g, "")
    if(text[text.length - 1] == ",")
        text = text.substring(0, text.length - 1)
    let text_list = text.split(",")
    let readed_list = new Array()
    for(let i = 0; i < text_list.length - 1; i += 2)
    {
        let vect = new Array()
        vect.push(parseInt(text_list[i]))
        vect.push(parseInt(text_list[i + 1]))
        readed_list.push(vect)
    }
    if(text_list[text_list.length - 1] === "true")
        readed_list.push(true)
    else
        readed_list.push(false)
    return readed_list
}

function get_config_vectors_lists(property)
{
    let readed_list = new Array()
    let list_of_vectors_lists = config[property]
    if(typeof(list_of_vectors_lists) == "object")
    {
        for(let i = 0; i < list_of_vectors_lists.length; ++i)
        {
            try
            {
                let vectors_list = try_to_read_vectors_list(list_of_vectors_lists[i])
                readed_list.push(vectors_list)
            }
            catch(e)
            {
                console.log(incorrect_value(`${property}:${i}`))        
            }
        }
    }
    else
    {
        console.log(incorrect_value(property))
    }
    return readed_list
}

const data = 
{
    img_dir: "src/img/",
    date_separator: "-",
    value_chars: "0123456789-",
    digits_in_values: 10,
    max_score_board_length: 10,
    number_of_tutorial_pages: 5,

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
        "board":
        {
            width: 10,
            height: 20,
        },
        "preview":
        {
            width: 7,
            height: 4,
        }
    },

    ScorePropertyNames:
    [
        "score",
        "lines",
        "game_mode",
        "speed",
        "date",
    ],

    SettingsNamesList:
    [
        "sounds",
        "music",
        "ghost",
    ],

    default_settings:
    {
        "sounds": get_config_bool("sounds", true),
        "music": get_config_bool("music", true),
        "ghost": get_config_bool("ghost", true),
    },
    
    SettingsNamesToImgs:
    {
        "sounds": "sounds.png",
        "music": "music.png",
        "ghost": "ghost.png",
    },
    
    GameSpeedToImgs: 
    {
        0: "slow.png",
        1: "normal.png",
        2: "fast.png",
    },

    GameSpeedToDelays: 
    {
        0: get_config_number("start_delay_easy", 900, 1100, 1000),
        1: get_config_number("start_delay_medium", 700, 900, 800),
        2: get_config_number("start_delay_hard", 500, 700, 600),
    },

    GameSpeedToNames:
    {
        0: "slow",
        1: "normal",
        2: "fast",
    },

    GameModeToImgs:
    {
        0: "classic.png",
        1: "modified.png",
        2: "extended.png",
        3: "extreme.png",
        4: ".sus/secret.png"
    },

    GameModeToNames:
    {
        0: "classic",
        1: "modified",
        2: "extended",
        3: "extreme",
        4: "secret",
    },

    GameModeToMusic:
    {
        0:
        {
            main: "classic/main.ogg",
            bass: "classic/bass.ogg",
        },
        1:
        {
            main: ".sus/main.ogg",
            bass: ".sus/bass.ogg",
        },
        2:
        {
            main: ".sus/main.ogg",
            bass: ".sus/bass.ogg",
        },
        3:
        {
            main: ".sus/main.ogg",
            bass: ".sus/bass.ogg",
        },
        4:
        {
            main: ".sus/main.ogg",
            bass: ".sus/bass.ogg",
        },
    },

    delays:
    {
        move: get_config_number("move_delay", 50, 200, 100),
        soft_drop: get_config_number("soft_drop_delay", 40, 60, 50),
        tick_step: get_config_number("tick_delay_step", 1, 20, 5),
        min_tick: get_config_number("min_tick_delay", 100, 300, 150),
    },


    random_range: 1001,
    multiplier_chance: get_config_number("multiplier", 0, 1000, 0),
    max_multiplier: get_config_number("max_multiplier", 2, 9, 2),
    chance_to_modify: get_config_number("modifier", 0, 1000, 0),
    
    modifiers: 
    {
        "froze": 
        {
            chance: get_config_number("frozen", 0, 1000, 0),
        },
        "burn":
        {
            chance: get_config_number("burning", 0, 1000, 0),
        },
        "steel":
        {
            chance: get_config_number("steel", 0, 1000, 0),
        },
        "glue":
        {
            chance: get_config_number("glue", 0, 1000, 0)
        },
    },

    colors:
    [
        "light-blue",
        "blue",
        "pink",
        "green",
        "yellow",
        "orange",
        "red",
    ],

    default_brick_type: "p4",
    
    bricks:
    {
        "p1":
        {
            chance: get_config_number("bricks_1px", 0, 1000, 0),
            vectors_list:
            [
                [[0, 0], false],
            ]
        },
        "p2":
        {
            chance: get_config_number("bricks_2px", 0, 1000, 0),
            vectors_list:
            [
                [[0, 0], [1, 0], false],
            ]
        },
        "p3":
        {
            chance: get_config_number("bricks_3px", 0, 1000, 0),
            vectors_list:
            [
                [[0, 0], [1, 0], [0, 1], false],
                [[-1, 0], [0, 0], [1, 0], false],
            ]
        },
        "p4":
        {
            chance: get_config_number("bricks_4px", 0, 1000, 0),
            vectors_list:
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
        "p5":
        {
            chance: get_config_number("bricks_5px", 0, 1000, 0),
            vectors_list:
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
        "custom":
        {
            chance: get_config_number("bricks_custom", 0, 1000, 0),
            vectors_list: get_config_vectors_lists("vectors_list")
        }
    },
    score_for_first_line: get_config_number("score_for_first_line", 0, 1000, 250),
    line_combo_multiplier: get_config_number("line_combo_multiplier", 2, 10, 2),
    score_for_soft_drop: get_config_number("score_for_soft_drop", 0, 1000, 1),
    score_for_hard_drop: get_config_number("score_for_hard_drop", 0, 1000, 2),
    score_for_compressing: get_config_number("score_for_compressing", 0, 1000, 50),
    score_for_burning: get_config_number("score_for_burning", 0, 1000, 5),
    score_for_melting: get_config_number("score_for_melting", 0, 1000, 100),
}
