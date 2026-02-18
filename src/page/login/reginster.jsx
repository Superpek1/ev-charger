import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './reginster.css';
import { FiArrowLeft } from 'react-icons/fi';
import { FaCalendarAlt } from 'react-icons/fa';
import api from '../../api/axios';

function RegisterScreen() {
    const navigate = useNavigate();
    
    // State สำหรับ Form Data
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        idCard: '',
        firstName: '',
        lastName: '',
        dob: '',
        phone: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน');
            return;
        }

        setLoading(true);

        try {
            // ส่งข้อมูลไปสมัครสมาชิก
            await api.post('/auth/register', {
                username: formData.username,
                password: formData.password,
                idCard: formData.idCard,
                firstName: formData.firstName,
                lastName: formData.lastName,
                dob: formData.dob,
                phone: formData.phone
            });

            alert('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ');
            navigate('/login');

        } catch (err) {
            setError(err.response?.data?.message || 'การสมัครสมาชิกผิดพลาด');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <header className="register-header">
                <FiArrowLeft className="back-icon" onClick={() => navigate(-1)} />
                <h1 className="header-title">สมัครสมาชิก</h1>
                <div style={{ width: '24px' }}></div>
            </header>

            <form className="register-form" onSubmit={handleRegister}>
                <label htmlFor="username" className="input-label">ชื่อผู้ใช้</label>
                <div className="input-group">
                    <input id="username" type="text" className="text-input" 
                           value={formData.username} onChange={handleChange} required />
                </div>

                <label htmlFor="password" className="input-label">รหัสผ่าน</label>
                <div className="input-group">
                    <input id="password" type="password" className="text-input" 
                           value={formData.password} onChange={handleChange} required />
                </div>

                <label htmlFor="confirmPassword" className="input-label">ยืนยันรหัสผ่าน</label>
                <div className="input-group">
                    <input id="confirmPassword" type="password" className="text-input" 
                           value={formData.confirmPassword} onChange={handleChange} required />
                </div>

                <label htmlFor="idCard" className="input-label">เลขบัตรประชาชน</label>
                <div className="input-group">
                    <input id="idCard" type="text" className="text-input" 
                           value={formData.idCard} onChange={handleChange} />
                </div>
                
                <label htmlFor="firstName" className="input-label">ชื่อ</label>
                <div className="input-group">
                    <input id="firstName" type="text" className="text-input" 
                           value={formData.firstName} onChange={handleChange} />
                </div>

                <label htmlFor="lastName" className="input-label">นามสกุล</label>
                <div className="input-group">
                    <input id="lastName" type="text" className="text-input" 
                           value={formData.lastName} onChange={handleChange} />
                </div>

                <label htmlFor="dob" className="input-label">วันเกิด</label>
                <div className="input-group date-input">
                    <input id="dob" type="text" className="text-input" 
                           value={formData.dob} onChange={handleChange} placeholder="DD/MM/YYYY"/>
                    <FaCalendarAlt className="calendar-icon" />
                </div>

                <label htmlFor="phone" className="input-label">เบอร์โทรศัพท์</label>
                <div className="input-group">
                    <input id="phone" type="tel" className="text-input" 
                           value={formData.phone} onChange={handleChange} />
                </div>

                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'กำลังบันทึก...' : 'สมัครสมาชิก'}
                </button>
            </form>
        </div>
    );
}

export default RegisterScreen;