
export function startupButtonsLogic() {
    document.getElementById("reset").addEventListener("click", () => location.reload());

    document.getElementById("next").addEventListener("click", () => changeLesson(+1));
    document.getElementById("previous").addEventListener("click", () => changeLesson(-1));

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