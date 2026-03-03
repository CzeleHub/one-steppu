const { invoke } = window.__TAURI__.core;
import { startupShowcase } from "./showcase.js";

var editor = ace.edit("editor-playground");
var editor_showcase = ace.edit("editor-showcase");

window.addEventListener("DOMContentLoaded", () => {

  editor.setTheme("ace/theme/twilight");
  editor.session.setMode("ace/mode/javascript");
  editor.setKeyboardHandler("ace/keyboard/vim");

  editor_showcase.setTheme("ace/theme/twilight");
  editor_showcase.session.setMode("ace/mode/javascript");
  editor_showcase.setKeyboardHandler("ace/keyboard/vim");

  startupShowcase();

});


