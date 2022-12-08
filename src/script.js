import uniqid from "uniqid";
import { Notify } from "notiflix/build/notiflix-notify-aio";

Notify.init({
  width: "280px",
  position: "center-top",
});

let counter = document.querySelector("[data-counter]");
let taskCounter = 0;
let allChecked = [];

const taskList = document.querySelector("#taskList");
const taskInput = document.querySelector("#taskAdd");

const clearCompleted = document.querySelector("#clearCompleted");

function updateCounter() {
  counter.innerHTML = taskCounter;
}
function createTask(task) {
  const newTaskEl = document.createElement("li");
  const taskContent = document.createElement("label");
  const taskCheckboxCustom = document.createElement("span");
  const taskCheckbox = document.createElement("input");
  const removeBtn = document.createElement("span");

  newTaskEl.classList.add("tile");
  newTaskEl.classList.add("task-tile");
  taskCheckboxCustom.classList.add("checkbox--custom");
  taskCheckbox.classList.add("checkbox");
  taskContent.classList.add("task__label");
  removeBtn.classList.add("task__remove");

  taskCheckbox.setAttribute("type", "checkbox");
  taskCheckbox.setAttribute("name", "Input checkmark");
  taskCheckbox.setAttribute("id", uniqid());

  taskContent.textContent = task;

  taskContent.append(taskCheckboxCustom);
  taskContent.append(taskCheckbox);
  newTaskEl.append(taskContent);
  newTaskEl.append(removeBtn);
  taskList.append(newTaskEl);

  taskCounter++;

  removeBtn.addEventListener("click", () => {
    removeBtn.parentElement.remove();
    taskCounter--;
    updateCounter();
  });
  taskCheckbox.addEventListener("change", () => {
    newTaskEl.classList.toggle("task-tile--completed");
  });
}

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (taskInput.value == "") {
      Notify.warning("You need to add task, you can't be doing nothing");
    } else {
      createTask(taskInput.value);
      updateCounter();
    }
  }
});

clearCompleted.addEventListener("click", () => {
  allChecked = document.querySelectorAll("input[type=checkbox]:checked");
  taskCounter -= allChecked.length;
  updateCounter();
  allChecked.forEach((child) => child.parentElement.parentElement.remove());
});



const optionsDesktop = document.querySelector("#optionsDesktop");

optionsDesktop.addEventListener("click", (event) => {
  let notTarget = document.querySelectorAll("a");
  notTarget.forEach((el) => el.classList.remove("options--active"));

  let target = event.target;

  if (target.tagName != "A") return;
  target.classList.add("options--active");
});
