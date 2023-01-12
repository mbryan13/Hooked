import React from 'react';
import '../styles/Favorites.css';

export default function Favorite(props) {
    const { progression, description, qualities, tonic } = props;
    return (
        <div className='favorite-container'>
            <div>{progression}</div>
            <div>{description}</div>
            <div>{tonic}</div>
            <div>{qualities}</div>
        </div>
    )
}
