import React, { useState } from 'react';

export default function Key(props) {
    const { name, scaleDegree, degrees, radius, size, quality, probableChords, addChord } = props;
    const positionKey = degrees => {
        let x, y, inwardPull;
        quality === 'major' ? inwardPull = 80 : inwardPull = 210;
        x = (radius - inwardPull) * Math.sin(degrees * Math.PI / 180);
        y = -(radius - inwardPull) * Math.cos(degrees * Math.PI / 180);
        return `translate(${x}px, ${y}px)`;
    }
    const getProbability = () => {
        return probableChords[0] ? `5px solid rgba(0, 155, 0, ${(probableChords[0].normalizedProbability).toFixed(3)})` : null;
    }
    return (
        <div
            onClick={() => addChord({ name, scaleDegree, quality })}
            style={{ transform: `${positionKey(degrees)}`, height: `${size}px`, width: `${size}px`, border: getProbability() }}
            className={`${quality} key`}>
            {name} {scaleDegree ? `(${scaleDegree})` : null}
        </div>
    )
}

// create css animation
    // main-circle + rotation
    // inner keys - rotation


