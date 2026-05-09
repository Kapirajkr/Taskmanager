// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';

// function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('member');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { register } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     try {
//       await register(name, email, password, role);
//       window.location.href = '/dashboard';
//     } catch (err) {
//       setError(err.error || 'Registration failed. Email might already exist.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const containerStyles = {
//     minHeight: '100vh',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '20px'
//   };

//   const cardStyles = {
//     background: 'white',
//     borderRadius: '10px',
//     padding: '40px',
//     width: '100%',
//     maxWidth: '400px',
//     boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
//   };

//   const titleStyles = {
//     textAlign: 'center',
//     marginBottom: '30px',
//     color: '#667eea',
//     fontSize: '28px'
//   };

//   const inputStyles = {
//     width: '100%',
//     padding: '12px',
//     marginBottom: '15px',
//     border: '1px solid #ddd',
//     borderRadius: '5px',
//     fontSize: '16px'
//   };

//   const buttonStyles = {
//     width: '100%',
//     padding: '12px',
//     background: '#667eea',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     marginTop: '10px'
//   };

//   const errorStyles = {
//     background: '#f8d7da',
//     color: '#721c24',
//     padding: '10px',
//     borderRadius: '5px',
//     marginBottom: '20px',
//     textAlign: 'center'
//   };

//   const linkStyles = {
//     textAlign: 'center',
//     marginTop: '20px',
//     color: '#666'
//   };

//   return (
//     <div style={containerStyles}>
//       <div style={cardStyles}>
//         <h1 style={titleStyles}>Register</h1>
        
//         {error && <div style={errorStyles}>{error}</div>}
        
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             style={inputStyles}
//             required
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={inputStyles}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={inputStyles}
//             required
//           />
//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             style={inputStyles}
//           >
//             <option value="member">Member</option>
//             <option value="admin">Admin</option>
//           </select>
//           <button type="submit" style={buttonStyles} disabled={loading}>
//             {loading ? 'Registering...' : 'Register'}
//           </button>
//         </form>
        
//         <div style={linkStyles}>
//           Already have an account? <a href="/login" style={{ color: '#667eea' }}>Login</a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('member');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register(name, email, password, role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.error || 'Registration failed. Email might already exist.');
    } finally {
      setLoading(false);
    }
  };

  const containerStyles = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  };

  const cardStyles = {
    background: 'white',
    borderRadius: '10px',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
  };

  const titleStyles = {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#667eea',
    fontSize: '28px'
  };

  const inputStyles = {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px'
  };

  const buttonStyles = {
    width: '100%',
    padding: '12px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px'
  };

  const errorStyles = {
    background: '#f8d7da',
    color: '#721c24',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '20px',
    textAlign: 'center'
  };

  const linkStyles = {
    textAlign: 'center',
    marginTop: '20px',
    color: '#666'
  };

  return (
    <div style={containerStyles}>
      <div style={cardStyles}>
        <h1 style={titleStyles}>Register</h1>

        {error && <div style={errorStyles}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyles}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyles}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyles}
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={inputStyles}
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" style={buttonStyles} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div style={linkStyles}>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            style={{ color: '#667eea', cursor: 'pointer' }}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;