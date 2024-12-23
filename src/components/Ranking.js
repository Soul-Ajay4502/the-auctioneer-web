import React from 'react';
import starImage from '../assets/img/star.png'

const Ranking = ({ rank }) => {
    // Inline styles for the container
    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    };


    return (
        <div style={containerStyle}>
            {Array.from({ length: rank }).map((_, index) => (
                <img
                    key={index}
                    src={starImage}
                    alt="star"
                    style={{ width: '40px', paddingBottom: (index === 1 && rank === 3) ? 30 : 5 }}
                />
            ))}
        </div>
    );
};

export default Ranking;
