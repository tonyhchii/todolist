import "./styles/general.css";
import "./styles/todoList.css";
import "./styles/sidebar.css";
import { displayToDo } from "./modules/DOMs/todoListDOM";
import { Project } from "./modules/project";
import { displaySideBar } from "./modules/DOMs/sidebarDOM";
import { displayAddDialog } from "./modules/DOMs/dialogBoxDOM";
import { saveAndRender } from "./modules/controller";


//const todayProject = new Project('Today', []);
//const currProject = new Project('Project Demo', []);
//currProject.addToDo('To Do','Make a Todo List','9-6-2024','4');
//currProject.addToDo('Button','Add a button that adds new ToDos','3','4');


saveAndRender()