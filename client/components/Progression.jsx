import React from 'react'
import '../styles/Progression.css';
import ProgressionChord from './ProgressionChord.jsx';

export default function Progression(props) {
    const { chords, deleteChord, tonic, incrementFavCount } = props;
    const addProgression = () => {
        const newProgression = {};
        newProgression.key = tonic;
        const createProgString = () => {
            const filtered = chords.map(chord => chord.scaleDegree);
            return filtered.join('-');
        }
        newProgression.progression = createProgString();
        newProgression.description = 'Banger generator';
        newProgression.qualities = ['pumped', 'confident'];
        fetch('http://localhost:3000/favs/mbryan13', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(newProgression)
        })
            .then(res => console.log(res.status))
            .catch(e => console.log(e));
        incrementFavCount();
    }
    return (
        <div>
            <div className='progression-main-container'>
                {chords.map((chord, index) => {
                    return <ProgressionChord
                        name={chord.name}
                        scaleDegree={chord.scaleDegree}
                        deleteChord={deleteChord}
                        chordIndex={index}
                    />
                })}
            </div>
            <div className="progression-functionality">
                <button onClick={() => addProgression()}>Save to Favorites</button>
            </div>
        </div>
    )
}
