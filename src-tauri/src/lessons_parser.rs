use serde::{Deserialize, Serialize};

#[derive(Deserialize, Debug)]
struct Lessons {
    lessons: Vec<Lesson>,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Lesson {
    title: String,
    code: String,
    input: Vec<String>,
    cursor: Vec<i32>,
    language: String,
    keys: Vec<Key>,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Key {
    value: String,
    tooltip: String,
}

#[tauri::command]
pub fn get_lessons() -> Vec<Lesson> {
    let toml_str = include_str!("../lessons/vim.toml");
    let parsed: Lessons = toml::from_str(toml_str).unwrap();
    parsed.lessons
}
