const inputForm = document.querySelector('.input-form');
const taskList = document.querySelector('.list');

function addTask(task) {
	const li = document.createElement('li');
	li.classList.add('list__item');
	li.innerHTML = `<p class="list__text">${task}</p>
									<i class="list__remove-icon fas fa-trash-alt"></i>`;
	taskList.append(li);
}

inputForm.addEventListener('submit', e => {
	e.preventDefault();
	const newTask = e.currentTarget.inputForm.value;
	if (!newTask) return;
	addTask(newTask);
	e.target.reset();
});

taskList.addEventListener('click', e => {
	if (e.target.matches('.list__remove-icon')) {
		const listItem = e.target.closest('.list__item');
		listItem.classList.toggle('fade');
		setTimeout(() => {
			listItem.remove();
		}, 500);
	}

	if (e.target.matches('.list__text')) {
		e.target.classList.toggle('checked');
	}
});
