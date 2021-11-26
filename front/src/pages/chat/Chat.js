import React, { useState, useEffect } from 'react';
import {Button, Input} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import {MessageBox} from 'react-chat-elements';
import ScrollToBottom from 'react-scroll-to-bottom';
import './Chat.scss';

export const Chat = () => {
    const [messages, setMessages] = useState([{text: 'Hello!', belongsToCurrentUser: false}]);
    const [message, setMessage] = useState('');

    const processMessage = () => {
        setMessages([...messages, {text: message, belongsToCurrentUser: true}]);
        setMessage('');
    }

    return (
        <>
        <div className="header"></div>
        <ScrollToBottom>
        {
            messages.map(message => (
                <MessageBox
                position={message.belongsToCurrentUser ? 'right' : 'left'}
                type={'text'}
                text={message.text}
                avatar={'https://avatars.dicebear.com/api/avataaars/2.svg'
            }/>
            ))
        }
        </ScrollToBottom>
        <div className="input-section">
            <Input
                className="typing-input"
                value={message}
                placeholder="Type here..."
                onChange={(event) => setMessage(event.target.value)} 
            />
            <Button variant="contained" endIcon={<MicIcon />}>
                Record
            </Button>
            <Button variant="contained" onClick={processMessage} endIcon={<SendIcon />}>
                Send
            </Button>
        </div>
    </>
    )
}