import React from 'react';


const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1 style={{ fontSize: '3rem', color: '#ff6347' }}>404</h1>
      <p style={{ fontSize: '2rem' }}>
        Aap galat raste pe chal rahe ho! <span role="img" aria-label="emoji">🤪</span>
      </p>
      <p style={{ fontSize: '1.2rem', color: '#888', marginTop: '20px' }}>
        Lagta hai aapko Google Maps ki zarurat hai! <span role="img" aria-label="map">🗺️</span>
      </p>
      <p style={{ fontSize: '1.1rem', color: '#888', marginTop: '10px' }}>
        Yahan kuch bhi nahi milne wala...<br />
        <b>Wapas jao, warna coding ka bhoot pakad lega! 👻💻</b>
      </p>
      <p style={{ fontSize: '1rem', color: '#aaa', marginTop: '30px' }}>
        <i>Tip: Sahi link try karo, ya home pe wapas jao!</i>
      </p>
    </div>
  );
};

export default NotFound;
