import React, { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "bootstrap/dist/css/bootstrap.min.css";

const Application = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showForm, setShowForm] = useState(false); 

  const users = ["Ali", "Boby", "Charlie", "Dravid"];

  const addTask = (task) => {
    setTasks([...tasks, task]);
    setSelectedTask(null); // Reset selectedTask to null after adding a task
    setShowForm(false); // Hide the form after adding a task
  };

  const editTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setSelectedTask(null);
    setShowForm(false); 
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const selectTask = (task) => {
    setSelectedTask(task);
    setShowForm(true);
  };

  // Function to handle canceling the form
  const handleCancel = () => {
    setSelectedTask(null);
    setShowForm(false); // Hide the form on cancel
  };

  // Function to refresh the task list
  const handleRefresh = () => {
    setTasks([]); // Clear the task list
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">              
        <p className="text-secondary">{tasks.length} {tasks.length === 1 ? "record" : "records"}</p>
        <h1 className="text-left">All Tasks</h1>        
        <div className="d-flex">
          {/* Conditionally render the Refresh button */}
          {!showForm && (
            <button className="btn btn-secondary me-2" onClick={handleRefresh}>
              Refresh
            </button>
          )}
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Hide Task Form" : "Add Task"}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mb-4">
          <TaskForm
            addTask={addTask}
            editTask={editTask}
            selectedTask={selectedTask}
            users={users}
            onCancel={handleCancel} 
          />
        </div>
      )}

      {!showForm && (
        <TaskList tasks={tasks} deleteTask={deleteTask} selectTask={selectTask} />
      )}
    </div>
  );
};

export default Application;
