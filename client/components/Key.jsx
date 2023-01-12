import React, { useState } from 'react'

export default function Key(props) {
    const { name, scaleDegree, degrees, radius, size, quality, probableChords, addChord } = props;
    const positionKey = degrees => {
        let x, y, inwardPull;
        quality === 'major' ? inwardPull = 100 : inwardPull = 220;
        x = (radius - inwardPull) * Math.sin(degrees * Math.PI / 180);
        y = -(radius - inwardPull) * Math.cos(degrees * Math.PI / 180);
        return `translate(${x}px, ${y}px)`;
    }
    const getProbability = () => {
        return probableChords[0] ? `5px solid rgba(0, 0, 0, ${(probableChords[0].normalizedProbability).toFixed(3)})` : null;
        // probableChords.forEach(chord => {
        //     console.log(name, chord.chord_HTML, chord.normalizedProbability);
        // })
    }
    return (
        <div onClick={() => addChord({ name, scaleDegree })} style={{ transform: positionKey(degrees), height: `${size}px`, width: `${size}px`, border: getProbability() }} className={`${quality} key`}>{name} ({scaleDegree})</div>
    )
}


