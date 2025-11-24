import React, { useMemo, useCallback, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import './mycar.css'; 
import { useAuth } from '../../utils/AuthContext'; 


const OwnedCarItem = ({ car, onDeleteCar }) => {
    const displayLicensePlate = car.licensePlate || '— ไม่มีข้อมูลป้ายทะเบียน —'; 

    return (
        <div className="car-item">
            <div className="image-placeholder">
                <img 
                    src={car.src || 'placeholder-image-url'} 
                    alt={car.Name} 
                    className="car-image" 
                />
            </div>

            <div className="car-info-table">
                <div className="info-row name-row">
                    <span className="info-label">ชื่อรถ</span>
                    <span className="info-value">**{car.Name}**</span>
                </div>
                <div className="info-row license-row" style={{ marginTop: '5px' }}>
                    <span className="info-label">ป้ายทะเบียน</span>
                    <span className="info-value">{displayLicensePlate}</span>
                </div>
                <div className="info-row type-row">
                    <span className="info-label">รูปแบบหัวชาต</span>
                    <span className="info-value">{car.Type}</span>
                </div>
            </div>

            <button 
                className="remove-car-button"
                onClick={() => onDeleteCar(car.Id, car.Name, car.licensePlate)} 
            >
                <FiTrash2 style={{ marginRight: '5px' }} /> ลบออกจากบัญชี
            </button>
        </div>
    );
};


function CarNowScreen() {
    const navigate = useNavigate();
    const { currentUser } = useAuth(); 
    const [refresh, setRefresh] = useState(0); 

    const getOwnedCars = useCallback(() => {
        if (!currentUser) return [];

        const usersJSON = localStorage.getItem('users');
        const existingUsers = usersJSON ? JSON.parse(usersJSON) : [];
        
        const user = existingUsers.find(u => u.username === currentUser);

        return user && user.cars ? user.cars : [];
    }, [currentUser, refresh]);

    const ownedCars = useMemo(getOwnedCars, [getOwnedCars]);

    const handleDeleteCar = (carId, carName, licensePlate) => {
        
        if (!currentUser) return alert('กรุณาล็อกอินก่อนลบรถยนต์');

        const identifier = licensePlate ? `รถ ${carName} (ป้าย ${licensePlate})` : `รถ ${carName}`;
        if (!window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบ ${identifier} ออกจากบัญชี?`)) {
            return;
        }

        const usersJSON = localStorage.getItem('users');
        let existingUsers = usersJSON ? JSON.parse(usersJSON) : [];
        const userIndex = existingUsers.findIndex(u => u.username === currentUser);
        
        if (userIndex !== -1) {
            const user = { ...existingUsers[userIndex] }; 

            user.cars = user.cars.filter(car => 
                !(car.Id === carId && car.licensePlate === licensePlate)
            );
            
            existingUsers[userIndex] = user; 
            localStorage.setItem('users', JSON.stringify(existingUsers));
            
            alert(`ลบ ${carName} สำเร็จแล้ว`);
            setRefresh(prev => prev + 1); 
        }
    };
    

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
                    {ownedCars.map((car, index) => (
                        <OwnedCarItem
                            key={`${car.Id}-${car.licensePlate || 'no-plate'}-${index}`} 
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