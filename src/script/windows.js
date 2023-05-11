/*----------------------------------------------------------------------------------------------------*/

/*                                              WINDOWS                                               */

/*----------------------------------------------------------------------------------------------------*/

function line(type)
{
    return `<img src="${data.img_dir}main/line.png" class="line ${type}"></img>`
}

const windows = 
{
    "main_windows":
    `
        <div id="baner"><img src="${data.img_dir}main/baner.png" id="baner-img"></img></div>
        <div class="windows display"></div>
        <div class="game display"></div>
        <img src="${data.img_dir}main/footer.png" id="footer"></img>
    `,
    "info": 
    `
        <div class="window info">
            <br>
            ${line("long")}
            <img src="${data.img_dir}info/info.png" id="info"></img>
            <br>
            <img src="${data.img_dir}info/ok.png" id="ok" class="button" onclick="show_menu(); sign_local_storage()"></img>
            ${line("long")}
        </div>
    `,
    "menu":
    `
        <div class="window menu">
            <br>
            ${line("long")}
            <img src="${data.img_dir}menu/play.png" id="play" class="button" onclick="play_game()"></img>
            ${line("long")}
            ${line("short")}
            <img src="${data.img_dir}game_mode/game_mode.png" id="game-mode"></img>
            <div class="game-mode selector">
                <img src="${data.img_dir}main/left_arrow.png" class="button left" onclick="change_game_mode(-1);"></img>
                <img class="game-mode display"></img>
                <img src="${data.img_dir}main/right_arrow.png" class="button right" onclick="change_game_mode(1);"></img>
            </div>
            ${line("short")}
            <img src="${data.img_dir}speed/speed.png" id="speed"></img>
            <div class="speed selector">
                <img src="${data.img_dir}main/left_arrow.png" class="button left" onclick="change_speed(-1)"></img>
                <img class="speed display"></img>
                <img src="${data.img_dir}main/right_arrow.png" class="button right" onclick="change_speed(1)"></img>
            </div>
            ${line("short")}
            <img src="${data.img_dir}best_scores/best_scores.png" id="best-scores" class="button" onclick="show_best_scores()"></img>
            ${line("short")}
            <img src="${data.img_dir}settings/settings.png" id="settings" class="button" onclick="show_settings()"></img>
            ${line("short")}
            <img src="${data.img_dir}how_to_play/how_to_play.png" id="how-to-play" class="button" onclick="show_how_to_play()"></img>
            ${line("short")}
        </div>
    `,
    "game":
    `
        <div class="window game">
            <div id="board"></div>
            <div id="preview">
                <div id="next">
                    <img src="${data.img_dir}game/next.png" id="next-img"></img>
                </div>
            </div>
            <div id="scoreboard">
            ${line("short")}
                <div class="value-display">
                    <img src="${data.img_dir}game/score.png" class="img"></img>
                    <div class="value score"></div>
                </div>
                <br>
                <div class="value-display">
                    <img src="${data.img_dir}game/lines.png" class="img"></img>
                    <div class="value lines"></div>
                </div>
                ${line("short")}
                <img src="${data.img_dir}game_mode/game_mode.png" id="game-mode-img"></img>
                <br>
                <img id="game-mode-img-value"></img>
                ${line("short")}
                <img src="${data.img_dir}speed/speed.png" id="speed-img"></img>
                <br>
                <img id="speed-img-value"></img>
                ${line("short")}
                <img id="game-button" class="button" onclick="game_button_click()"></img>
                ${line("short")}
            </div>
            <div id="controls">
                <img src="${data.img_dir}controls/move_left.png" class="button control move-left" onpointerdown="try_to_move_left(); reset_move_left()"></img>
                <img src="${data.img_dir}controls/rotate.png" class="button control rotate" onpointerdown="try_to_rotate(); reset_rotate()"></img>
                <img src="${data.img_dir}controls/move_right.png" class="button control move-right" onpointerdown="try_to_move_right(); reset_move_right()"></img>
                <img src="${data.img_dir}controls/hard_drop.png" class="button control hard-drop" onpointerdown="try_to_hard_drop(); reset_hard_drop()"></img>
            </div>
        </div>
    `,
    "pause":
    `
    <div class="window pause">
        <br>
        ${line("long")}
        <img src="${data.img_dir}pause/game_paused.png" id="game-paused"></img>
        ${line("long")}
        <br>
        ${line("short")}
        <img src="${data.img_dir}pause/resume.png" class="button" onclick="resume()"></img>
        ${line("short")}
        <img src="${data.img_dir}pause/restart.png" class="button" onclick="really_restart()"></img>
        ${line("short")}
        <img src="${data.img_dir}how_to_play/how_to_play.png" class="button" onclick="show_how_to_play()"></img>
        ${line("short")}
        <img src="${data.img_dir}settings/settings.png" class="button" onclick="show_settings()"></img>
        ${line("short")}
        <img src="${data.img_dir}menu/menu.png" class="button" onclick="show_really_quit()"></img>
        ${line("short")}
    </div>
    `,
    "how-to-play":
    `
    <div class="window how-to-play">
        <br>
        ${line("long")}
            <img src="${data.img_dir}how_to_play/how_to_play.png" id="how-to-play"></img>
        ${line("long")}
        <img class="page display"></img>
        <div class="page selector">
            <img src="${data.img_dir}main/left_arrow.png" class="button left" onclick="switch_page(-1)"></img>
            <div class="page-number display"></div>
            <img src="${data.img_dir}main/right_arrow.png" class="button right" onclick="switch_page(1)"></img>
        </div>
        ${line("short")}
        <img src="${data.img_dir}how_to_play/back.png" class="button" id="back" onclick="go_back()"></img>
        ${line("short")}
    </div>
    `,
    "settings":
    `
        <div class="window settings">
            <br>
            ${line("long")}
            <img src="${data.img_dir}settings/settings.png" id="settings"></img>
            ${line("long")}
            <br>
            ${line("short")}
            <div id="settings-properties"></div>
            ${line("short")}
            <img src="${data.img_dir}settings/save.png" id="save" class="button" onclick="save_settings()"></img>
            ${line("short")}
        </div>
    `,
    "really-quit":
    `
        <div class="window really-quit really">
            <br>
            ${line("long")}
            <img src="${data.img_dir}quit/really_quit.png" id="ask"></img>
            <div id="buttons">
                <img src="${data.img_dir}quit/cancel.png" id="cancel" class="button" onclick="go_back()"></img>
                <img src="${data.img_dir}quit/quit.png" id="yes" class="button" onclick="quit()"></img>
            </div>
            ${line("long")}
        </div>
    `,
    "really-restart":
    `
        <div class="window really-restart really">
            <br>
            ${line("long")}
            <img src="${data.img_dir}restart/really_restart.png" id="ask"></img>
            <div id="buttons">
                <img src="${data.img_dir}restart/cancel.png" id="cancel" class="button" onclick="go_back()"></img>
                <img src="${data.img_dir}restart/restart.png" id="yes" class="button" onclick="restart()"></img>
            </div>
            ${line("long")}
        </div>
    `,
    "best-scores":
    `
        <div class="window best-scores">
            ${line("long")}
            <img src="${data.img_dir}best_scores/best_scores.png" id="best-scores"></img>
            ${line("long")}
            <div id="score-board"></div>
            ${line("long")}
            ${line("short")}
            <img src="${data.img_dir}how_to_play/back.png" id="back" class="button" onclick="go_back()"></img>
            ${line("short")}
            <div id="clear-box"></div>
        </div>
    `,
}
