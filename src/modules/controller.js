import { Project } from './project';
import { todoItem } from './todoItem';
import { render } from './DOMs/project-listDOM';
import { resetDialog } from './DOMs/dialog-formDOM';

const { startOfToday } = require("date-fns");
const today = startOfToday().toISOString().substring(0,10);

const sideBarContainer = document.querySelector('[data-sidebar]');
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');

//const listDisplayContainer = document.querySelector('[data-list-display-container]');
//const listTitleElement = document.querySelector('[data-list-title]');
const tasksContainer = document.querySelector('[data-tasks]');


const dialogContainer = document.querySelector('.task-form dialog');
const dialogForm = document.querySelector('[data-dialog-form]');
const dialogNameInput = document.querySelector('[data-dialog-name-input]');
const dialogDesInput = document.querySelector('[data-dialog-description-input]');
const dialogDateInput = document.querySelector('[data-dialog-date-input]');
const dialogPriorityInput = document.querySelector('[data-dialog-priority-input]')

const profileContainer = document.querySelector('.profile');
const profileTemplate = document.getElementById('profile-template');
const formTemplate = document.getElementById('form-template');


const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
const LOCAL_STORAGE_USERNAME = 'task.username';

let JSONlists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY) || '00';
let currSelectedTask = null;
let username = localStorage.getItem(LOCAL_STORAGE_USERNAME);

// const today = startOfToday().toISOString().substring(0,10);

function loadList() {
    const allProjects = [];
    JSONlists.forEach(list => {
        const project = new Project(list.id, list.name, list.tasks);
        allProjects.push(project);
    });
    return allProjects;
}

let lists = JSONlists == [] ? [] : loadList();
let defaultLists = [];

function loadDefaultList() {
    searchCompleted();
    searchToday();
}
loadDefaultList();



//Adding Task with Dialog Box
dialogForm.addEventListener('submit', e => {
    e.preventDefault();
    const taskName = dialogNameInput.value;
    const taskDes = dialogDesInput.value;
    const taskDate = dialogDateInput.value;
    const taskPriority = dialogPriorityInput.value;
    if (currSelectedTask) {
        currSelectedTask.name = taskName;
        currSelectedTask.dueDate = taskDate;
        currSelectedTask.description = taskDes;
        currSelectedTask.priority = taskPriority;
        currSelectedTask = null;
    } else {

        const newTask = new todoItem(Date.now().toString(),taskName,taskDes,taskDate,taskPriority);
        const selectedList = selectedListId == '00' ? searchToday() : getCurrList();
        selectedList.tasks.push(newTask);
    }
    resetDialog();
    saveAndRender();
});


//Adding project with project
newListForm.addEventListener('submit', e => {
    e.preventDefault();
    const listName = newListInput.value;
    if (listName == null || listName === '') return;
    const list = new Project(Date.now().toString(), listName, []);
    newListInput.value = null;
    lists.push(list)
    saveAndRender()
})

profileContainer.addEventListener('click', e => {
    if(e.target.tagName.toLowerCase() === 'img') {
        const newInput = document.importNode(formTemplate.content, true);
        const profileUserName = document.querySelector('.user-name');
        const input = newInput.querySelector('input');
        input.value = profileUserName.textContent;
        profileContainer.innerHTML = "";
        profileContainer.appendChild(newInput);
    }
});

profileContainer.addEventListener('submit', e => {
    e.preventDefault();
    username = profileContainer.querySelector('input').value;
})

//changing project;
sideBarContainer.addEventListener('click', e => {
    if(e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId;
        saveAndRender();
    }
    if(e.target.tagName.toLowerCase() === 'img') {
        const targetID = e.target.id;
        deleteList(targetID);
    }
})


tasksContainer.addEventListener('click', e => {
    if(e.target.tagName.toLowerCase() === 'input') {
        const selectedTask = getTask(e.target.id);
        selectedTask.completed = e.target.checked;
        saveAndRender();
    }
    if(e.target.tagName.toLowerCase() === 'img') {
        const targetID = e.target.id;
        if (e.target.alt == 'edit') {
            editTask(targetID);
        } else if (e.target.alt == 'trash') {
            deleteTask(targetID);
        }
    }
})

function renderUserName() {
    const newUser = document.importNode(profileTemplate.content, true);
    const usernameP = newUser.querySelector('p');
    usernameP.textContent = username;
    profileContainer.innerHTML = "";
    profileContainer.appendChild(newUser);
}


export function saveAndRender(){
    save();
    if (selectedListId == '00'){
        render(defaultLists, lists, searchToday(), selectedListId);
    } else if (selectedListId == '01') {
        render(defaultLists, lists, searchCompleted(), selectedListId);
    } else {
        render(defaultLists, lists, getCurrList(), selectedListId);
    }
    renderUserName();
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
    localStorage.setItem(LOCAL_STORAGE_USERNAME, username);
}

function searchToday() {
    const todayList = new Project('00', 'Today', []);
    lists.forEach(list => {
        list.tasks.forEach(task => {
            if (task.dueDate == today) {
                todayList.tasks.push(task);
            }
        })
    })

    defaultLists[0] = todayList;
    return todayList;
}

function searchCompleted() {
    const completedList = new Project('01', 'Completed', []);
    lists.forEach(list => {
        list.tasks.forEach(task => {
            if (task.completed == true) {
                completedList.tasks.push(task);
            }
        })
    });
    defaultLists[1] = completedList;
    return completedList;
}

function deleteList (buttonID) {
    lists = lists.filter(list => list.id !== buttonID);
    if (buttonID == selectedListId) {
        selectedListId = null;
    }
    saveAndRender();
}
 
function deleteTask (buttonID) {
    const selectedList = getCurrList();
    selectedList.tasks = selectedList.tasks.filter(task => task.id != buttonID);
    saveAndRender();
}

function editTask (taskID) {
    currSelectedTask = getCurrTask(taskID);
    dialogNameInput.value = currSelectedTask.name;
    dialogDesInput.value = currSelectedTask.description;
    dialogDateInput.value = currSelectedTask.dueDate;
    dialogPriorityInput.value = currSelectedTask.priority;
    dialogContainer.showModal();
}

function getCurrList() {
    const currList = lists.find(list => list.id === selectedListId);
    if (!currList) {
        return getDefaultList();
    }
    return currList;
}

function getDefaultList() {
    return defaultLists.find(list => list.id === selectedListId);
}


function getCurrTask(taskID) {
    return getCurrList().findTask(taskID);
}

function getTask(taskID) {
    for( let i = 0; i < lists.length; i++ ) {
        for ( let j = 0; j < lists[i].tasks.length; j++ ) {
            if (taskID === lists[i].tasks[j].id) {
                return lists[i].tasks[j];
            }
        }
    }
}
