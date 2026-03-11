
import { setAutostart } from "./autostart.js";
const { isEnabled } = window.__TAURI__.autostart;

export function startupButtonsLogic() {
    document.getElementById("reset").addEventListener("click", () => location.reload());

    var lesson = parseInt(localStorage.getItem("lesson") || "0", 10);
    var lessonCount = parseInt(sessionStorage.getItem("lessonsCount") || "1", 10);

    const buttonNext = document.getElementById("next");
    const buttonPrevious = document.getElementById("previous");

    if (lesson >= lessonCount) {
        buttonNext.disabled = true;
    }

    if (lesson <= 0) {
        buttonPrevious.disabled = true;
    }

    buttonNext.addEventListener("click", () => changelesson(+1));
    buttonPrevious.addEventListener("click", () => changelesson(-1));

    const buttonAutostart = document.querySelector(".check-button");
    const checkInput = buttonAutostart.querySelector("input");
    isEnabled().then(result => { checkInput.checked = result });
    buttonAutostart.addEventListener("click", () => isEnabled().then(result => { setAutostart(!result) }));

    const buttonEditor = document.getElementById("switch-to-editor");
    const buttonLesson = document.getElementById("switch-to-lesson");
    // const buttonSpeed = document.getElementById("change-speed");

    buttonEditor.addEventListener("click", () => changeToEditor());
    buttonLesson.addEventListener("click", () => changeToLesson());
    // buttonSpeed.addEventListener("click", () => );
}

function changelesson(val) {
    var lesson = parseInt(localStorage.getItem("lesson") || "0", 10);
    var lessonCount = parseInt(sessionStorage.getItem("lessonsCount") || "1", 10);

    lesson = lesson + val;

    if (lesson < 0 || lesson > lessonCount) {
        return;
    }

    localStorage.setItem("lesson", lesson);
    location.reload();
}

function changeToEditor() {
    const editorsArea = document.querySelector(".editors-area");
    // const buttonSwitch = document.getElementById("switch-editors");

    const scrollLeft = editorsArea.scrollLeft;
    const clientWidth = editorsArea.clientWidth;

    
        editorsArea.scrollLeft = 0;
        // buttonSwitch.textContent = "Rewatch the example";
        ace.edit("editor-user").focus();
    
}

export function changeToLesson() {
    const editorsArea = document.querySelector(".editors-area");
    // const buttonSwitch = document.getElementById("switch-editors");

    const scrollLeft = editorsArea.scrollLeft;
    const clientWidth = editorsArea.clientWidth;

    
        editorsArea.scrollLeft = editorsArea.scrollWidth;
        // buttonSwitch.textContent = "Try it out!";
    
}
