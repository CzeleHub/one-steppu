const { enable, isEnabled, disable } = window.__TAURI__.autostart;

export async function setAutostart(bool) {
    if (bool) {
        // Enable autostart
        await enable();
        // Check enable state
        console.log(`registered for autostart? ${await isEnabled()}`);
    } else {
        // Disable autostart
        disable();
        // Check enable state
        console.log(`registered for autostart? ${await isEnabled()}`);
    }
}



