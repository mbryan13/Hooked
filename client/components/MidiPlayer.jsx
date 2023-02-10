import React, {useEffect, useState} from 'react';

export default function MidiPlayer({}) {
  const chords = [
    {
      name: 'A',
      quality: 'major'
    },
    {
      name: 'B',
      quality: 'minor'
    },
    {
      name: 'D',
      quality: 'major'
    },
    {
      name: 'D',
      quality: 'minor'
    }
  ]
  const [midiControl, setMidiControl] = useState();
    const midiChannels = [];
    for(let i = 144; i < 160; i++) {
        midiChannels[i- 144 + 1] = `0x${i.toString(16)}`;
    }


    useEffect(() => {
      if(navigator.requestMIDIAccess){ 
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
        // console.log(midiAccess);
        midiAccess.onstatechange = updateDevices;
        const inputs = midiAccess.inputs.values();
        // for(const input of inputs) console.log(input);
        const outputs = midiAccess.outputs.values();
        for(const output of outputs) {
            output.open();
            // console.log(output);
        }
        setMidiControl(midiAccess);
    }
    function playSequence(midiAccess) { 
        let output1 = midiAccess.outputs.get('output-1');
        // console.log(output1);
        output1.open();
        
        const measureLength = 2000;
        let currentMeasure = 0;
        const noteOn = (note, velocity, channel) => {
            output1.send([channel, note, `0x${velocity.toString(16)}`]);
        }

        setInterval(() => {
          playChord();
          if(currentMeasure === chords.length - 1) currentMeasure = 0;
          else currentMeasure++;
        }, measureLength);

        const playChord = () => {
          const chord = chords[currentMeasure];
          const channel = 1, octave = 3, velocity = 50;
          const midiValue = rootNotes[chord.name] + 12*octave;
          const chordMidiArray = chordTypes[chord.quality].map(noteMidi => noteMidi + midiValue);
          console.log(chord);
          console.log(chordMidiArray);
          chordMidiArray.forEach(noteMidi => {
            setTimeout(() => noteOn(noteMidi, velocity, midiChannels[channel]), 0);
            setTimeout(() => noteOn(noteMidi, 0, midiChannels[channel]), measureLength - 20 ); 
          });
        }
    }
    function stopSequence() {
        var id = window.setTimeout(function() {}, 0);
        while (id--) {
            window.clearTimeout(id); // will do nothing if no timeout with id is present
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
        <div><button onClick={() => playSequence(midiControl)}>Play</button></div>
    )
}
