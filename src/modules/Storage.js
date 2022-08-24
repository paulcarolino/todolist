import Project from "./Project";
import Task from "./Tasks";

export default class Storage {
  static saveTask(data) {
    localStorage.setItem("Tasks", JSON.stringify(data));
  }

  static getTasks() {
    var Tasks = localStorage.getItem("Tasks");

    if (Tasks) {
      Tasks = JSON.parse(Tasks);
      Tasks = Tasks.map(
        (element) =>
          new Task(
            element.name,
            element.status,
            element.dueDate,
            element.projectId
          )
      );
    } else {
      Tasks = [];
    }
    return Tasks;
  }
  static saveProject(data) {
    localStorage.setItem("Projects", JSON.stringify(data));
  }

  static getProjects() {
    var Projects = localStorage.getItem("Projects");

    if (Projects) {
      Projects = JSON.parse(Projects);
      Projects = Projects.map(
        (element) =>
          new Project(
            element.name,
            element.status,
            element.dueDate,
            element.projectId
          )
      );
    } else {
      Projects = [];
    }
    return Projects;
  }
}
