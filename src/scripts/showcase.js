
var editor = ace.edit("editor-showcase");
export async function startupShowcase() {

    await repeatInputSequence(templates[0]);
}

async function repeatInputSequence(template) {
    while (true) {
        editor.setValue(template.code);
        editor.moveCursorTo(...template.cursor);

        //editor needs time to configure itself..
        await sleep(1000);

        // set vim normal mode
        editor.onTextInput(template.vim_mode);

        //editor needs time to configure itself.. again
        await sleep(1000);

        await doInputSequence(template.input);
    }
}

async function doInputSequence(chars) {
    for (const char of chars) {
        doInput(char);
        await sleep(1000);
    }
}


function doInput(char) {
    editor.onTextInput(char);
}

async function sleep(ms) {
    await new Promise(r => setTimeout(r, ms));
}

// setInterval(() => {
//     editor_showcase.onTextInput(char);

//     //     var cm = editor.state.cm;
//     //  editor.$vimModeHandler.actions.enterInsertMode(cm, {}, cm.state.vim);
// }, 1000);

const templates = [
    {
        code: "function isJavaScriptGood() {\n" +
            "    return \"\";\n" +
            "}",
        input: ['j', 'w', 'w', 'l', 'i', 'n', 'o'],
        cursor: [0, 0],
        vim_mode: "esc" //NORMAL
    }
];