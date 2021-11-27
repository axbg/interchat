import React, { useState, useEffect, useContext } from "react";
import { IconButton, Input, Grid, Chip, Typography, Avatar } from "@mui/material";
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
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socket = useContext(SocketContext);
  const [users, setUsers] = useState([]);
  const [tags, setTags] = useState([]);
  const [roomName, setRoomName] = useState('');
  const uuid = uuidv4();
  const { state } = useLocation();
  const token = localStorage.getItem('token');
  const currentUserTag = localStorage.getItem('tag');
  const [currentUserId, setCurrentUserId] = useState('');
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);

  useEffect(() => {
    setCurrentUserId(users.find(user => user.tag === currentUserTag) && users.find(user => user.tag === currentUserTag).id);
    setIsCurrentUserAdmin(users.find(user => user.tag === currentUserTag) && users.find(user => user.tag === currentUserTag).Membership.admin);
    console.log(users);
  }, [users, currentUserTag]);

  const getGoogleFormatCode = {
    "ro-RO": 'ro',
    "en-US": 'en',
    "en-UK": 'en-GB',
    "fr-FR": 'fr',
    'it-IT': 'it',
    'nl-NL': 'nl',
    'sk-SK': 'sk',
    'es-ES': 'es',
    'de-DE': 'de'
  };

  useEffect(() => {
    setUsers(state.connectedUsers);
    setTags(state.currentTags.split('#'));
    setRoomName(state.name);

    console.log("socket", socket);
    socket.on("authentication", (data) => {
      if (data) {
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
      console.log('JOINED', { data, users })
      setUsers((prev) => [...prev, { id: data.id, tag: data.tag }]);
    })
    socket.on("b_new_message", (data) => {
      console.log(data, state);
      let fromLang = getGoogleFormatCode[data?.lang];
      let toLang = getGoogleFormatCode[state.userPref.output_lang];
      let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
      url += '&q=' + encodeURI(data.message);
      url += `&source=${fromLang}`;
      url += `&target=${toLang}`;
      fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }).then(res => res.json())
        .then(response => {
          console.log(response)
          const trsText = _.get(response, 'data.translations[0].translatedText');
          const newData = { ...data, message: trsText }
          setMessages((prev) => [...prev, newData])
        });
    })
    socket.on("b_user_left", (data) => {
      console.log({ data, users })
      setUsers((prev) => { console.log(prev); return prev.filter(user => user.id !== data.userId) });
    });

    socket.emit("user_joined", { jwt: token, token: uuid, roomId: state.room.id });
  }, [])

  const processMessage = () => {
    console.log(message);
    console.log(state)

    let fromLang = getGoogleFormatCode[state.userPref.input_lang];
    let toLang = getGoogleFormatCode[state.userPref.output_lang];
    let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    url += '&q=' + encodeURI(message);
    url += `&source=${fromLang}`;
    url += `&target=${toLang}`;
    fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(res => res.json())
      .then(response => {
        const trsText = _.get(response, 'data.translations[0].translatedText');
        setMessages([
          ...messages,
          { message: message, belongsToCurrentUser: true, audio: false },
        ]);
        socket.emit("new_message", { message: trsText, audio: false });
        setMessage("");
      });

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
      { message: receivedMessage, belongsToCurrentUser: true, audio: true },
    ]);
    socket.emit("new_message", { message: receivedMessage, audio: true });
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
            <Chip style={{marginTop:'40px'}} color="secondary" key={topic} label={`#${topic}`} variant="outlined" />
          ))}
        </Grid>
      </Stack>
      <Stack direction="row">
        <ScrollToBottom className="participants">
          {users && users.map((user) => (
            <Stack direction="row" spacing={2}>
              <Grid item xs={1}>
                <Avatar alt="avatar" src={`https://avatars.dicebear.com/api/avataaars/${user.id}.svg`}/>
              </Grid>
              <Typography style={{paddingLeft:'10px'}} pb={2} sx={{ fontSize: 18 }}>{user.tag}</Typography>
              {isCurrentUserAdmin && <Grid item xs={1}>
                <IconButton onClick={() => {
                  socket.emit("ban", {bannedUser: user.id});
                }
              }><BlockIcon /></IconButton>
              </Grid>}
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
                    avatar={`https://avatars.dicebear.com/api/avataaars/${message.belongsToCurrentUser ? currentUserId : message.userId}.svg`}
                  />
                )
              } else {
                return (
                  <div className="rce-container-mbox">
                    <div className={`rce-mbox rce-mbox-${message.belongsToCurrentUser ? 'right' : 'left'} rce-mbox--clear-notch`}>
                      <div className="rce-mbox-body">
                        <div className="rce-mbox-title rce-mbox-title--clear">
                          <div className="rce-avatar-container default default">
                            <img alt="" src={`https://avatars.dicebear.com/api/avataaars/${message.belongsToCurrentUser ? currentUserId : message.userId}.svg`} className="rce-avatar" />
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
