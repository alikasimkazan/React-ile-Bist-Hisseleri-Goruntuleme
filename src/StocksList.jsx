import React from 'react';
import { useState } from 'react';

function StocksList({ bistData }) {
  // Veri kontrolü
  if (!bistData || !bistData.result || bistData.result.length < 1) {
    return <div>Veri bulunamadı</div>;
  }

  const [visibleCount, setVisibleCount] = useState(10);
  const data = bistData.result; // Veriyi data olarak kullan

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 10); // Her butona tıklamada 20 kart daha göster
  };


  return (
    <div className='container-xxl'>
      <div className='cardList'>
        {data.slice(0, visibleCount).map((stock, index) => {
          const isRising = stock.lastprice > stock.min;
          return (
            <div key={index} className={`card mt-5 ${isRising ? 'up' : 'down'}`}>
              <div className="card-body">
                <h5 className="card-title text-center">{stock.code}</h5>
                <h6 className='card-subtitle mb-2 text-center'>{stock.text}</h6>
                <div className='cardContent mt-3'>
                  <p className='cardText'>İlk İşlem Gördüğü Fiyat: {stock.min} ₺</p>
                  <p className='cardText'>Son İşlem Gördüğü Fiyat: {stock.lastprice} ₺</p>
                  <p className='cardText'>Hacim: {stock.hacimstr}</p>
                  <p className='cardText'>En Yüksek Fiyatı: {stock.max} ₺</p>
                  <p className='cardText'>En Son İşlem Gördüğü Saat: {stock.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {visibleCount < data.length && (
        <div className='text-center mt-4 mb-4'>
          <button className='btn btn-primary' onClick={handleLoadMore}>Daha Fazla Yükle</button>
        </div>
      )}
    </div>
  );
}

export default StocksList;
