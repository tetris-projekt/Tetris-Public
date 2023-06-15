/*----------------------------------------------------------------------------------------------------*/

/*                                              WINDOWS                                               */

/*----------------------------------------------------------------------------------------------------*/

function line(type)
{
    return `<img src="${get_src("main", "line")}" class="line ${type}"></img>`
}

function button(src, onclick, id = "", cls = "")
{
    return `<img src="${src}" onclick="${onclick}" ${id != "" ? ("id=" + id) : ""} class="button ${cls}"></img>`
}

function touch_button(src, onpointerdown, cls)
{
    return `<img src="${src}" onpointerdown="${onpointerdown}" class="button ${cls}"></img>`
}

function selector(cls, onclick)
{
    return `<div class="${cls} selector">
    ${button(get_src("main", "left_arrow"), `${onclick}(-1)`, "", `button left ${cls}`)}
    <div class="${cls} display"></div>
    ${button(get_src("main", "right_arrow"), `${onclick}(1)`, "", `button right ${cls}`)}
    </div>`
}

const windows = 
{
    "main_windows":
    `
        <div id="screen">
            <div id="baner"><img src="${get_src("main", "baner")}" id="baner-img"></img></div>
            <div id="displays">
                <div class="windows display"></div>
                <div class="game display"></div>
            </div>
            <div id="footer">
                <img src="${get_src("main", "footer")}" id="footer-img"></img>
            </div>    
        </div>
    `,
    "menu":
    `
        <div class="window menu">
            ${line("long")}
            ${button(get_src("menu", "play"), "control.play()", "play")}
            ${line("long")}
            ${line("short")}
            <img src="${get_src("game_mode", "game_mode")}" id="game-mode"></img>
            ${selector("game-mode", "menu.change_game_mode")}
            ${line("short")}
            ${button(get_src("brick_editor", "brick_editor"), "control.brick_editor()", "", "editor")}
            ${line("short")}
            <img src="${get_src("speed", "speed")}" id="speed"></img>
            ${selector("speed", "menu.change_speed")}
            ${line("short")}
            ${button(get_src("best_scores", "best_scores"), "control.best_scores()", "best-scores")}
            ${line("short")}
            ${button(get_src("settings", "settings"), "control.settings()", "settings")}
            ${line("short")}
            ${button(get_src("how_to_play", "how_to_play"), "control.how_to_play()", "how-to-play")}
            ${line("short")}
        </div>
    `,
    "editor":
    `
        <div class="window editor">
            ${line("long")}
            <img src="${get_src("brick_editor", "brick_editor")}" id="editor"></img>
            ${line("long")}
            <div id="editor-properties"></div>
            <div id="brick-editor" class="edit-section">
                <div class="property move-center">
                    <img src="${get_src("brick_editor", "move_center")}" class="property-name"></img>
                    ${button("", "editor.toggle_move_center()", "move-center", "toggle move-center")}
                </div>
                <div id="edit" class="edit-board"><img src="${get_src("brick_editor", "cross")}" id="cross"></img></div>
                <div id="brick-selector-box">
                ${selector("brick", "editor.change_brick_index")}
                </div>
                <div id="buttons-box">
                ${button(get_src("brick_editor", "delete"), "editor.remove_brick()", "delete", "left delete")}
                ${button(get_src("brick_editor", "add"), "editor.add_brick()", "add", "right add")}
                </div>
            </div>
            ${line("short")}
            ${button(get_src("settings", "save"), "control.save_editor()", "save")}
            ${line("short")}
        </div>
    `,
    "game":
    `
        <div class="window game">
            <div id="board">
                <div id="bonus-display"></div>
            </div>
            <div id="preview">
                <div id="next">
                    <img src="${get_src("game", "next")}" id="next-img"></img>
                </div>
            </div>
            <div id="scoreboard">
            ${line("short")}
                <div class="value-display">
                    <img src="${get_src("game", "score")}" class="img"></img>
                    <div class="value score"></div>
                </div>
                <br>
                <div class="value-display">
                    <img src="${get_src("game", "lines")}" class="img"></img>
                    <div class="value lines"></div>
                </div>
                ${line("short")}
                <img src="${get_src("game_mode", "game_mode")}" id="game-mode-img"></img>
                <br>
                <img id="game-mode-img-value"></img>
                ${line("short")}
                <img src="${get_src("speed", "speed")}" id="speed-img"></img>
                <br>
                <img id="speed-img-value"></img>
                ${line("short")}
                <img id="game-button" class="button" onclick="control.game_button_click()"></img>
                ${line("short")}
            </div>
            <div id="controls">
                ${touch_button(get_src("controls", "move_left"), "control.move_left()", "control move-left")}
                ${touch_button(get_src("controls", "rotate"), "control.rotate()", "control rotate")}
                ${touch_button(get_src("controls", "move_right"), "control.move_right()", "control move-right")}
                ${touch_button(get_src("controls", "hard_drop"), "control.hard_drop()", "control hard-drop")}
            </div>
        </div>
    `,
    "pause":
    `
    <div class="window pause">
        <br>
        ${line("long")}
        <img src="${get_src("pause", "game_paused")}" id="game-paused"></img>
        ${line("long")}
        <br>
        ${line("short")}
        ${button(get_src("pause", "resume"), "control.resume()")}
        ${line("short")}
        ${button(get_src("pause", "restart"), "control.really_restart()")}
        ${line("short")}
        ${button(get_src("how_to_play", "how_to_play"), "control.how_to_play()")}
        ${line("short")}
        ${button(get_src("settings", "settings"), "control.settings()")}
        ${line("short")}
        ${button(get_src("game", "menu"), "control.really_quit()")}
        ${line("short")}
    </div>
    `,
    "how-to-play":
    `
    <div class="window how-to-play">
        <br>
        ${line("long")}
            <img src="${get_src("how_to_play", "how_to_play")}" id="how-to-play"></img>
        ${line("long")}
        <img class="page display"></img>
        ${selector("page-number", "how_to_play.turn_page")}
        ${line("short")}
        ${button(get_src("how_to_play", "back"), "control.go_back()", "back")}
        ${line("short")}
    </div>
    `,
    "settings":
    `
        <div class="window settings">
            <br>
            ${line("long")}
            <img src="${get_src("settings", "settings")}" id="settings"></img>
            ${line("long")}
            <br>
            ${line("short")}
            <div id="settings-properties"></div>
            ${line("short")}
            ${button(get_src("settings", "save"), "control.save_settings()", "save")}
            ${line("short")}
        </div>
    `,
    "really-quit":
    `
        <div class="window really-quit really">
            <br>
            ${line("long")}
            <img src="${get_src("quit", "really_quit")}" id="ask"></img>
            <div id="buttons">
                ${button(get_src("quit", "cancel"), "control.go_back()", "cancel")}
                ${button(get_src("quit", "quit"), "control.quit()", "yes")}
            </div>
            ${line("long")}
        </div>
    `,
    "really-restart":
    `
        <div class="window really-restart really">
            <br>
            ${line("long")}
            <img src="${get_src("restart", "really_restart")}" id="ask"></img>
            <div id="buttons">
                ${button(get_src("restart", "cancel"), "control.go_back()", "cancel")}
                ${button(get_src("restart", "restart"), "control.restart()", "yes")}
            </div>
            ${line("long")}
        </div>
    `,
    "best-scores":
    `
        <div class="window best-scores">
            ${line("long")}
            <img src="${get_src("best_scores", "best_scores")}" id="best-scores"></img>
            ${line("long")}
            <div id="score-board"></div>
            ${line("long")}
            ${line("short")}
            ${button(get_src("how_to_play", "back"), "control.go_back()", "back")}
            ${line("short")}
            <div id="clear-box"></div>
        </div>
    `,
    "game-over":
    `
        <div class="window game-over">
            <br>
            ${line("long")}
            <img src="${get_src("game_over", "game_over")}" id="game-over"></img>
            ${line("long")}
            <br>
            ${line("short")}
            ${button(get_src("pause", "restart"), "control.play()", "restart")}
            ${line("short")}
            ${button(get_src("how_to_play", "back"), "control.go_back()", "back")}
            ${line("short")}
            ${button(get_src("game", "menu"), "control.menu(); try_to_play_sound('open')", "menu")}
            ${line("short")}
        </div>
    `,
}