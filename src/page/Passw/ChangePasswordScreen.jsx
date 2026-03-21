import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './Pass.css';
import { FiArrowLeft, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../../utils/AuthContext'; 
import api from '../../api/axios';

const InputField = React.memo(({ label, id, placeholder, value, onChange, showPass, togglePass }) => (
    <>
        <label htmlFor={id} className="cp-input-label">{label}</label>
        <div className="cp-input-group cp-password-toggle-group"> 
            <FiLock className="cp-input-icon" /> 
            <input
                id={id} type={showPass ? 'text' : 'password'} className="cp-text-input" 
                placeholder={placeholder} value={value} onChange={onChange} required
            />
            <span className="cp-toggle-password-icon" onClick={togglePass}>
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

    const togglePasswordVisibility = (setter, currentState) => setter(!currentState);
    
    useEffect(() => {
        if (!isLoading && !currentUser) {
            navigate('/', { replace: true }); 
        }
    }, [currentUser, navigate, isLoading]);

    if (isLoading) return <div className="cp-container" style={{padding: '20px', textAlign: 'center'}}>กำลังโหลดข้อมูลผู้ใช้...</div>; 
    if (!currentUser) return null; 

    // ฟังก์ชันเปลี่ยนรหัสผ่าน
    const handleChangePassword = async (e) => {
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

        try {
            await api.put('/users/change-password', {
                oldPassword: oldPassword,
                newPassword: newPassword
            });

            setSuccessMessage('เปลี่ยนรหัสผ่านสำเร็จแล้ว! กรุณาเข้าสู่ระบบใหม่');
            setOldPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            
            setTimeout(() => {
                logout();
                navigate('/');
            }, 2000);

        } catch (err) {
            setError(err.response?.data?.message || 'รหัสผ่านเดิมไม่ถูกต้อง หรือเกิดข้อผิดพลาด');
        }
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

                <InputField label="รหัสผ่านเดิม" id="oldPassword" placeholder="กรอกรหัสผ่านเดิม"
                    value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}
                    showPass={showOldPass} togglePass={() => togglePasswordVisibility(setShowOldPass, showOldPass)} />

                <InputField label="รหัสผ่านใหม่" id="newPassword" placeholder="กรอกรหัสผ่านใหม่"
                    value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                    showPass={showNewPass} togglePass={() => togglePasswordVisibility(setShowNewPass, showNewPass)} />

                <InputField label="ยืนยันรหัสผ่านใหม่" id="confirmNewPassword" placeholder="ยืนยันรหัสผ่านใหม่อีกครั้ง"
                    value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}
                    showPass={showConfirmPass} togglePass={() => togglePasswordVisibility(setShowConfirmPass, showConfirmPass)} />

                {error && <p style={{ color: '#ff6347', marginTop: '10px', textAlign: 'center' }}>{error}</p>}

                <button type="submit" className="cp-submit-button" style={{marginTop: '30px'}}>บันทึกรหัสผ่านใหม่</button>
            </form>
        </div>
    );
}

export default ChangePasswordScreen;