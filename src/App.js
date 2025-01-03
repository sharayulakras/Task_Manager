import React, { useState, useEffect } from "react";
import Task from "./my_component/Task";
import TaskList from "./my_component/TaskList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null); // State for editing a task

  // Load tasks from local storage on initial render
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);


  const addTask = (task) => {
    let updatedTaskList
    if (taskToEdit) {
      // If editing a task, update it
      updatedTaskList=(tasks.map((t) => (t.id === task.id ? task : t)));
    } else {
      // If adding a new task, add it to the list
      updatedTaskList=([...tasks, task]);
    }
    setTasks(updatedTaskList)
    localStorage.setItem("tasks", JSON.stringify(updatedTaskList));
    setTaskToEdit(null); // Reset the taskToEdit after saving the task
  };

  const updateTask = (id) => {
    // Find the task to edit and set it to taskToEdit
    const task = tasks.find((t) => t.id === id);
    setTaskToEdit(task);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Task Manager</h1>
      <Task addTask={addTask} taskToEdit={taskToEdit} />
      <TaskList
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        toggleCompletion={toggleCompletion}
      />
    </div>
  );
}

export default App;
