import trashCan from '../../img/trash-can-outline.svg';
import plusSign from '../../img/plus.svg';
import editSign from '../../img/pencil-outline.svg';
import { renderSelectedList, clearElement } from './task-listDOM';
import { resetDialog } from './dialog-formDOM';

const listsContainer = document.querySelector('[data-lists]');
const defaultListsContainer = document.querySelector('[data-default]')

function renderLists(defaultLists, lists, selectedListID) {
    defaultLists.forEach(defaultList => {
         generateDefaultListItem(defaultList, selectedListID)})
    lists.forEach(list => {
        generateListItem(list, selectedListID);
    });
}


function generateDefaultListItem(defaultList, selectedListID) {
    const listElement = document.createElement("li");
    listElement.dataset.listId = defaultList.id;
    listElement.textContent = defaultList.name;
    listElement.classList.add('list-item');
    if (defaultList.id === selectedListID) {
        listElement.classList.add('active-project')
    }
    defaultListsContainer.appendChild(listElement);
}

function generateListItem(list, selectedListID) {
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.classList.add('list-item');
    listElement.innerHTML = '<img src='+ plusSign + '>' + list.name;
    if (list.id === selectedListID) {
        listElement.classList.add('active-project')
    }
    const trashImg = document.createElement('img');
    trashImg.src = trashCan;
    trashImg.alt = "trash";
    trashImg.id = list.id;
    listElement.appendChild(trashImg);
    const removeButton = document.createElement("button");
    removeButton.classList.add('btn');

    listsContainer.appendChild(listElement);
}

function generateItem(list, selectedListID) {

}

export function render(defaultLists,lists,currList,selectedListID) {
    clearElement(defaultListsContainer);
    clearElement(listsContainer);
    resetDialog();
    renderLists(defaultLists, lists,selectedListID);
    renderSelectedList(currList);
}
