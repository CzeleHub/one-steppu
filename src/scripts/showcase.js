import { showInput, highlightInput } from "./showinput.js";

var editor = ace.edit("editor-showcase");
var editorPlayground = ace.edit("editor-playground");
export async function startupShowcase() {

    await repeatInputSequence(templates[0]);
}

async function repeatInputSequence(template) {
    const spanTitle = document.querySelector(".lesson-title>span");
    const spanInstruction = document.querySelector("#instruction");
    
    spanInstruction.textContent = template.instruction;
    spanTitle.textContent = template.title;

    editorPlayground.setValue(template.code, -1);
    showInput(template.keys);
    editor.session.setMode(template.language);
    editorPlayground.session.setMode(template.language);
    while (true) {
        editor.setValue(template.code, -1);
        editor.moveCursorTo(...template.cursor);

        //editor needs time to configure itself..
        await sleep(1000);

        // set vim normal mode
        editor.onTextInput(template.vim_mode);

        //editor needs time to configure itself.. again
        await sleep(1000);
        playShowcaseProgressAnimation(template.input.length,100);
        await doInputSequence(template.input);
        playShowcaseProgressAnimation(0,0);
    }
}

async function doInputSequence(chars) {
    for (const char of chars) {
        doInput(char);
        highlightInput(char);
        await sleep(1000);
    }
}


function doInput(char) {
    editor.onTextInput(char);
}

async function sleep(ms) {
    await new Promise(r => setTimeout(r, ms));
}

const shwocaseProgress = document.getElementById("editor-showcase");

function playShowcaseProgressAnimation(seconds,percent) {
  shwocaseProgress.style.setProperty("--duration", seconds + "s");
  shwocaseProgress.style.setProperty("--progress-width", percent + "%");
}


// setInterval(() => {
//     editor_showcase.onTextInput(char);

//     //     var cm = editor.state.cm;
//     //  editor.$vimModeHandler.actions.enterInsertMode(cm, {}, cm.state.vim);
// }, 1000);

const templates = [
    {
        title: "# Vim - Basic Navigation",
        instruction: "Use h j k l keys to navigate text in NORMAL mode",
        keys: [
            { value: "h", tooltip: "move left" },
            { value: "j", tooltip: "move down" },
            { value: "k", tooltip: "move up" },
            { value: "l", tooltip: "move right" },
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
        vim_mode: "esc", //NORMAL
        language: "ace/mode/rust"
    }
];