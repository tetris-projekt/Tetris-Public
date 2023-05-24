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
            html += 
            `
                <br>
                <div class="property">
                    <img src="${data.SettingsPropertyNamesToImgs[property_name]}" class="property-name"></img>
                    <img id="${property_name}" class="button toggle" onclick="settings.toggle(this.id)"></img>
                </div>\n
            ` 
        }
        html += "<br>\n"
        const display = main_ui.get_id("settings-properties")
        display.innerHTML = html
        main_ui.turn_off_dragging_imgs(display)
    }

    refresh_checkbox(property_name, property)
    {
        if(property == true)
            main_ui.get_id(property_name).src = get_src("main", "checkbox_on")
        else
            main_ui.get_id(property_name).src = get_src("main", "checkbox_off")
    }

    refresh_checkboxes(properties)
    {
        for(let i = 0; i < data.SettingsPropertyNames.length; ++i)
        {
            let property_name = data.SettingsPropertyNames[i]
            this.refresh_checkbox(property_name, properties[property_name])
        }
    }
}