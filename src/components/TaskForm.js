import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TaskForm = ({ addTask, editTask, selectedTask, users, onCancel }) => {
  const [task, setTask] = useState({
    title: "",
    assignedUser: "",
    status: "In Progress",
    dueDate: "",
    priority: "Low",
    comments: "",
  });

  useEffect(() => {
    if (selectedTask) {
      setTask(selectedTask);
    }
  }, [selectedTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTask) {
      editTask(task);
    } else {
      addTask({ ...task, id: Date.now() });
    }
    setTask({
      title: "",
      assignedUser: "",
      status: "In Progress",
      dueDate: "",
      priority: "Low",
      comments: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 mb-3 bg-light">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <label>Task Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter Task Title"
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group mb-3">
            <label>Assign To</label>
            <select
              name="assignedUser"
              className="form-control"
              value={task.assignedUser}
              onChange={handleChange}
              required
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <label>Status</label>
            <select
              name="status"
              className="form-control"
              value={task.status}
              onChange={handleChange}
              required
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group mb-3">
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              className="form-control"
              value={task.dueDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <label>Priority</label>
            <select
              name="priority"
              className="form-control"
              value={task.priority}
              onChange={handleChange}
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group mb-3">
            <label>Comment</label>
            <textarea
              name="comments"
              className="form-control"
              value={task.comments}
              onChange={handleChange}
              placeholder="Enter Comment"
            />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4">
        {selectedTask ? (
          <>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button> 
            <button type="submit" className="btn btn-primary me-2">
              Update Task
            </button>            
          </>
        ) : (
          <>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary me-2">
              Save
            </button>           
          </>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
