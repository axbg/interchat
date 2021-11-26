import React, { useState } from "react";
import { IconButton, Input, Grid, Chip } from "@mui/material";
import { MessageBox } from "react-chat-elements";
import ScrollToBottom from "react-scroll-to-bottom";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import "./Chat.scss";
import { Speech } from "../../components/Speech/Speech";
import Stack from "@mui/material/Stack";

export const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "Hello!", belongsToCurrentUser: false, isAudio: false },
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
      <Stack className="header" >
        <Grid container display="flex" alignItems="center" spacing={{ xs: 5 }} pl={4}>
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
      <ScrollToBottom debug={false}>
        {messages.map((message) => {
          if (!message.isAudio) {
            return (
              <MessageBox
                notch={false}
                position={message.belongsToCurrentUser ? "right" : "left"}
                type={"text"}
                text={message.text}
                avatar={"https://avatars.dicebear.com/api/avataaars/2.svg"}
              />
            );
          } else {
            return (
              <div className="rce-container-mbox">
                <div
                  className={`rce-mbox rce-mbox-${
                    message.belongsToCurrentUser ? "right" : "left"
                  } rce-mbox--clear-notch`}
                >
                  <div className="rce-mbox-body">
                    <div className="rce-mbox-title rce-mbox-title--clear">
                      <div className="rce-avatar-container default default">
                        <img
                          alt=""
                          src="https://avatars.dicebear.com/api/avataaars/2.svg"
                          className="rce-avatar"
                        />
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
