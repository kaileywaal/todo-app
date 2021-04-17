// Render todos saved in local storage on page load
let todos = JSON.parse(localStorage.getItem("todos")) || [];
//|| [ 
    // {
    //     "content": "Toggle between light and dark mode",
    //     "completed": false
    // },
    // {
    //     "content": "Add your first item in the text box above!",
    //     "completed": false
    // }
//];


renderTodos(todos);
localStorage.setItem("todos", JSON.stringify(todos));

function renderTodos(array) {
     array.forEach(todo => {
        todo.rendered = false;
        //add render function to todos on page load so they can change with click functions.
        todo.render = function() {
            if (todo.rendered === false ) {
                todo.li = document.createElement("li");
                document.getElementsByClassName("checklist")[0].appendChild(todo.li);
                
                todo.span = document.createElement("span");
                todo.li.appendChild(todo.span);
                
                todo.checkbox = document.createElement("img");
                todo.checkbox.src = "images/icon-check.svg";
                todo.span.appendChild(todo.checkbox);
                
                todo.text = document.createElement("p");
                todo.text.innerHTML = todo.content;
                todo.text.setAttribute("contenteditable", true);
                todo.li.appendChild(todo.text);
                
                todo.deleteButton = document.createElement("span");
                todo.deleteButton.classList = "checklist__item--delete";
                todo.li.appendChild(todo.deleteButton);
        
                todo.rendered = true;
            }

            todo.span.addEventListener('click', this);
            todo.deleteButton.addEventListener('click', this);

            todo.checkedClass = (todo.completed === false) ? "unchecked" : "checked";
            todo.completeClass = (todo.completed === true) ? "completed" : "";
    
            todo.span.classList = "checkbox " + todo.checkedClass;
            todo.li.className = "checklist__item " + todo.completeClass; 
        }

        todo.handleEvent = function(event) {
            if (event.target.classList.contains('checkbox')) {
                this.completed = (this.completed === true) ? false : true;
                this.render();
                //store new data
                JSON.parse(localStorage.getItem('todos'));
                let index = todos.indexOf(this);
                todos.splice(index, 1);
                todos.splice(index, 0, this);
                localStorage.setItem("todos", JSON.stringify(todos)); 
                JSON.parse(localStorage.getItem('todos'));       
            }
            if (event.target.classList.contains('checklist__item--delete')){
                event.target.parentElement.remove();
                //remove from local storage
                JSON.parse(localStorage.getItem('todos'));
                let index = todos.indexOf(this);
                todos.splice(index, 1);
                localStorage.setItem("todos", JSON.stringify(todos)); 
            }
        }

        todo.render();
    })
}


// Toggle dark mode
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

(function () {
    localStorage.getItem('theme') === 'dark-mode' ? setTheme('dark-mode') : setTheme('light-mode');
})();


// Add todo list object and render it in the DOM   
const input = document.getElementById("new-todo");
const submitButton = document.getElementsByClassName('input__submit')[0];

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
    JSON.parse(localStorage.getItem('todos'));
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    //addListeners();
    //updateItemsRemaining();
    input.value = "";
}

function Todo(content) {
    this.content = content;
    this.completed = false;
    this.rendered = false;

    this.render = function() {
        if (this.rendered === false) {
            this.li = document.createElement("li");
            document.getElementsByClassName("checklist")[0].appendChild(this.li);
        
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
}

Todo.prototype.handleEvent = function(event) {
    if (event.target.classList.contains('checkbox')) {
        this.completed = (this.completed === true) ? false : true;
        this.render();
        //store new data
        JSON.parse(localStorage.getItem('todos'));
        let index = todos.indexOf(this);
        todos.splice(index, 1);
        todos.splice(index, 0, this);
        localStorage.setItem("todos", JSON.stringify(todos)); 
        JSON.parse(localStorage.getItem('todos'));       
    }
    if (event.target.classList.contains('checklist__item--delete')){
        event.target.parentElement.remove();
        //remove from local storage
        JSON.parse(localStorage.getItem('todos'));
        let index = todos.indexOf(this);
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos)); 
    }
}


//Todo.addEventListener('click', console.log(this));
// Add checked and delete listeners
// addListeners();
// function addListeners() {
//     let checkboxes = document.getElementsByClassName("checkbox");
//     for(let checkbox of checkboxes) {
//         checkbox.addEventListener('click', toggleCheckbox);
//     }

//     let deleteButtons = document.getElementsByClassName("checklist__item--delete");
//     for(let button of deleteButtons)
//         button.addEventListener("click", deleteItem);

//     let filters = document.getElementsByClassName("toggle-states__state");
//     for(let filter of filters)
//         filter.addEventListener('click', filterList);
// }

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


// Determine number of items left
// function updateItemsRemaining() {
//     let items = Array.from(document.getElementsByClassName("checklist__item"));
//     let numberOfItems = items.filter(item => item.classList.contains("completed") === false).length;

//     let itemsDisplay = document.getElementsByClassName("items-left__number")[0];
//     itemsDisplay.innerHTML = numberOfItems;

//     let itemsDescription = document.getElementsByClassName("items-left__description")[0];
//     itemsDescription.innerHTML = numberOfItems === 1 ? "item left" : "items left";
// }

// updateItemsRemaining();

// Make items sortable
// let el = document.getElementsByClassName('checklist')[0];
// let sortable = Sortable.create(el, {
//     ghostClass: "ghost-class"
//     }
// )