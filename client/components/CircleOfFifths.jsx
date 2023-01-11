import React, { useState } from 'react';
import '../styles/CircleOfFifths.css';
import Key from './Key.jsx';

export default function CircleOfFifths(props) {
    const { setChords, chordSuggestions } = props;
    const [key, setKey] = useState('C');
    const majorKeys = ['C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
    const minorKeys = ['A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];
    const CIRCLESIZE = 800;
    console.log(chordSuggestions);

    const calcProbability = circleKey => {
        // console.log(circleKey);
        const match = scaleDegrees[key][circleKey];
        let regex;
        const noMatches = {
            'i': 'v',
            'ii': 'i',
            'I': 'V',
            'v': 'i',
            'vi': 'i',
            'V': 'I',
            'VI': 'VII'
        }
        if (match) {
            let maxProbability;
            chordSuggestions[0] ? maxProbability = chordSuggestions[0].probability : null;
            if (!maxProbability) return [];

            const noMatch = noMatches[match];
            regex = new RegExp(`^${match}(?!${noMatch})`);
            const matches = chordSuggestions.filter(chord => regex.test(chord.chord_HTML));
            const result = [];
            matches.forEach(match => {
                result.push({
                    normalizedProbability: match.probability / maxProbability,
                    chord_HTML: match.chord_HTML
                })
            })
            return result;
        }
        else return [];
    }

    return (
        <div className='main-container' >
            <div style={{ width: `${CIRCLESIZE}px`, height: `${CIRCLESIZE}px` }} className="main-circle">
                {majorKeys.map((key, index) => {
                    return <Key
                        name={key}
                        degrees={30 * index}
                        radius={CIRCLESIZE / 2}
                        size={CIRCLESIZE / 6}
                        quality='major'
                        probableChords={calcProbability(key)}
                    />
                })}
                {/* {minorKeys.map((key, index) => {
                    return <Key
                        name={`${key}`}
                        degrees={30 * index}
                        radius={CIRCLESIZE / 2}
                        size={CIRCLESIZE / 9.5}
                        quality='minor'
                        probableChords={calcProbability(key)}
                    />
                })} */}
                <div style={{ height: CIRCLESIZE / 7, width: CIRCLESIZE / 7 }} className="current-key">{key}</div>
            </div>
        </div >
    )
}

const scaleDegrees = {
    'C': {
        'C': 'I',
        'D': 'ii',
        'E': 'iii',
        'F': 'IV',
        'G': 'V',
        'A': 'vi',
        'B': 'vii'
    },
    'Db': {
        'Db': 'I',
        'Eb': 'ii',
        'F': 'iii',
        'Gb': 'IV',
        'Ab': 'V',
        'Bb': 'vi',
        'C': 'vii'
    },
    'D': {
        'D': 'I',
        'E': 'ii',
        'Gb': 'iii',
        'G': 'IV',
        'A': 'V',
        'B': 'vi',
        'Db': 'vii'
    },
    'Eb': {
        'Eb': 'I',
        'F': 'ii',
        'G': 'iii',
        'Ab': 'IV',
        'Bb': 'V',
        'C': 'vi',
        'D': 'vii'
    },
    'E': {
        'E': 'I',
        'Gb': 'ii',
        'Ab': 'iii',
        'A': 'IV',
        'B': 'V',
        'Db': 'vi',
        'Eb': 'vii'
    },
    'F': {
        'F': 'I',
        'G': 'ii',
        'A': 'iii',
        'Bb': 'IV',
        'C': 'V',
        'D': 'vi',
        'E': 'vii'
    },
    'Gb': {
        'Gb': 'I',
        'Ab': 'ii',
        'Bb': 'iii',
        'B': 'IV',
        'Db': 'V',
        'Eb': 'vi',
        'F': 'vii'
    },
    'G': {
        'G': 'I',
        'A': 'ii',
        'B': 'iii',
        'C': 'IV',
        'D': 'V',
        'E': 'vi',
        'Gb': 'vii'
    },
    'Ab': {
        'Ab': 'I',
        'Bb': 'ii',
        'C': 'iii',
        'Db': 'IV',
        'Eb': 'V',
        'F': 'vi',
        'G': 'vii'
    },
    'A': {
        'A': 'I',
        'B': 'ii',
        'Db': 'iii',
        'D': 'IV',
        'E': 'V',
        'Gb': 'vi',
        'Ab': 'vii'
    },
    'Bb': {
        'Bb': 'I',
        'C': 'ii',
        'D': 'iii',
        'Eb': 'IV',
        'F': 'V',
        'G': 'vi',
        'A': 'vii',
        'B': {
            'B': 'I',
            'Db': 'ii',
            'Eb': 'iii',
            'E': 'IV',
            'Gb': 'V',
            'Ab': 'vi',
            'Bb': 'vii'
        }
    }
}