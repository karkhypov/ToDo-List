const inputForm = document.querySelector('.input-form');
const taskList = document.querySelector('.list');
const newTaskTemplate = document.querySelector('#newTaskTemplate');

function addTask(task) {
	const newTask = document.importNode(newTaskTemplate.content, true);
	newTask.querySelector('.list__text').textContent = task;
	taskList.prepend(newTask);
	setTimeout(() => {
		document.querySelector('.list__item').classList.remove('fade');
	}, 0);
}

inputForm.addEventListener('submit', e => {
	e.preventDefault();
	const userInput = e.currentTarget.inputForm.value;
	if (!userInput) return;
	addTask(userInput);
	e.target.reset();
});

taskList.addEventListener('click', e => {
	if (e.target.matches('.list__remove-icon')) {
		const listItem = e.target.closest('.list__item');
		listItem.classList.add('fade');
		setTimeout(() => {
			listItem.remove();
		}, 350);
	}

	if (e.target.matches('.list__text')) {
		e.target.classList.toggle('checked');
	}
});
