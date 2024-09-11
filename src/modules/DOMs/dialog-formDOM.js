const { startOfToday } = require("date-fns");
const today = startOfToday().toISOString().substring(0,10);
const dialogContainer = document.querySelector('.task-form dialog');
const dialogForm = document.querySelector('[data-dialog-form]');
const dialogNameInput = document.querySelector('[data-dialog-name-input]');
const dialogDesInput = document.querySelector('[data-dialog-description-input]');
const dialogDateInput = document.querySelector('[data-dialog-date-input]');
const dialogPriorityInput = document.querySelector('[data-dialog-priority-input]')

export function resetDialog() {
    dialogContainer.close()
    dialogForm.reset()
    dialogDateInput.value = today;
}