const inputForm = document.querySelector('.input-form');
const taskList = document.querySelector('.list');

function addTask(task) {
	const li = document.createElement('li');
	li.classList.add('list__item', 'fade');
	li.innerHTML = `<p class="list__text"></p>
	<i class="list__remove-icon fas fa-trash-alt"></i>`;
	taskList.prepend(li);
	document.querySelector('.list__text').textContent = task;
	setTimeout(() => {
		li.classList.remove('fade');
	}, 50);
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
		listItem.classList.toggle('fade');
		setTimeout(() => {
			listItem.remove();
		}, 350);
	}

	if (e.target.matches('.list__text')) {
		e.target.classList.toggle('checked');
	}
});
