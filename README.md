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

- Vanilla JavaScript
- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- [SortableJS](https://github.com/SortableJS/Sortable) - Sortable library for drag and drop functionality

### Useful resources

- [Rounded linear gradient on hover](https://gist.github.com/stereokai/36dc0095b9d24ce93b045e2ddc60d7a0#file-gistfile1-txt) - Linear gradients can be used borders, but they are not compatible with a border radius. This article helped me figure out how to make a round linear gradient border for the checkboxes.

- [CSS Previous sibling selectors](https://medium.com/free-code-camp/how-to-make-the-impossible-possible-in-css-with-a-little-creativity-bd96bb42b29d) - This article explained how to select ALL of an element's siblings, even the ones that come before it. I used it to figure out how to make all the non-hovered-over close buttons disappear.

- [Dark and light theme switcher](https://medium.com/@haxzie/dark-and-light-theme-switcher-using-css-variables-and-pure-javascript-zocada-dd0059d72fa2) - Showed me a better way to switch themes. Whereas before I was toggling a class on the body, this explained how to change it in local storage. Also helped condense my CSS as it no longer required multiple selectors (ie item & .dark-mode .item).
