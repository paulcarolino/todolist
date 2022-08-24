import * as Logic from "./Logic";

export default class UI {
  static addTaskElement(newTask) {
    var newTaskElement = document.createElement("li");
    newTaskElement.classList.add("todo-list");
    newTaskElement.innerHTML = `
                <div class="left-panel">
                 <input type = "checkbox"><span>${newTask.getName()}</span>
                </div>
             <div class="right-panel">
                <p class="due-date">${newTask.getDate()}</p>
                <img src="../Assets/Icons/close-octagon.png">
            </div>`;
    document.querySelector(".list>ul").prepend(newTaskElement);
    document.querySelector(".add-task-container").classList.remove("active");
    document.querySelector(".task-input>input").value = "";
  }

  static addProjectElement(newProject) {
    var newProjectElement = document.createElement("li");
    newProjectElement.innerHTML = `
            <div class="left-panel">
                <img src="../Assets/Icons/format-list-bulleted-square.png">
                <span>${newProject.getName()}</span>
            </div>

            <div class="right-panel">
            <img src="../Assets/Icons/delete.png" class="trash-icon">
            </div>`;
    document.querySelector(".project-input>input").value = "";
    document.querySelector(".new-projects>ul").prepend(newProjectElement);
    document.querySelector(".add-project-container").classList.remove("active");
  }

  static loadPageTitle(targetProject) {
    var pageTitle = document.getElementById("pageTitle");
    pageTitle.textContent = targetProject;
  }

  static removeAllTask() {
    document.querySelectorAll(".todo-list").forEach((task) => {
      task.remove();
    });
  }

  static removeIteminList(projectHtml) {
    projectHtml.remove();
  }

  static displayAllProjects(Projects) {
    Projects.forEach((Project) => {
      var projectElement = document.createElement("li");
      projectElement.innerHTML = `
                <div class="left-panel">
                    <img src="../Assets/Icons/format-list-bulleted-square.png">
                    <span>${Project.getName()}</span>
                </div>
    
                <div class="right-panel">
                <img src="../Assets/Icons/delete.png" class="trash-icon">
                </div>`;
      document.querySelector(".new-projects>ul").prepend(projectElement);
    });
  }
  static displayAllTask(todolist) {
    Logic.sortTaskByDate(todolist);
    todolist.forEach((Task) => {
      var newTaskElement = document.createElement("li");
      newTaskElement.classList.add("todo-list");

      if (Task.getStatus() == "Done") {
        newTaskElement.innerHTML = `
                <div class="left-panel">
                    <input type="checkbox" checked><span class="checked">${Task.getName()}</span>
                </div>`;
      } else {
        newTaskElement.innerHTML = `
                <div class="left-panel">
                    <input type="checkbox"><span>${Task.getName()}</span>
                </div>`;
      }

      newTaskElement.innerHTML += `
                 <div class="right-panel">
                    <p class="due-date">${Task.getDate()}</p>
                    <img src="../Assets/Icons/close-octagon.png">
                </div>`;

      document.querySelector(".list>ul").prepend(newTaskElement);
    });
  }

  static displayAllTaskPerProject(todolist) {
    Logic.sortTaskByDate(todolist);
    todolist.forEach((Task) => {
      var newTaskElement = document.createElement("li");
      newTaskElement.classList.add("todo-list");
      if (Task.getStatus() == "Done") {
        newTaskElement.innerHTML = `
                <div class="left-panel">
                    <input type="checkbox" checked><span class="checked">${Task.getName()}</span><span><b>(${Task.getProjectId()})</b></span>
                </div>`;
      } else {
        newTaskElement.innerHTML = `
                <div class="left-panel">
                    <input type="checkbox"><span>${Task.getName()}</span><span><b>(${Task.getProjectId()})</b></span>
                </div>`;
      }
      newTaskElement.innerHTML += `
            <div class="right-panel">
                    <p class="due-date">${Task.getDate()}</p>
                    <img src="../Assets/Icons/close-octagon.png">
                </div>
            `;
      document.querySelector(".list>ul").prepend(newTaskElement);
    });
  }

  static updateNameElement(htmlELement, target) {
    htmlELement.textContent = target.getName();
  }

  static updateTaskStatus(checkBoxValue, target, task) {
    if (checkBoxValue) {
      target.classList.add("checked");
    } else {
      target.classList.remove("checked");
    }
  }

  static updateTaskDate(htmlElement, Task) {
    htmlElement.outerHTML = `<p class="due-date">${Task.getDate()}</p>`;
  }

  static changeInputCalendar(htmlElement, Task) {
    if (Task.getDate() != "No date") {
      htmlElement.outerHTML = `<input type=date value=${Task.getDate()}>`;
    } else {
      htmlElement.outerHTML = `<input type=date>`;
    }
  }
}
