import './App.scss';
import {CategoryPage} from './components/CategoryPage';
import { Statistics } from './components/Statisctics';
import React, { useEffect, useState } from 'react';

function App() {
  const [active, setActive] = useState(true);
  const [isLocal, setIsLocal] = useState(false);
  console.log(isLocal)
  function setWindowActive(){
    if(localStorage.getItem("words")){
      setIsLocal(true)
    }
    else{
      setIsLocal(false)
    }
    setActive(!active);
  }
  return (
    <div className="App">
      <CategoryPage active={active} setWindowActive={setWindowActive} isLocal={isLocal} setIsLocal={setIsLocal}/>
      <Statistics active={active} setWindowActive={setWindowActive} isLocal={isLocal} setIsLocal={setIsLocal}/>
    </div>
  );
}

export default App;
