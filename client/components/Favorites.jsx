import React, { useEffect, useState } from 'react';
import '../styles/Favorites.css';
import Favorite from './Favorite.jsx';

export default function Favorites(props) {
    const { favCount } = props;
    // const [favorites, setFavorites] = useState([]);
    const favorites = [
        {
            key: 'A',
            progression: 'I-v-vi-VII',
            description: 'Nice',
            qualities: ['Cool', 'Dope']
        },
        {
            key: 'F#',
            progression: 'I-IV-vi-ii',
            description: 'Whoa',
            qualities: ['Owow', 'Amazing']
        }
    ]
    const fetchFavorites = () => {
        fetch('http://localhost:3000/favs/mbryan13')
            .then(res => res.json())
            .then(res => {
                setFavorites(res.favorites);
            })
    }

    useEffect(() => {
        fetchFavorites();
        // console.log('fav count increased', favCount);
    }, [favCount])
    return (
        <div className='favorites-container'>
            {favorites.map(favorite => {
                const { progression, description, key, qualities } = favorite;
                return <Favorite
                    progression={progression}
                    description={description}
                    tonic={key}
                    qualities={qualities}
                />
            })}
        </div>
    )
}
