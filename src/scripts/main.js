const { invoke } = window.__TAURI__.core;
import { startupLesson, setSessionStorageLessonCount } from "./lesson.js";
import { startupButtonsLogic } from "./buttons.js";

var editor = ace.edit("editor-user");
var editor_lesson = ace.edit("editor-lesson");

window.addEventListener("DOMContentLoaded", () => {

  editor.setTheme("ace/theme/twilight");
  editor.session.setMode("ace/mode/javascript");
  editor.setKeyboardHandler("ace/keyboard/vim");

  editor_lesson.setTheme("ace/theme/twilight");
  editor_lesson.session.setMode("ace/mode/javascript");
  editor_lesson.setKeyboardHandler("ace/keyboard/vim");

  // editor.focus();
  document.querySelector(".editor-user-area").classList.add("display-none");

  setSessionStorageLessonCount();

  var lesson = parseInt(localStorage.getItem("lesson") || "0", 10);

  startupLesson(lesson);
  startupButtonsLogic();

});


