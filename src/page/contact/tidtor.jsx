import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPhone, FiMail, FiMessageSquare, FiMapPin } from 'react-icons/fi';

import './tidtor.css';

const ContactItem = ({ icon, label, value }) => {
    const handleContactClick = () => {
        alert(`ช่องทางติดต่อ: ${value}`);
    };

    return (
        <div className="contact-item" onClick={handleContactClick}>
            <div className="contact-info">
                {React.createElement(icon, { className: "contact-icon" })}
                <span className="contact-label">{label}</span>
            </div>
            <span className="contact-value">{value}</span>
            <span className="contact-arrow"></span>
        </div>
    );
};


function TidtorScreen() {
    const navigate = useNavigate();

    return (
        <div className="tidtor-container">
            <header className="tidtor-header">
                <FiArrowLeft
                    className="back-icon"
                    onClick={() => navigate(-1)}
                />
                <h1 className="header-title">ช่องทางติดต่อ</h1>
                <div style={{ width: '24px' }}></div>
            </header>

            <div className="contact-list">
                <p className="contact-section-title">ข้อมูลสำหรับติดต่อ</p>

                <ContactItem
                    icon={FiPhone}
                    label="โทรศัพท์"
                    value="081-XXX-XXXX"
                />

                <ContactItem
                    icon={FiMail}
                    label="อีเมลฝ่ายสนับสนุน"
                    value="support@evcharger.com"
                />

                <ContactItem
                    icon={FiMessageSquare}
                    label="แชทสด"
                    value="ติดต่อเจ้าหน้าที่ (24 ชม.)"
                />

                <p className="contact-section-title" style={{ marginTop: '20px' }}>ที่อยู่สำนักงาน</p>

                <ContactItem
                    icon={FiMapPin}
                    label="ที่อยู่"
                    value="อาคาร EV-Tower, กรุงเทพฯ"
                />
            </div>
        </div>
    );
}

export default TidtorScreen;