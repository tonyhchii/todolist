import { todoItem } from "./todoItem";

export class project {
    todoList = [];
    constructor(name) {
        this.name = name;
    }

    addToDo(title,description,dueDate,priority) {
        const todo = new todoItem(title,description,dueDate,priority);
        this.todoList.push(todo);
    }

    removeToDo(index) {
        this.todoList.splice(index, 1);
    }
}

export class projects {
    projectList = [] 
    constructor() {
    }

    addProject(name) {
        const newProject = new project(name);
        this.projectList.push(newProject);
    }

    removeProject(index) {
        this.projectList.splice(index, 1);
    }

    getProject(index) {
        return projectList[index];
    }
}