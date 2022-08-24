import UI from "./UI";

export default class Task {
  constructor(name, status = "", dueDate = "No date", projectId = "Inbox") {
    this.name = name;
    this.dueDate = dueDate;
    this.status = status;
    this.projectId = projectId;
  }

  setName(name) {
    this.name = name;
  }

  setStatus(status) {
    this.status = status;
  }

  setDate(dueDate) {
    this.dueDate = dueDate;
  }

  setProjectId(projectId) {
    this.projectId = projectId;
  }

  getName() {
    return this.name;
  }

  getProjectId() {
    return this.projectId;
  }

  getDate() {
    return this.dueDate;
  }

  getStatus() {
    return this.status;
  }
}
