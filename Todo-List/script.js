const keyCodeCheck = function () {
  if (window.event.keyCode === 13) {
    const inputValue = document.querySelector("#todo-input").value;
    console.log(inputValue);
  }
};
