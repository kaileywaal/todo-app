
// Toggle dark mode off and on.
function toggleDarkMode() {
    document.getElementsByTagName("BODY")[0].classList.toggle('dark-mode');
    
    let moon = "images/icon-moon.svg";
    let sun = "images/icon-sun.svg";
    let imageSource = document.getElementsByClassName("toggle__image")[0].src;

    if(imageSource.includes(moon)) 
        document.getElementsByClassName("toggle__image")[0].src = sun;
    else 
        document.getElementsByClassName("toggle__image")[0].src = moon;
}


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
    li.appendChild(span)
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
    console.log(classes);
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
    if (this.innerHTML === "All") {
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
    let items = document.getElementsByClassName("checklist__item");
    items = Array.from(items);
    items = items.filter(item => item.classList.contains("completed") === false).length;

    let itemsDisplay = document.getElementsByClassName("items-left__number")[0];
    itemsDisplay.innerHTML = items;

    let itemsDescription = document.getElementsByClassName("items-left__description")[0];
    itemsDescription.innerHTML = items === 1 ? "item left" : "items left";
}

updateItemsRemaining();

// Make items sortable
let el = document.getElementsByClassName('checklist')[0];
let sortable = Sortable.create(el, {
    ghostClass: "ghost-class"
});