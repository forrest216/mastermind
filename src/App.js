import React, { Component } from 'react';
import './App.css';
import GameBoard from "./components/GameBoard/GameBoard";
import ColorPicker from './components/ColorPicker/ColorPicker';
import GameTimer from './components/GameTimer/GameTimer';
import NewGameButton from './components/NewGameButton/NewGameButton';

const colors = ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD'];


class App extends Component {
  state = {
    selColorIdx: 0,
    code: this.genCode,
    guesses: [this.getNewGuess(), this.getNewGuess(), this.getNewGuess(), this.getNewGuess()]
  }

  getNewGuess() {
    return {
      code: [this.random(), this.random(), this.random(), this.random()],
      score: {
        perfect: 0,
        almost: 0
      }
    };
  }

  incrementColor() {
    return {
      selColorIdx: this.random()
    };
  }
  
  genCode() {
    return new Array(4).fill().map(() => Math.floor(Math.random() * colors.length));
  }
  random() {
    return Math.floor(Math.random() * (colors.length));
  }

  winTries() {

  }

  render() { 
    let winTries = this.winTries();
    return ( 
      <div className="App">
        <header className='App-header-footer'>R E A C T &nbsp;&nbsp;&nbsp;  M A S T E R M I N D</header>
        <div className="flex-h align-flex-end">
          <GameBoard
            colors={colors}
            guesses={this.state.guesses}
          />
          <div className="App-controls">
            <ColorPicker 
              colors={colors}
              selColorIdx={this.state.selColorIdx}
            />
            <GameTimer />
            <NewGameButton />
          </div>
        </div>
        <footer className='App-header-footer'>
          {(winTries ? `You Won in ${winTries} Guesses!` : 'Good Luck!')}
        </footer>
      </div>
     );
  }
}
 
export default App;