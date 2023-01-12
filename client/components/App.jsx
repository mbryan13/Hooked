import React, { useEffect, useState } from 'react';
import ChordQuality from './ChordQuality.jsx';
import CircleOfFifths from './CircleOfFifths.jsx';
import Progression from './Progression.jsx';
import '../styles/App.css';
import Favorites from './Favorites.jsx';

export default function App() {
  const [chords, setChords] = useState([]);
  const [chordSuggestions, setChordSuggestions] = useState([]);
  const [tonic, setTonic] = useState('C');
  const [favCount, setFavCount] = useState(0);
  console.log('app rerender');

  const incrementFavCount = () => setFavCount(favCount + 1);

  const addChord = chord => {
    const newChords = [...chords];
    newChords.push(chord);
    setChords(newChords);
  }

  const deleteChord = (chordIndex) => {
    const newChords = [...chords];
    newChords.splice(chordIndex, 1);
    setChords(newChords);
  }

  useEffect(() => getChordSuggestions(), [chords]);

  const getChordSuggestions = () => {
    const scaleDegrees = [];
    chords.forEach(chord => scaleDegrees.push(chord.scaleDegree));
    const queryString = scaleDegrees.join(',');

    fetch(`http://localhost:3000/hookApi?cp=${queryString}`)
      .then(res => res.json())
      .then(res => setChordSuggestions(res.chords))
      .catch(e => console.log(e));
  }
  return (
    <div className='app-main-container'>
      <div className='app-main-container-flex-item-1'>
        <CircleOfFifths
          chords={chords}
          addChord={addChord}
          chordSuggestions={chordSuggestions}
          tonic={tonic}
        />
        {/* <ChordQuality /> */}
        <Progression
          chords={chords}
          deleteChord={deleteChord}
          tonic={tonic}
          incrementFavCount={incrementFavCount}
        />
      </div>
      <div className="app-main-container-flex-item-2">
        <Favorites
          favCount={favCount}
        />
      </div>
    </div>
  )
}
