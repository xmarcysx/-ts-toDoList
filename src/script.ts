//Selectors:
let todos: string[];
const todoInput = document.querySelector('.todo-input') as HTMLInputElement;
const todoButton = document.querySelector('.todo-button') as HTMLButtonElement;
const todoList = document.querySelector('.todo-list') as HTMLUListElement;
const filterOption = document.querySelector(
  '.filter-todo'
) as HTMLSelectElement;

//Functions
const createTodoList = function (param: string) {
  //LI in DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  const newTodo = document.createElement('li');
  newTodo.innerText = param;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  //BUTTONS
  const completedButton = document.createElement('button');
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);
  const trashButton = document.createElement('button');
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);
  todoList.appendChild(todoDiv);
};

const addTodo = function (e: Event) {
  e.preventDefault();
  const inputVal = todoInput.value;
  createTodoList(inputVal);
  saveLocalTodos(inputVal);
  todoInput.value = '';
};

const deleteCheck = function (e: Event) {
  if (e.target == null) return;
  const item = e.target as HTMLElement;
  const todo = item.parentElement!;
  //DELETE
  if (item.classList[0] === 'trash-btn') todo.remove();
  deleteLocalTodo(todo);
  //CHECK
  if (item.classList[0] === 'complete-btn') todo.classList.toggle('completed');
};

const filterTodo = function (e: Event) {
  const todos = todoList.childNodes as NodeListOf<HTMLElement>;
  todos.forEach(function (todo) {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    switch (value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) todo.style.display = 'flex';
        else todo.style.display = 'none';
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) todo.style.display = 'flex';
        else todo.style.display = 'none';
        break;
    }
  });
};

const ifExistLocalTodos = function () {
  if (localStorage.getItem('todos') === null) todos = [];
  else todos = JSON.parse(localStorage.getItem('todos') as string);
};

const saveLocalTodos = function (todo: string) {
  ifExistLocalTodos();
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
};

const getLocalTodos = function () {
  ifExistLocalTodos();
  todos.forEach(function (todo) {
    createTodoList(todo);
  });
};

const deleteLocalTodo = function (todo: HTMLElement) {
  ifExistLocalTodos();
  const removeTodo = todo.children[0].innerHTML;
  console.log(removeTodo);
  todos.splice(todos.indexOf(removeTodo), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
};
//Event Listeners:
document.addEventListener('DOMContentLoaded', getLocalTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
