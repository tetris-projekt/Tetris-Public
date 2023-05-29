const config = 
{
    "move_delay": 100, // (50-200)
    "soft_drop_delay": 50, // (40-60)
    "start_delay_easy": 1000, // (900-1100)
    "start_delay_medium": 800, // (700-900)
    "start_delay_hard": 600, // (500-700)
    "tick_delay_step": 3, //(1-20)
    "min_tick_delay": 200, // (100-300)
    "combo_display_delay": 800, // (100-2000)
    "combo_display_fade_out_delay": 200, // (100-2000)

    /* scores (0-1000) */
    "score_for_first_line": 250,
    "score_for_soft_drop": 1,
    "score_for_hard_drop": 2,
    "score_for_recursive_gravity": 500,
    
    /* score for line are multipled by multiplier for each line (2-10) */
    "line_combo_multiplier": 2,

    /* default settings */
    "sounds": true,
    "music": true,
    "ghost": true,
    "auto_pause": true,

    /* default editor properties */
    "move_center": false,
    "custom": false,
    "all_1px": false,
    "all_2px": false,
    "all_3px": false,
    "all_4px": true,
    "all_5px": false,
    "modified": false,
    
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
    "bricks_2px": 1,
    "bricks_3px": 2,
    "bricks_4px": 7,
    "bricks_5px": 8,
    "bricks_custom": 8,

    /* scores (0-1000) */
    "score_for_compressing": 50,
    "score_for_burning": 5,
    "score_for_melting": 100,
}