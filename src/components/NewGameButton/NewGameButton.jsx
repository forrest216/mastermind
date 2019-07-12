import React from 'react';

const NewGameButton = (props) => {
   return ( 
      <button 
         className={'btn btn-default'}
         onClick={props.handleNewGame}
      >New Game</button>
    );
}
 
export default NewGameButton;