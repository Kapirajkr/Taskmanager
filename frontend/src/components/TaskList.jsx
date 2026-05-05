import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function TaskList({ tasks, projects, users, onTaskUpdated }) {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', project: '', assignedTo: '' });

  const createTask = async () => {
    if (!newTask.title || !newTask.project || !newTask.assignedTo) {
      alert('Please fill all fields');
      return;
    }
    
    try {
      await axios.post(`${API_URL}/tasks`, newTask);
      setNewTask({ title: '', project: '', assignedTo: '' });
      setShowForm(false);
      onTaskUpdated();
    } catch (error) {
      alert(error.response?.data?.error || 'Error creating task');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/tasks/${id}`, { status });
      onTaskUpdated();
    } catch (error) {
      alert(error.response?.data?.error || 'Error updating task');
    }
  };

  const deleteTask = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      return;
    }
    
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`);
      onTaskUpdated();
    } catch (error) {
      alert(error.response?.data?.error || 'Error deleting task');
    }
  };

  const sectionStyles = {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '15px'
  };

  const titleStyles = {
    fontSize: '24px',
    color: '#333'
  };

  const addBtnStyles = {
    background: '#28a745',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer'
  };

  const formStyles = {
    marginBottom: '20px',
    padding: '20px',
    background: '#f9f9f9',
    borderRadius: '5px'
  };

  const inputStyles = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px'
  };

  const taskCardStyles = {
    padding: '15px',
    marginBottom: '10px',
    background: '#f9f9f9',
    borderRadius: '5px',
    border: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px',
    position: 'relative'
  };

  const deleteBtnStyles = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    padding: '5px 8px',
    fontSize: '12px',
    cursor: 'pointer'
  };

  const statusSelectStyles = (status) => ({
    padding: '5px 10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    background: status === 'completed' ? '#d4edda' : '#fff3cd',
    cursor: 'pointer'
  });

  return (
    <div style={sectionStyles}>
      <div style={headerStyles}>
        <h2 style={titleStyles}>✅ Tasks</h2>
        <button onClick={() => setShowForm(!showForm)} style={addBtnStyles}>
          {showForm ? 'Cancel' : '+ Add Task'}
        </button>
      </div>

      {showForm && (
        <div style={formStyles}>
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            style={inputStyles}
          />
          <select
            value={newTask.project}
            onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
            style={inputStyles}
          >
            <option value="">Select Project</option>
            {projects.map(p => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>
          <select
            value={newTask.assignedTo}
            onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
            style={inputStyles}
          >
            <option value="">Assign To</option>
            {users.map(u => (
              <option key={u._id} value={u._id}>{u.name}</option>
            ))}
          </select>
          <button onClick={createTask} style={addBtnStyles}>
            Create Task
          </button>
        </div>
      )}

      <div>
        {tasks.map(task => (
          <div key={task._id} style={taskCardStyles}>
            {user?.role === 'admin' && (
              <button 
                onClick={() => deleteTask(task._id)} 
                style={deleteBtnStyles}
                title="Delete Task"
              >
                🗑️
              </button>
            )}
            <div>
              <strong>{task.title}</strong>
              <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                Project: {task.project?.name}
              </p>
              <p style={{ fontSize: '12px', color: '#888' }}>
                Assigned to: {task.assignedTo?.name}
              </p>
            </div>
            <div>
              {user && (task.assignedTo?._id === user.id || user.role === 'admin') ? (
                <select
                  value={task.status}
                  onChange={(e) => updateStatus(task._id, e.target.value)}
                  style={statusSelectStyles(task.status)}
                >
                  <option value="pending">⏳ Pending</option>
                  <option value="completed">✅ Completed</option>
                </select>
              ) : (
                <span style={{
                  padding: '5px 10px',
                  borderRadius: '5px',
                  background: task.status === 'completed' ? '#d4edda' : '#fff3cd',
                  color: task.status === 'completed' ? '#155724' : '#856404',
                  fontSize: '14px'
                }}>
                  {task.status === 'completed' ? '✅ Completed' : '⏳ Pending'}
                </span>
              )}
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666' }}>No tasks assigned</p>
        )}
      </div>
    </div>
  );
}

export default TaskList;