import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function ProjectList({ projects, onProjectCreated }) {
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState('');
  const { user } = useAuth();

  const createProject = async () => {
    if (!projectName.trim()) return;
    
    try {
      await axios.post(`${API_URL}/projects`, { name: projectName });
      setProjectName('');
      setShowForm(false);
      onProjectCreated();
    } catch (error) {
      alert(error.response?.data?.error || 'Error creating project');
    }
  };

  const deleteProject = async (projectId) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }
    
    try {
      await axios.delete(`${API_URL}/projects/${projectId}`);
      onProjectCreated();
    } catch (error) {
      alert(error.response?.data?.error || 'Error deleting project');
    }
  };

  const sectionStyles = {
    marginBottom: '40px',
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

  const projectsGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '15px'
  };

  const projectCardStyles = {
    padding: '15px',
    background: '#f9f9f9',
    borderRadius: '5px',
    border: '1px solid #e0e0e0',
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

  return (
    <div style={sectionStyles}>
      <div style={headerStyles}>
        <h2 style={titleStyles}>📁 Projects</h2>
        {user?.role === 'admin' && (
          <button onClick={() => setShowForm(!showForm)} style={addBtnStyles}>
            {showForm ? 'Cancel' : '+ Add Project'}
          </button>
        )}
      </div>

      {showForm && user?.role === 'admin' && (
        <div style={formStyles}>
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            style={inputStyles}
          />
          <button onClick={createProject} style={addBtnStyles}>
            Create Project
          </button>
        </div>
      )}

      <div style={projectsGridStyles}>
        {projects.map(project => (
          <div key={project._id} style={projectCardStyles}>
            {user?.role === 'admin' && (
              <button 
                onClick={() => deleteProject(project._id)} 
                style={deleteBtnStyles}
                title="Delete Project"
              >
                🗑️
              </button>
            )}
            <strong>{project.name}</strong>
            <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
              Owner: {project.owner?.name}
            </p>
          </div>
        ))}
        {projects.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666' }}>No projects yet</p>
        )}
      </div>
    </div>
  );
}

export default ProjectList;