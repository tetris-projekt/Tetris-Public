/*----------------------------------------------------------------------------------------------------*/

/*                                               MAIN                                                 */

/*----------------------------------------------------------------------------------------------------*/

let game = null
let settings = null
let editor = null
let score_board = null
let main_ui = null

let game_tick_timeout = 0
let speed_index = 0
let game_mode_index = 0
let tick_delay = 0
let cur_window = ""
let cur_page = 0

function isIn(value, arr)
{
    for(let i = 0; i < arr.length; ++i)
    {
        if(value === arr[i])
            return true
    }
    return false
}

function storage_set(name, item)
{
    localStorage.setItem(name, JSON.stringify(item))
}

function try_to_play_sound(sound_name)
{
    if(Settings.get_properties().sounds == true)
        main_ui.play_sound(sound_name)
}

function storage_get(name)
{
    return JSON.parse(localStorage.getItem(name))
}

function setw(number, length)
{
    string = number.toString()
    while(string.length < length)
        string = "0" + string
    return string
}

function get_center_index(index)
{
    let max_index = index - 1
    return ((max_index - max_index % 2) / 2)
}

function setup()
{
    preload_content()
    main_ui = new MainUI()
    main_ui.setup()
    set_autopause_listeners()
    if(storage_get("enabled") == true)
        show_menu()
    else
        open_window("windows", "info")
}

function preload_content()
{
    for(let dir in dirs["img"])
    {
        for(let img in dirs["img"][dir])
        {
            let preloader = new Image()
            preloader.src = get_src(dir, img, "img")
        }
    }

    for(let dir in dirs["audio"])
    {
        for(let audio in dirs["audio"][dir])
        {
            let preloader = new Audio()
            preloader.src = get_src(dir, audio, "audio")
            preloader.preload = true
        }
    }
}

function set_autopause_listeners()
{
    document.body.onblur = () =>
    {
        if(game != null && game.state == GameState.active)
        {
            pause_game()
            show_pause()
        }
    }
    main_ui.get_id("baner-img").onclick = () =>
    {
        location.reload(true)
    }
}

function sign_local_storage()
{
    storage_set("enabled", true)
}

function open_window(display, window)
{
    main_ui.refresh_window(display, window)
    cur_window = window
}

function show_menu()
{
    game = null
    main_ui.hide_display("game")
    open_window("windows", "menu")
    main_ui.refresh_menu_game_mode(GameModeList[game_mode_index])
    main_ui.refresh_menu_speed(GameSpeedList[speed_index])
    main_ui.refresh_arrows("game-mode", game_mode_index == 0, game_mode_index == Object.keys(GameMode).length - 1)
    main_ui.refresh_arrows("speed", speed_index == 0, speed_index == Object.keys(GameSpeed).length - 1)
}

function change_speed(by)
{
    let new_index = speed_index + by
    if(new_index >= 0 && new_index < GameSpeedList.length)
    {
        speed_index = new_index
        main_ui.refresh_menu_speed(GameSpeedList[speed_index])
        main_ui.refresh_arrows("speed", speed_index == 0, speed_index == Object.keys(GameSpeed).length - 1)
        try_to_play_sound("select")
    }
}

function change_game_mode(by)
{
    let new_index = game_mode_index + by
    if(new_index >= 0 && new_index < GameModeList.length - 1)
    {
        game_mode_index = new_index
        reset_normal_number()
        try_to_play_sound("select")
    }
    else
    {
        if(new_index > 0)
        {
            ++normal_number
            if(normal_number == data.normal_number)
            {
                game_mode_index = new_index
                try_to_play_sound("normal_click")
                try_to_play_sound("normal_mode")
            }
            else
            {
                try_to_play_sound("normal_click")
            }
        }
    }
    main_ui.refresh_menu_game_mode(GameModeList[game_mode_index])
    main_ui.refresh_arrows("game-mode", game_mode_index == 0, game_mode_index == Object.keys(GameMode).length - 1)
}

