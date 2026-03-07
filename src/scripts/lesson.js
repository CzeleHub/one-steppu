import { showInput, highlightInput } from "./input.js";

var editor = ace.edit("editor-showcase");
var editorPlayground = ace.edit("editor-playground");

export async function startupShowcase(lesson) {
    await repeatInputSequence(templates[lesson]);
}

async function repeatInputSequence(template) {
    const spanTitle = document.querySelector(".lesson-title>span");
    const spanInstruction = document.querySelector("#instruction");

    var lesson = parseInt(localStorage.getItem("lesson") || "0", 10) + 1;
    spanInstruction.textContent = template.instruction;
    spanTitle.textContent = "#" + lesson + " " + template.title;

    editorPlayground.setValue(template.code, -1);

    showInput(template.keys);

    editor.session.setMode(template.language);
    editorPlayground.session.setMode(template.language);

    document.querySelector("#editor-showcase").querySelector(".ace_cursor-layer").classList.remove("ace_hidden-cursors");

    while (true) {
        editor.setValue(template.code, -1);
        editor.moveCursorTo(...template.cursor);

        //editor needs time to configure itself..
        await sleep(1000);

        // set vim mode
        editor.onTextInput("esc");
        
        //editor needs time to configure itself.. again
        await sleep(1000);

        //start animation
        playShowcaseProgressAnimation(template.input.length, 100);

        // do input sequence
        await doInputSequence(template.input);
        // reset animation
        playShowcaseProgressAnimation(0, 0);
    }
}

async function doInputSequence(chars) {
    for (const char of chars) {
        doInput(char);
        highlightInput(char);
        await sleep(2000);
    }
}


function doInput(char) {
    editor.onTextInput(char);
}

async function sleep(ms) {
    await new Promise(r => setTimeout(r, ms));
}

const shwocaseProgress = document.getElementById("editor-showcase");

function playShowcaseProgressAnimation(seconds, percent) {
    const modifier = 2;
    seconds = modifier * seconds;
    shwocaseProgress.style.setProperty("--duration", seconds + "s");
    shwocaseProgress.style.setProperty("--progress-width", percent + "%");
}


// setInterval(() => {
//     editor_showcase.onTextInput(char);

//     //     var cm = editor.state.cm;
//     //  editor.$vimModeHandler.actions.enterInsertMode(cm, {}, cm.state.vim);
// }, 1000);

export function setSessionStorageLessonCount() {
    sessionStorage.setItem("lessonsCount", templates.length - 1);
}

const templates = [
    {
        title: "Vim - Basic Navigation",
        instruction: "Use h j k l keys to navigate text in NORMAL mode",
        keys: [
            { value: "h", tooltip: "move cursor left" },
            { value: "j", tooltip: "move cursor down" },
            { value: "k", tooltip: "move cursor up" },
            { value: "l", tooltip: "move cursor right" },
        ],
        code: "let arr: [[i32; 5]; 5] = [\n" +
            "    [0, 1, 2, 3, 4],\n" +
            "    [5, 6, 7, 8, 9],\n" +
            "    [0, 1, 2, 3, 4],\n" +
            "    [5, 6, 7, 8, 9],\n" +
            "    [0, 1, 2, 3, 4],\n" +
            "];",
        input: ['j', 'j', 'k', 'l', 'l', 'k', 'h', 'h'],
        cursor: [3, 11],
        language: "ace/mode/rust"
    },
    {
        title: "Vim - Basic Navigation",
        instruction: "Use H M L keys to navigate text in NORMAL mode",
        keys: [
            { value: "H", tooltip: "move cursor to top of editor" },
            { value: "M", tooltip: "move cursor to middle of editor" },
            { value: "L", tooltip: "move cursor to bottom of editor" },
        ],
        code: "let arr: [[i32; 5]; 5] = [\n" +
            "    [0, 1, 2, 3, 4],\n" +
            "    [5, 6, 7, 8, 9],\n" +
            "    [0, 1, 2, 3, 4],\n" +
            "    [5, 6, 7, 8, 9],\n" +
            "    [0, 1, 2, 3, 4],\n" +
            "];",
        input: ['H', 'M', 'L'],
        cursor: [2, 11],
        language: "ace/mode/rust"
    }
];