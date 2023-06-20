/*----------------------------------------------------------------------------------------------------*/

/*                                              WINDOWS                                               */

/*----------------------------------------------------------------------------------------------------*/

const windows = 
{
    [WindowName.main_windows]:
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
    [WindowName.menu]:
    `
        <div class="window menu">
            ${html_creator.line("long")}
            ${html_creator.button(get_src("menu", "play"), "game_control.play()", "play")}
            ${html_creator.line("long")}
            ${html_creator.line("short")}
            <img src="${get_src("game_mode", "game_mode")}" id="game-mode"></img>
            ${html_creator.selector("game-mode", "menu.change_game_mode")}
            ${html_creator.line("short")}
            ${html_creator.button(get_src("brick_editor", "brick_editor"), "control.brick_editor()", "", "editor")}
            ${html_creator.line("short")}
            <img src="${get_src("speed", "speed")}" id="speed"></img>
            ${html_creator.selector("speed", "menu.change_speed")}
            ${html_creator.line("short")}
            ${html_creator.button(get_src("best_scores", "best_scores"), "control.best_scores()", "best-scores")}
            ${html_creator.line("short")}
            ${html_creator.button(get_src("settings", "settings"), "control.settings()", "settings")}
            ${html_creator.line("short")}
            ${html_creator.button(get_src("how_to_play", "how_to_play"), "control.how_to_play()", "how-to-play")}
            ${html_creator.line("short")}
        </div>
    `,
    [WindowName.editor]:
    `
        <div class="window editor">
            ${html_creator.line("long")}
            <img src="${get_src("brick_editor", "brick_editor")}" id="editor"></img>
            ${html_creator.line("long")}
            <div id="editor-properties"></div>
            <div id="brick-editor" class="edit-section">
                <div class="property move-center">
                    <img src="${get_src("brick_editor", "move_center")}" class="property-name"></img>
                    ${html_creator.button("", "editor.toggle_move_center()", "move-center", "toggle move-center")}
                </div>
                <div id="edit" class="edit-board"><img src="${get_src("brick_editor", "cross")}" id="cross"></img></div>
                <div id="brick-selector-box">
                ${html_creator.selector("brick", "editor.change_brick_index")}
                </div>
                <div id="buttons-box">
                ${html_creator.button(get_src("brick_editor", "delete"), "editor.remove_brick()", "delete", "left delete")}
                ${html_creator.button(get_src("brick_editor", "add"), "editor.add_brick()", "add", "right add")}
                </div>
            </div>
            ${html_creator.line("short")}
            ${html_creator.button(get_src("settings", "save"), "control.go_back()", "save")}
            ${html_creator.line("short")}
        </div>
    `,
    [WindowName.game]:
    `
        <div class="window game">
            <div id="board">
                <div id="bonus-display" class="bonus-display"></div>
            </div>
            <div id="preview">
                <div id="next">
                    <img src="${get_src("game", "next")}" id="next-img"></img>
                </div>
            </div>
            <div id="scoreboard">
            ${html_creator.line("short")}
                <div class="value-display">
                    <img src="${get_src("game", "score")}" class="img"></img>
                    <div class="value score"></div>
                </div>
                <br>
                <div class="value-display">
                    <img src="${get_src("game", "lines")}" class="img"></img>
                    <div class="value lines"></div>
                </div>
                ${html_creator.line("short")}
                <img src="${get_src("game_mode", "game_mode")}" id="game-mode-img"></img>
                <br>
                <img id="game-mode-img-value"></img>
                ${html_creator.line("short")}
                <img src="${get_src("speed", "speed")}" id="speed-img"></img>
                <br>
                <img id="speed-img-value"></img>
                ${html_creator.line("short")}
                <img id="game-button" class="button" onclick="game_control.game_button_click()"></img>
                ${html_creator.line("short")}
            </div>
            <div id="controls">
                ${html_creator.touch_button(get_src("controls", "move_left"), "game_control.move_left()", "control move-left")}
                ${html_creator.touch_button(get_src("controls", "rotate"), "game_control.rotate()", "control rotate")}
                ${html_creator.touch_button(get_src("controls", "move_right"), "game_control.move_right()", "control move-right")}
                ${html_creator.touch_button(get_src("controls", "hard_drop"), "game_control.hard_drop()", "control hard-drop")}
            </div>
        </div>
    `,
    [WindowName.pause]:
    `
    <div class="window pause">
        <br>
        ${html_creator.line("long")}
        <img src="${get_src("pause", "game_paused")}" id="game-paused"></img>
        ${html_creator.line("long")}
        <br>
        ${html_creator.line("short")}
        ${html_creator.button(get_src("pause", "resume"), "game_control.resume()")}
        ${html_creator.line("short")}
        ${html_creator.button(get_src("pause", "restart"), "game_control.really_restart()")}
        ${html_creator.line("short")}
        ${html_creator.button(get_src("how_to_play", "how_to_play"), "control.how_to_play()")}
        ${html_creator.line("short")}
        ${html_creator.button(get_src("settings", "settings"), "control.settings()")}
        ${html_creator.line("short")}
        ${html_creator.button(get_src("game", "menu"), "game_control.really_quit()")}
        ${html_creator.line("short")}
    </div>
    `,
    [WindowName.how_to_play]:
    `
    <div class="window how-to-play">
        <br>
        ${html_creator.line("long")}
            <img src="${get_src("how_to_play", "how_to_play")}" id="how-to-play"></img>
        ${html_creator.line("long")}
        <img class="page display"></img>
        <div id="tutorial">
            <div id="tutorial-bonus-display" class="bonus-display"></div>
        </div>
        ${html_creator.selector("page-number", "how_to_play.turn_page")}
        ${html_creator.line("short")}
        ${html_creator.button(get_src("how_to_play", "back"), "control.go_back()", "back")}
        ${html_creator.line("short")}
    </div>
    `,
    [WindowName.settings]:
    `
        <div class="window settings">
            <br>
            ${html_creator.line("long")}
            <img src="${get_src("settings", "settings")}" id="settings"></img>
            ${html_creator.line("long")}
            <br>
            ${html_creator.line("short")}
            <div id="settings-properties"></div>
            ${html_creator.line("short")}
            ${html_creator.button(get_src("settings", "save"), "control.go_back()", "save")}
            ${html_creator.line("short")}
        </div>
    `,
    [WindowName.really_quit]:
    `
        <div class="window really-quit really">
            <br>
            ${html_creator.line("long")}
            <img src="${get_src("quit", "really_quit")}" id="ask"></img>
            <div id="buttons">
                ${html_creator.button(get_src("quit", "cancel"), "control.go_back()", "cancel")}
                ${html_creator.button(get_src("quit", "quit"), "game_control.quit()", "yes")}
            </div>
            ${html_creator.line("long")}
        </div>
    `,
    [WindowName.really_restart]:
    `
        <div class="window really-restart really">
            <br>
            ${html_creator.line("long")}
            <img src="${get_src("restart", "really_restart")}" id="ask"></img>
            <div id="buttons">
                ${html_creator.button(get_src("restart", "cancel"), "control.go_back()", "cancel")}
                ${html_creator.button(get_src("restart", "restart"), "game_control.restart()", "yes")}
            </div>
            ${html_creator.line("long")}
        </div>
    `,
    [WindowName.best_scores]:
    `
        <div class="window best-scores">
            ${html_creator.line("long")}
            <img src="${get_src("best_scores", "best_scores")}" id="best-scores"></img>
            ${html_creator.line("long")}
            <div id="score-board"></div>
            ${html_creator.line("long")}
            ${html_creator.line("short")}
            ${html_creator.button(get_src("how_to_play", "back"), "control.go_back()", "back")}
            ${html_creator.line("short")}
            <div id="clear-box"></div>
        </div>
    `,
    [WindowName.game_over]:
    `
        <div class="window game-over">
            <br>
            ${html_creator.line("long")}
            <img src="${get_src("game_over", "game_over")}" id="game-over"></img>
            ${html_creator.line("long")}
            <br>
            ${html_creator.line("short")}
            ${html_creator.button(get_src("pause", "restart"), "game_control.play()", "restart")}
            ${html_creator.line("short")}
            ${html_creator.button(get_src("how_to_play", "back"), "game_control.show_ended_game()", "back")}
            ${html_creator.line("short")}
            ${html_creator.button(get_src("game", "menu"), "control.menu(); try_to_play_sound('open')", "menu")}
            ${html_creator.line("short")}
        </div>
    `,
}