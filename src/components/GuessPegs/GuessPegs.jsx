import React from 'react';
import GuessPeg from '../GuessPeg/GuessPeg'
import './GuessPegs.css'
 

const GuessPegs = (props) => {
   return ( 
      <div className="GuessPegs">
         {props.code.map((val, idx) => 
            <GuessPeg
               key={idx}
               handlePeg={() => props.handlePeg(idx)}
               color={props.colors[val]}
               currentGuess={props.currentGuess}
            />
         )}
      </div>
    );
   }
   
   export default GuessPegs;