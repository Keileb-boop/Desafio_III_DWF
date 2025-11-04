// src/components/Users.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { removeToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("🔹 Token actual:", token);

    api.get('/users')
      .then(res => {
        console.log("✅ Respuesta del backend:", res.data);
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Error al obtener usuarios:", err);

        if (err.response?.status === 401) {
          removeToken();
          nav('/');
        } else if (err.message === 'Network Error') {
          setErrorMsg('Error de red: verifica que el backend esté corriendo y CORS esté configurado.');
        } else {
          setErrorMsg('Error al obtener usuarios');
        }
        setLoading(false);
      });
  }, [nav]);

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', backgroundColor: '#f0f2f5', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <div style={{ width: '100%', maxWidth: '900px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#333' }}>Usuarios</h2>
          <button
            onClick={() => { removeToken(); nav('/'); }}
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#e74c3c',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#c0392b'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#e74c3c'}
          >
            Cerrar sesión
          </button>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#666' }}>Cargando usuarios...</p>
        ) : errorMsg ? (
          <p style={{ textAlign: 'center', color: 'red' }}>{errorMsg}</p>
        ) : users.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>No hay usuarios registrados.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f7f7f7' }}>
                <th style={{ padding: '0.8rem', textAlign: 'left', borderBottom: '1px solid #ccc' }}>ID</th>
                <th style={{ padding: '0.8rem', textAlign: 'left', borderBottom: '1px solid #ccc' }}>Usuario</th>
                <th style={{ padding: '0.8rem', textAlign: 'left', borderBottom: '1px solid #ccc' }}>Roles</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.8rem' }}>{u.id}</td>
                  <td style={{ padding: '0.8rem' }}>{u.username}</td>
                  <td style={{ padding: '0.8rem' }}>
                    {Array.isArray(u.roles) ? u.roles.join(', ') : JSON.stringify(u.roles)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
