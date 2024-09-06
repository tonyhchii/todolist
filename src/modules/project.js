import { todoItem } from "./todoItem";
import {
    format,
    add,
    isToday,
    isWithinInterval,
    startOfDay,
  } from 'date-fns';

  const date = new Date();

class Projects {
    ProjectList = [] 
    constructor() {
    }

    addProject(Project) {
        this.ProjectList.push(Project);
    }

    removeProject(index) {
        this.ProjectList.splice(index, 1);
    }

    getProject(index) {
        return ProjectList[index];
    }

}

const allProjects = new Projects();

export class Project {
    todoList = [];
    constructor(name, array) {
        this.name = name;
        this.todoList = array == 'undefined' ? [] : array;
        allProjects.addProject(this);
    }

    addToDo(task,description,dueDate,priority) {
        const todo = new todoItem(task,description,dueDate,priority);
        this.todoList.push(todo);
    }

    removeToDo(index) {
        this.todoList.splice(index, 1);
    }

}

export function searchDate() {
    allToDos().filter((task) => isToday(task.dueDate) && task.completed === false);
}

function allToDos() {
    const allTasks = [];
    allProjects.ProjectList.forEach((Project) => {
        Project.todoList.forEach((task) => allTasks.push(task));
    });

    return allTasks;
}
