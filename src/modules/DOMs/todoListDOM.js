const todoHeader = document.querySelector('.todoHeader');
const todoBody = document.querySelector('.todoBody');


export function displayToDo (project) {
    displayHeader(project.name);
    displayBody(project);
}


function displayHeader(name) {
    todoHeader.innerHTML = "";
    const projHeader = document.createElement('h1');
    projHeader.textContent = name
    todoHeader.appendChild(projHeader);
}

function displayBody(project) {
    todoBody.innerHTML = "";
    if (!project == 'undefined') {
        project.todoList.forEach(todo => {
            createCard(todo);
        })
    }
    
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
