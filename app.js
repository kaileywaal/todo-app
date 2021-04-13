
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
    let checkbox = document.createElement("img");
    checkbox.src = "images/icon-check.svg";
    span.classList = "checkbox unchecked";
    span.appendChild(checkbox);

    let text = document.createTextNode(obj.content);
    li.appendChild(span)
    li.appendChild(text);
    li.className = "checklist__item";

    document.getElementsByClassName("checklist")[0].appendChild(li);
}


let input = document.getElementById("new-todo");
input.addEventListener("keyup", function(event) {
    if(event.key === "Enter") {
        let newTodo = new Todo(input.value);
        input.value = "";
        addTodoToList(newTodo);
    }
})

// Add checked (complete) functionality
addEventListener();

function addEventListener() {
    let checkboxes = document.getElementsByClassName("checkbox");
    for(let checkbox of checkboxes) {
        checkbox.addEventListener('click', toggleCheckbox);
    }
}

function toggleCheckbox(checkbox) {
    //prevents you from adding class to img tag
    let obj = checkbox.target;
    let classes = (obj.tagName === "SPAN") ? obj.classList : obj.parentElement.classList;
    if(classes.contains("unchecked")){
        classes.add("checked")
        classes.remove("unchecked");
    }
    else {
        classes.add("unchecked");
        classes.remove("checked");
    }
}












// Delete Items







// Filter List







// Determine number of items left