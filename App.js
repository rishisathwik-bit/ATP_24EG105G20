import { addTask, getAllTasks, completeTask } from "./task.js";

console.log(addTask("Finish assignment", "high", "2026-03-20"));
console.log(addTask("Buy groceries", "medium", "2026-03-15"));
console.log(addTask("Read book", "low", "2026-03-25"));

console.log("All Tasks:");
console.log(getAllTasks());

console.log(completeTask(2));

console.log("Updated Tasks:");
console.log(getAllTasks());