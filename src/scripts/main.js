const { invoke } = window.__TAURI__.core;
import { startupLesson, setSessionStorageLessonCount } from "./lesson.js";
import { startupButtonsLogic, changeToLesson } from "./buttons.js";

var editor = ace.edit("editor-user");
var editor_lesson = ace.edit("editor-lesson");

window.addEventListener("DOMContentLoaded", () => {

  editor.setTheme("ace/theme/twilight");
  editor.session.setMode("ace/mode/javascript");
  editor.setKeyboardHandler("ace/keyboard/vim");

  editor_lesson.setTheme("ace/theme/twilight");
  editor_lesson.session.setMode("ace/mode/javascript");
  editor_lesson.setKeyboardHandler("ace/keyboard/vim");

  // workaround to fix issue with ace centering container on typing
  const editorsArea = document.querySelector(".editors-area");
  editorsArea.style.scrollBehavior = "auto";
  changeToLesson();
  sessionStorage.setItem("interrupt", JSON.stringify(false));
  editorsArea.style.scrollBehavior = "smooth";

  var lesson = parseInt(localStorage.getItem("lesson") || "0", 10);

  startupLesson(lesson);
  startupButtonsLogic();
});


