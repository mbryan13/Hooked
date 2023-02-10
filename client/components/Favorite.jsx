import React from 'react';
import '../styles/Favorites.css';

export default function Favorite(props) {
    const { progression, description, qualities, tonic } = props;
    return (
        <div className='favorite-grid'>
            <div className='favorite-grid-item favorite-grid-item-tonic'>{tonic}</div>
            <div className='favorite-grid-item favorite-grid-item-description'>{description}</div>
            <div className='favorite-grid-item favorite-grid-item-progression'>{progression}</div>
            <div className='favorite-grid-item favorite-grid-item-qualities'>{qualities}</div>
        </div>
    )
}

// clean up favorite grid
// link to Ableton