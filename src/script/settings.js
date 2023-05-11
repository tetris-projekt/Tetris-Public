/*----------------------------------------------------------------------------------------------------*/

/*                                              BRICK                                                 */

/*----------------------------------------------------------------------------------------------------*/

class Settings
{
    constructor(ui)
    {
        this.properties = {}
        this.ui = ui
        let storage_settings = JSON.parse(localStorage.getItem("settings"))
        this.read(storage_settings)
    }

    set_default()
    {
        for(let i = 0; i < data.SettingsNamesList.length; ++i)
        {
            let property_name = data.SettingsNamesList[i]
            this.properties[property_name] = data.default_settings[property_name]
        }
    }

    get()
    {
        return this.properties
    }
    
    read(storage_settings)
    {
        for(let i = 0; i < data.SettingsNamesList.length; ++i)
        {
            let property = data.SettingsNamesList[i]
            if(storage_settings != null && typeof(storage_settings) == "object")
            {
                if(isIn(storage_settings[property], [true, false]))
                    this.properties[property] = storage_settings[property]
            }
            else
                this.properties[property] = data.default_settings[property]
        }
    }

    save()
    {
        localStorage.setItem("settings", JSON.stringify(this.properties))
    }

    toggle(property_name)
    {
        if(this.properties[property_name] == true)
            this.properties[property_name] = false
        else
            this.properties[property_name] = true
        this.ui.refresh_checkbox(property_name, this.properties[property_name])
    }

    edit()
    {
        this.ui.create_properties()
        for(let i = 0; i < data.SettingsNamesList.length; ++i)
        {
            let property_name = data.SettingsNamesList[i]
            this.ui.refresh_checkbox(property_name, this.properties[property_name])
        }
    }
}