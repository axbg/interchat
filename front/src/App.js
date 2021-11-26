import React from 'react';
import './App.scss';
import { Speech } from './components/Speech/Speech'
import Button from '@mui/material/Button';

function App() {


  return (
    <div className="App">
      <Button variant="contained">Hello World</Button>
      <Speech />

    </div>
  );
}

export default App;
