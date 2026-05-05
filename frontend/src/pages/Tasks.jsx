import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Navbar from '../components/Navbar';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Tasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [tasksRes, projectsRes] = await Promise.all([
        axios.get(`${API_URL}/tasks`),
        axios.get(`${API_URL}/projects`)
      ]);

      setTasks(tasksRes.data);
      setProjects(projectsRes.data);

      // Load users for admin
      if (user?.role === 'admin') {
        const usersRes = await axios.get(`${API_URL}/auth/users`);
        setUsers(usersRes.data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/tasks/${id}`, { status });
      loadData(); // Refresh data
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
      loadData();
    } catch (error) {
      alert(error.response?.data?.error || 'Error deleting task');
    }
  };

  // Group tasks by assigned user
  const tasksByUser = tasks.reduce((acc, task) => {
    const userId = task.assignedTo?._id || task.assignedTo;
    if (!acc[userId]) {
      acc[userId] = {
        user: task.assignedTo,
        tasks: []
      };
    }
    acc[userId].tasks.push(task);
    return acc;
  }, {});

  const containerStyles = {
    padding: '30px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headerStyles = {
    textAlign: 'center',
    marginBottom: '40px'
  };

  const titleStyles = {
    fontSize: '32px',
    color: '#333',
    marginBottom: '10px'
  };

  const subtitleStyles = {
    fontSize: '16px',
    color: '#666'
  };

  const memberSectionStyles = {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  };

  const memberHeaderStyles = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    paddingBottom: '10px',
    borderBottom: '2px solid #f0f0f0'
  };

  const memberNameStyles = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333'
  };

  const taskCountStyles = {
    background: '#667eea',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    marginLeft: '10px'
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

  const readOnlyStatusStyles = {
    padding: '5px 10px',
    borderRadius: '5px',
    fontSize: '14px'
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: 'center', padding: '50px' }}>
          Loading tasks...
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div style={containerStyles}>
        <div style={headerStyles}>
          <h1 style={titleStyles}>✅ Tasks by Member</h1>
          <p style={subtitleStyles}>View tasks organized by assigned team members</p>
        </div>

        {Object.keys(tasksByUser).length === 0 ? (
          <div style={{ textAlign: 'center', color: '#666', padding: '50px' }}>
            No tasks found
          </div>
        ) : (
          Object.values(tasksByUser).map(({ user: assignedUser, tasks: userTasks }) => (
            <div key={assignedUser?._id || assignedUser} style={memberSectionStyles}>
              <div style={memberHeaderStyles}>
                <span style={memberNameStyles}>
                  👤 {assignedUser?.name || 'Unknown User'}
                </span>
                <span style={taskCountStyles}>
                  {userTasks.length} task{userTasks.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div>
                {userTasks.map(task => (
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

                    <div style={{ flex: 1 }}>
                      <strong>{task.title}</strong>
                      <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                        Project: {task.project?.name}
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
                          ...readOnlyStatusStyles,
                          background: task.status === 'completed' ? '#d4edda' : '#fff3cd',
                          color: task.status === 'completed' ? '#155724' : '#856404'
                        }}>
                          {task.status === 'completed' ? '✅ Completed' : '⏳ Pending'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Tasks;