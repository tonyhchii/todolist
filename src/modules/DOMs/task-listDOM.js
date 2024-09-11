import trashCan from '../../img/trash-can-outline.svg';
import plusSign from '../../img/plus.svg';
import editSign from '../../img/pencil-outline.svg';

const listDisplayContainer = document.querySelector('[data-list-display-container]');
const listTitleElement = document.querySelector('[data-list-title]');
const tasksContainer = document.querySelector('[data-tasks]');
const taskTemplate = document.getElementById('task-template');

export function renderSelectedList(selectedList) {

    if (!selectedList) {
        listDisplayContainer.style.display = 'none';
    } else {
        listDisplayContainer.style.display = '';
        listTitleElement.innerText = selectedList.name;
        clearElement(tasksContainer);
        renderTasks(selectedList);
    }
}
export function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function renderTasks(selectedList) {
    selectedList.tasks.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true);
        const checkbox = taskElement.querySelector('input');
        checkbox.id = task.id;
        checkbox.checked = task.completed;

        const label = taskElement.querySelector('label');
        label.htmlFor = task.id;
        label.append(task.name);

        const taskDes = taskElement.querySelector('.task-des');
        const labelDescription = document.createElement('p');
        labelDescription.textContent = task.description;
        taskDes.append(labelDescription);

        const trashImg = document.createElement('img');
        trashImg.src = trashCan;
        trashImg.alt = "trash";
        trashImg.id = task.id;

        const editImg = document.createElement('img');
        editImg.src = editSign;
        editImg.alt = "edit";
        editImg.id = task.id;

        const taskButtons = taskElement.querySelector('.task-btns');
        taskButtons.append(editImg);
        taskButtons.append(trashImg);


        tasksContainer.appendChild(taskElement);
    })
}