import React, { useEffect, useState } from 'react';
import ChordQuality from './ChordQuality.jsx';
import CircleOfFifths from './CircleOfFifths.jsx';
import Progression from './Progression.jsx';
import '../styles/App.css';

export default function App() {
  const [chords, setChords] = useState([]);
  const [chordSuggestions, setChordSuggestions] = useState([]);
  // console.log(chordSuggestions);

  // const chords = [
  //     {
  //         note: 'C',
  //         scaleDegree: 1
  //     },
  //     {
  //         note: 'F',
  //         scaleDegree: 4
  //     }
  // ]

  useEffect(() => getChordSuggestions(), [chords]);

  const getChordSuggestions = () => {
    const scaleDegrees = [];
    chords.forEach(chord => scaleDegrees.push(chord.scaleDegree));
    const queryString = scaleDegrees.join(',');
    console.log(queryString);
    fetch(`http://localhost:3000/hookApi?cp=${queryString}`,)
      .then(res => res.json())
      .then(res => setChordSuggestions(res.chords))
      .catch(e => console.log(e));
  }
  return (
    <div className='app-main-container'>
      <CircleOfFifths
        setChords={setChords}
        chordSuggestions={chordSuggestions}
      />
      {/* <ChordQuality /> */}
      <Progression
        chords={chords}
      />
    </div>
  )
}
