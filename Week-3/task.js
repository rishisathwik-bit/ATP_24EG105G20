import { validateTitle, validatePriority, validateDueDate } from "./validation.js";
const tasks = [];
let idCounter = 1;
function addTask(title, priority, dueDate) {
  if (!validateTitle(title)) {
    return "Error: Title must be at least 3 characters.";
  }
  if (!validatePriority(priority)) {
    return "Error: Priority must be low, medium, or high.";
  }
  if (!validateDueDate(dueDate)) {
    return "Error: Due date must be a future date.";
  }

  const task = {
    id: idCounter++,
    title,
    priority,
    dueDate,
    completed: false
  };

  tasks.push(task);
  return "Task added successfully!";
}
function getAllTasks() {
  return tasks;
}
function completeTask(taskId) {
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return "Task not found";
  }

  task.completed = true;
  return "Task marked as complete";
}
export { addTask, getAllTasks, completeTask };

 