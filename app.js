// Render todos saved in local storage on page load
const getTodosFromStorage = JSON.parse(localStorage.getItem("todos"));
const todos = getTodosFromStorage || [];
displayItemsRemaining();

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




// const filters = document.querySelectorAll("toggle-states__state");
// for(let filter of filters)
//     filter.addEventListener('click', filterList);


// function deleteItem() {
//     this.parentElement.remove();
//     updateItemsRemaining();
// }


    // //prevents you from adding class to img tag
    // let classes = (this.tagName === "SPAN") ? this.classList : this.parentElement.classList;
    // if(classes.contains("unchecked")){
    //     classes.add("checked");
    //     classes.remove("unchecked");
    // }
    // else {
    //     classes.add("unchecked");
    //     classes.remove("checked");
    // }

    // let parent = (this.tagName === "SPAN") ? this.parentElement : this.parentElement.parentElement;
    // parent.classList.toggle("completed");
    // updateItemsRemaining();


// Filter List
// function filterList() {
//     let filterButtons = document.getElementsByClassName("toggle-states__state");
//     for(let button of filterButtons) {
//         button.classList.remove("active");
//     }
//     this.classList.add("active");
    

//     let checklistItems = Array.from(document.getElementsByClassName("checklist__item"));
//     if (this.innerHTML === "Active") {
//         checklistItems.forEach(item => {
//             item.style.display = (item.classList.contains("completed")) ? "none" : "flex";
//         })
//     }
//     else if (this.innerHTML === "Completed") {
//         checklistItems.forEach(item => {
//             item.style.display = (item.classList.contains("completed")) ? "flex" : "none";
//         })
//     }
//     else {
//         for(let item of checklistItems)
//            item.style.display = "flex";
//     }
// }


// Clear completed items
// let clearCompletedButton = document.getElementsByClassName("clear-completed")[0];
// clearCompletedButton.addEventListener('click', clearCompleted);

// function clearCompleted() {
//     let completedItems = document.getElementsByClassName("completed");
//     Array.from(completedItems).forEach(item => item.remove());
// }







// updateItemsRemaining();

// Make items sortable
// let el = document.getElementsByClassName('checklist')[0];
// let sortable = Sortable.create(el, {
//     ghostClass: "ghost-class"
//     }
// )