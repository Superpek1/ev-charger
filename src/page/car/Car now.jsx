import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiTrash2 } from 'react-icons/fi';
// ใช้ CSS เดียวกับหน้า MyCar
import './mycar.css'; 
// ใช้ AuthContext เพื่อดึงผู้ใช้ปัจจุบัน
import { useAuth } from '../../utils/AuthContext'; 

// ----------------------------------------------------------------------
// Component ย่อยสำหรับแสดงรถที่ผู้ใช้เป็นเจ้าของ
const OwnedCarItem = ({ car, onDeleteCar }) => {
    return (
        <div className="car-item">
            <div className="image-placeholder">
                <img src={car.src} alt={car.Name} className="car-image" />
            </div>

            <div className="car-info-table">
                <div className="info-row name-row">
                    <span className="info-label">ชื่อรถ</span>
                    <span className="info-value">**{car.Name}**</span>
                </div>
                <div className="info-row type-row">
                    <span className="info-label">รูปแบบหัวชาต</span>
                    <span className="info-value">{car.Type}</span>
                </div>
            </div>

            <button 
                className="remove-car-button" // อาจจะต้องเพิ่ม style ใน mycar.css
                onClick={() => onDeleteCar(car.Id, car.Name)}
            >
                <FiTrash2 style={{ marginRight: '5px' }} /> ลบออกจากบัญชี
            </button>
        </div>
    );
};
// ----------------------------------------------------------------------


function CarNowScreen() {
    const navigate = useNavigate();
    const { currentUser } = useAuth(); // ผู้ใช้ที่ล็อกอินอยู่

    // ฟังก์ชันสำหรับดึงข้อมูลรถยนต์ที่ผู้ใช้เป็นเจ้าของ
    const getOwnedCars = () => {
        if (!currentUser) return [];
        
        const usersJSON = localStorage.getItem('users');
        const existingUsers = usersJSON ? JSON.parse(usersJSON) : [];
        const user = existingUsers.find(u => u.username === currentUser);
        
        // คืนค่า Array ของรถยนต์ (หากไม่มีจะคืนค่าเป็น Array ว่าง [])
        return user && user.cars ? user.cars : [];
    };

    const ownedCars = useMemo(getOwnedCars, [currentUser]);


    // ฟังก์ชันสำหรับลบรถออกจากบัญชี
    const handleDeleteCar = (carId, carName) => {
        if (!window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบรถ ${carName} ออกจากบัญชี?`)) {
            return;
        }

        const usersJSON = localStorage.getItem('users');
        let existingUsers = usersJSON ? JSON.parse(usersJSON) : [];
        const userIndex = existingUsers.findIndex(u => u.username === currentUser);
        
        if (userIndex !== -1) {
            const user = existingUsers[userIndex];
            
            // กรองรถคันที่ไม่ต้องการออก
            user.cars = user.cars.filter(car => car.Id !== carId);
            
            // บันทึกกลับ Local Storage
            existingUsers[userIndex] = user;
            localStorage.setItem('users', JSON.stringify(existingUsers));
            
            alert(`ลบรถ ${carName} สำเร็จแล้ว`);
            // โหลดหน้านี้ใหม่เพื่อให้รายการอัปเดต
            navigate(0); // วิธีที่ง่ายที่สุดในการบังคับให้ Component โหลดใหม่
        }
    };
    
    // ----------------------------------------------------------------------

    return (
        <div className="mycar-container">
            <header className="mycar-header">
                <FiArrowLeft 
                    className="back-icon" 
                    onClick={() => navigate(-1)} 
                    style={{ width: '24px' }} 
                />
                <h1 className="header-title">รถยนต์ในบัญชีของคุณ</h1>
                <div style={{ width: '24px' }}></div> 
            </header>

            {ownedCars.length === 0 ? (
                <div className="no-results-message" style={{ padding: '20px', textAlign: 'center' }}>
                    <p style={{ color: 'white' }}>คุณยังไม่ได้เพิ่มรถยนต์ใดๆ ในบัญชี</p>
                    <button 
                        className="submit-button" 
                        onClick={() => navigate('/mycar')}
                        style={{ marginTop: '15px' }}
                    >
                        เพิ่มยานพาหนะใหม่
                    </button>
                </div>
            ) : (
                <div className="car-grid">
                    {ownedCars.map(car => (
                        <OwnedCarItem 
                            key={car.Id} 
                            car={car} 
                            onDeleteCar={handleDeleteCar} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CarNowScreen;