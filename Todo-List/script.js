const keyCodeCheck = function () {
  if (window.event.keyCode === 13) {
    const todoList = document.querySelector("#todo-list");
    const todoInput = document.querySelector("#todo-input");
    const newLi = document.createElement("li");
    const newSpan = document.createElement("span");

    newSpan.textContent = todoInput.value;
    newLi.appendChild(newSpan);
    todoList.appendChild(newLi);
    todoInput.value = "";
  }
};