function turn_page(by)
{
    let new_page = cur_page + by
    if(new_page > 0 && new_page <= data.number_of_tutorial_pages)
    {
        cur_page = new_page
        main_ui.refresh_page(cur_page)
        main_ui.refresh_arrows("page", cur_page == 1, cur_page == data.number_of_tutorial_pages)
        try_to_play_sound("select")
    }
}

function create_new_game()
{
    let game_mode = GameModeList[game_mode_index]
    let speed = GameSpeedList[speed_index]
    let properties = new GameData(game_mode, speed, Settings.get_properties())
    let ui = new GameUI()
    return new Game(properties, ui)
}

function create_new_brick_editor()
{
    let ui = new BrickEditorUI()
    return new BrickEditor(ui)
}

function show_editor()
{
    editor = create_new_brick_editor()
    editor.edit()
    try_to_play_sound("open")
}

function save_editor()
{
    editor.save()
    editor = null
    show_menu()
    try_to_play_sound("back")
}

function play_game()
{
    open_window("game", "game")
    main_ui.hide_display("windows")
    game = create_new_game()
    game.start()
    tick_delay = data.GameSpeedToDelays[game.data.speed]
    start_game_tick()
}

function pause_game()
{
    game.pause()
    stop_game_tick()
}

function show_pause()
{
    open_window("windows", "pause")
    this.try_to_play_sound("pause")
}

function resume_game()
{
    main_ui.hide_display("windows")
    cur_window = "game"
    game.resume()
    start_game_tick()
}

function restart_game()
{
    game.end()
    save_score()
    play_game()
}

function show_really_restart()
{
    open_window("windows", "really-restart")
    try_to_play_sound("really")
}

function show_how_to_play()
{
    open_window("windows", "how-to-play")
    cur_page = 1
    main_ui.create_page_number_display(data.number_of_tutorial_pages)
    main_ui.refresh_page(cur_page)
    main_ui.refresh_arrows("page", cur_page == 1, cur_page == data.number_of_tutorial_pages)
    try_to_play_sound("open")
}

function go_back()
{
    if(game != null)
        open_window("windows", "pause")
    else
        show_menu()
    try_to_play_sound("back")
}

function create_new_settings()
{
    let ui = new SettingsUI()
    return new Settings(ui)
}

function show_settings()
{
    settings = create_new_settings()
    settings.edit()
    try_to_play_sound("open")
}

function show_really_quit()
{
    open_window("windows", "really-quit")
    try_to_play_sound("really")
}

function quit()
{
    game.end()
    save_score()
    show_menu()
    try_to_play_sound("end")
}

function save_settings()
{
    settings.save()
    settings = null
    if(game != null)
        game.refresh_settings(Settings.get_properties())
    go_back()
}

function show_best_scores()
{
    open_window("windows", "best-scores")
    score_board = create_new_score_board()
    score_board.show()
    try_to_play_sound("open")
}

function create_new_score_board()
{
    let ui = new ScoreBoardUI()
    return new ScoreBoard(ui)
}

function save_score()
{
    score_board = create_new_score_board()
    let score = game.score
    let lines = game.lines
    let game_mode = game.data.game_mode
    let speed = game.data.speed
    score_board.add(score, lines, game_mode, speed)
}

function game_end()
{
    stop_game_tick()
    save_score(this.score, this.lines)
}

function show_end_screen()
{
    
}

const game_tick = () =>
{
    start_game_tick()
    game.move_down()
}

function start_game_tick()
{
    if(game_tick_timeout)
        stop_game_tick()
    game_tick_timeout = setTimeout(game_tick, tick_delay)
}

function stop_game_tick()
{
    clearTimeout(game_tick_timeout)
}

function step()
{
    tick_delay -= data.delays.tick_step
    if(tick_delay < data.delays.min_tick)
        tick_delay = data.delays.min_tick
}

function game_button_click()
{
    if(game.state == GameState.active)
    {
        pause_game()
        show_pause()
    }    
    else
    {
        show_menu()
        try_to_play_sound("open")
    }
}
 
let normal_number = 0

function reset_normal_number()
{
    normal_number = 0
}