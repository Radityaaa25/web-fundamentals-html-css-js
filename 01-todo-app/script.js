const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const todoText = input.value.trim();
  if (todoText === "") return;

  const li = document.createElement("li");
  li.textContent = todoText;
  list.appendChild(li);
  input.value = "";
});