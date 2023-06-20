/*----------------------------------------------------------------------------------------------------*/

/*                                           SETTINGS UI                                              */

/*----------------------------------------------------------------------------------------------------*/

class SettingsUI
{
    create_properties()
    {
        let html = ""
        for(let i = 0 ; i < data.SettingsPropertyNames.length; ++i)
        {
            let property_name = data.SettingsPropertyNames[i]
            html += "<br>" + html_creator.property(data.SettingsPropertyNamesToImgs[property_name], property_name, "settings.toggle(this.id)")
        }
        html += "<br>"
        const display = get_id("settings-properties")
        display.innerHTML = html
        disable_dragging_imgs(display)
    }

    refresh_properties(properties)
    {
        for(let i = 0; i < data.SettingsPropertyNames.length; ++i)
        {
            let property_name = data.SettingsPropertyNames[i]
            refresh_checkbox(property_name, properties[property_name])
        }
    }
}