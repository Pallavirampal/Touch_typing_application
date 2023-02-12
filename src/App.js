import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './components/home.jsx';
import Popup from './components/popup.jsx';


function App() {
  return (
    <>
      <Popup></Popup>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
    </>
  );
}
export default App;

