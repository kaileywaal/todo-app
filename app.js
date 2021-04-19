// Render todos saved in local storage on page load
const getTodosFromStorage = JSON.parse(localStorage.getItem("todos"));
const todos = getTodosFromStorage || [];
displayItemsRemaining();
addFilterEventListeners();

// Toggle dark mode on page load
localStorage.getItem('theme') === 'dark-mode' ? setTheme('dark-mode') : setTheme('light-mode');

// Store todos array
localStorage.setItem("todos", JSON.stringify(todos));


renderTodos(todos);
function renderTodos(array) {
     array.forEach(todo => {
         todo = new Todo(todo.content, todo.completed);
         todo.render();
    })
}

// Dark mode functionality
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
    document.getElementsByClassName("toggle__image")[0].src = themeName === 'light-mode' ? "images/icon-moon.svg" : "images/icon-sun.svg";
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

// Add todo list object and render it in the DOM   
const input = document.querySelector("#new-todo");
const submitButton = document.querySelector('.input__submit');

input.addEventListener("keyup", function(event) {
    if(event.key !== "Enter") return;
    event.preventDefault();
    addTodo(input.value);
});

submitButton.addEventListener("click", function(event){
    event.preventDefault();
    addTodo(input.value);
});

function addTodo(inputValue){
    if (inputValue.length === 0) return;
    let newTodo = new Todo(inputValue);
    newTodo.render();
    getTodosFromStorage;
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    displayItemsRemaining();
    input.value = "";
}

function Todo(content, completed = false) {
    this.content = content;
    this.completed = completed;
    this.rendered = false;

    this.render = function() {
        if (this.rendered === false) {
            this.li = document.createElement("li");
            document.querySelector(".checklist").appendChild(this.li);
        
            this.span = document.createElement("span");
            this.li.appendChild(this.span);
        
            this.checkbox = document.createElement("img");
            this.checkbox.src = "images/icon-check.svg";
            this.span.appendChild(this.checkbox);
        
            this.text = document.createElement("p");
            this.text.innerHTML = this.content;
            this.text.setAttribute("contenteditable", true);
            this.li.appendChild(this.text);
        
            this.deleteButton = document.createElement("span");
            this.deleteButton.classList = "checklist__item--delete";
            this.li.appendChild(this.deleteButton);

            this.rendered = true;
        }

        this.span.addEventListener('click', this);
        this.deleteButton.addEventListener('click', this);

        this.checkedClass = (this.completed === false) ? "unchecked" : "checked";
        this.completeClass = (this.completed === true) ? "completed" : "";

        this.span.classList = "checkbox " + this.checkedClass;
        this.li.className = "checklist__item " + this.completeClass;  
    }

    this.handleEvent = function(event) {
        if (event.target.classList.contains('checkbox')) {
            this.completed = (this.completed === true) ? false : true;
            this.render();
            displayItemsRemaining();
            // store new data
            getTodosFromStorage;
            const index = todos.indexOf(this);
            todos.splice(index, 0, this);
            todos.splice(index, 1);
            localStorage.setItem("todos", JSON.stringify(todos));    
        }

        if (event.target.classList.contains('checklist__item--delete')){
            event.target.parentElement.remove();
            //remove from local storage
            getTodosFromStorage;
            let index = todos.indexOf(this);
            todos.splice(index, 1);
            localStorage.setItem("todos", JSON.stringify(todos)); 
            displayItemsRemaining();
        }
    }
}

// Update and display items remaining
function updateItemsRemaining() {
    getTodosFromStorage;
    return todos.filter(item => item.completed === false).length;
}

function displayItemsRemaining() {
    const itemsRemaining = updateItemsRemaining();

    let itemsDisplay = document.querySelector(".items-left__number");
    itemsDisplay.innerHTML = itemsRemaining;

    let itemsDescription = document.querySelector(".items-left__description");
    itemsDescription.innerHTML = itemsRemaining === 1 ? "item left" : "items left";
}


// Filter items
function addFilterEventListeners() {
    const filters = Array.from(document.querySelectorAll(".toggle-states__state"));
    for(let filter of filters){
        filter.addEventListener('click', filterList);
    }
}

function highlightFilterLabel(clickedElement) {
    console.log(clickedElement);
    const filters = Array.from(document.querySelectorAll(".toggle-states__state"));
    let activeFilter = clickedElement.innerHTML;
    for(let filter of filters) {
        filter.classList.remove("active");
        if(filter.innerHTML === activeFilter){ 
            filter.classList.add('active');
        }
    }
}

function filterList() {
    highlightFilterLabel(this);
    let checklistItems = Array.from(document.querySelectorAll(".checklist__item"));
    checklistItems.forEach(item => {
        if (this.innerHTML === "Active") {
            return item.style.display = (item.classList.contains("completed")) ? "none" : "flex";  
        }
        if (this.innerHTML === "Completed") {
            return item.style.display = (item.classList.contains("completed")) ? "flex" : "none";
        } 
        else item.style.display = "flex";
        }
    )
}

// Clear completed items

const clearCompletedButton = document.querySelector(".clear-completed");
clearCompletedButton.addEventListener('click', clearCompleted);

function clearCompleted() {
    for(let todo of todos) {
        if (todo.completed === true){
            getTodosFromStorage;
            let index = todos.indexOf(todo);
            todos.splice(index, 1);
            todo.li.remove();
            localStorage.setItem("todos", JSON.stringify(todos));
            displayItemsRemaining();
        }
    } 
}

// Make items sortable
let el = document.getElementsByClassName('checklist')[0];
let sortable = Sortable.create(el, {
    ghostClass: "ghost-class"
    }
)

//TODO: add 'no todos to display' message when there are none'