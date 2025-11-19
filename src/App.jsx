import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import { Routes, Route } from 'react-router-dom'; 

import SettingScreen from './page/setting/Setting';
import RegisterScreen from './page/login/reginster';
import LoginScreen from './page/login/login';
import MyCarScreen from './page/car/mycar';
import Profile from './page/Profile/Profile';

const HomeScreen = () => (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#333', color: 'white', minHeight: '100vh' }}>
        <h1> ยินดีต้อนรับเข้าสู่หน้าหลัก!</h1>
        <p>การ Login และ Navigation ทำงานแล้ว</p>
    </div>
);


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginScreen />} /> 
        <Route path="/login" element={<LoginScreen />} /> 
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/mycar" element={<MyCarScreen />} />
        <Route path="/setting" element={<SettingScreen />} />
        <Route path="/Profile" element={<Profile />} />
        

      </Routes>
    </div>
  )
}

export default App