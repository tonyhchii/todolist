import { project } from "./project";

const todoHeader = document.querySelector('.todoHeader');
const todoBody = document.querySelector('.todoBody');

const project1 = new project('Today');
project1.addToDo('To Do','Make a Todo List','3','4');
project1.addToDo('Button','Add a button that adds new ToDos','3','4');

export function displayToDo () {

    displayHeader();
    displayBody();

}


function displayHeader() {
    todoHeader.innerHTML = "";
    const projHeader = document.createElement('h1');
    projHeader.textContent = project1.name;
    todoHeader.appendChild(projHeader);
}

function displayBody() {
    todoBody.innerHTML = "";
    project1.todoList.forEach(todo => {
        createCard(todo);
    })
}

function createCard(todo) {
    const card = document.createElement('div');
    card.classList.add('card');
    todoBody.appendChild(card);

    const cardTitle = document.createElement('h3');
    cardTitle.textContent = todo.title;
    card.appendChild(cardTitle);
    
    const cardDes = document.createElement('p') 
    cardDes.textContent = todo.description;
    card.appendChild(cardDes);

    const cardEdit = document.createElement('button');
    cardEdit.textContent = 'Edit';
    card.appendChild(cardEdit);

    const cardDelete = document.createElement('button');
    cardDelete.textContent = 'Delete';
    card.appendChild(cardDelete);
}