import React, { useState } from 'react';
import '../styles/CircleOfFifths.css';
import Key from './Key.jsx';

export default function CircleOfFifths(props) {
    const { addChord, chordSuggestions, tonic, handleTonicChange } = props;
    const majorKeys = ['C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
    const minorKeys = ['A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];
    const diminishedKeys = ['B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E'];
    const CIRCLESIZE = 1100;

    const calcProbability = key => {
        let regex, match;
        if (scaleDegrees[tonic][key]) match = scaleDegrees[tonic][key].degree;
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

    const getScaleDegree = (key, quality) => (scaleDegrees[tonic][key] && scaleDegrees[tonic][key].quality === quality) ? romanToNumber[scaleDegrees[tonic][key].degree] : null;


    return (
        <div style={{ width: `${CIRCLESIZE + 25}px`, height: `${CIRCLESIZE + 25}px` }} className='main-container' >
            <div style={{ width: `${CIRCLESIZE + 25}px`, height: `${CIRCLESIZE + 25}px` }} className="main-circle-border"></div>
            <div style={{ width: `${CIRCLESIZE}px`, height: `${CIRCLESIZE}px` }} className="main-circle">
                {majorKeys.map((key, index) => {
                    return <Key
                        name={key}
                        degrees={30 * index}
                        radius={CIRCLESIZE / 2}
                        size={CIRCLESIZE / 7}
                        quality='major'
                        probableChords={calcProbability(key)}
                        addChord={addChord}
                        scaleDegree={getScaleDegree(key, 'major')}
                    />
                })}
                {minorKeys.map((key, index) => {
                    return <Key
                        name={`${key}`}
                        degrees={30 * index}
                        radius={CIRCLESIZE / 2}
                        size={CIRCLESIZE / 10}
                        quality='minor'
                        probableChords={calcProbability(key)}
                        addChord={addChord}
                        scaleDegree={getScaleDegree(key, 'minor')}
                    />
                })}
                {diminishedKeys.map((key, index) => {
                    return <Key
                        name={`${key}`}
                        degrees={30 * index}
                        radius={CIRCLESIZE / 2}
                        size={CIRCLESIZE / 15}
                        quality='diminished'
                        probableChords={calcProbability(key)}
                        addChord={addChord}
                        scaleDegree={getScaleDegree(key, 'diminished')}
                    />
                })}
                <div style={{ height: CIRCLESIZE / 5, width: CIRCLESIZE / 5 }} className="key current-key">
                    {tonic}
                    <div className="tonic-buttons">
                        <div onClick={() => handleTonicChange(1)} className='arrow arrow-up'></div>
                        <div onClick={() => handleTonicChange(-1)} className='arrow arrow-down'></div>
                    </div>
                </div>
            </div>
        </div >
    )
}
const romanToNumber = {
    'I': 1,
    'ii': 2,
    'iii': 3,
    'IV': 4,
    'V': 5,
    'vi': 6,
    'vii': 7
}

const scaleDegrees = {
    'C': {
        'C': {
            degree: 'I',
            quality: 'major'
        },
        'D': {
            degree: 'ii',
            quality: 'minor'
        },
        'E': {
            degree: 'iii',
            quality: 'minor'
        },
        'F': {
            degree: 'IV',
            quality: 'major'
        },
        'G': {
            degree: 'V',
            quality: 'major'
        },
        'A': {
            degree: 'vi',
            quality: 'minor'
        },
        'B': {
            degree: 'vii',
            quality: 'diminished'
        }
    },
    'Db': {
        'Db': {
            degree: 'I',
            quality: 'major'
        },
        'Eb': {
            degree: 'ii',
            quality: 'minor'
        },
        'F': {
            degree: 'iii',
            quality: 'minor'
        },
        'Gb': {
            degree: 'IV',
            quality: 'major'
        },
        'Ab': {
            degree: 'V',
            quality: 'major'
        },
        'Bb': {
            degree: 'vi',
            quality: 'minor'
        },
        'C': {
            degree: 'vii',
            quality: 'diminished'
        }
    },
    'D': {
        'D': {
            degree: 'I',
            quality: 'major'
        },
        'E': {
            degree: 'ii',
            quality: 'minor'
        },
        'Gb': {
            degree: 'iii',
            quality: 'minor'
        },
        'G': {
            degree: 'IV',
            quality: 'major'
        },
        'A': {
            degree: 'V',
            quality: 'major'
        },
        'B': {
            degree: 'vi',
            quality: 'minor'
        },
        'Db': {
            degree: 'vii',
            quality: 'diminished'
        }
    },
    'Eb': {
        'Eb': {
            degree: 'I',
            quality: 'major'
        },
        'F': {
            degree: 'ii',
            quality: 'minor'
        },
        'G': {
            degree: 'iii',
            quality: 'minor'
        },
        'Ab': {
            degree: 'IV',
            quality: 'major'
        },
        'Bb': {
            degree: 'V',
            quality: 'major'
        },
        'C': {
            degree: 'vi',
            quality: 'minor'
        },
        'D': {
            degree: 'vii',
            quality: 'diminished'
        }
    },
    'E': {
        'E': {
            degree: 'I',
            quality: 'major'
        },
        'Gb': {
            degree: 'ii',
            quality: 'minor'
        },
        'Ab': {
            degree: 'iii',
            quality: 'minor'
        },
        'A': {
            degree: 'IV',
            quality: 'major'
        },
        'B': {
            degree: 'V',
            quality: 'major'
        },
        'Db': {
            degree: 'vi',
            quality: 'minor'
        },
        'Eb': {
            degree: 'vii',
            quality: 'diminished'
        }
    },
    'F': {
        'F': {
            degree: 'I',
            quality: 'major'
        },
        'G': {
            degree: 'ii',
            quality: 'minor'
        },
        'A': {
            degree: 'iii',
            quality: 'minor'
        },
        'Bb': {
            degree: 'IV',
            quality: 'major'
        },
        'C': {
            degree: 'V',
            quality: 'major'
        },
        'D': {
            degree: 'vi',
            quality: 'minor'
        },
        'E': {
            degree: 'vii',
            quality: 'diminished'
        }
    },
    'Gb': {
        'Gb': {
            degree: 'I',
            quality: 'major'
        },
        'Ab': {
            degree: 'ii',
            quality: 'minor'
        },
        'Bb': {
            degree: 'iii',
            quality: 'minor'
        },
        'B': {
            degree: 'IV',
            quality: 'major'
        },
        'Db': {
            degree: 'V',
            quality: 'major'
        },
        'Eb': {
            degree: 'vi',
            quality: 'minor'
        },
        'F': {
            degree: 'vii',
            quality: 'diminished'
        }
    },
    'G': {
        'G': {
            degree: 'I',
            quality: 'major'
        },
        'A': {
            degree: 'ii',
            quality: 'minor'
        },
        'B': {
            degree: 'iii',
            quality: 'minor'
        },
        'C': {
            degree: 'IV',
            quality: 'major'
        },
        'D': {
            degree: 'V',
            quality: 'major'
        },
        'E': {
            degree: 'vi',
            quality: 'minor'
        },
        'Gb': {
            degree: 'vii',
            quality: 'diminished'
        }
    },
    'Ab': {
        'Ab': {
            degree: 'I',
            quality: 'major'
        },
        'Bb': {
            degree: 'ii',
            quality: 'minor'
        },
        'C': {
            degree: 'iii',
            quality: 'minor'
        },
        'Db': {
            degree: 'IV',
            quality: 'major'
        },
        'Eb': {
            degree: 'V',
            quality: 'major'
        },
        'F': {
            degree: 'vi',
            quality: 'minor'
        },
        'G': {
            degree: 'vii',
            quality: 'diminished'
        }
    },
    'A': {
        'A': {
            degree: 'I',
            quality: 'major'
        },
        'B': {
            degree: 'ii',
            quality: 'minor'
        },
        'Db': {
            degree: 'iii',
            quality: 'minor'
        },
        'D': {
            degree: 'IV',
            quality: 'major'
        },
        'E': {
            degree: 'V',
            quality: 'major'
        },
        'Gb': {
            degree: 'vi',
            quality: 'minor'
        },
        'Ab': {
            degree: 'vii',
            quality: 'diminished'
        }
    },
    'Bb': {
        'Bb': {
            degree: 'I',
            quality: 'major'
        },
        'C': {
            degree: 'ii',
            quality: 'minor'
        },
        'D': {
            degree: 'iii',
            quality: 'minor'
        },
        'Eb': {
            degree: 'IV',
            quality: 'major'
        },
        'F': {
            degree: 'V',
            quality: 'major'
        },
        'G': {
            degree: 'vi',
            quality: 'minor'
        },
        'A': {
            degree: 'vii',
            quality: 'diminished'
        },
    },
    'B': {
        'B': {
            degree: 'I',
            quality: 'major'
        },
        'Db': {
            degree: 'ii',
            quality: 'minor'
        },
        'Eb': {
            degree: 'iii',
            quality: 'minor'
        },
        'E': {
            degree: 'IV',
            quality: 'major'
        },
        'Gb': {
            degree: 'V',
            quality: 'major'
        },
        'Ab': {
            degree: 'vi',
            quality: 'minor'
        },
        'Bb': {
            degree: 'vii',
            quality: 'diminished'
        }
    }
}


