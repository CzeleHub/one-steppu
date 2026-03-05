export function showInputUser(keys) {
    const inputContainer = document.querySelector(".show-input-user");
    for (const key of keys) {
        const span = document.createElement("span");
        span.classList.add("input-user");
        span.textContent = key.value;
        span.dataset.key = key.value;
        span.title = key.tooltip;
        inputContainer.appendChild(span);
    }
}

export function highlightInput(key) {
    const span = document.querySelector("span.input-user[data-key='" + key + "']");
    if (span) {
        span.classList.add("highlight");
        setTimeout(() => {
            span.classList.remove("highlight");
        }, 900);
    }
}