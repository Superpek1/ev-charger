import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import { Routes, Route, Navigate } from 'react-router-dom';

import SettingScreen from './page/setting/Setting.jsx';
import RegisterScreen from './page/login/reginster.jsx';
import LoginScreen from './page/login/login.jsx';
import MyCarScreen from './page/car/mycar.jsx';
import Profile from './page/Profile/Profile.jsx';
import ChangePasswordScreen from './page/Profile/ChangePasswordScreen.jsx';
import CarmeScreen from './page/car/carme.jsx';
import CarNowScreen from './page/car/Car now.jsx';
import TidtorScreen from './page/contact/tidtor.jsx';


import { AuthProvider } from "./utils/AuthContext.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";


const HomeScreen = () => (
  <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#333', color: 'white', minHeight: '100vh' }}>
    <h1> ยินดีต้อนรับเข้าสู่หน้าหลัก!</h1>
    <p>คุณล็อกอินสำเร็จแล้ว และเข้าถึงส่วนที่ต้องการการป้องกันได้</p>
  </div>
);


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>

          {/* --- 1. Public Routes --- */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />


          {/* 2. Protected Routes */}

          <Route path="/home" element={
            <ProtectedRoute><HomeScreen /></ProtectedRoute>
          } />

          <Route path="/mycar" element={
            <ProtectedRoute><MyCarScreen /></ProtectedRoute>
          } />

          <Route path="/carme/:carId" element={
            <ProtectedRoute><CarmeScreen /></ProtectedRoute>
          } />

          <Route path="/setting" element={
            <ProtectedRoute><SettingScreen /></ProtectedRoute>
          } />

          <Route path="/Profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />

          <Route path="/change-password" element={
            <ProtectedRoute><ChangePasswordScreen /></ProtectedRoute>
          } />

          <Route path="/mygarage" element={
            <ProtectedRoute><CarNowScreen /></ProtectedRoute>
          } />

          <Route path="/contact" element={
            <ProtectedRoute><TidtorScreen /></ProtectedRoute>
          } />


          <Route path="*" element={<h1 style={{ textAlign: 'center' }}>404 - ไม่พบหน้า</h1>} />

        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;