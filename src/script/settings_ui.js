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
                    ${button("", `settings.toggle(this.id)`, `${property_name}`, "toggle")}
                </div>\n
            ` 
        }
        html += "<br>\n"
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