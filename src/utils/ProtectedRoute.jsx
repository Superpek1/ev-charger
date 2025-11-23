import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 

function ProtectedRoute({ children }) {
    const { currentUser, loading } = useAuth();
    
    if (loading) {
        return <div>กำลังตรวจสอบสถานะการล็อกอิน...</div>; 
    }
    

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;