import { project } from "./project";

const todoContainer = document.querySelector('.todoContainer');
const project1 = new project();
project1.addToDo('Tony','2','3','4');
export function displayToDo () {

    project1.todoList.forEach(todo => {
        const card = document.createElement('div');
        card.classList.add('card');
        todoContainer.appendChild(card);

        const cardTitle = document.createElement('h3');
        cardTitle.textContent = todo.title;
        card.appendChild(cardTitle);
        
        const cardDes = document.createElement('p') 
        cardDes.textContent = todo.description;
        card.appendChild(cardDes);
    })
   
}

displayToDo();