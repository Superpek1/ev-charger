import React from 'react';
import './Profile.css';
import { FiArrowLeft } from 'react-icons/fi'; 
import { FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Profile() {
  return (
    <div className="register-container">
      <header className="register-header">
        <FiArrowLeft className="back-icon" onClick={() => console.log('Go back')} />
        <h1 className="header-title">สมัครสมาชิก</h1>
        <div style={{ width: '24px' }}></div> 
      </header>

      <div className="register-form">
        
        <label htmlFor="idCard" className="input-label">เลขบัตรประจำตัวประชาชน</label>
        <div className="input-group">
          <input
            id="idCard"
            type="text"
            className="text-input"
            placeholder="เลขบัตรประจำตัวประชาชน"
          />
        </div>

        <label htmlFor="firstName" className="input-label">ชื่อ</label>
        <div className="input-group">
          <input
            id="firstName"
            type="text"
            className="text-input"
            placeholder="ชื่อ"
          />
        </div>

        <label htmlFor="lastName" className="input-label">นามสกุล</label>
        <div className="input-group">
          <input
            id="lastName"
            type="text"
            className="text-input"
            placeholder="นามสกุล"
          />
        </div>

        <label htmlFor="dob" className="input-label">วัน/เดือน/ปีเกิด</label>
        <div className="input-group date-input">
          <input
            id="dob"
            type="text" 
            className="text-input"
            placeholder="วัน/เดือน/ปีเกิด"
          />
          <FaCalendarAlt className="calendar-icon" />
        </div>

        <label htmlFor="phone" className="input-label">เบอร์โทรศัพท์</label>
        <div className="input-group">
          <input
            id="phone"
            type="tel"
            className="text-input"
            placeholder="เบอร์โทรศัพท์"
          />
        </div>
        <Link to={'/setting'}>
        <button className="submit-button">ตกลง</button></Link>
      </div>
    </div>
  );
}

export default Profile;