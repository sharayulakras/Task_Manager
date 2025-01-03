import React from "react";

function TaskList({ tasks, updateTask, deleteTask, toggleCompletion }) {
  return (
    <div className="row">
      {tasks.map((task) => (
        <div className="col-md-6 mb-4" key={task.id}>
          <div className="card">
            <div className="card-body">
              <h5
                className={`card-title ${
                  task.completed ? "text-decoration-line-through" : ""
                }`}
              >
                {task.taskName}
              </h5>
              <p className="card-text">{task.description}</p>
              <p className="card-text">
                <small className="text-muted">Due: {task.dueDate}</small>
              </p>
              <div className="d-flex justify-content-between">
                <button
                  className={`btn btn-sm ${
                    task.completed ? "btn-secondary" : "btn-success"
                  }`}
                  onClick={() => toggleCompletion(task.id)}
                >
                  {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
                </button>
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => updateTask(task.id, task)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
