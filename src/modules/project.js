import { todoItem } from "./todoItem";

export class project {
    todoList = [];
    constructor() {

    }

    addToDo(title,description,dueDate,priority) {
        const todo = new todoItem(title,description,dueDate,priority);
        this.todoList.push(todo);
    }
}