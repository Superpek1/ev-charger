import React from 'react';
import "./setting.css";
import { FiChevronRight, FiUser, FiTruck, FiCreditCard, FiLock, FiPhone } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';


function SettingsScreen() {
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };

  const SettingItem = ({ icon, text, path }) => (
    <div className="setting-item" onClick={() => handleNavigate(path)}>
      <div className="item-content">
        {icon}
        <span className="item-text">{text}</span>
      </div>
      <span className="arrow-icon">{'>'}</span>
    </div>
  );
  const MenuItem = ({ icon: Icon, title, onClick }) => (
    <div className="menu-item" onClick={onClick}>
      <div className="menu-text-container">
        {Icon && <Icon className="menu-icon" />}
        <span className="menu-title">{title}</span>
      </div>
      <FiChevronRight className="chevron-icon" />
    </div>
  );

  return (
    <div className="settings-container">
      <header className="settings-header">
        <button className="menu-button">&#9776;</button>
        <h1 className="header-title">การตั้งค่า</h1>
        <div className="notification-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
        </div>
      </header>

      <div className="settings-section">
        <h2 className="section-header account-header">บัญชีของฉัน</h2>

        <MenuItem
          icon={FiUser}
          title="ข้อมูลส่วนตัว"
          onClick={() => navigate('/Profile'  
            // handleNavigate('/register')
            // ใช้อันไหนก็ได้
          )}
        />
        <MenuItem
          icon={FiTruck}
          title="พาหนะของฉัน"
          onClick={() => navigate('/mycar')}
        />
        <MenuItem
          icon={FiCreditCard}
          title="ช่องทางการชำระเงิน"
          onClick={() => console.log('ไปหน้าชำระเงิน')}
        />
      </div>

      <div className="settings-section">
        <h2 className="section-header other-header">อื่นๆ</h2>
        <MenuItem
          icon={FiLock}
          title="เปลี่ยนรหัสผ่าน"
          onClick={() => console.log('ไปหน้าเปลี่ยนรหัสผ่าน')}
        />
        <MenuItem
          icon={FiPhone}
          title="ช่องทางติดต่อ"
          onClick={() => console.log('ไปหน้าช่องทางติดต่อ')}
        />
      </div>
    </div>
  );
}

export default SettingsScreen;