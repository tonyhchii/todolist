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