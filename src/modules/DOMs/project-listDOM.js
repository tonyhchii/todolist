const listsContainer = document.querySelector('[data-lists]');
import trashCan from '../../img/trash-can-outline.svg';
import plusSign from '../../img/plus.svg';
import editSign from '../../img/pencil-outline.svg';
import { renderSelectedList, clearElement } from './task-listDOM';
import { resetDialog } from './dialog-formDOM';
import { Project } from '../project';

function renderLists(lists, selectedListID) {
    lists.forEach(list => {
        const listElement = document.createElement("li");
        listElement.dataset.listId = list.id;
        listElement.classList.add('list-item');
        listElement.innerHTML = '<img src='+ plusSign + '>' + list.name;
        if (list.id === selectedListID) {
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

export function render(lists,selectedListID) {
    clearElement(listsContainer);
    resetDialog();
    renderLists(lists,selectedListID);
    renderSelectedList(lists.find(list => list.id === selectedListID));
}
