// Render todos saved in local storage on page load
const getTodosFromStorage = JSON.parse(localStorage.getItem("todos"));
const todos = getTodosFromStorage || [];
const filters = Array.from(document.querySelectorAll(".toggle-states__state"));
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

checkForNoTodos();
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
    displayAllTodos();
    input.value = "";
}

function displayAllTodos(){
    let activeFilter = filters.find(filter => filter.innerHTML = 'All');
    highlightFilterLabel(activeFilter);
    let checklistItems = Array.from(document.querySelectorAll(".checklist__item"));
    checklistItems.forEach(item => { item.style.display = 'flex' });
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
            // store new data
            getTodosFromStorage;
            const index = todos.indexOf(this);
            todos.splice(index, 0, this);
            todos.splice(index, 1);
            localStorage.setItem("todos", JSON.stringify(todos)); 
            displayItemsRemaining();   
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

document.addEventListener('click', displayItemsRemaining);
function displayItemsRemaining() {
    const itemsRemaining = updateItemsRemaining();

    let itemsDisplay = document.querySelector(".items-left__number");
    itemsDisplay.innerHTML = itemsRemaining;

    let itemsDescription = document.querySelector(".items-left__description");
    itemsDescription.innerHTML = itemsRemaining === 1 ? "item left" : "items left";
}


// Filter items
document.addEventListener('click', filterList);
document.addEventListener('keypress', filterList);

function addFilterEventListeners() {
    for(let filter of filters){
        filter.addEventListener('click', highlightFilterLabel);
    }
}

function highlightFilterLabel() {
    let activeFilter = this.innerHTML;
    for(let filter of filters) {
        filter.classList.remove("active");
        if(filter.innerHTML === activeFilter){ 
            filter.classList.add('active');
        }
    }
}

function filterList() {
    let activeFilter = filters.find(filter => filter.classList.contains('active')).innerHTML;
    let checklistItems = Array.from(document.querySelectorAll(".checklist__item"));
    checklistItems.forEach(item => {
        if (activeFilter === "Active") {
            return item.style.display = (item.classList.contains("completed")) ? "none" : "flex";  
        }
        if (activeFilter === "Completed") {
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

//Add 'no todos to display' message when there are none
document.addEventListener('click', checkForNoTodos);

function checkForNoTodos() {
    removeNoTodosMessages();
    const checklistItems = document.querySelectorAll('.checklist__item');
    const activeFilter = filters.find(filter => filter.classList.contains('active')).innerHTML;
    const noTodosMessage = 'You have nothing left to do!';
    const noActiveTodosMessage = 'You have no active todos to display.';
    const noCompletedTodosMessage = 'You have no completed todos to display';
    
        if (activeFilter === "All" && checklistItems.length === 0) {
            addNoTodosMessage(noTodosMessage);
        }

        const activeTodos = todos.filter(todo => todo.completed === false);
        if (activeFilter === "Active" && activeTodos.length === 0) {
            addNoTodosMessage(noActiveTodosMessage);
        }

        const completedTodos = todos.filter(todo => todo.completed === true);
        if (activeFilter === "Completed" && completedTodos.length === 0) {
            addNoTodosMessage(noCompletedTodosMessage);
        }
}


function addNoTodosMessage(message) {
    const li = document.createElement("li");
    li.classList = "no-todos-message";
    document.querySelector(".checklist").appendChild(li);
    li.innerHTML = message
}

function removeNoTodosMessages(){
    const renderedNoTodosMessages = Array.from(document.querySelectorAll('.no-todos-message'));
    renderedNoTodosMessages.map(message => message.remove());
}



//TODO: add animations 
//TODO: add intro todos
//TODO: adjust css styling of first todo in javascript