import { todoItem } from "./todoItem";

export class project {
    todoList = [];
    constructor() {

    }

    addToDo(todo) {
        this.todoList.push(todo);
    }
}