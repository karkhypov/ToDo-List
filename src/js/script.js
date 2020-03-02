const inputForm = document.querySelector('.input-form');
const taskList = document.querySelector('.list');

const tasks = [];

function randomID() {
  return Math.random()
    .toString(36)
    .slice(2, 12);
}

function updateStorage() {
  if (!tasks.length) {
    localStorage.removeItem('tasks');
    return;
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(task, id = randomID(), checked = false) {
  const newTaskItem = {
    task,
    id,
    checked,
  };
  tasks.push(newTaskItem);

  const li = document.createElement('li');
  li.classList.add('list__item', 'fade');
  li.id = newTaskItem.id;
  li.innerHTML = `
  <div class="list__checkbox">
    <input type="checkbox" class="list__checkbox--input" id="${
      newTaskItem.id
    }" name="checkbox-button" value="${task}" name="task checkbox" ${newTaskItem.checked && 'checked'}>
    <label for="${newTaskItem.id}"></label>
  </div>
  <p class="list__text" tabindex="0"></p>
	<button aria-label="remove ${task}" class="list__remove fas fa-trash-alt"></button>`;
  taskList.prepend(li);
  setTimeout(() => {
    li.classList.remove('fade');
  }, 0);

  const p = document.querySelector('.list__text');
  p.textContent = task;
  if (newTaskItem.checked) {
    p.classList.add('checked');
  }

  updateStorage();
}

function loadFromStorage() {
  const storageItems = JSON.parse(localStorage.getItem('tasks'));
  if (storageItems) {
    storageItems.forEach(item => addTask(item.task, item.id, item.checked));
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
  const taskInStorage = tasks.find(task => task.id === listItem.id);

  if (e.target.matches('.list__remove')) {
    listItem.classList.add('fade');
    tasks.splice(tasks.indexOf(taskInStorage), 1);
    setTimeout(() => {
      listItem.remove();
    }, 350);
    updateStorage();
  }

  if (e.target.matches('label')) {
    listItem.querySelector('.list__text').classList.toggle('checked');
    listItem.querySelector('.list__checkbox--input').checked = !taskInStorage.checked;
    taskInStorage.checked = !taskInStorage.checked;
    updateStorage();
  }
});

document.addEventListener('DOMContentLoaded', loadFromStorage);
