import React from 'react'

export default function ProgressionChord(props) {
    const { name, scaleDegree, chordIndex, deleteChord } = props;
    return (
        <div onClick={() => deleteChord(chordIndex)} className='progression-chord-main-container'>{name} ({scaleDegree})</div>
    )
}
