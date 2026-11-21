const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let tasks = JSON.parse(localStorage.getItem('shreyaTodos')) || [];

function saveTasks() {
  localStorage.setItem('shreyaTodos', JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `todo-item ${task.completed ? 'completed' : ''}`;

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = task.text;
    span.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.setAttribute('aria-label', 'Delete task');
    deleteBtn.textContent = '✕';
    deleteBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ text, completed: false });
  saveTasks();
  renderTasks();
  input.value = '';
  input.focus();
});

renderTasks();
const clearCompletedBtn = document.getElementById('clear-completed');

clearCompletedBtn.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
});
.status-table {
  width: 100%;
  margin-top: 18px;
  border-collapse: collapse;
  font-size: 0.9rem;
  background: rgba(15, 23, 42, 0.65);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.18);
}

.status-table th,
.status-table td {
  padding: 9px 12px;
  text-align: left;
  border-bottom: 1px solid rgba(148, 163, 184, 0.12);
}

.status-table th {
  color: #94a3b8;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.03);
}

.status-table tr:last-child td {
  border-bottom: none;
}

.status-table td:last-child {
  text-align: right;
  font-weight: 700;
  color: #38bdf8;
}
