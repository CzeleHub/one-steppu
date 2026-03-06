
export function showInput(keys) {
    const inputContainer = document.querySelector(".show-input-tutorial");
    const inputUserContainer = document.querySelector(".show-input-user");
    for (const key of keys) {
        const span = document.createElement("span");
        span.classList.add("input");
        span.textContent = key.value;
        span.dataset.key = key.value;
        span.title = key.tooltip;
        inputContainer.appendChild(span);

        const spanUser = document.createElement("span");
        spanUser.classList.add("input-user");
        spanUser.textContent = key.value;
        spanUser.dataset.key = key.value;
        spanUser.title = key.tooltip;
        inputUserContainer.appendChild(spanUser);
    }
}

export function highlightInput(key) {
    const span = document.querySelector("span.input[data-key='" + key + "']");
    if (span) {
        span.classList.add("highlight");
        setTimeout(() => {
            span.classList.remove("highlight");
        }, 900);
    }
}

function highlightUserInput(key) {
    const span = document.querySelector("span.input-user[data-key='" + key + "']");
    if (span) {
        span.classList.add("highlight-user");
    }
}

function removeHighlightUserInput(key) {
    const span = document.querySelector("span.input-user[data-key='" + key + "']");
    if (span) {
        span.classList.remove("highlight-user");
    }
}

var editor = ace.edit("editor-playground");   

editor.textInput.getElement().addEventListener("keydown", (e) => {
    highlightUserInput(e.key);
});

// document.addEventListener("keydown", (e) => {
//     console.log(e.key);
//     highlightUserInput(e.key);
// });

document.addEventListener("keyup", (e) => {
    removeHighlightUserInput(e.key);
});