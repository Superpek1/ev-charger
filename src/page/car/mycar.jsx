import React, { useState, useMemo } from 'react'; 
import './mycar.css';
import { FiArrowLeft } from 'react-icons/fi';
import { TypeClassCar } from "../../data/Car"; 

const CarItem = ({ car, onAddCar }) => {
  return (
    <div className="car-item">
      <div className="image-placeholder">
        <img src={car.src} alt={car.Name} className="car-image" />
      </div>

      <div className="car-info-table">
        <div className="info-row name-row">
          <span className="info-label">ชื่อรถ</span>
          <span className="info-value">{car.Name}</span>
        </div>
        <div className="info-row type-row">
          <span className="info-label">รูปแบบหัวชาต</span>
          <span className="info-value">{car.Type}</span>
        </div>
      </div>

      <button 
        className="add-car-button" 
        onClick={() => onAddCar(car.Id, car.Name)}
      >
        เพิ่มรถ
      </button>
    </div>
  );
};

function MyCarScreen() {
  const allCars = TypeClassCar();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChargerType, setSelectedChargerType] = useState('รูปแบบหัวชาตทั้งหมด');
  
  const chargerTypes = ['รูปแบบหัวชาตทั้งหมด', 'หัวชาต001', 'หัวชาต002', 'หัวชาต003'];

  const handleAddCar = (carId, carName) => {
    console.log(`เพิ่มรถ: ID ${carId}, Name: ${carName}`);
  };
  
  const handleChargerTypeChange = (e) => {
    setSelectedChargerType(e.target.value);
  };

  const filteredCars = useMemo(() => {
    return allCars.filter(car => {
      const matchesSearch = car.Name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            car.Type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedChargerType === 'รูปแบบหัวชาตทั้งหมด' || 
                          car.Type === selectedChargerType;
      return matchesSearch && matchesType;
    });
  }, [allCars, searchTerm, selectedChargerType]);

  return (
    <div className="mycar-container">
      <header className="mycar-header">
        <FiArrowLeft 
          className="back-icon" 
          onClick={() => console.log('Go back')} 
          style={{ width: '24px' }} 
        />
        <h1 className="header-title">เพิ่มยานพาหนะ</h1>
        <div style={{ width: '24px' }}></div> 
      </header>

      {/* ส่วนค้นหา */}
      <div className="search-filter-bar">
        <input 
          type="text" 
          placeholder="ค้นหารถ" 
          className="search-input" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        
        {/*Select Box สำหรับ Filter */}
        <div className="filter-select-container">
            <select
                className="filter-select-box"
                value={selectedChargerType}
                onChange={handleChargerTypeChange}
            >
                {chargerTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
        </div>
      </div>

      <div className="car-grid">
        {filteredCars.map(car => (
          <CarItem key={car.Id} car={car} onAddCar={handleAddCar} />
        ))}
        {filteredCars.length === 0 && (
            <p className="no-results-message">ไม่พบรถที่ตรงกับการค้นหา</p>
        )}
      </div>
    </div>
  );
}

export default MyCarScreen;