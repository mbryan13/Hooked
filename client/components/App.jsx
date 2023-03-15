import React, { useEffect, useState } from 'react';
import ChordQuality from './ChordQuality.jsx';
import CircleOfFifths from './CircleOfFifths.jsx';
import Progression from './Progression.jsx';
import '../styles/App.css';
import Favorites from './Favorites.jsx';
import MidiPlayer from './MidiPlayer.jsx';

export default function App() {
  const [chords, setChords] = useState([]);
  const [chordSuggestions, setChordSuggestions] = useState([]);
  // const chordSuggestions = [
  //   {
  //     probability: .182,
  //     chord_HTML: 'I'
  //   },
  //   {
  //     probability: .102,
  //     chord_HTML: 'IV'
  //   }
  // ]
  const notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
  const [tonic, setTonic] = useState({
    note: 'C',
    index: 0
  });
  const [favCount, setFavCount] = useState(0);

  const incrementFavCount = () => setFavCount(favCount + 1);

  const handleTonicChange = delta => {
    const newTonic = {};
    if (tonic.index === notes.length - 1 && delta === 1) {
      newTonic.index = 0;
      newTonic.note = notes[0];
    }
    else if (tonic.index === 0 && delta === -1) {
      newTonic.index = notes.length - 1;
      newTonic.note = notes[notes.length - 1];
    }
    else {
      newTonic.index = tonic.index + delta;
      newTonic.note = notes[newTonic.index];
    }
    setTonic(newTonic);
  };

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
          tonic={tonic.note}
          handleTonicChange={handleTonicChange}
        />
        {/* <ChordQuality /> */}
        <Progression
          chords={chords}
          deleteChord={deleteChord}
          tonic={tonic.note}
          incrementFavCount={incrementFavCount}
        />
        <MidiPlayer chords={chords} />
      </div>
      <div className="app-main-container-flex-item-2">
        <Favorites
          favCount={favCount}
        />
      </div>
    </div>
  )
}
