let todoList = document.querySelector("#todo-list");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
document.addEventListener("DOMContentLoaded", () => {
  const Input = document.querySelector("#todo-input");
  const addTask = document.querySelector("#add-task-btn");
  Input.focus();
  tasks.forEach((task) => {
    renderTasks(task);
  });
  addTask.addEventListener("click", (e) => {
    const InputText = Input.value;
    const NewTask = {
      id: Date.now(),
      text: InputText,
      completed: false,
    };
    tasks.push(NewTask);
    StoreTask(tasks);
    Input.value = "";
    Input.focus();
    renderTasks(NewTask);
    console.log(tasks);
  });

  function StoreTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  function renderTasks(Task) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");
    const Img = document.createElement("img");
    Img.src = "uncheck.png";
    Img.classList.add("uncheck");
    span.textContent = Task.text;
    button.textContent = "delete";
    li.setAttribute("data-id", Task.id);
    li.appendChild(Img);
    li.appendChild(span);
    li.appendChild(button);

    if (Task.completed) {
      span.classList.add("completed");
      Img.src = "check.png";
      Img.classList.add("check");
    }
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;

      span.classList.toggle("completed");
      console.log("clicked span");
      if (span.className.match("completed")) {
        Img.src = "check.png";
        Img.classList.replace("uncheck", "check");
        Task.completed = true;
        StoreTask();
      } else {
        Img.src = "uncheck.png";
        Img.classList.replace("check", "uncheck");
        Task.completed = false;
        StoreTask();
      }
    });
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id != Task.id);
      li.remove();
      StoreTask();
    });
    todoList.appendChild(li);
  }
  localStorage.clear();
});
