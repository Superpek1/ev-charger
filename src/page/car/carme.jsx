import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './mycar.css';
import { FiArrowLeft } from 'react-icons/fi';
import { TypeClassCar } from "../../data/Car";
import api from '../../api/axios';

function CarmeScreen() {
    const navigate = useNavigate();
    const { carId } = useParams();
    const allCars = TypeClassCar();
    const [licensePlate, setLicensePlate] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const selectedCar = useMemo(() => {
        return allCars.find(car => car.Id === Number(carId));
    }, [allCars, carId]);

    const handleConfirmAdd = async () => {
        if (!licensePlate.trim()) {
            alert('กรุณากรอกแผ่นป้ายทะเบียน');
            return;
        }

        setIsSubmitting(true);
        try {
            await api.post('/cars/add', {
                carId: selectedCar.Id,
                name: selectedCar.Name,
                type: selectedCar.Type,
                src: selectedCar.src,
                licensePlate: licensePlate.trim()
            });

            alert(`เพิ่มรถ ${selectedCar.Name} สำเร็จ!`);
            navigate('/mygarage');
            
        } catch (err) {
            alert(err.response?.data?.message || 'ไม่สามารถเพิ่มรถได้ (ทะเบียนซ้ำหรือระบบขัดข้อง)');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!selectedCar) return <div>ไม่พบข้อมูลรถ</div>;

    return (
        <div className="mycar-container">
            <header className="mycar-header">
                <FiArrowLeft className="back-icon" onClick={() => navigate(-1)} style={{ width: '24px' }} />
                <h1 className="header-title">รายละเอียดรถยนต์</h1>
                <div style={{ width: '24px' }}></div>
            </header>

            <div className="carme-content-wrapper" style={{ padding: '0 20px' }}>
                <div className="carme-detail-card">
                    <img src={selectedCar.src} alt={selectedCar.Name} className="carme-image-detail" />
                    <h2>{selectedCar.Name}</h2>
                    <p>รูปแบบหัวชาร์จ: <strong>{selectedCar.Type}</strong></p>

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
                            style={{ width: '100%', padding: '10px', backgroundColor: '#444', color: 'white', border: '1px solid #555' }}
                        />
                    </div>
                </div>
            </div>

            <button className="submit-button" onClick={handleConfirmAdd} disabled={isSubmitting}>
                {isSubmitting ? 'กำลังบันทึก...' : `ยืนยันการเพิ่ม ${selectedCar.Name}`}
            </button>
        </div>
    );
}

export default CarmeScreen;