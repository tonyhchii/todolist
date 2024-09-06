import { project } from "./project";

const currProject = new project('Today');
currProject.addToDo('To Do','Make a Todo List','3','4');
currProject.addToDo('Button','Add a button that adds new ToDos','3','4');

displaySideBar();
displayToDo(currProject);