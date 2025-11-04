import React, { useState } from 'react';
import api from '../services/api';
import { saveToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/auth/login', { username, password });
      const token = res.data.token;
      saveToken(token);

      // Decodificar JWT y determinar roles
      const decoded = jwtDecode(token);
      const roles = decoded.roles || decoded.authorities?.map(a => a.authority) || [];

      // Redirigir según rol
      if (roles.includes('ROLE_ADMIN')) nav('/users');
      else nav('/user-home');

    } catch (err) {
      setError(err.response?.data || 'Error al autenticar');
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f2f5',
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        padding: '2rem',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '1.5rem' }}>Iniciar sesión</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{
              padding: '0.8rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              padding: '0.8rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.8rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#4a90e2',
              color: 'white',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#357ABD'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#4a90e2'}
          >
            Entrar
          </button>
        </form>
        {error && <div style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{error}</div>}
      </div>
    </div>
  );
}
