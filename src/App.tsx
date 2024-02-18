import React from 'react';
import './App.css';
import MultiSelectRick from "./components/MultiSelectRick";

function App() {

  return (
    <div className="App">
        <div className="centered-box">
            <div className="box-content">

                <h1>Rick and Morty</h1>
                <p>multi-select combobox</p>
                <p>Ahmet GÖR</p>
                <p><a href={'https://github.com/ahmet-gor-bear/multiselect-rick'}>https://github.com/ahmet-gor-bear/multiselect-rick</a></p>
                <MultiSelectRick/>
            </div>
        </div>
    </div>
  );
}

export default App;
