const main = ((doc) => {
  function createElement(tag, props, ...children) {
    const element = document.createElement(tag);

    Object.keys(props).forEach(prop => element[prop] = props[prop]);
    if (children.length > 0) {
      children.forEach(child => {
        if (typeof child === "string") {
          child = document.createTextNode(child);
        }
        element.append(child)
      });
    }

    return element;
  }


  function createTodoItem(title) {
    const checkbox = createElement("input", { type: "checkbox", className: "checkbox" });
    const label = createElement("label", { className: "title" }, title);
    const editInput = createElement("input", { className: "textfield", type: "text" })
    const editButton = createElement("button", { className: "edit" }, "Uzmenit")
    const deleteButton = createElement("button", { className: "delete" }, "Udalit");
    const listItem = createElement("li", { className: "todo-item" }, checkbox, label, editInput, editButton, deleteButton);

    bindEvents(listItem);
    return listItem;
  }

  function bindEvents(todoItem) {
    let checkbox = todoItem.querySelector(".checkbox");
    let buttonEdit = todoItem.querySelector("button.edit");
    let buttonDelete = todoItem.querySelector("button.delete");

    checkbox.addEventListener("change", toggleTodoItem);
    buttonEdit.addEventListener("click", editTodoItem);
    buttonDelete.addEventListener("click", deleteTodoItem);
  }


  function addTodoItem(event) {
    event.preventDefault();

    if (addInput.value == "") return alert("BBedi hot chtoto");

    const todoItem = createTodoItem(addInput.value);
    todoList.append(todoItem);
    addInput.value = "";
  }


  function toggleTodoItem(event) {
    const listItem = this.parentNode;
    listItem.classList.toggle("completed");
  }

  function editTodoItem() {
    const listItem = this.parentNode;
    const title = listItem.querySelector(".title");
    const editInput = listItem.querySelector(".textfield");
    const isEditing = listItem.classList.contains("editing");

    if (isEditing) {
      title.innerHTML = editInput.value;
      this.innerHTML = "Uzmenit";
    } else {
      title.innerHTML = title.innerHTML;
      this.innerHTML = "Save";
    }

    listItem.classList.toggle("editing")
  }

  function deleteTodoItem(event) {
    const listItem = this.parentElement;
    listItem.remove()
  }

  const todoForm = document.getElementById("todo-form");
  const addInput = document.getElementById("add-input");
  const todoList = document.getElementById("todo-list");
  const todoItems = document.querySelectorAll(".todo-item");

  function main() {
    todoForm.addEventListener("submit", addTodoItem);
    todoItems.forEach(item => bindEvents(item))
  }

  return main;
})(document);

main();



