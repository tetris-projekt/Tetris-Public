/*----------------------------------------------------------------------------------------------------*/

/*                                              MENU                                                  */

/*----------------------------------------------------------------------------------------------------*/

class Menu
{
    constructor(ui)
    {
        this.ui = ui
        this.speed_index = Menu.get_speed_index()
        this.game_mode_index = Menu.get_game_mode_index()
        this.normal_number = 0
        control.open_window("windows", WindowName.menu)
        this.ui.refresh_game_mode(GameModeList[this.game_mode_index])
        this.ui.refresh_speed(GameSpeedList[this.speed_index])
        refresh_arrows("game-mode", this.game_mode_index == 0, this.game_mode_index == Object.keys(GameMode).length - 1)
        refresh_arrows("speed", this.speed_index == 0, this.speed_index == Object.keys(GameSpeed).length - 1)
    }

    static get_speed_index()
    {
        let storage_index = storage_get("menu_speed_index")
        if(typeof(storage_index) == "number")
            return storage_index
        else
            return data.default_speed_index
    }

    static get_game_mode_index()
    {
        let storage_index = storage_get("menu_game_mode_index")
        if(typeof(storage_index) == "number")
            return storage_index
        else
            return data.default_game_mode_index
    }

    change_speed(by)
    {
        let new_index = this.speed_index + by
        if(new_index >= 0 && new_index < GameSpeedList.length)
        {
            this.speed_index = new_index
            this.save_speed_index()
            this.ui.refresh_speed(GameSpeedList[this.speed_index])
            refresh_arrows("speed", this.speed_index == 0, this.speed_index == Object.keys(GameSpeed).length - 1)
            try_to_play_sound("selector")
        }
    }

    save_speed_index()
    {
        storage_set("menu_speed_index", this.speed_index)
    }
    
    change_game_mode(by)
    {
        let new_index = this.game_mode_index + by
        if(new_index >= 0 && new_index < GameModeList.length - 1)
        {
            this.game_mode_index = new_index
            this.save_game_mode_index()
            this.reset_normal_number()
            try_to_play_sound("selector")
        }
        else
        {
            if(new_index > 0)
            {
                ++this.normal_number
                if(this.normal_number == data.normal_number)
                {
                    this.game_mode_index = new_index
                    this.save_game_mode_index()
                    try_to_play_sound("normal_click")
                    try_to_play_sound("normal_mode")
                }
                else
                {
                    try_to_play_sound("normal_click")
                }
            }
        }
        this.ui.refresh_game_mode(GameModeList[this.game_mode_index])
        refresh_arrows("game-mode", this.game_mode_index == 0, this.game_mode_index == Object.keys(GameMode).length - 1)
    }

    save_game_mode_index()
    {
        storage_set("menu_game_mode_index", this.game_mode_index)
    }
    
    reset_normal_number()
    {
        this.normal_number = 0
    }
}