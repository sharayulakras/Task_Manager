import React, { useState, useEffect } from "react";

function TaskForm({ addTask, editTask, taskToEdit, clearEditMode }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Populate form fields if editing a task
  useEffect(() => {
    if (taskToEdit) {
      setTaskName(taskToEdit.taskName);
      setDescription(taskToEdit.description);
      setDueDate(taskToEdit.dueDate);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskName || !description || !dueDate) {
      alert("Please fill in all fields!");
      return;
    }

    if (taskToEdit) {
      // Update the task if editing
      editTask({
        ...taskToEdit,
        taskName,
        description,
        dueDate,
      });
    } else {
      // Add a new task
      const newTask = {
        id: Date.now(),
        taskName,
        description,
        dueDate,
        completed: false,
      };
      addTask(newTask);
    }

    // Clear form fields after submission
    setTaskName("");
    setDescription("");
    setDueDate("");
    clearEditMode();
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
      {taskToEdit && (
        <button
          type="button"
          className="btn btn-secondary w-100 mt-2"
          onClick={clearEditMode}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default TaskForm;