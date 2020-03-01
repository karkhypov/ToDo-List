const inputForm = document.querySelector('.input-form');
const taskList = document.querySelector('.list');

const tasks = [];

const randomID = () => {
  return Math.random()
    .toString(36)
    .slice(2, 12);
};

function updateStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(task, checked = false) {
  const newTaskItem = {
    value: task,
    ID: randomID(),
    checked,
  };
  const li = document.createElement('li');
  li.classList.add('list__item', 'fade');
  li.id = newTaskItem.ID;
  li.innerHTML = `<p class="list__text"></p>
	<i class="list__remove fas fa-trash-alt"></i>`;
  taskList.prepend(li);
  const p = document.querySelector('.list__text');
  p.textContent = task;
  if (newTaskItem.checked) {
    p.classList.add('checked');
  }
  tasks.push(newTaskItem);
  setTimeout(() => {
    li.classList.remove('fade');
  }, 0);
  updateStorage();
}

function loadFromStorage() {
  const storageItems = JSON.parse(localStorage.getItem('tasks'));
  localStorage.clear();
  if (storageItems.length) {
    storageItems.forEach(task => addTask(task.value, task.checked));
  }
}

inputForm.addEventListener('submit', e => {
  e.preventDefault();
  const userInput = e.currentTarget.inputForm.value;
  if (!userInput) return;
  addTask(userInput);
  e.target.reset();
});

taskList.addEventListener('click', e => {
  const listItem = e.target.closest('.list__item');
  const taskInStorage = tasks.find(i => i.ID === listItem.id);

  if (e.target.matches('.list__remove')) {
    listItem.classList.add('fade');
    setTimeout(() => {
      tasks.splice(tasks.indexOf(taskInStorage), 1);
      listItem.remove();
      updateStorage();
    }, 350);
  }

  if (e.target.matches('.list__text')) {
    e.target.classList.toggle('checked');
    taskInStorage.checked = !taskInStorage.checked;
    updateStorage();
  }
});

document.addEventListener('DOMContentLoaded', loadFromStorage);
