import React, { useMemo, useState } from 'react';
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
    
    const [licensePlate, setLicensePlate] = useState('');

    const selectedCar = useMemo(() => {
        const idToFind = Number(carId); 
        return allCars.find(car => car.Id === idToFind);
    }, [allCars, carId]);

    const handleConfirmAdd = () => {
        
        if (!currentUser) {
            alert('กรุณาล็อกอินก่อนเพิ่มรถยนต์');
            return navigate('/login');
        }

        if (!selectedCar) {
            alert('ไม่พบข้อมูลรถยนต์ที่ต้องการเพิ่ม');
            return;
        }

        if (!licensePlate.trim()) {
            alert('กรุณากรอกแผ่นป้ายทะเบียน');
            return;
        }
        

        const usersJSON = localStorage.getItem('users');
        let existingUsers = usersJSON ? JSON.parse(usersJSON) : [];
        
        let userIndex = existingUsers.findIndex(u => u.username === currentUser);
        
        if (userIndex === -1) {
             alert('ไม่พบข้อมูลผู้ใช้ที่ล็อกอิน');
             return navigate('/login');
        }

        const user = existingUsers[userIndex];
        if (!user.cars) {
            user.cars = [];
        }
        if (user.cars.some(c => c.Id === selectedCar.Id && c.licensePlate === licensePlate.trim())) {
             alert(`รถ ${selectedCar.Name} พร้อมป้ายทะเบียนนี้ ถูกเพิ่มในบัญชีแล้ว`);
             
             return navigate('/mygarage'); 
        }
        
        const newCarWithPlate = {
            ...selectedCar,
            licensePlate: licensePlate.trim()
        };

        user.cars.push(newCarWithPlate);
        alert(`เพิ่มรถ ${selectedCar.Name} (ป้ายทะเบียน ${licensePlate.trim()}) เข้าบัญชีสำเร็จ!`);
        
        existingUsers[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(existingUsers));
        
        navigate('/mygarage'); 
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

            <div className="carme-content-wrapper" style={{ padding: '0 20px' }}> 
                <div className="carme-detail-card">
                    <img src={selectedCar.src} alt={selectedCar.Name} className="carme-image-detail" />
                    
                    <h2>{selectedCar.Name}</h2>
                    <p>รูปแบบหัวชาร์จ: <strong>{selectedCar.Type}</strong></p>
                    <p>ID รถ: {selectedCar.Id}</p>
                    <p>คำอธิบาย: รถยนต์ไฟฟ้ารุ่นใหม่ล่าสุดจาก EV-Charger เหมาะสำหรับทุกการใช้งาน</p>

                    <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#333', borderRadius: '5px' }}>
                        <label htmlFor="licensePlate" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        แผ่นป้ายทะเบียน (บังคับ)
                        </label>
                        <input
                            id="licensePlate"
                            type="text"
                            placeholder="เช่น กข 1234 กทม."
                            value={licensePlate}
                            onChange={(e) => setLicensePlate(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '3px',
                                border: '1px solid #555',
                                backgroundColor: '#444',
                                color: 'white',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>
                </div>
            </div>
            
            <button 
                className="submit-button" 
                onClick={handleConfirmAdd}
            >
                ยืนยันการกรอก {selectedCar.Name}
            </button>
        </div>
    );
}

export default CarmeScreen;