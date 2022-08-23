import Task from "./Tasks";
import Project from "./Project";
import UI from "./UI";
import Storage from "./Storage";
import { format, isThisWeek } from 'date-fns'

 
 export function addTask(taskInput, targetProject){
        //Validation
        var todolist = Storage.getTasks();
        if (taskInput != "") {
            var isValid = !todolist.find(Task => Task.name === taskInput && (Task.projectId === (targetProject ? targetProject.name : "Inbox")));
            if (isValid) {
            
            //Add Task
                var newTask = new Task;
                newTask.setName(taskInput);
              
             //Validation 
                if (targetProject) {
                    newTask.setProjectId(targetProject.getName());
                }
                todolist.push(newTask);
                Storage.saveTask(todolist);
    
                //Append of new Task HTML
                UI.addTaskElement(newTask);
            }

            else {
                alert("Task Name should have different Names")
            }
        }
        else {
            alert("Cannot be empty")
            
        }  
}


export function addProject(projectInput, Projects){

         var Projects = Storage.getProjects();
        //Validation
        if (projectInput!= "" && projectInput.trim().length !== 0) {
            if (!Projects.find(Project => Project.name === projectInput)) {
                var newProject = new Project;
                newProject.setName(projectInput);
                Projects.push(newProject);
                Storage.saveProject(Projects);
                //Append of new Project
                UI.addProjectElement(newProject);
            }
            else {
                alert("Project Name cannot be the same");
            }
        }
        else {
            alert("Cannot be empty");
        }
        console.log(Storage.getProjects());
}

export function findProject(ProjectName){
    const Projects = Storage.getProjects();
    return Projects.find(Project => Project.name === ProjectName);
}

export function findTask(task, targetProject){
    var todolist = Storage.getTasks();
    var taskName = task.textContent;
    var isInInbox = task.nextSibling.textContent.trim().length
    if (targetProject) {
        return todolist.find(Task => Task.name === taskName && Task.getProjectId() == targetProject.getName());
    } else {
        //You are in inbox(Mode) and finding what project are you in
        if (isInInbox) {
            var projectName = task.nextSibling.textContent.match(/\(([^)]+)\)/)[1];
            if (projectName) {
                return todolist.find(Task => Task.name === taskName && Task.getProjectId() == projectName);
            }
        } else {
      
            return todolist.find(Task => Task.name === taskName && Task.getProjectId() == "Inbox");
        }
    }
}

export function updateProjectName(targetProject, projectName){
    var Projects = Storage.getProjects();
    targetProject = Projects.find(Project => Project.name === targetProject.name);
    targetProject.setName(projectName);
    Storage.saveProject(Projects);
    return targetProject
}

export function removeProject(targetProject){
    var Projects = Storage.getProjects();
    targetProject = Projects.find(Project => Project.name === targetProject.name);
    targetProject = Projects.indexOf(targetProject);
    Projects.splice(targetProject, 1);
    Storage.saveProject(Projects);
}


export function updateTaskName(targetTask, taskName){
    var todolist = Storage.getTasks();
    targetTask = todolist.find(Task => Task.name === targetTask.name && Task.getProjectId() == targetTask.projectId);
    targetTask.setName(taskName);
    Storage.saveTask(todolist);
    return targetTask;
}

export function updateTaskDate(targetTask, taskDate){
    var todolist = Storage.getTasks();
    targetTask = todolist.find(Task => Task.name === targetTask.name && Task.getProjectId() == targetTask.projectId);
    targetTask.setDate(taskDate);
    Storage.saveTask(todolist);
    return targetTask;
}


export function updateTaskStatus(targetTask, taskStatus){
    var todolist = Storage.getTasks();
    targetTask = todolist.find(Task => Task.name === targetTask.name && Task.getProjectId() == targetTask.projectId);
    targetTask.setStatus(taskStatus);
    Storage.saveTask(todolist);
    return targetTask;
}

export function deleteTask(targetTask){
    var todolist = Storage.getTasks();
    targetTask = todolist.find(Task => Task.name === targetTask.name && Task.getProjectId() == targetTask.projectId);
    targetTask = todolist.indexOf(targetTask);
    todolist.splice(targetTask, 1);
    Storage.saveTask(todolist);
}

export function updateName(target){
    var Name = "";
    while (Name.trim().length == 0) {
        Name = prompt("What is the new task name", target.getName())
        if (Name == "") {
            alert("It cannot be blank")
        }
        if(!Name){
            break
        }
    }

    return Name;
}



export function sortTaskByDate(todolist) {
    const sorter = (a, b) => {
        return new Date(a.getDate()).getTime() - new Date(b.getDate()).getTime();
    }
    //Create a deep copy for this Function and that is what you sort
    todolist.sort(sorter);
}



export function sortTaskByToday(todolist) {
    const Today = format(new Date(), "yyyy-MM-dd");
    return todolist.filter(task => task.getDate() == Today);
}


export function sortTaskByWeek(todolist) {
    return todolist.filter(task => isThisWeek(new Date(task.getDate()), { weekStartsOn: 1 }));
}

export function filterByProject(ProjectName) {
    const todolist = Storage.getTasks();
    return todolist.filter(task => task.getProjectId() == ProjectName);
}

