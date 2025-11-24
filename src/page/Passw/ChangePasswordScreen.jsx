import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './Pass.css';

import { FiArrowLeft, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../../utils/AuthContext'; 

const hashPassword = (password) => {
    return btoa(password);
};

const comparePassword = (inputPassword, storedHash) => {
    try {
        const inputHash = btoa(inputPassword);
        return inputHash === storedHash;
    } catch (e) {
        return false;
    }
};
const InputField = React.memo(({ label, id, placeholder, value, onChange, showPass, togglePass }) => (
    <>
        <label htmlFor={id} className="cp-input-label">{label}</label>
        <div className="cp-input-group cp-password-toggle-group"> 
            <FiLock className="cp-input-icon" /> 
            <input
                id={id}
                type={showPass ? 'text' : 'password'}
                className="cp-text-input" 
                placeholder={placeholder} 
                value={value}
                onChange={onChange}
                required
            />
            <span
                className="cp-toggle-password-icon" 
                onClick={togglePass}
            >
                {showPass ? <FiEyeOff /> : <FiEye />}
            </span>
        </div>
    </>
));

function ChangePasswordScreen() {
    const navigate = useNavigate();
    const { currentUser, logout, isLoading } = useAuth(); 

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [showOldPass, setShowOldPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const DEFAULT_USERNAME = '1';
    const DEFAULT_PASSWORD = '1';

    const togglePasswordVisibility = (setter, currentState) => {
        setter(!currentState);
    };
    
    useEffect(() => {
        if (!isLoading && !currentUser) {
            navigate('/', { replace: true }); 
        }
    }, [currentUser, navigate, isLoading]);

    if (isLoading) {
        return <div className="cp-container" style={{padding: '20px', textAlign: 'center'}}>กำลังโหลดข้อมูลผู้ใช้...</div>; 
    }
    
    if (!currentUser) {
        return null; 
    }

    const handleChangePassword = (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        if (newPassword !== confirmNewPassword) {
            setError('รหัสผ่านใหม่และการยืนยันไม่ตรงกัน');
            return;
        }

        if (!newPassword.trim()) {
            setError('รหัสผ่านใหม่ต้องไม่เป็นค่าว่าง');
            return;
        }
        const usersJSON = localStorage.getItem('users');
        let existingUsers = usersJSON ? JSON.parse(usersJSON) : [];

        const userIndex = existingUsers.findIndex(u => u.username === currentUser);
        const userStored = userIndex !== -1 ? existingUsers[userIndex] : null;

        let storedHash = '';
        let isDefaultUserInitial = false;
        if (currentUser === DEFAULT_USERNAME && !userStored) {
            isDefaultUserInitial = true;
            storedHash = DEFAULT_PASSWORD; 
        } else if (userStored) {
            storedHash = userStored.password; 
        } else {
            setError('ไม่พบข้อมูลผู้ใช้ในระบบ หรือเซสชันหมดอายุ');
            logout();
            return;
        }
        const isOldPasswordCorrect = isDefaultUserInitial 
            ? (oldPassword === storedHash) 
            : comparePassword(oldPassword, storedHash); 

        if (!isOldPasswordCorrect) {
            setError('รหัสผ่านเก่าไม่ถูกต้อง');
            return;
        }
        const newHashedPassword = hashPassword(newPassword);

        if (isDefaultUserInitial) {
            const newUser = {
                username: DEFAULT_USERNAME,
                password: newHashedPassword 
            };
            existingUsers.push(newUser);
        } else {
             existingUsers[userIndex] = {
                ...userStored,
                password: newHashedPassword
            };
        }

        localStorage.setItem('users', JSON.stringify(existingUsers));

        setSuccessMessage('เปลี่ยนรหัสผ่านสำเร็จแล้ว! กรุณาเข้าสู่ระบบใหม่');
        
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        logout();

        setTimeout(() => {
            navigate('/');
        }, 2000);
    };
    
    return (
        <div className="cp-container"> 
            <header className="cp-header"> 
                <FiArrowLeft className="cp-back-icon" onClick={() => navigate(-1)} /> 
                <h1 className="cp-header-title">เปลี่ยนรหัสผ่าน</h1> 
                <div style={{ width: '24px' }}></div>
            </header>

            <form className="cp-form" onSubmit={handleChangePassword}>

                {successMessage && <p style={{ color: '#90ee90', marginBottom: '15px', textAlign: 'center' }}>{successMessage}</p>}

                {/* --- รหัสผ่านเดิม --- */}
                <InputField
                    label="รหัสผ่านเดิม"
                    id="oldPassword"
                    placeholder="กรอกรหัสผ่านเดิม"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    showPass={showOldPass}
                    togglePass={() => togglePasswordVisibility(setShowOldPass, showOldPass)}
                />

                {/* --- รหัสผ่านใหม่ --- */}
                <InputField
                    label="รหัสผ่านใหม่"
                    id="newPassword"
                    placeholder="กรอกรหัสผ่านใหม่"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    showPass={showNewPass}
                    togglePass={() => togglePasswordVisibility(setShowNewPass, showNewPass)}
                />

                {/* --- ยืนยันรหัสผ่านใหม่ --- */}
                <InputField
                    label="ยืนยันรหัสผ่านใหม่"
                    id="confirmNewPassword"
                    placeholder="ยืนยันรหัสผ่านใหม่อีกครั้ง"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    showPass={showConfirmPass}
                    togglePass={() => togglePasswordVisibility(setShowConfirmPass, showConfirmPass)}
                />


                {error && <p style={{ color: '#ff6347', marginTop: '10px', textAlign: 'center' }}>{error}</p>}

                <button type="submit" className="cp-submit-button" style={{marginTop: '30px'}}>บันทึกรหัสผ่านใหม่</button>
            </form>
        </div>
    );
}

export default ChangePasswordScreen;