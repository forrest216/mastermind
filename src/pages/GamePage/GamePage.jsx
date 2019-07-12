import React from 'react';
import { Link } from 'react-router-dom';
import GameBoard from "../../components/GameBoard/GameBoard";
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import NavBar from '../../components/NavBar/NavBar';
import GameTimer from '../../components/GameTimer/GameTimer';
import NewGameButton from '../../components/NewGameButton/NewGameButton';
import './GamePage.css'

const GamePage = (props) => {
   return ( 
      <div className="App">
        <NavBar 
          user={props.user}
        />
        <div className="flex-h align-flex-end">
          <GameBoard
            colors={props.colors}
            guesses={props.guesses}
            handlePeg={props.handlePeg}
            submitGuess={props.handleSubmitGuess}
          />
          <div className="controls">
            <ColorPicker 
              colors={props.colors}
              selColorIdx={props.selColorIdx}
              colorSelect={props.handleColorSelect}
            />
            <GameTimer 
              elapsedTime={props.elapsedTime}
              handleTimerUpdate={props.handleTimerUpdate}
              firstRow={props.guesses[0].code}
              winTries={props.winTries}
              />
            <Link className='btn btn-default GamePage-link-margin' to='/high-scores'>High Scores</Link>
            <Link className="btn btn-default GamePage-link-margin" to='./settings'>Difficulty</Link>
            <NewGameButton 
              handleNewGame={props.handleNewGame}
            />
          </div>
        </div>
        <footer className='header-footer'>
          {(props.winTries ? `You Won in ${props.winTries} Guesses!` : 'Good Luck!')}
        </footer>
      </div>
     );
};

export default GamePage;