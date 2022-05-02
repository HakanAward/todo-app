const input = document.getElementById("todo");
const button = document.getElementById("add");
const todoList = document.getElementById("todoList");

const main = () => {
  button.addEventListener("click", () => {
    if (input.value != "") {
      if (!localStorage.getItem("todos").includes(input.value)) {
        createTodo(input.value);
        addTodo(input.value.trim());
      }
    }
    input.value = "";
  });
  window.onload = () => {
    const todos = getTodosFromLocalStorage();
    todos.forEach((value) => {
      createTodo(value);
    });
  };
};

const createTodo = (value) => {
  const todo = document.createElement("li");
  const removeButton = document.createElement("button");
  removeButton.innerText = "X";
  removeButton.onclick = () => {
    let todos = getTodosFromLocalStorage();
    todos.splice(
      todos.indexOf(removeButton.parentElement.firstChild.textContent),
      1
    );
    addTodoToLocalStorage(todos);
    removeButton.parentElement.remove();
  };
  todo.className = "todo-item";
  todo.innerHTML = `<p>${value.trim()}</p>`;
  todo.appendChild(removeButton);
  todoList.appendChild(todo);
};

const getTodosFromLocalStorage = () => {
  let todos = [];
  if (localStorage.getItem("todos") != null) {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
};

const addTodoToLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const addTodo = (value) => {
  let todos = getTodosFromLocalStorage();
  todos.push(value);
  addTodoToLocalStorage(todos);
};

main();
