/*----------------------------------------------------------------------------------------------------*/

/*                                            SETTINGS                                                */

/*----------------------------------------------------------------------------------------------------*/

class Settings
{
    constructor(ui)
    {
        this.ui = ui
        this.properties = Settings.get_properties()
    }

    static get_properties()
    {
        const storage_properties = storage_get("settings")
        let properties = new Object()
        if(storage_properties != null && typeof(storage_properties) == "object")
        {
            for(let i = 0; i < data.SettingsPropertyNames.length; ++i)
            {
                let property = data.SettingsPropertyNames[i]
                if(isIn(storage_properties[property], [true, false]))
                    properties[property] = storage_properties[property]
                else
                    properties[property] = data.default_settings_properties[property]
            }
        }
        else
        {
            for(let i = 0; i < data.SettingsPropertyNames.length; ++i)
            {
                let property = data.SettingsPropertyNames[i]
                properties[property] = data.default_settings_properties[property]
            }
        }
        return properties
    }

    save()
    {
        storage_set("settings", this.properties)
    }

    toggle(property_name)
    {
        if(this.properties[property_name] == true)
            this.properties[property_name] = false
        else
            this.properties[property_name] = true
        this.ui.refresh_checkbox(property_name, this.properties[property_name])
        try_to_play_sound("toggle")
        if(property_name == "high_contrast")
            main_ui.refresh_theme(this.properties[property_name])
    }

    edit()
    {
        open_window("windows", "settings")
        this.ui.create_properties()
        this.ui.refresh_checkboxes(this.properties)
    }
}