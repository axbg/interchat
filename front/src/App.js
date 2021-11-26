import React from 'react';
import './App.scss';
import 'react-chat-elements/dist/main.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { ExploreRooms } from './pages/explore-rooms/ExploreRooms';
import { CreateRoom } from './pages/create-room/CreateRoom';
import { JoinRoom } from './pages/join-room/JoinRoom';
import { Chat } from './pages/chat/Chat';
import { Routes, Route } from "react-router-dom";
import { LandingPage } from './pages/landing/LandingPage';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#F8725A',
      },
      secondary: {
        main: '#3DC9D8'
      },
      tertiary: {
        main: '#FFFFFF'
      }
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Routes>
          <Route path="/" element={<ExploreRooms />} />
          <Route path="/explore-rooms" element={<ExploreRooms />} />
          <Route path="/create-room" element={<CreateRoom />} />
          <Route path="/join-room" element={<JoinRoom />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/landing" element={<LandingPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
