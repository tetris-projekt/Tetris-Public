/*----------------------------------------------------------------------------------------------------*/

/*                                               MAIN                                                 */

/*----------------------------------------------------------------------------------------------------*/

let game = null
let settings = null
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

function setw(number, length)
{
    string = number.toString()
    while(string.length < length)
        string = "0" + string
    return string
}

function setup()
{
    preload_imgs()
    main_ui = new MainUI()
    main_ui.setup()
    if(localStorage.length == 0)
        open_window("windows", "info")
    else
        show_menu()
    set_listeners()
}

function preload_imgs()
{
    for(let dir in img_dirs)
    {
        for(let img in img_dirs[dir])
        {
            let preloader = new Image()
            preloader.src = get_src(dir, img)
        }
    }
}

function set_listeners()
{
    document.body.onblur = () =>
    {
        if(game != null && game.state == GameState.active)
            pause()
    }
    main_ui.get_id("baner-img").onclick = () =>
    {
        location.reload(true)
    }
}

function sign_local_storage()
{
    localStorage.setItem("storage", "on")
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
    }
}

function change_game_mode(by)
{
    let new_index = game_mode_index + by
    if(new_index >= 0 && new_index < GameModeList.length - 1)
    {
        game_mode_index = new_index
        reset_normal_number()
    }
    else
    {
        if(new_index > 0)
        {
            ++normal_number
            if(normal_number == 8)
                game_mode_index = new_index
        }
    }
    main_ui.refresh_menu_game_mode(GameModeList[game_mode_index])
    main_ui.refresh_arrows("game-mode", game_mode_index == 0, game_mode_index == Object.keys(GameMode).length - 1)
}

function switch_page(by)
{
    let new_page = cur_page + by
    if(new_page > 0 && new_page <= data.number_of_tutorial_pages)
    {
        cur_page = new_page
        main_ui.refresh_page(cur_page)
        main_ui.refresh_arrows("page", cur_page == 1, cur_page == data.number_of_tutorial_pages)
    }

}

function create_new_game()
{
    let game_mode = GameModeList[game_mode_index]
    let speed = GameSpeedList[speed_index]
    let settings = new Settings()
    let properties = new Properties(game_mode, speed, settings.get())
    let ui = new GameUI()
    return new Game(properties, ui)
}

function play_game()
{
    open_window("game", "game")
    main_ui.hide_display("windows")
    game = create_new_game()
    game.start()
    tick_delay = data.GameSpeedToDelays[game.properties.speed]
    start_game_tick()
}

function pause()
{
    game.pause()
    stop_game_tick()
    open_window("windows", "pause")
}

function resume()
{
    main_ui.hide_display("windows")
    cur_window = "game"
    game.resume()
    start_game_tick()
}

function restart()
{
    game.end()
    save_score()
    play_game()
}

function really_restart()
{
    if(game.state == GameState.end)
        restart()
    else
    {
        game.pause()
        stop_game_tick()
        open_window("windows", "really-restart")
    }
}

function show_how_to_play()
{
    open_window("windows", "how-to-play")
    cur_page = 1
    main_ui.create_page_number(data.number_of_tutorial_pages)
    main_ui.refresh_page(cur_page)
    main_ui.refresh_arrows("page", cur_page == 1, cur_page == data.number_of_tutorial_pages)
}

function go_back()
{
    if(game != null)
    {
        if(game.state == GameState.paused)
        {
            open_window("windows", "pause")
        }
        else
        {
            main_ui.hide_display("windows")
            cur_window = "game"
        }
    }
    else
        show_menu()
}

function create_new_settings()
{
    let ui = new SettingsUI()
    return new Settings(ui)
}

function show_settings()
{
    open_window("windows", "settings")
    settings = create_new_settings()
    settings.edit()
}

function show_really_quit()
{
    open_window("windows", "really-quit")
}

function quit()
{
    game.end() 
    save_score()
    show_menu()
}

function save_settings()
{
    if(game != null)
        game.refresh_settings(settings.get())
    settings.save()
    settings = null
    go_back()
}

function show_best_scores()
{
    open_window("windows", "best-scores")
    score_board = create_new_score_board()
    score_board.show()
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
    let game_mode = game.properties.game_mode
    let speed = game.properties.speed
    score_board.add(score, lines, game_mode, speed)
}

function game_end()
{
    stop_game_tick()
    save_score(this.score, this.lines)
    show_best_scores()
}

game_tick = () =>
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
        pause()
    else
        show_menu()
}
 
let normal_number = 0

function reset_normal_number()
{
    normal_number = 0
}
