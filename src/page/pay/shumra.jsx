import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCreditCard, FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import './shumra.css';

const CARD_STORAGE_KEY = 'userCreditCardDataSimple';

const formatCardNumber = (number) => {
    if (!number) return '**** **** **** ****';
    const cleanedNumber = number.replace(/\s/g, ''); 
    const visiblePart = cleanedNumber.slice(-4);
    return `**** **** **** ${visiblePart}`;
};

function AddCreditCardScreen() {
    const navigate = useNavigate();
    const [cardData, setCardData] = useState(null); 
    const [isAdding, setIsAdding] = useState(false); 
    
    const [form, setForm] = useState({ number: '', name: '', expiry: '', cvv: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        const storedCard = localStorage.getItem(CARD_STORAGE_KEY);
        if (storedCard) {
            try {
                const parsedCard = JSON.parse(storedCard);
                setCardData(parsedCard);
                setIsAdding(false); 
            } catch (e) {
                setCardData(null);
                setIsAdding(false);
            }
        } else {
            setIsAdding(false); 
        }
    }, []);

    const handleSave = (e) => {
        e.preventDefault();
        setError('');

        if (form.number.length === 0 || form.name.length === 0 || form.expiry.length === 0 || form.cvv.length === 0) {
             return setError('กรุณากรอกข้อมูลบัตรให้ครบถ้วน');
        }
        
        const newCardData = {
            number: form.number.replace(/\s/g, ''), 
            name: form.name.toUpperCase(),
            expiry: form.expiry,
            cvv: form.cvv,
        };

        localStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(newCardData));
        
        setCardData(newCardData);
        setIsAdding(false); 
        alert('บันทึกข้อมูลบัตรสำเร็จ!');
    };
    
    const handleAddOrEditCard = () => {
        setError('');
        if (cardData) {
            setForm(cardData);
        } else {
            setForm({ number: '', name: '', expiry: '', cvv: '' });
        }
        setIsAdding(true); 
    };

    const handleDeleteCard = () => {
        if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลบัตรนี้ออกจากเครื่อง?')) {
            localStorage.removeItem(CARD_STORAGE_KEY);
            setCardData(null); 
            setIsAdding(false); 
            alert('ลบข้อมูลบัตรสำเร็จแล้ว');
        }
    };

    if (isAdding) {
        const isEditing = !!cardData;

        return (
            <div className="card-input-container">
                <header className="card-input-header">
                    <FiArrowLeft className="back-icon" onClick={() => setIsAdding(false)} />
                    <h1 className="header-title">{isEditing ? 'แก้ไขบัตรเครดิต/เดบิต' : 'เพิ่มบัตรเครดิต/เดบิต'}</h1>
                    <div style={{ width: '24px' }}></div>
                </header>
                
                <form className="card-form" onSubmit={handleSave}>
                    <label htmlFor="number" className="input-label">หมายเลขบัตร</label>
                    <div className="input-group">
                        <input
                            id="number"
                            type="text"
                            className="text-input"
                            placeholder="หมายเลขบัตร"
                            value={form.number}
                            onChange={(e) => setForm({...form, number: e.target.value.replace(/[^0-9\s]/g, '').slice(0, 19)})} 
                            required
                        />
                    </div>
    
                    <label htmlFor="name" className="input-label">ชื่อบนบัตร</label>
                    <div className="input-group">
                        <input
                            id="name"
                            type="text"
                            className="text-input"
                            placeholder="ชื่อบนบัตร"
                            value={form.name}
                            onChange={(e) => setForm({...form, name: e.target.value})}
                            required
                        />
                    </div>
                    
                    <div className="expiry-cvv-group">
                        <div className="input-col">
                            <label htmlFor="expiry" className="input-label">วันหมดอายุ</label>
                            <div className="input-group">
                                <input
                                    id="expiry"
                                    type="text"
                                    className="text-input"
                                    placeholder="วว/ปป"
                                    value={form.expiry}
                                    onChange={(e) => setForm({...form, expiry: e.target.value.slice(0, 5)})} 
                                    required
                                />
                            </div>
                        </div>
                        <div className="input-col">
                            <label htmlFor="cvv" className="input-label">CVV</label>
                            <div className="input-group">
                                <input
                                    id="cvv"
                                    type="text"
                                    className="text-input"
                                    placeholder="CVV"
                                    value={form.cvv}
                                    onChange={(e) => setForm({...form, cvv: e.target.value.replace(/[^0-9]/g, '').slice(0, 4)})} 
                                    required
                                />
                            </div>
                        </div>
                    </div>
    
                    {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                    
                    <button type="submit" className="submit-button green-button" style={{ marginTop: '20px' }}>
                        บันทึก
                    </button>
                </form>
            </div>
        );
    }
    
    if (cardData) {
        return (
            <div className="card-view-container">
                <header className="card-view-header">
                    <FiArrowLeft className="back-icon" onClick={() => navigate(-1)} />
                    <h1 className="header-title">ข้อมูลบัตรเครดิต</h1>
                    <FiEdit 
                        className="edit-icon" 
                        onClick={handleAddOrEditCard} 
                        title="แก้ไขข้อมูลบัตร"
                    />
                </header>
    
                <div className="card-info-box">
                    <FiCreditCard className="card-icon-display" />
                    <p className="card-number-display">{formatCardNumber(cardData.number)}</p>
                    <p className="card-name-display">{cardData.name}</p>
                    <div className="card-details-row">
                        <span>วันหมดอายุ: {cardData.expiry}</span>
                    </div>
                    
                    <p className="note-text">บัตรถูกบันทึกไว้แล้ว</p>
                </div>
                
                <button 
                    className="submit-button delete-button" 
                    onClick={handleDeleteCard}
                    style={{ marginTop: '40px' }}
                >
                    <FiTrash2 style={{ marginRight: '8px' }} />
                    ลบข้อมูลบัตร
                </button>
            </div>
        );
    }

    return (
        <div className="card-input-container">
            <header className="card-input-header">
                <FiArrowLeft className="back-icon" onClick={() => navigate(-1)} />
                <h1 className="header-title">บัตรเครดิต/เดบิต</h1>
                <div style={{ width: '24px' }}></div>
            </header>

            <div className="initial-message-box">
                <p className="message-text">ไม่พบข้อมูลการเชื่อมต่อบัตรเครดิต</p>
                <p style={{color: '#999', fontSize: '14px'}}>กรุณากดปุ่ม เพิ่ม ด้านล่างเพื่อใช้งาน</p>
            </div>
            
            <button 
                className="submit-button green-button large-button" 
                onClick={handleAddOrEditCard}
                style={{ margin: '0 20px', width: 'calc(100% - 40px)' }}
            >
                <FiPlus style={{ marginRight: '8px' }} />
                เพิ่มบัตรเครดิต/เดบิต
            </button>
        </div>
    );
}

export default AddCreditCardScreen;