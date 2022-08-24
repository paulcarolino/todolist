import Task from "./modules/Tasks";
import Project from "./modules/Project";
import * as Logic from "./modules/Logic";
import UI from "./modules/UI";
import Storage from "./modules/Storage";
import { format, isThisWeek } from "date-fns";

var todolist;
const Projects = [];
var targetProject;
var currentToDoList;

window.addEventListener("load", (e) => {
  var inboxTask = Logic.filterByProject("Inbox");
  var Projects = Storage.getProjects();
  UI.displayAllProjects(Projects);
  UI.displayAllTask(inboxTask);
  Projects.forEach((Project) => {
    var projectTasks = Logic.filterByProject(Project.getName());
    UI.displayAllTaskPerProject(projectTasks);
  });
});

//Add Task
document.querySelector(".add-task-btn").addEventListener("click", (e) => {
  var taskName = document.querySelector(".task-input>input").value;
  Logic.addTask(taskName, targetProject);
});

document.querySelector(".add-project-btn").addEventListener("click", (e) => {
  var projectInput = document.querySelector(".project-input>input").value;
  Logic.addProject(projectInput, Projects);
});

document.querySelector(".list").addEventListener("click", (e) => {
  //Edit Task
  if (e.target && e.target.matches("span")) {
    var task = e.target;
    var targetTask = Logic.findTask(task, targetProject);
    var taskName = Logic.updateName(targetTask);
    if (taskName) {
      targetTask = Logic.updateTaskName(targetTask, taskName);
      UI.updateNameElement(task, targetTask);
    }
  }

  //Update Status
  if (e.target && e.target.matches("input[type=checkbox]")) {
    const task = e.target.nextSibling;
    const checkBoxValue = e.target.checked;
    var targetTask = Logic.findTask(task, targetProject);
    var taskStatus = checkBoxValue ? "Done" : "";
    targetTask = Logic.updateTaskStatus(targetTask, taskStatus);
    UI.updateTaskStatus(checkBoxValue, task);
  }

  //Change Date
  if (e.target && e.target.matches("p.due-date")) {
    const task =
      e.target.parentNode.previousSibling.previousSibling.children[1];
    var targetTask = Logic.findTask(task, targetProject);
    UI.changeInputCalendar(e.target, targetTask);
  }

  //Delete Task
  if (e.target && e.target.matches(".right-panel>img")) {
    const task =
      e.target.parentNode.previousSibling.previousSibling.children[1];
    var targetTask = Logic.findTask(task, targetProject);
    Logic.deleteTask(targetTask);
    UI.removeIteminList(e.target.parentNode.parentNode);
  }

  if (e.target.id == "addTask") {
    document.querySelector(".add-task-container").classList.add("active");
  }
});

document.querySelector(".new-projects").addEventListener("click", (e) => {
  //Edit Project
  if (e.target && e.target.matches("span")) {
    var projectName = e.target.textContent;
    targetProject = Logic.findProject(projectName);
    projectName = Logic.updateName(targetProject);
    if (projectName) {
      targetProject = Logic.updateProjectName(targetProject, projectName);
      UI.updateNameElement(e.target, targetProject);
    }
  }

  //Delete Project
  if (e.target && e.target.matches("img.trash-icon")) {
    const projectName =
      e.target.parentNode.previousSibling.previousSibling.children[1]
        .textContent;
    targetProject = Logic.findProject(projectName);
    Logic.removeProject(targetProject);
    UI.removeIteminList(e.target.parentNode.parentNode);
  }

  //Project Display
  if (e.target.id != "addProject" && e.target.matches("li")) {
    const ProjectName = e.target.children[0].children[1].textContent;
    //Read
    targetProject = Logic.findProject(ProjectName);
    var projecTask = Logic.filterByProject(ProjectName);
    UI.loadPageTitle(targetProject.getName());
    UI.removeAllTask();
    UI.displayAllTask(projecTask);
  }

  if (e.target.id == "addProject") {
    document.querySelector(".add-project-container").classList.add("active");
  }
});

//Change Date
document.querySelector(".list").addEventListener("change", (e) => {
  if (e.target && e.target.matches("input[type=date]")) {
    const task =
      e.target.parentNode.previousSibling.previousSibling.children[1];
    var targetTask = Logic.findTask(task, targetProject);
    targetTask = Logic.updateTaskDate(targetTask, e.target.value);
    UI.updateTaskDate(e.target, targetTask);
    UI.removeAllTask();
    if (targetProject) {
      var projectTask = Logic.filterByProject(targetProject.getName());
      UI.displayAllTask(projectTask);
    } else {
      var inboxTask = Logic.filterByProject("Inbox");
      UI.displayAllTask(inboxTask);
      var Projects = Storage.getProjects();
      Projects.forEach((Project) => {
        var projectTask = Logic.filterByProject(Project.getName());
        UI.displayAllTaskPerProject(projectTask);
      });
    }
  }
});

document.getElementById("Inbox").addEventListener("click", (e) => {
  var inboxTask = Logic.filterByProject("Inbox");
  var Projects = Storage.getProjects();
  UI.removeAllTask();
  UI.displayAllTask(inboxTask);
  UI.loadPageTitle("Inbox");
  Projects.forEach((Project) => {
    var projectTasks = Logic.filterByProject(Project.getName());
    UI.displayAllTaskPerProject(projectTasks);
  });
  targetProject = null;
});

document.getElementById("Today").addEventListener("click", (e) => {
  var inboxTask = Logic.filterByProject("Inbox");
  var tasksToday = Logic.sortTaskByToday(inboxTask);
  var Projects = Storage.getProjects();
  UI.loadPageTitle("Today");
  UI.removeAllTask();
  UI.displayAllTask(tasksToday);
  Projects.forEach((Project) => {
    var projectTasks = Logic.filterByProject(Project.getName());
    var tasksToday = Logic.sortTaskByToday(projectTasks);
    UI.displayAllTaskPerProject(tasksToday);
  });
  targetProject = null;
});

document.getElementById("Week").addEventListener("click", (e) => {
  var inboxTask = Logic.filterByProject("Inbox");
  var taskThisWeek = Logic.sortTaskByWeek(inboxTask);
  var Projects = Storage.getProjects();
  UI.loadPageTitle("This Week");
  UI.removeAllTask();
  UI.displayAllTask(taskThisWeek);
  Projects.forEach((Project) => {
    var projectTasks = Logic.filterByProject(Project.getName());
    var taskThisWeek = Logic.sortTaskByWeek(projectTasks);
    UI.displayAllTaskPerProject(taskThisWeek);
  });
  targetProject = null;
});

document.querySelector(".cancel-project-btn").addEventListener("click", (e) => {
  document.querySelector(".add-project-container").classList.remove("active");
});

document.querySelector(".cancel-task-btn").addEventListener("click", (e) => {
  document.querySelector(".add-task-container").classList.remove("active");
});
