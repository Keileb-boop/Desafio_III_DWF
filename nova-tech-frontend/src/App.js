// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Users from './components/Users';
import UserHome from './components/UserHome';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route 
          path="/users" 
          element={
            <ProtectedRoute roles={['ROLE_ADMIN']}>
              <Users />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/user-home" 
          element={
            <ProtectedRoute roles={['ROLE_USER']}>
              <UserHome />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
