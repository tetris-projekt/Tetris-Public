/*----------------------------------------------------------------------------------------------------*/

/*                                           SETTINGS UI                                              */

/*----------------------------------------------------------------------------------------------------*/

class SettingsUI
{
    create_properties()
    {
        let html = ""
        for(let i = 0 ; i < data.SettingsNamesList.length; ++i)
        {
            let property_name = data.SettingsNamesList[i]
            html += 
            `
                <br>
                <div class="property">
                    <img src="${data.img_dir}settings/${data.SettingsNamesToImgs[property_name]}"></img>
                    <img id="${property_name}" class="button" onclick="settings.toggle(this.id)"></img>
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
            main_ui.get_id(property_name).src = data.img_dir + "settings/checkbox_on.png"
        else
            main_ui.get_id(property_name).src = data.img_dir + "settings/checkbox_off.png"
    }
}