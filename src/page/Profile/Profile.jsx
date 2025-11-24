import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Profile.css';
import { FiArrowLeft } from 'react-icons/fi';
import { FaCalendarAlt } from 'react-icons/fa';

import { useAuth } from '../../utils/AuthContext';

function Profile() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const [profileData, setProfileData] = useState({
        username: '',
        idCard: '',
        firstName: '',
        lastName: '',
        dob: '',
        phone: '',
    });
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (currentUser) {
            const usersJSON = localStorage.getItem('users');
            const existingUsers = usersJSON ? JSON.parse(usersJSON) : [];

            const userProfile = existingUsers.find(u => u.username === currentUser);

            if (userProfile) {
                setProfileData(userProfile);
            } else {
                setMessage('ไม่พบข้อมูลโปรไฟล์ กรุณาล็อกอินใหม่');
                
            }
        }
    }, [currentUser, navigate]);


    const handleChange = (e) => {
        const { id, value } = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };


    const handleSave = (e) => {
        e.preventDefault();
        setMessage('');

        const usersJSON = localStorage.getItem('users');
        let existingUsers = usersJSON ? JSON.parse(usersJSON) : [];

        const userIndex = existingUsers.findIndex(u => u.username === currentUser);

        if (userIndex !== -1) {
            existingUsers[userIndex] = {
                ...existingUsers[userIndex],
                ...profileData,
                username: currentUser
            };

            localStorage.setItem('users', JSON.stringify(existingUsers));

            setMessage('บันทึกข้อมูลโปรไฟล์เรียบร้อยแล้ว!');
            setIsEditing(false);
        } else {
            setMessage('บันทึกข้อมูลไม่สำเร็จ: ไม่พบชื่อผู้ใช้');
        }
    };

    if (!currentUser) {
        return <p>กรุณารอสักครู่ หรือกลับไปหน้าล็อกอิน</p>;
    }


    return (
        <div className="prof-container">
            <header className="prof-header">
                <FiArrowLeft className="prof-back-icon" onClick={() => navigate(-1)} />
                <h1 className="prof-header-title">ข้อมูลส่วนตัว ({currentUser})</h1>
                <button
                    className="prof-edit-button" 
                    onClick={() => setIsEditing(!isEditing)}
                    style={{ background: 'none', border: 'none', color: isEditing ? 'red' : 'white' }}
                >
                    {isEditing ? 'ยกเลิก' : 'แก้ไข'}
                </button>
            </header>

            <form className="prof-form" onSubmit={handleSave}>
                {message && <p style={{ color: message.includes('สำเร็จ') ? 'green' : 'red', marginBottom: '15px' }}>{message}</p>}

                <label htmlFor="idCard" className="prof-input-label">เลขบัตรประจำตัวประชาชน</label>
                <div className="prof-input-group">
                    <input
                        id="idCard"
                        type="text"
                        className="prof-text-input"
                        placeholder="เลขบัตรประจำตัวประชาชน"
                        value={profileData.idCard || ''}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                </div>

                <label htmlFor="firstName" className="prof-input-label">ชื่อ</label>
                <div className="prof-input-group">
                    <input
                        id="firstName"
                        type="text"
                        className="prof-text-input"
                        placeholder="ชื่อ"
                        value={profileData.firstName || ''}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                </div>

                <label htmlFor="lastName" className="prof-input-label">นามสกุล</label>
                <div className="prof-input-group">
                    <input
                        id="lastName"
                        type="text"
                        className="prof-text-input"
                        placeholder="นามสกุล"
                        value={profileData.lastName || ''}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                </div>

                <label htmlFor="dob" className="prof-input-label">วัน/เดือน/ปีเกิด</label>
                <div className="prof-input-group prof-date-input">
                    <input
                        id="dob"
                        type="text"
                        className="prof-text-input"
                        placeholder="วัน/เดือน/ปีเกิด"
                        value={profileData.dob || ''}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                    <FaCalendarAlt className="prof-calendar-icon" />
                </div>

                <label htmlFor="phone" className="prof-input-label">เบอร์โทรศัพท์</label>
                <div className="prof-input-group">
                    <input
                        id="phone"
                        type="tel"
                        className="prof-text-input"
                        placeholder="เบอร์โทรศัพท์"
                        value={profileData.phone || ''}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                </div>

                {isEditing && (
                    <button type="submit" className="prof-submit-button">บันทึกการแก้ไข</button> 
                )}
                {!isEditing && (
                    <Link to={'/setting'}>
                        <button className="prof-submit-button">ตกลง/กลับหน้าหลัก</button>
                    </Link>
                )}
            </form>
        </div>
    );
}

export default Profile;