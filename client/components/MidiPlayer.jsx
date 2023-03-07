import React, { useEffect, useState } from 'react';

export default function MidiPlayer({ chords }) {
  console.log(chords);
  // const chords = [
  //   {
  //     name: 'A',
  //     quality: 'major'
  //   },
  //   {
  //     name: 'B',
  //     quality: 'minor'
  //   },
  //   {
  //     name: 'C',
  //     quality: 'major'
  //   },
  //   {
  //     name: 'D',
  //     quality: 'minor'
  //   }
  // ]
  const [midiControl, setMidiControl] = useState();
  const [portID, setPortID] = useState();

  const midiChannels = [];
  for (let i = 144; i < 160; i++) {
    midiChannels[i - 144 + 1] = `0x${i.toString(16)}`;
  }


  useEffect(() => {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(success, failure);
    }
  }, []);

  function failure() {
    console.log("Could not connect to MIDI");
  }
  function handleInput(event) {
    console.log(event);
  }
  function updateDevices(event) {
    // console.log(event)
    // console.log(`Name: ${event.port.name}, State: ${event.port.state}, Type: ${event.port.type}`);
  }
  function success(midiAccess) {
    midiAccess.onstatechange = updateDevices;
    const inputs = midiAccess.inputs.values();
    const outputs = midiAccess.outputs.values();
    for (const output of outputs) {
      output.open();
    }
    setMidiControl(midiAccess);
  }
  function playSequence() {
    let output = midiControl.outputs.get(portID);
    output.open();

    const measureLength = 2000;
    let currentMeasure = 0;
    const noteOn = (note, velocity, channel) => {
      output.send([channel, note, `0x${velocity.toString(16)}`]);
    }

    setInterval(() => {
      playChord();
      if (currentMeasure === chords.length - 1) currentMeasure = 0;
      else currentMeasure++;
    }, measureLength);

    const playChord = () => {
      const chord = chords[currentMeasure];
      const channel = 1, octave = 3, velocity = 50;
      const midiValue = rootNotes[chord.name] + 12 * octave;
      const chordMidiArray = chordTypes[chord.quality].map(noteMidi => noteMidi + midiValue);
      chordMidiArray.forEach(noteMidi => {
        setTimeout(() => noteOn(noteMidi, velocity, midiChannels[channel]), 0);
        setTimeout(() => noteOn(noteMidi, 0, midiChannels[channel]), measureLength - 20);
      });
    }
  }
  function stopSequence() {
    const noteOn = (note, velocity, channel) => {
      output.send([channel, note, `0x${velocity.toString(16)}`]);
    }
    var id = window.setTimeout(function () { }, 0);
    while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
    }
    let output = midiControl.outputs.get(portID);
    output.open();
    for (let i = 0; i < 128; i++) {
      noteOn(i, 0, midiChannels[1])
    }
  }

  const chordTypes = {
    major: [0, 4, 7, 12],
    minor: [0, 3, 7, 12],
    major7: [0, 4, 7, 11],
    minor7: [0, 3, 7, 10],
    minor7: [0, 3, 6, 10],
    dim: [0, 3, 6, 9],
    dom7: [0, 4, 7, 10],
    major9: [0, 4, 7, 11, 14],
    minor9: [0, 3, 7, 10, 14]
  }
  const rootNotes = {
    A: 21,
    Bb: 22,
    B: 23,
    C: 24,
    Db: 25,
    D: 26,
    Eb: 27,
    E: 28,
    F: 29,
    Gb: 30,
    G: 31,
    Ab: 32
  }

  const midiTranslator = {

  }

  return (
    <div>
      <div><button onClick={() => playSequence(midiControl)}>Play</button></div>
      <div><button onClick={() => stopSequence(midiControl)}>Stop</button></div>
      <label>
        <select onChange={(e) => setPortID(e.target.value)} value={portID} name="" id="">
          <option value="">Select Port</option>
          {midiControl && Array.from(midiControl.outputs.values()).map(output => {
            return <option value={output.id}>{output.name}</option>
          })
          }
        </select>
      </label>
    </div>
  )
}
