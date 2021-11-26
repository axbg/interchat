import React, { useState, useEffect } from "react";
import { IconButton, Input, Grid, Chip, Typography } from "@mui/material";
import { MessageBox } from "react-chat-elements";
import ScrollToBottom from "react-scroll-to-bottom";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import MicIcon from "@mui/icons-material/Mic";
import BlockIcon from '@mui/icons-material/Block';
import "./Chat.scss";
import { Speech } from "../../components/Speech/Speech";
import Stack from "@mui/material/Stack";
import _ from 'lodash';

const API_KEY = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY || '';
export const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "Hello!", belongsToCurrentUser: false, isAudio: false },
    { text: "My mother told me!", belongsToCurrentUser: false, isAudio: false },
  ]);
  const [message, setMessage] = useState("");

  const processMessage = () => {
    setMessages([
      ...messages,
      { text: message, belongsToCurrentUser: true, isAudio: false },
    ]);
    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      processMessage();
    }
  };

  const handleSpeechRecognized = (receivedMessage) => {
    console.log(receivedMessage);
    setMessages([
      ...messages,
      { text: receivedMessage, belongsToCurrentUser: true, isAudio: true },
    ]);
  };
  const users = [
    {
      key: 1,
      name: "Lorena Bodea",
    },
    {
      key: 2,
      name: "Lorena Bodea",
    },
    {
      key: 3,
      name: "Lorena Bodea",
    },
    {
      key: 4,
      name: "Lorena Bodea",
    },
    {
      key: 5,
      name: "Lorena Bodea",
    },
    {
      key: 6,
      name: "Lorena Bodea",
    },
    {
      key: 7,
      name: "Lorena Bodea",
    },
  ];

  const playMessage = (message) => {
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[0];
    msg.voiceURI = "native";
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 1;
    msg.text = message;
    msg.lang = "ro-Ro";
    speechSynthesis.speak(msg);
  };

  const getTranslatedText = async (text, fromLang, toLang) => {
    let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    url += '&q=' + encodeURI(text);
    url += `&source=${fromLang}`;
    url += `&target=${toLang}`;
    return await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(res => res.json())
      .then(response => _.get(response, 'data.translations[0].translatedText', text));
  }

  //not final
  useEffect(() => {
    if (_.isEmpty(messages)) {
      return;
    }
    const translatedMessages = messages.map(async msg => {
      if (!msg.belongsToCurrentUser) {
        return getTranslatedText(msg.text, 'en', 'ro').then(res => { return { ...msg, text: res } });
      } else {
        return msg;
      }
    })
    return Promise.all(translatedMessages).then(values => { console.log(values); setMessages(values) })
    // setMessages(translatedMessages)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="chat">
      <Stack className="header">
        <Grid
          container
          display="flex"
          alignItems="center"
          spacing={{ xs: 5 }}
          pl={4}
        >
          <Grid item xs={1}>
            <GroupsIcon />
          </Grid>
          <Grid item xs={2}>
            Chat kernel_panic
          </Grid>
          {Array.from(Array(4)).map((_, index) => (
            <Grid item xs={2} key={index}>
              <Chip label="#visitBucharest" variant="outlined" size="small" />
            </Grid>
          ))}
        </Grid>
      </Stack>
      <Stack direction="row">
        <ScrollToBottom className="participants">
          {users.map((user) => (
            <Stack direction="row" spacing={2}>
              <Typography pb={2} sx={{ fontSize: 18 }}>{user.name}</Typography>
              <Grid item xs={1}>
                <MicIcon />
              </Grid>
              <Grid item xs={1}>
                <BlockIcon />
              </Grid>
            </Stack>
          ))}
        </ScrollToBottom>
        <ScrollToBottom className="messages" debug={false}>
        {
            messages.map(message => {
                if(!message.isAudio) {
                    return (
                    <MessageBox
                        notch={false}
                        position={message.belongsToCurrentUser ? 'right' : 'left'}
                        type={'text'}
                        text={message.text}
                        avatar={'https://avatars.dicebear.com/api/avataaars/2.svg'}
                    />
                    )
                } else {
                    return (
                        <div className="rce-container-mbox">
                        <div className={`rce-mbox rce-mbox-${message.belongsToCurrentUser ? 'right' : 'left'} rce-mbox--clear-notch`}>
                        <div className="rce-mbox-body">
                        <div className="rce-mbox-title rce-mbox-title--clear">
                            <div className="rce-avatar-container default default">
                                <img alt="" src="https://avatars.dicebear.com/api/avataaars/2.svg" className="rce-avatar"/>
                            </div>
                        </div>
                      <div className="rce-mbox-text right">
                        <IconButton onClick={() => playMessage(message.text)}>
                          <PlayCircleIcon />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </ScrollToBottom>

      </Stack>
      <div className="input-section">
        <Input
          onKeyDown={(event) => handleKeyDown(event)}
          className="typing-input"
          value={message}
          placeholder="Type a message..."
          onChange={(event) => setMessage(event.target.value)}
        />
        <Speech onSpeechListened={handleSpeechRecognized} />
      </div>
    </div>
  );
};
