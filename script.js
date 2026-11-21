const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const clearCompletedBtn = document.getElementById('clear-completed');
const taskCounter = document.getElementById('task-counter');
const filterButtons = document.querySelectorAll('.filter-btn');
const completedCountEl = document.getElementById('completed-count');
const incompleteCountEl = document.getElementById('incomplete-count');
const pendingCountEl = document.getElementById('pending-count');

let tasks = JSON.parse(localStorage.getItem('shreyaTodos')) || [];
let currentFilter = 'all';

function saveTasks() {
  localStorage.setItem('shreyaTodos', JSON.stringify(tasks));
}

function updateCounter() {
  const remaining = tasks.filter((task) => !task.completed).length;
  taskCounter.textContent = `${remaining} ${remaining === 1 ? 'task' : 'tasks'} left`;
}

function updateStatusTable() {
  const completedCount = tasks.filter((task) => task.completed).length;
  const unfinishedCount = tasks.filter((task) => !task.completed).length;

  completedCountEl.textContent = completedCount;
  incompleteCountEl.textContent = unfinishedCount;
  pendingCountEl.textContent = unfinishedCount;
}

function renderTasks() {
  list.innerHTML = '';

  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  filteredTasks.forEach((task) => {
    const actualIndex = tasks.indexOf(task);
    const li = document.createElement('li');
    li.className = `todo-item ${task.completed ? 'completed' : ''}`;

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = task.text;
    span.addEventListener('click', () => {
      tasks[actualIndex].completed = !tasks[actualIndex].completed;
      saveTasks();
      renderTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.setAttribute('aria-label', 'Delete task');
    deleteBtn.textContent = '✕';
    deleteBtn.addEventListener('click', () => {
      tasks.splice(actualIndex, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });

  updateCounter();
  updateStatusTable();
}

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderTasks();
  });
});

clearCompletedBtn.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
});

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
