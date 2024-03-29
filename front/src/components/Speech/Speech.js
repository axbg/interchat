import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';

export const Speech = (props) => {
    const [listening, setListening] = useState(false);
    const [recognition, setRecognition] = useState();
    const [message, setMessage] = useState('');

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        let recognition = new SpeechRecognition();

        recognition.continous = true;
        recognition.interimResults = true;
        recognition.lang = 'ro-RO';
        setRecognition(recognition);
    }, []);

    const toggleListen = () => {
        setListening(prev => !prev)
    }

    useEffect(() => {
        console.log("listening", listening)
        //recognition
        console.log(recognition)
        if (!recognition) {
            return;
        }
        if (listening) {
            recognition.start()
            recognition.onend = () => {
                console.log("...continue listening...")
                recognition.start()
            }
        } else {
            recognition.stop()
            recognition.onend = () => {
                console.log("Stopped listening per click")
                props.onSpeechListened(message);
            }
        }

        recognition.onstart = () => {
            console.log("Listening!")
        }

        let finalTranscript = ''
        recognition.onresult = event => {
            let interimTranscript = ''

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) finalTranscript += transcript + ' ';
                else interimTranscript += transcript;
            }
            //nono
            // document.getElementById('interim').innerHTML = interimTranscript
            // document.getElementById('final').innerHTML = finalTranscript
            //added new
            setMessage(finalTranscript)
            // props.onSpeechListened(finalTranscript);

            //-------------------------COMMANDS------------------------------------

            const transcriptArr = finalTranscript.split(' ')
            const stopCmd = transcriptArr.slice(-3, -1)
            console.log('stopCmd', stopCmd)

            if (stopCmd[0] === 'stop' && stopCmd[1] === 'listening') {
                recognition.stop()
                recognition.onend = () => {
                    console.log('Stopped listening per command')
                    const finalText = transcriptArr.slice(0, -3).join(' ')
                    // document.getElementById('final').innerHTML = finalText
                    console.log(finalText);
                    setMessage(finalText);
                }
            }
        }
        recognition.onerror = event => {
            console.log("Error occurred in recognition: " + event.error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listening]);

    return (
        <IconButton onClick={toggleListen}>
            <MicIcon />
        </IconButton>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
    },
    button: {
        width: '60px',
        height: '60px',
        background: 'lightblue',
        borderRadius: '50%',
        margin: '6em 0 2em 0'
    },
    interim: {
        color: 'gray',
        border: '#ccc 1px solid',
        padding: '1em',
        margin: '1em',
        width: '300px'
    },
    final: {
        color: 'black',
        border: '#ccc 1px solid',
        padding: '1em',
        margin: '1em',
        width: '300px'
    }
}

const { container, button, interim, final } = styles

