// src/components/UserHome.js
import React from 'react';
import { removeToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function UserHome() {
  const nav = useNavigate();

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
        width: '100%',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '1rem', color: '#333' }}>Bienvenido</h2>
        <p style={{ marginBottom: '2rem' }}>Eres un usuario normal.</p>
        <button 
          onClick={() => { removeToken(); nav('/'); }}
          style={{
            padding: '0.8rem 1.2rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#e74c3c',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
