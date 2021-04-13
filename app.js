
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

    let text = document.createTextNode(obj.content);

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
}

function deleteItem() {
    this.parentElement.remove();
    updateItemsRemaining();
}

function toggleCheckbox(checkbox) {
    let parent = (this.tagName === "SPAN") ? this.parentElement : this.parentElement.parentElement;
    parent.classList.toggle("completed");

    //prevents you from adding class to img tag
    let classes = (this.tagName === "SPAN") ? this.classList : this.parentElement.classList;
    if(classes.contains("unchecked")){
        classes.add("checked")
        classes.remove("unchecked");
    }
    else {
        classes.add("unchecked");
        classes.remove("checked");
    }
    updateItemsRemaining();
}

// Filter List







// Determine number of items left
function updateItemsRemaining() {
    let items = document.getElementsByClassName("checklist__item");
    items = Array.from(items);
    items = items.filter(item => item.classList.contains("completed") === false).length;

    let itemsDisplay = document.getElementsByClassName("items-left__number")[0];
    itemsDisplay.innerHTML = items;
}

updateItemsRemaining();