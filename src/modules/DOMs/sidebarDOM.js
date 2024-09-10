import { searchDate } from "../project";
import { displayToDo } from "./todoListDOM";
import { Projects } from "../project";

const defaultContainer = document.querySelector('.default');
const projectsContainer = document.querySelector('.projects');

export function displaySideBar(){
    displayDefault();
}

function displayDefault() {

    //profile row
    displayProfile();
    displayAddTask();
    displayToday();
}

function displayProfile() {
    const profileCon = document.createElement('div');
    profileCon.classList.add('profile');
    defaultContainer.appendChild(profileCon);

    const profIcon = document.createElement('img');
    profIcon.classList.add('profIcon');
    profileCon.appendChild(profIcon);

    const profName = document.createElement('p');
    profName.textContent = "Your Username";
    profileCon.appendChild(profName);

    const profEdit = document.createElement('button');
    profEdit.textContent = "Edit";
    profileCon.appendChild(profEdit);
}

function displayToday() {
    const todayButton = document.createElement('button');
    todayButton.textContent = 'Today';
    defaultContainer.appendChild(todayButton);
    todayButton.addEventListener('click', () => {
        displayToDo();
    });
}

function displayAddTask() {
    const addTaskButton = document.createElement('button');
    addTaskButton.textContent = 'Add Task';
    defaultContainer.appendChild(addTaskButton);
    addTaskButton.addEventListener('click', () => {
        const dialog = document.querySelector('dialog');
        dialog.showModal();
    })
}
