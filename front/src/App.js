import React from 'react';
import './App.scss';
import 'react-chat-elements/dist/main.css';

import { ExploreRooms } from './pages/explore-rooms/ExploreRooms';
import { CreateRoom } from './pages/create-room/CreateRoom';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ExploreRooms />} />
        <Route path="/explore-rooms" element={<ExploreRooms />} />
        <Route path="/create-room" element={<CreateRoom />} />
      </Routes>
    </div>
  );
}

export default App;
