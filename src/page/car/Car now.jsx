import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import './mycar.css';
import { useAuth } from '../../utils/AuthContext';
import api from '../../api/axios';

const OwnedCarItem = ({ car, onDeleteCar }) => {
    return (
        <div className="car-item">
            <div className="image-placeholder">
                <img src={car.src || 'placeholder-url'} alt={car.Name} className="car-image" />
            </div>
            <div className="car-info-table">
                <div className="info-row name-row">
                    <span className="info-label">ชื่อรถ</span>
                    <span className="info-value">**{car.Name}**</span>
                </div>
                <div className="info-row license-row" style={{ marginTop: '5px' }}>
                    <span className="info-label">ป้ายทะเบียน</span>
                    <span className="info-value">{car.licensePlate}</span>
                </div>
                <div className="info-row type-row">
                    <span className="info-label">รูปแบบหัวชาร์จ</span>
                    <span className="info-value">{car.Type}</span>
                </div>
            </div>
            <button 
                className="remove-car-button"
                onClick={() => onDeleteCar(car.Id, car.licensePlate)}
            >
                <FiTrash2 style={{ marginRight: '5px' }} /> ลบออกจากบัญชี
            </button>
        </div>
    );
};

function CarNowScreen() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    
    const [ownedCars, setOwnedCars] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCars = async () => {
        try {
            const response = await api.get('/cars/my-cars'); 
            setOwnedCars(response.data);
        } catch (err) {
            console.error("Error fetching cars:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const handleDeleteCar = async (carId, licensePlate) => {
        if (!window.confirm(`ต้องการลบรถทะเบียน ${licensePlate} ใช่หรือไม่?`)) return;

        try {
            await api.delete(`/cars/${carId}`, { data: { licensePlate } }); 
            alert('ลบรถสำเร็จ');
            fetchCars(); 
        } catch (err) {
            alert('เกิดข้อผิดพลาดในการลบรถ');
        }
    };

    if (loading) return <div style={{color:'white', textAlign:'center', paddingTop:'50px'}}>กำลังโหลดข้อมูล...</div>;

    return (
        <div className="mycar-container">
            <header className="mycar-header">
                <FiArrowLeft className="back-icon" onClick={() => navigate(-1)} style={{ width: '24px' }} />
                <h1 className="header-title">รถยนต์ในบัญชีของคุณ</h1>
                <div style={{ width: '24px' }}></div>
            </header>

            {ownedCars.length === 0 ? (
                <div className="no-results-message" style={{ padding: '20px', textAlign: 'center' }}>
                    <p style={{ color: 'white' }}>คุณยังไม่ได้เพิ่มรถยนต์ใดๆ ในบัญชี</p>
                    <button className="submit-button" onClick={() => navigate('/mycar')} style={{ marginTop: '15px' }}>
                        เพิ่มยานพาหนะใหม่
                    </button>
                </div>
            ) : (
                <div className="car-grid">
                    {ownedCars.map((car, index) => (
                        <OwnedCarItem
                            key={index}
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