import { useState } from "react";
import "../CSS/popup.css";
// import Modal from 'react-modal';

import React from 'react'

export default function Popup() {   

    const [isShown, setIsShown] = useState(true);

    const closePopUp = event => {
        setIsShown(current => !current);
      };
        
  return (
    <>

        <div className="popup" style={{display: isShown ? 'block' : 'none'}}>
            <div className="box">
                <h1>INSTRUCTIONS</h1>
                <ol>
                    <li>Click on start button to start touch-typing</li>
                    <li>Click on textbox and start typing</li>
                    <li>Timer is of 5 minutes</li>
                    <li>Your typing accuracy will be calculated and also the words you will type in 5 minutes</li>
                </ol>
                <div onClick={closePopUp} className="close-btn">
                    <button>CLOSE</button>
                </div>
            </div>
        </div>
    </>
  )
}
