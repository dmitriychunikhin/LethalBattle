export const createElement = (tagName, classNames) => {
    const el = document.createElement(tagName);
    if (classNames) {
        el.classList.add(classNames);
    }
    return el;
}

export const randomInt = (min, max) => {
    return min + Math.floor(Math.random() * (max - min + 1));
}
