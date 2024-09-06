const container = document.querySelector('.container');
export function displayAddDialog() {
    const dialogBox = document.createElement('dialog');
    const dialogForm = document.createElement('form');
    container.appendChild(dialogBox);
    dialogBox.appendChild(dialogForm);

    const taskInput = document.createElement('input');
    taskInput.setAttribute('placeholder','Task');
    dialogForm.appendChild(taskInput);

    const descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('placeholder','Description');
    dialogForm.appendChild(descriptionInput);

    const dateInput = document.createElement('input');
    dateInput.setAttribute('type','date');
    dialogForm.appendChild(dateInput);

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        dialogBox.close();
    })
    dialogForm.appendChild(submitButton);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    dialogForm.appendChild(closeButton);
    closeButton.addEventListener('click', dialogBox.close());
}