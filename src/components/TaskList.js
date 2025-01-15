import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TaskList = ({ tasks, deleteTask, selectTask }) => {
  const [currentPage, setCurrentPage] = useState(1); 
  const [selectedTask, setSelectedTask] = useState(null); 
  const [showModal, setShowModal] = useState(false); 

  const tasksPerPage = 5; 

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const closeModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  const confirmDelete = () => {
    if (selectedTask) {
      deleteTask(selectedTask.id);
      closeModal();
    }
  };

  return (
    <>
      {/* Table */}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Assigned User</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.assignedUser}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.comments}</td>
              <td>
                <button
                  onClick={() => selectTask(task)}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedTask(task);
                    setShowModal(true);
                  }}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  onClick={() => paginate(index + 1)}
                  className="page-link"
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundColor: "red" }}> 
               <h5 className="modal-title text-white fw-bold" style={{ fontSize: "20px" }}>Delete</h5>                

                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Do you want to delete the task{" "}
                  <strong>{selectedTask?.title}</strong>?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  No
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskList;
