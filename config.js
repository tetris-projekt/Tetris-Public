const config = 
{
    "move_delay": 120, // (50-200)
    "start_delay_slow": 1000, // (1000-1300)
    "start_delay_normal": 700, // (700-1000)
    "start_delay_fast": 400, // (400-700)
    "tick_delay_step": 3, // (1-20)
    "min_tick_delay": 200, // (100-300)
    "soft_drop_delay": 50, // (50-100)
    "value_update_delay": 40, // (0-100)
    "bonus_display_delay": 400, // (100-2000)
    "bonus_display_fade_out_delay": 200, // (100-2000)
    "tutorial_animation_frame_delay": 400, // (100-1000)
    "delay_between_tutorial_animations": 1000, //(100-2000)

    /* scores (0-1000) */
    "score_for_first_line": 250,
    "score_for_soft_drop": 1,
    "score_for_hard_drop": 2,
    "score_for_recursive_gravity": 500,
    "score_for_compressing": 50,
    "score_for_burning": 10,
    "score_for_melting": 100,
    
    /* score for line are multipled by multiplier for each line (2-10) */
    "line_combo_multiplier": 2,

    /* default menu properties */
    "game_mode_index": 0,
    "speed_index": 0,

    /* default settings */
    "sounds": true,
    "music": true,
    "ghost": true,
    "bonus_display": true,
    "auto_pause": true,

    /* default editor properties */
    "4px_bricks": true,
    "1_5px_bricks": false,
    "multipliers": false,
    "fire_modifier": false,
    "ice_modifier": false,
    "glue_modifier": false,
    "steel_modifier": false,
    "move_center": false,

    /* Chance that a brick contains a multiplier (0-1000) */
    "multiplier": 300,

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
}