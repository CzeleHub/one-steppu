
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

    buttonNext.addEventListener("click", () => changeLesson(+1));
    buttonPrevious.addEventListener("click", () => changeLesson(-1));

    const buttonAutostart = document.querySelector(".check-button");
    const checkInput = buttonAutostart.querySelector("input");
    isEnabled().then(result => {checkInput.checked = result});
    buttonAutostart.addEventListener("click", () => isEnabled().then(result => {setAutostart(!result)}));
}

function changeLesson(val) {
    var lesson = parseInt(localStorage.getItem("lesson") || "0", 10);
    var lessonCount = parseInt(sessionStorage.getItem("lessonsCount") || "1", 10);

    lesson = lesson + val;

    if (lesson < 0 || lesson > lessonCount)
    {
        return;
    }

    localStorage.setItem("lesson", lesson);
    location.reload();
}
