import { displayToDo } from "./todoListDOM";

const container = document.querySelector('.container');
export function displayAddDialog(project) {
    const dialogBox = document.createElement('dialog');
    const dialogForm = document.createElement('form');
    container.appendChild(dialogBox);
    dialogBox.appendChild(dialogForm);

    const taskInput = document.createElement('input');
    taskInput.setAttribute('placeholder','Task');
    taskInput.setAttribute('name','task');
    dialogForm.appendChild(taskInput);

    const descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('placeholder','Description');
    descriptionInput.setAttribute('name','description');
    dialogForm.appendChild(descriptionInput);

    const dateInput = document.createElement('input');
    dateInput.setAttribute('type','date');
    dateInput.setAttribute('name','date');
    dialogForm.appendChild(dateInput);

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        dialogBox.close();
        const formData = new FormData(dialogForm);

        const task = formData.get('task');
        const description = formData.get('description');
        const date = formData.get('date');

        project.addToDo(task,description,date,'any');
        displayToDo(project);
    })
    dialogForm.appendChild(submitButton);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    dialogForm.appendChild(closeButton);
    closeButton.addEventListener('click', dialogBox.close());
}