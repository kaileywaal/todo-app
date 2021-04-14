
// Toggle dark mode off and on.
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    console.log(themeName);
    document.documentElement.className = themeName;
}

function setSunAndMoon(sunOrMoon){
    const moonIcon = "images/icon-moon.svg";
    const sunIcon = "images/icon-sun.svg";
    document.getElementsByClassName("toggle__image")[0].src = (sunOrMoon === "sun") ? sunIcon : moonIcon;
}

function toggleTheme() {
    const test = localStorage.getItem('theme') === 'dark-mode';

    test ? setTheme('light-mode') : setTheme('dark-mode');
    test ? setSunAndMoon('moon') : setSunAndMoon('sun');
}

(function () {
    localStorage.getItem('theme') === 'dark-mode' ? setTheme('dark-mode') : setTheme('light-mode');
})();


// Add todo list item

function Todo(content) {
    this.status = "active",
    this.content = content;
}

function addTodoToList(obj){
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.classList = "checkbox unchecked";

    let checkbox = document.createElement("img");
    checkbox.src = "images/icon-check.svg";
    span.appendChild(checkbox);

    let text = document.createElement("p");
    text.innerHTML = obj.content;
    text.setAttribute("contenteditable", true);

    let deleteButton = document.createElement("span");
    deleteButton.classList = "checklist__item--delete";
    li.appendChild(span);
    li.appendChild(text);
    li.appendChild(deleteButton);
    li.className = "checklist__item";

    document.getElementsByClassName("checklist")[0].appendChild(li);
}

let input = document.getElementById("new-todo");
input.addEventListener("keyup", function(event) {
    if(event.key === "Enter") {
        if (input.value.length === 0) return;
        let newTodo = new Todo(input.value);
        input.value = "";
        addTodoToList(newTodo);
        addListeners();
        updateItemsRemaining();
    }
})


// Add checked and delete listeners
addListeners();
function addListeners() {
    let checkboxes = document.getElementsByClassName("checkbox");
    for(let checkbox of checkboxes) {
        checkbox.addEventListener('click', toggleCheckbox);
    }

    let deleteButtons = document.getElementsByClassName("checklist__item--delete");
    for(let button of deleteButtons)
        button.addEventListener("click", deleteItem);

    let filters = document.getElementsByClassName("toggle-states__state");
    for(let filter of filters)
        filter.addEventListener('click', filterList);
}

function deleteItem() {
    this.parentElement.remove();
    updateItemsRemaining();
}

function toggleCheckbox(checkbox) {
    //prevents you from adding class to img tag
    let classes = (this.tagName === "SPAN") ? this.classList : this.parentElement.classList;
    if(classes.contains("unchecked")){
        classes.add("checked");
        classes.remove("unchecked");
    }
    else {
        classes.add("unchecked");
        classes.remove("checked");
    }

    let parent = (this.tagName === "SPAN") ? this.parentElement : this.parentElement.parentElement;
    parent.classList.toggle("completed");
    updateItemsRemaining();
}


// Filter List
function filterList() {
    let filterButtons = document.getElementsByClassName("toggle-states__state");
    for(let button of filterButtons) {
        button.classList.remove("active");
    }
    this.classList.add("active");
    

    let checklistItems = Array.from(document.getElementsByClassName("checklist__item"));
    if (this.innerHTML === "Active") {
        checklistItems.forEach(item => {
            item.style.display = (item.classList.contains("completed")) ? "none" : "flex";
        })
    }
    else if (this.innerHTML === "Completed") {
        checklistItems.forEach(item => {
            item.style.display = (item.classList.contains("completed")) ? "flex" : "none";
        })
    }
    else {
        for(let item of checklistItems)
           item.style.display = "flex";
    }
}


// Clear completed items
let clearCompletedButton = document.getElementsByClassName("clear-completed")[0];
clearCompletedButton.addEventListener('click', clearCompleted);

function clearCompleted() {
    let completedItems = document.getElementsByClassName("completed");
    Array.from(completedItems).forEach(item => item.remove());
}


// Determine number of items left
function updateItemsRemaining() {
    let items = Array.from(document.getElementsByClassName("checklist__item"));
    let numberOfItems = items.filter(item => item.classList.contains("completed") === false).length;

    let itemsDisplay = document.getElementsByClassName("items-left__number")[0];
    itemsDisplay.innerHTML = numberOfItems;

    let itemsDescription = document.getElementsByClassName("items-left__description")[0];
    itemsDescription.innerHTML = numberOfItems === 1 ? "item left" : "items left";
}

updateItemsRemaining();

// Make items sortable
let el = document.getElementsByClassName('checklist')[0];
let sortable = Sortable.create(el, {
    ghostClass: "ghost-class"
});