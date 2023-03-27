View the live version here: https://kaileywaal.github.io/todo-app/

Welcome to my todo app!

This is my solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW).

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Built with

- Object Oriented Vanilla JavaScript
- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- Local Storage
- [SortableJS](https://github.com/SortableJS/Sortable) - Sortable library for drag and drop functionality

### What I learned

With my first implementation of the app there was no way to store any of the essential data associated with each todo item. This meant that when the page was refreshed, it reverted back to it's initial state.

To remedy this, I needed to implement some sort of local backend. This required me to learn two main things:

1. How to add and retrieve items from local storage.
2. How to manipulate rendered objects.

The first was pretty simple, but the second proved to be a bit more of a challenge. It required a complete overhaul of my initial code. Rather than targeting the rendered elements, I needed to target the object behind those and manipulate its properties. Then I needed to adjust the styles accordingly.

The below code shows how I achieved this.

```js
function Todo(content, completed = false) {
  this.content = content;
  this.completed = completed;
  this.rendered = false;

  this.render = function () {
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

    this.span.addEventListener("click", this);
    this.deleteButton.addEventListener("click", this);

    this.checkedClass = this.completed === false ? "unchecked" : "checked";
    this.completeClass = this.completed === true ? "completed" : "";

    this.span.classList = "checkbox " + this.checkedClass;
    this.li.className = "checklist__item " + this.completeClass;
  };

  this.handleEvent = function (event) {
    if (event.target.classList.contains("checkbox")) {
      this.completed = this.completed === true ? false : true;
      this.render();
      displayItemsRemaining();
      // store new data
      getTodosFromStorage;
      const index = todos.indexOf(this);
      todos.splice(index, 0, this);
      todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
    }

    if (event.target.classList.contains("checklist__item--delete")) {
      event.target.parentElement.remove();
      //remove from local storage
      getTodosFromStorage;
      let index = todos.indexOf(this);
      todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
      displayItemsRemaining();
    }
  };
}
```

This object constructor function does several things at once. It defines a few essential properties (namely, the todo content and whether it is completed). It also renders the object to the DOM based on these properties. Finally, it creates event listeners and event handlers that allow events to target the object itself rather than targeting the rendered element.

### Useful resources

- [Rounded linear gradient on hover](https://gist.github.com/stereokai/36dc0095b9d24ce93b045e2ddc60d7a0#file-gistfile1-txt) - Linear gradients can be used borders, but they are not compatible with a border radius. This article helped me figure out how to make a round linear gradient border for the checkboxes.

- [CSS Previous sibling selectors](https://medium.com/free-code-camp/how-to-make-the-impossible-possible-in-css-with-a-little-creativity-bd96bb42b29d) - This article explained how to select ALL of an element's siblings, even the ones that come before it. I used it to figure out how to make all the non-hovered-over close buttons disappear.

- [Dark and light theme switcher](https://medium.com/@haxzie/dark-and-light-theme-switcher-using-css-variables-and-pure-javascript-zocada-dd0059d72fa2) - Showed me a better way to switch themes. Whereas before I was toggling a class on the body, this explained how to change it in local storage. Also helped condense my CSS as it no longer required multiple selectors (ie item & .dark-mode .item).

- [Bi-directional data binding in vanilla JavaScript ](https://stackoverflow.com/questions/16483560/how-to-implement-dom-data-binding-in-javascript) - I had trouble initially figuring out how to edit the properties of an object after it had been rendered in the DOM. The first answer on this Stack Overflow explained how to add an event listener to an object so that any events on the rendered JavaScript object will update the object properties.
