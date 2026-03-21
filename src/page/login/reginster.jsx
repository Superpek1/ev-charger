import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './reginster.css';
import { FiArrowLeft } from 'react-icons/fi';
import { FaCalendarAlt } from 'react-icons/fa';
import api from '../../api/axios';

function RegisterScreen() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userName: '',      
        password: '',           
        confirmPassword: '',    
        userEmail: '',     
        idCard: '',
        firstName: '',
        lastName: '',
        dob: '',
        userPhoneNO: ''      
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
            await api.post('/users/register', {
                userName: formData.userName,
                userEmail: formData.userEmail,
                userPhoneNO: formData.userPhoneNO,
                userPassword: formData.password,
                idCard: formData.idCard,           
                firstName: formData.firstName,     
                lastName: formData.lastName,      
                dob: formData.dob                  
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
                <label htmlFor="userName" className="input-label">ชื่อผู้ใช้</label>
                <div className="input-group">
                    <input id="userName" type="text" className="text-input"
                        value={formData.userName} onChange={handleChange} required />
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

                <label htmlFor="userEmail" className="input-label">e-mail</label>
                <div className="input-group">
                    <input id="userEmail" type="email" className="text-input"
                        value={formData.userEmail} onChange={handleChange} required />
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

                <label htmlFor="dob" className="input-label1">วันเกิด</label>
                <div className="input-group date-input1">
                    <input id="dob" type="date" className="text-input"
                        value={formData.dob} onChange={handleChange} />
                    <FaCalendarAlt className="calendar-icon" />
                </div>

                <label htmlFor="userPhoneNO" className="input-label">เบอร์โทรศัพท์</label>
                <div className="input-group">
                    <input id="userPhoneNO" type="tel" className="text-input"
                        value={formData.userPhoneNO} onChange={handleChange} />
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