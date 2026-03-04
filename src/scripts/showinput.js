
export function showInput(keys) {
    const inputContainer = document.querySelector(".show-input");
    for (const key of keys) {
        const span = document.createElement("span");
        span.classList.add("input");
        span.textContent = key.value;
        span.dataset.key = key.value;
        span.title = key.tooltip;
        inputContainer.appendChild(span);
    }
}

export function highlightInput(key) {
    const span = document.querySelector("span[data-key='" + key + "']");
    if (span) {
        span.classList.add("highlight");
        setTimeout(() => {
            span.classList.remove("highlight");
        }, 900);
    }
}