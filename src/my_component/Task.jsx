import React, { useState, useEffect } from "react";

function Task({ addTask, taskToEdit }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Populate form fields if editing a task
  useEffect(() => {
    if (taskToEdit) {
      setTaskName(taskToEdit.taskName);
      setDescription(taskToEdit.description);
      setDueDate(taskToEdit.dueDate);
    } else {
      setTaskName("");
      setDescription("");
      setDueDate("");
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure all fields are filled in
    if (!taskName || !description || !dueDate) {
      alert("Please fill in all fields!");
      return;
    }

    // Create task object
    const taskData = {
      id: taskToEdit ? taskToEdit.id : Date.now(),
      taskName,
      description,
      dueDate,
      completed: taskToEdit ? taskToEdit.completed : false,
    };

    // Add or update task
    addTask(taskData);

    // Reset form
    setTaskName("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label htmlFor="taskName" className="form-label">
          Task Name
        </label>
        <input
          type="text"
          className="form-control"
          id="taskName"
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="dueDate" className="form-label">
          Due Date
        </label>
        <input
          type="date"
          className="form-control"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        {taskToEdit ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}

export default Task;
