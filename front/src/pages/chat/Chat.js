import React, { useState, useEffect, useContext } from "react";
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
import { SocketContext } from '../../socketContext'
import { useLocation } from 'react-router';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_KEY = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY || '';
export const Chat = (props) => {
  const [messages, setMessages] = useState([
    { message: "Hello!", belongsToCurrentUser: false, audio: false },
    { message: "My mother told me!", belongsToCurrentUser: false, audio: false },
  ]);
  const [message, setMessage] = useState("");
  const socket = useContext(SocketContext);
  const [users, setUsers] = useState([]);
  const [tags, setTags] = useState([]);
  const [roomName, setRoomName] = useState('');
  const uuid = uuidv4();
  const { state } = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    setUsers(state.connectedUsers);
    setTags(state.currentTags.split('#'));
    setRoomName(state.name);
    console.log("socket", socket);
    socket.on("authentication", (data) => {
      if(data) {
        // auth succeeded everything good
        console.log(data);
      } else {
        console.log('connection did not succeed');
      }
    });
    socket.on("message", msg => {
        console.log(msg);
    });
    socket.on("b_user_joined", (data) => {
      setUsers((prev)=>[...prev, {userId: data.id, tag: data.tag}]);
    })
    socket.on("b_new_message", (data) => {
      console.log(data);
      setMessages((prev)=>[...prev, data])
    })  
    socket.on("b_user_left", (data) => {
      setUsers((prev)=> prev.filter(user => user.userId !== data.id));
    });

    socket.emit("user_joined", {jwt: token, token: uuid, roomId: state.room.id});

    // return () => {
    //   socket.emit("user_left");
    // };
  }, [])

  const processMessage = () => {
    setMessages([
      ...messages,
      { message: message, belongsToCurrentUser: true, audio: false },
    ]);
    socket.emit("new_message", {message: message, audio: false});
    setMessage("");
  };

  useEffect(() => {
    console.log(state?.room)
    // axios.get('http://localhost:8080/api/room/messages',
    //   {
    //     headers:
    //       { "Authorization": `Bearer ${token}` },
    //     params: { roomId: state.room.id, limit: 5, skip: 0 }
    //   }).then(res => {
    //     console.log(res);
    //   })

  }, [state?.room])

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      processMessage();
    }
  };

  const handleSpeechRecognized = (receivedMessage) => {
    console.log(receivedMessage);
    setMessages([
      ...messages,
      { message: receivedMessage, belongsToCurrentUser: true, audio: true },
    ]);
    socket.emit("new_message", {message: receivedMessage, audio: true});
  };

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
    // const translatedMessages = messages.map(async msg => {
    //   if (!msg.belongsToCurrentUser) {
    //     return getTranslatedText(msg.message, 'en', 'ro').then(res => { return { ...msg, message: res } });
    //   } else {
    //     return msg;
    //   }
    // })
    // return Promise.all(translatedMessages).then(values => { console.log(values); setMessages(values) })
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
            Chat {roomName}
          </Grid>
          {tags && tags.map((topic) => (
            <Chip color="secondary" key={topic} label={`#${topic}`} variant="outlined" />
          ))}
        </Grid>
      </Stack>
      <Stack direction="row">
        <ScrollToBottom className="participants">
          {users && users.map((user) => (
            <Stack direction="row" spacing={2}>
              <Typography pb={2} sx={{ fontSize: 18 }}>{user.tag}</Typography>
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
              if (!message.audio) {
                return (
                  <MessageBox
                    notch={false}
                    position={message.belongsToCurrentUser ? 'right' : 'left'}
                    type={'text'}
                    text={message.message}
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
                            <img alt="" src="https://avatars.dicebear.com/api/avataaars/2.svg" className="rce-avatar" />
                          </div>
                        </div>
                        <div className="rce-mbox-text right">
                          <IconButton onClick={() => playMessage(message.message)}>
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
