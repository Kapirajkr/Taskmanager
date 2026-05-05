import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ProjectList from '../components/ProjectList';
import TaskList from '../components/TaskList';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });

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
      
      // Calculate stats
      setStats({
        total: tasksRes.data.length,
        pending: tasksRes.data.filter(t => t.status === 'pending').length,
        completed: tasksRes.data.filter(t => t.status === 'completed').length
      });
      
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

  const containerStyles = {
    padding: '30px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const statsGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  };

  const statCardStyles = {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const statNumberStyles = {
    fontSize: '36px',
    fontWeight: 'bold',
    marginTop: '10px'
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: 'center', padding: '50px' }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div style={containerStyles}>
        {/* Stats Section */}
        <div style={statsGridStyles}>
          <div style={statCardStyles}>
            <h3>Total Tasks</h3>
            <div style={{ ...statNumberStyles, color: '#667eea' }}>{stats.total}</div>
          </div>
          <div style={statCardStyles}>
            <h3>Pending Tasks</h3>
            <div style={{ ...statNumberStyles, color: '#f0ad4e' }}>{stats.pending}</div>
          </div>
          <div style={statCardStyles}>
            <h3>Completed Tasks</h3>
            <div style={{ ...statNumberStyles, color: '#28a745' }}>{stats.completed}</div>
          </div>
        </div>

        {/* Projects and Tasks */}
        <ProjectList projects={projects} onProjectCreated={loadData} />
        <TaskList 
          tasks={tasks} 
          projects={projects} 
          users={users} 
          onTaskUpdated={loadData} 
        />
      </div>
    </div>
  );
}

export default Dashboard;