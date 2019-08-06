import React from 'react';

const Card = (name, address) => {
    return(
    <div>
        <h3>{name}</h3>
        <p>{address}</p>
    </div>
    )
};

export default Card;