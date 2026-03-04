
export function showInput(input) {
    const inputContainer = document.querySelector(".show-input");
    const uniqueInputSet = [...new Set(input)];
    const uniqueInput = [...uniqueInputSet]; //todo sort by qwerty?
    for (const i of uniqueInput) {
        const span = document.createElement("span");
        span.classList.add("input");
        span.textContent = i;
        span.dataset.input = i;
        inputContainer.appendChild(span);
    }
}

export function highlightInput(input) {
    const span = document.querySelector("span[data-input='" + input + "']");
    span.classList.add("highlight");
    setTimeout(() => {
        span.classList.remove("highlight");
    }, 900);
}