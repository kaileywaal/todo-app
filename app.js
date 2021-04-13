

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
        // document.getElementsByClassName("checklist").innerHTML = newTodo;
    }
})

