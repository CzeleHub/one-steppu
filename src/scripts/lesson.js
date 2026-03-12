const { invoke } = window.__TAURI__.core;
import { showInput, highlightInput } from "./input.js";

var editor = ace.edit("editor-lesson");
var editorUser = ace.edit("editor-user");

var lessons;

export async function startupLesson(lesson) {
    lessons = await invoke("get_lessons", {  })
    setSessionStorageLessonCount();
    await repeatInputSequence(lessons[lesson]);
}

async function repeatInputSequence(template) {
    const spanTitle = document.querySelector(".lesson-title>span");
    const spanInstruction = document.querySelector("#instruction");

    var lesson = parseInt(localStorage.getItem("lesson") || "0", 10) + 1;
    // spanInstruction.textContent = template.instruction;


    for (const key of template.keys) {
        const div = document.createElement("div");
        const spanStart = document.createElement("span");
        const spanEnd = document.createElement("span");
        const spanSmallInput = document.createElement("span");

        spanSmallInput.classList.add("small-input");

        spanSmallInput.textContent = key.value;
        spanStart.textContent = "Use ";
        spanEnd.textContent = " key to " + key.tooltip;

        div.appendChild(spanStart);
        div.appendChild(spanSmallInput);
        div.appendChild(spanEnd);
        spanInstruction.appendChild(div);
    }

    spanTitle.textContent = "#" + lesson + " " + template.title;

    editorUser.setValue(template.code, -1);

    showInput(template.keys);

    editor.session.setMode(template.language);
    editorUser.session.setMode(template.language);

    document.querySelector("#editor-lesson").querySelector(".ace_cursor-layer").classList.remove("ace_hidden-cursors");

    while (true) {
        editor.setValue(template.code, -1);
        editor.moveCursorTo(...template.cursor);

        //editor needs time to configure itself..
        await sleep(500);

        // set vim mode
        editor.onTextInput("esc");

        //editor needs time to configure itself.. again
        await sleep(500);

        //start animation
        playlessonProgressAnimation(template.input.length, 100);

        // do input sequence
        await doInputSequence(template.input);
        // reset animation
        playlessonProgressAnimation(0, 0);
    }
}

async function doInputSequence(chars) {
    for (const char of chars) {
        var doBreak = false;
        doInput(char);
        highlightInput(char);
        for (let index = 0; index < 10; index++) {
            const interrupted = JSON.parse(sessionStorage.getItem("interrupt") ?? "false");
            if (interrupted) {
                sessionStorage.setItem("interrupt", JSON.stringify(false));
                doBreak = true;
                break;
            }
            await sleep(200);
        }
        if (doBreak) {
            break;
        }
    }
}


function doInput(char) {
    editor.onTextInput(char);
}

async function sleep(ms) {
    await new Promise(r => setTimeout(r, ms));
}

const shwocaseProgress = document.getElementById("editor-lesson");

function playlessonProgressAnimation(seconds, percent) {
    const modifier = 2;
    seconds = modifier * seconds;
    shwocaseProgress.style.setProperty("--duration", seconds + "s");
    shwocaseProgress.style.setProperty("--progress-width", percent + "%");
}


// setInterval(() => {
//     editor_lesson.onTextInput(char);

//     //     var cm = editor.state.cm;
//     //  editor.$vimModeHandler.actions.enterInsertMode(cm, {}, cm.state.vim);
// }, 1000);

export function setSessionStorageLessonCount() {
    sessionStorage.setItem("lessonsCount", lessons.length - 1);
}