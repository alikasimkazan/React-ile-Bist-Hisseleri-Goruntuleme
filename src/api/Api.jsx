import React, { useState } from 'react';
import axios from 'axios';
import StocksList from '../StocksList'; // Dosya yolunu doğru belirleyin

function Api() {
    const [bistData, setBistData] = useState(null); // Başlangıçta null
    const [loading, setLoading] = useState(false);
    const [butonClicked , setButonClicked]=useState(false)

    const handleClick = async () => {
        setLoading(true);
        setButonClicked(true)
        try {
            const response = await axios.get('https://api.collectapi.com/economy/hisseSenedi', {
                headers: {
                    'content-type': 'application/json',
                    'authorization': 'APİ KEY'
                }
            });
            setBistData(response.data);
            console.log(bistData)
        } catch (err) {
            console.error('Hata oluştu', err); // Daha iyi hata raporlaması
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='request-button'>
            {loading ? (
                <p className='loading'>Loading...</p>
            ) : (
               !butonClicked && <button className='btn-request' onClick={handleClick}>İsteği Yap</button>
            )}
            {bistData && bistData.result && bistData.result.length > 0 && (
                <StocksList bistData={bistData} />
            )}
        </div>
    );
}

export default Api;
