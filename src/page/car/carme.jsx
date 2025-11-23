import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './mycar.css'; 
import { FiArrowLeft } from 'react-icons/fi';
import { TypeClassCar } from "../../data/Car"; 
import { useAuth } from '../../utils/AuthContext'; 


function CarmeScreen() {
    const navigate = useNavigate();
    const { carId } = useParams(); 
    const allCars = TypeClassCar(); 
    const { currentUser } = useAuth(); 
    
    const selectedCar = useMemo(() => {
        const idToFind = Number(carId); 
        return allCars.find(car => car.Id === idToFind);
    }, [allCars, carId]);

    const handleConfirmAdd = () => {
        if (!currentUser) {
            alert('กรุณาล็อกอินก่อนเพิ่มรถ');
            return navigate('/login');
        }
        if (!selectedCar) {
            alert('ไม่พบข้อมูลรถยนต์ที่ต้องการเพิ่ม');
            return;
        }

        const usersJSON = localStorage.getItem('users');
        let existingUsers = usersJSON ? JSON.parse(usersJSON) : [];
        const userIndex = existingUsers.findIndex(u => u.username === currentUser);
        
        if (userIndex !== -1) {
            const user = existingUsers[userIndex];
            
            if (!user.cars) {
                user.cars = [];
            }
            
            if (user.cars.some(c => c.Id === selectedCar.Id)) {
                 alert(`รถ ${selectedCar.Name} ถูกเพิ่มในบัญชีแล้ว`);
                 return navigate(-1);
            }
            
            user.cars.push(selectedCar); 
            alert(`เพิ่มรถ ${selectedCar.Name} เข้าโปรไฟล์สำเร็จ!`);
            
            existingUsers[userIndex] = user;
            localStorage.setItem('users', JSON.stringify(existingUsers));
            navigate(-1); 
        } else {
            alert('ไม่พบข้อมูลผู้ใช้');
            navigate('/login');
        }
    };

    if (!selectedCar) {
        return (
            <div className="mycar-container" style={{ textAlign: 'center', paddingTop: '50px', color: 'white' }}>
                 <h1 className="header-title" style={{ color: 'white' }}>ไม่พบข้อมูลรถยนต์</h1>
                 <button className="submit-button" onClick={() => navigate(-1)}>กลับไปเลือกใหม่</button>
            </div>
        );
    }
    return (
        <div className="mycar-container">
             <header className="mycar-header">
                <FiArrowLeft 
                    className="back-icon" 
                    onClick={() => navigate(-1)} 
                    style={{ width: '24px' }} 
                />
                <h1 className="header-title">รายละเอียดรถยนต์</h1>
                <div style={{ width: '24px' }}></div> 
            </header>

            {/* เพิ่ม Padding ใน Container */}
            <div className="carme-content-wrapper" style={{ padding: '0 20px' }}> 
                <div className="carme-detail-card">
                    <img src={selectedCar.src} alt={selectedCar.Name} className="carme-image-detail" />
                    
                    <h2>{selectedCar.Name}</h2>
                    <p>รูปแบบหัวชาร์จ: <strong>{selectedCar.Type}</strong></p>
                    <p>ID รถ: {selectedCar.Id}</p>
                </div>
            </div>
            
            <button 
                className="submit-button" 
                onClick={handleConfirmAdd}
            >
                ยืนยันการเพิ่ม {selectedCar.Name} เข้าบัญชี
            </button>
        </div>
    );
}

export default CarmeScreen;