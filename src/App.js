import React, { useState } from 'react';
import './App.css';

import Slider from './slider/Slider';
import EditableInput from './common/EditableInput';


function App() {
  const [background, setBackground] = useState({
    background: '#fff',
  });

  const [wasUpdated, setIfWasUpdated] = useState('c3c3c3');

  const handleChangeComplete = (color) => {
      setBackground({ background: color.hex })
  };

  const handleInputChange = (color) => {
    setBackground({ background: color.toUpperCase() })
    setIfWasUpdated(color);
  }

  console.log('background', background);

  return (
    <div style={{
      width: '300px',
      textAlign: 'center',
      margin: '300px auto',
    }}>
      <Slider
        color={ background }
        onChangeComplete={ handleChangeComplete }
        wasUpdated={wasUpdated}
      />

      <EditableInput
        value={background.background}
        onChange={handleInputChange}
      />
      <div style={{ backgroundColor: background, width: '30px', height: '30px' }} />
    </div>
  );
}

export default App;
