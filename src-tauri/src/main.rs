// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    // see https://forums.developer.nvidia.com/t/webkit-tauri-application-white-screen-on-dgx-spark-gpupermission-issues/348741/2
    std::env::set_var("WEBKIT_DISABLE_DMABUF_RENDERER", "1");

    onesteppu_lib::run()
}
