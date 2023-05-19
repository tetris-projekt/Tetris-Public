const config = 
{
    "move_delay": 100, // (50-200)
    "soft_drop_delay": 50, // (40-60)
    "start_delay_easy": 1000, // (900-1100)
    "start_delay_medium": 800, // (700-900)
    "start_delay_hard": 600, // (500-700)
    "tick_delay_step": 3, //(1-20)
    "min_tick_delay": 200, // (100-300)

    /* scores (0-1000) */
    "score_for_first_line": 250,
    "score_for_soft_drop": 1,
    "score_for_hard_drop": 2,
    
    /* score for line are multipled by multiplier for each line (2-10) */
    "line_combo_multiplier": 2,

    /* score for lines are multipled by multiplier when you use recursive gravity (2-10) */
    "recursive_gravity_multiplier": 2,

    /* default settings */
    "sounds": true,
    "music": true,
    "ghost": true,
    
    /* ↓↓↓ ONLY IN EXTENDED AND EXTREME GAME MODE! ↓↓↓ */

    /* Chance that a brick contains a multiplier (0-1000) */
    "multiplier": 500,

    /* max value of multiplier (2-9) */
    "max_multiplier": 9,

    /* Chance to modify brick after spawn (0-1000) */
    "modifier": 200,

    /* Chance to use the specified modifier (0-1000) */
    "frozen": 1,
    "burning": 1,
    "steel": 1,
    "glue": 1,

    /* Chance to spawn the specified brick (0-1000) */
    "bricks_1px": 1,
    "bricks_2px": 5,
    "bricks_3px": 5,
    "bricks_4px": 20,
    "bricks_5px": 10,
    "bricks_custom": 0,

    /* vectors list for custom brick (copy from editor) */
    "vectors_list":
    [
        // example: "[[0,-1], [-1,0], [1,0], [0,1], false],"
    ],

    /* scores (0-1000) */
    "score_for_compressing": 50,
    "score_for_burning": 5,
    "score_for_melting": 100,
}
