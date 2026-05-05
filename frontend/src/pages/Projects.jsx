import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ProjectList from '../components/ProjectList';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Projects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [projectsRes] = await Promise.all([
        axios.get(`${API_URL}/projects`)
      ]);

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

  if (loading) {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: 'center', padding: '50px' }}>
          Loading projects...
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div style={containerStyles}>
        <div style={headerStyles}>
          <h1 style={titleStyles}>📁 Projects</h1>
          <p style={subtitleStyles}>Manage and organize your projects</p>
        </div>

        <ProjectList
          projects={projects}
          users={users}
          onProjectCreated={loadData}
        />
      </div>
    </div>
  );
}

export default Projects;