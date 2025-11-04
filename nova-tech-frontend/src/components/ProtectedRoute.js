import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/auth';
import jwtDecode from 'jwt-decode';

export default function ProtectedRoute({ children, roles }) {
  const token = getToken();
  if (!token) return <Navigate to="/" replace />;

  if (roles && roles.length > 0) {
    try {
      const decoded = jwtDecode(token);
      const userRoles = decoded.roles || decoded.authorities?.map(a => a.authority) || [];
      const hasRole = roles.some(r => userRoles.includes(r));
      if (!hasRole) return <Navigate to="/" replace />;
    } catch (err) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
