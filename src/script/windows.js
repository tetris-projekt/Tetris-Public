/*----------------------------------------------------------------------------------------------------*/

/*                                              WINDOWS                                               */

/*----------------------------------------------------------------------------------------------------*/

function line(type)
{
    return `<img src="${get_src("main", "line")}" class="line ${type}"></img>`
}

const windows = 
{
    "main_windows":
    `
        <div id="screen">
            <div id="baner"><img src="${get_src("main", "baner")}" id="baner-img"></img></div>
            <div class="windows display"></div>
            <div class="game display"></div>
            <img src="${get_src("main", "footer")}" id="footer"></img>
        </div>
    `,
    "info": 
    `
        <div class="window info">
            <br>
            ${line("long")}
            <img src="${get_src("info", "info")}" id="info"></img>
            <br>
            <img src="${get_src("info", "ok")}" id="ok" class="button" onclick="show_menu(); sign_local_storage()"></img>
            ${line("long")}
        </div>
    `,
    "menu":
    `
        <div class="window menu">
            ${line("long")}
            <img src="${get_src("menu", "play")}" id="play" class="button" onclick="play_game()"></img>
            ${line("long")}
            ${line("short")}
            <img src="${get_src("game_mode", "game_mode")}" id="game-mode"></img>
            <div class="game-mode selector">
                <img src="${get_src("main", "left_arrow")}" class="button left game-mode" onclick="change_game_mode(-1);"></img>
                <img class="game-mode display"></img>
                <img src="${get_src("main", "right_arrow")}" class="button right game-mode" onclick="change_game_mode(1);"></img>
            </div>
            ${line("short")}    
            <img src="${get_src("brick_editor", "brick_editor")}" class="button editor" onclick="show_editor()"></img>
            ${line("short")}
            <img src="${get_src("speed", "speed")}" id="speed"></img>
            <div class="speed selector">
                <img src="${get_src("main", "left_arrow")}" class="button left speed" onclick="change_speed(-1)"></img>
                <img class="speed display"></img>
                <img src="${get_src("main", "right_arrow")}" class="button right speed" onclick="change_speed(1)"></img>
            </div>
            ${line("short")}
            <img src="${get_src("best_scores", "best_scores")}" id="best-scores" class="button" onclick="show_best_scores()"></img>
            ${line("short")}
            <img src="${get_src("settings", "settings")}" id="settings" class="button" onclick="show_settings()"></img>
            ${line("short")}
            <img src="${get_src("how_to_play", "how_to_play")}" id="how-to-play" class="button" onclick="show_how_to_play()"></img>
            ${line("short")}
        </div>
    `,
    "editor":
    `
        <div class="window editor">
            <br>
            ${line("long")}
            <img src="${get_src("brick_editor", "brick_editor")}" id="editor"></img>
            ${line("long")}
            <div id="editor-properties"></div>
            <div id="brick-editor" class="edit-section">
                <div class="property move-center">
                    <img src="${get_src("brick_editor", "move_center")}" class="property-name"></img>
                    <img id="move-center" class="button toggle move-center" onclick="editor.toggle_move_center()"></img>
                </div>
                <div id="edit" class="edit-board"><img src="${get_src("brick_editor", "cross")}" id="cross"></img></div>
                <div id="brick-selector-box">
                    <div class="brick selector">
                    <img src="${get_src("main", "left_arrow")}" class="button left brick" onclick="editor.change_brick_index(-1)"></img>
                    <div id="brick-index"></div>
                    <img src="${get_src("main", "right_arrow")}" class="button right brick" onclick="editor.change_brick_index(1)"></img>
                    </div>
                </div>
                <div id="buttons-box">
                <img src="${get_src("brick_editor", "delete")}" id="delete" class="button left delete" onclick="editor.remove_brick()"></img>
                <img src="${get_src("brick_editor", "add")}" id="add" class="button right add" onclick="editor.add_brick()"></img>
                </div>
            </div>
            ${line("short")}
            <img src="${get_src("settings", "save")}" id="save" class="button" onclick="save_editor()"></img>
            ${line("short")}
        </div>
    `,
    "game":
    `
        <div class="window game">
            <div id="board"></div>
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
                <img id="game-button" class="button" onclick="game_button_click()"></img>
                ${line("short")}
            </div>
            <div id="controls">
                <img src="${get_src("controls", "move_left")}" class="button control move-left" onpointerdown="try_to_move_left(); reset_move_left()"></img>
                <img src="${get_src("controls", "rotate")}" class="button control rotate" onpointerdown="try_to_rotate(); reset_rotate()"></img>
                <img src="${get_src("controls", "move_right")}" class="button control move-right" onpointerdown="try_to_move_right(); reset_move_right()"></img>
                <img src="${get_src("controls", "hard_drop")}" class="button control hard-drop" onpointerdown="try_to_hard_drop(); reset_hard_drop()"></img>
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
        <img src="${get_src("pause", "resume")}" class="button" onclick="resume_game()"></img>
        ${line("short")}
        <img src="${get_src("pause", "restart")}" class="button" onclick="show_really_restart()"></img>
        ${line("short")}
        <img src="${get_src("how_to_play", "how_to_play")}" class="button" onclick="show_how_to_play()"></img>
        ${line("short")}
        <img src="${get_src("settings", "settings")}" class="button" onclick="show_settings()"></img>
        ${line("short")}
        <img src="${get_src("game", "menu")}" class="button" onclick="show_really_quit()"></img>
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
        <div class="page selector">
            <img src="${get_src("main", "left_arrow")}" class="button left page" onclick="turn_page(-1)"></img>
            <div class="page-number display"></div>
            <img src="${get_src("main", "right_arrow")}" class="button right page" onclick="turn_page(1)"></img>
        </div>
        ${line("short")}
        <img src="${get_src("how_to_play", "back")}" class="button" id="back" onclick="go_back()"></img>
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
            <img src="${get_src("settings", "save")}" id="save" class="button" onclick="save_settings()"></img>
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
                <img src="${get_src("quit", "cancel")}" id="cancel" class="button" onclick="go_back()"></img>
                <img src="${get_src("quit", "quit")}" id="yes" class="button" onclick="quit()"></img>
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
                <img src="${get_src("restart", "cancel")}" id="cancel" class="button" onclick="go_back()"></img>
                <img src="${get_src("restart", "restart")}" id="yes" class="button" onclick="restart_game()"></img>
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
            <img src="${get_src("how_to_play", "back")}" id="back" class="button" onclick="go_back()"></img>
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
            <img src="${get_src("pause", "restart")}" id="restart" class="button" onclick="restart_game()"></img>
            ${line("short")}
            <img src="${get_src("how_to_play", "back")}" id="back" class="button" onclick="go_back()"></img>
            ${line("short")}
            <img src="${get_src("game", "menu")}" id="menu" class="button" onclick="show_menu(); try_to_play_sound('open')"></img>
            ${line("short")}

        </div>
    `,
}