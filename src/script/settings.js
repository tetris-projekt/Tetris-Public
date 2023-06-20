/*----------------------------------------------------------------------------------------------------*/

/*                                            SETTINGS                                                */

/*----------------------------------------------------------------------------------------------------*/

class Settings
{
    constructor(ui)
    {
        this.ui = ui
        this.properties = Settings.get_properties()
        control.open_window("windows", WindowName.settings)
        this.ui.create_properties()
        this.ui.refresh_properties(this.properties)
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

    static get_property(property_name)
    {
        return Settings.get_properties()[property_name]
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
        refresh_checkbox(property_name, this.properties[property_name])
        try_to_play_sound("toggle")
    }
}