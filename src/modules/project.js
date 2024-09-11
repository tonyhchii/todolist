export class Project {
    tasks = [];
    constructor(id, name, tasks) {
        this.id = id;
        this.name = name;
        this.tasks = tasks;
    }

    findTask(taskID) {
        return this.tasks.find(task => task.id === taskID);
    }

}
