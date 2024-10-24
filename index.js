// JS code
let formBuilder = document.getElementById("form-builder");

// Input element
function createInputElement(id, label, placeholder) {
    let div = document.createElement("div");
    div.className = "form-element";
    div.draggable = true;
    div.id = id;
    div.innerHTML = `
            <label contenteditable="true">${label}</label>
            <input type="text" placeholder="${placeholder}" contenteditable="true" />
            <button onclick="deleteElement('${id}')">Delete</button>
        `;
    enableDragAndDrop(div);
    return div;
}

// Select element
function createSelectElement(id, label, options) {
    let div = document.createElement("div");
    div.className = "form-element";
    div.draggable = true;
    div.id = id;
    let optionsHtml = options
        .map((option) => `<option>${option}</option>`)
        .join("");
    div.innerHTML = `
            <label contenteditable="false">${label}</label>
            <select>${optionsHtml}</select>
            <button onclick="deleteElement('${id}')">Delete</button>
        `;
    enableDragAndDrop(div);
    return div;
}

// Textarea element
function createTextareaElement(id, label, placeholder) {
    let div = document.createElement("div");
    div.className = "form-element";
    div.draggable = true;
    div.id = id;
    div.innerHTML = `
            <label contenteditable="true">${label}</label>
            <textarea placeholder="${placeholder}" contenteditable="true"></textarea>
            <button onclick="deleteElement('${id}')">Delete</button>
        `;
    enableDragAndDrop(div);
    return div;
}

// Input
document
    .getElementById("add-input")
    .addEventListener("click", function () {
        let id = generateId();
        formBuilder.appendChild(
            createInputElement(id, "Sample Label", "Sample placeholder")
        );
    });

// Select
document
    .getElementById("add-select")
    .addEventListener("click", function () {
        let id = generateId();
        formBuilder.appendChild(
            createSelectElement(id, "Select", [
                "Option 1",
                "Option 2",
                "Option 3",
            ])
        );
    });

// Textarea
document
    .getElementById("add-textarea")
    .addEventListener("click", function () {
        let id = generateId();
        formBuilder.appendChild(
            createTextareaElement(id, "Text Area", "Sample placeholder")
        );
    });

// Delete element
function deleteElement(id) {
    let element = document.getElementById(id);
    element.parentNode.removeChild(element);
}

// Generate unique ID
function generateId() {
    return "_" + Math.random().toString(36).substr(3, 7);
}

// Save form to JSON and log to console
document
    .getElementById("save-form")
    .addEventListener("click", function () {
        let elements = formBuilder.querySelectorAll(".form-element");
        let formData = [];
        elements.forEach((el) => {
            let label = el.querySelector("label").textContent;
            let input = el.querySelector("input");
            let select = el.querySelector("select");
            let textarea = el.querySelector("textarea");

            if (input) {
                formData.push({
                    type: "input",
                    label: label,
                    placeholder: input.placeholder,
                });
            } else if (select) {
                let options = Array.from(select.options).map((opt) => opt.value);
                formData.push({
                    type: "select",
                    label: label,
                    options: options,
                });
            } else if (textarea) {
                formData.push({
                    type: "textarea",
                    label: label,
                    placeholder: textarea.placeholder,
                });
            }
        });
        console.log(JSON.stringify(formData, null, 2));
    });

// Enable drag and drop
function enableDragAndDrop(element) {
    element.addEventListener("dragstart", dragStart);
    element.addEventListener("dragover", dragOver);
    element.addEventListener("drop", drop);
}

let dragged;

function dragStart(e) {
    dragged = e.target;
    e.dataTransfer.effectAllowed = "move";
}

function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
}

function drop(e) {
    e.preventDefault();
    if (e.target.className.includes("form-element")) {
        formBuilder.insertBefore(dragged, e.target.nextSibling);
    }
}