import trashCan from '../img/trash-can-outline.svg';
import plusSign from '../img/plus.svg';
import editSign from '../img/pencil-outline.svg';

import { Project } from './project';
import { todoItem } from './todoItem';
const { startOfToday } = require("date-fns");

const listsContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');

const listDisplayContainer = document.querySelector('[data-list-display-container]');
const listTitleElement = document.querySelector('[data-list-title]');
const tasksContainer = document.querySelector('[data-tasks]');
const taskTemplate = document.getElementById('task-template');

const createTaskBtn = document.querySelector('.create-task');
const dialogContainer = document.querySelector('.task-form dialog');
const dialogForm = document.querySelector('[data-dialog-form]');
const dialogNameInput = document.querySelector('[data-dialog-name-input]');
const dialogDesInput = document.querySelector('[data-dialog-description-input]');
const dialogDateInput = document.querySelector('[data-dialog-date-input]');
const dialogPriorityInput = document.querySelector('[data-dialog-priority-input]')
const defaultListDisplay = document.querySelector('[data-default]')

const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
let currSelectedTask = null;

const today = startOfToday().toISOString().substring(0,10);


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
            const selectedList = getCurrList();
            selectedList.tasks.push(newTask);
        }
        resetDialog();
        saveAndRender();
});

dialogForm.querySelector('.close').addEventListener('click', () => {
    dialogContainer.close();
});

createTaskBtn.addEventListener('click', () => {
    dialogContainer.showModal();
})

newListForm.addEventListener('submit', e => {
    e.preventDefault();
    const listName = newListInput.value;
    if (listName == null || listName === '') return;
    const list = new Project(Date.now().toString(), listName, []);
    newListInput.value = null;
    lists.push(list)
    saveAndRender()
})

listsContainer.addEventListener('click', e => {
    if(e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId;
        saveAndRender();
    }
    if(e.target.tagName.toLowerCase() === 'img') {
        const targetID = e.target.id;
        deleteList(targetID);
    }
})

defaultListDisplay.addEventListener('click', e => {
    if(e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId;
        renderCompletedList();
    }
});

tasksContainer.addEventListener('click', e => {
    if(e.target.tagName.toLowerCase() === 'input') {
        const selectedList = getCurrList();
        const selectedTask = selectedList.tasks.find(task => task.id === e.target.id);
        selectedTask.completed = e.target.checked;
        save();
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


export function saveAndRender(){
    save();
    render();
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

export function render() {
    clearElement(listsContainer);
    resetDialog();
    renderLists();


    renderSelectedList();
}

function renderSelectedList() {
    const selectedList = lists.find(list => list.id === selectedListId);

    if (!selectedList) {
        listDisplayContainer.style.display = 'none';
    } else {
        listDisplayContainer.style.display = '';
        listTitleElement.innerText = selectedList.name;
        clearElement(tasksContainer);
        renderTasks(selectedList);
    }
}

function renderCompletedList() {
    const completedList = searchCompleted();
    listTitleElement.innerText = 'Completed';
    console.log(completedList);
    clearElement(tasksContainer);
    if (completedList != []) {    
        renderTasks(completedList);
    }
}

function searchCompleted() {
    const completedList = [];
    lists.forEach(list => {
        list.tasks.forEach(task => {
            if (task.completed == true) {
                completedList.push(task);
            }
        })
    });

    return completedList;
}

function renderLists() {
    lists.forEach(list => {
        const listElement = document.createElement("li");
        listElement.dataset.listId = list.id;
        listElement.classList.add('list-item');
        listElement.innerHTML = '<img src='+ plusSign + '>' + list.name;
        if (list.id === selectedListId) {
            listElement.classList.add('active-project')
        }
        
        const removeButton = document.createElement("button");
        removeButton.classList.add('btn');
        
        const trashImg = document.createElement('img');
        trashImg.src = trashCan;
        trashImg.alt = "trash";
        trashImg.id = list.id;
        removeButton.appendChild(trashImg);
        listElement.appendChild(removeButton);

        listsContainer.appendChild(listElement);
    });
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

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
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

function editTask (searchID) {
    currSelectedTask = getCurrTask(searchID);
    dialogNameInput.value = currSelectedTask.name;
    dialogDateInput.value = currSelectedTask.description;
    dialogDateInput.value = currSelectedTask.dueDate;
    dialogPriorityInput.value = currSelectedTask.priority;
    dialogContainer.showModal();
}

function getCurrList() {
    return lists.find(list => list.id === selectedListId);
}

function getCurrTask(searchID) {
    return getCurrList().tasks.find(task => task.id === searchID);
}

function resetDialog() {
    dialogContainer.close()
    dialogForm.reset()
    dialogDateInput.value = today;
}