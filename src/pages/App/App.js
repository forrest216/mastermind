import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import GamePage from '../../pages/GamePage/GamePage';
import SettingsPage from '../SettingsPage/SettingsPage';
import HighScoresPage from '../HighScoresPage/HighScoresPage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import scoresService from '../../utils/scoresService';
import userService from '../../utils/userService';

const colors = {
  Easy: ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD'],
  Moderate: ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD', '#C3DD85'],
  Difficult: ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD', '#C3DD85', '#70778E'],
};

class App extends Component {
  state = {
    ...this.initialState(),
    difficulty: 'Easy',
    scores: [],
    user: userService.getUser()
  };

  initialState() {
    return {
      selColorIdx: 0,
      code: this.genCode(),
      guesses: [this.getNewGuess()],
      elapsedTime: 0
    };
  }
  
  getNewGuess() {
    return {
      code: [null, null, null, null],
      score: {
        perfect: 0,
        almost: 0
      }
    };
  }

  getWinTries() {
    let lastGuess = this.state.guesses.length - 1;
    return this.state.guesses[lastGuess].score.perfect === 4 ? lastGuess + 1 : 0;
  }
  
  genCode() {
    let numColors = this.state && colors[this.state.difficulty].length;
    numColors = numColors || 4;
    return new Array(4).fill().map(() => Math.floor(Math.random() * numColors));
  }

  isHighScore = (guesses) => {
    let lastScore = this.state.scores[this.state.scores.length - 1];
    return (guesses.length < lastScore.numGuesses || (
      guesses.length === lastScore.numGuesses &&
      this.state.elapsedTime < lastScore.seconds
    ));
  }

  handleNewGame = () => {
      this.setState(this.initialState());
  };

  handleDiffChange = (diff) => {
    this.setState({difficulty: diff}, () => this.handleNewGame());
  };

  handleTimerUpdate = () => {
    this.setState((state) => ({ elapsedTime: ++state.elapsedTime }));
  }

  handleColorSelect = (idx) => {
    this.setState({ selColorIdx: idx });
  };

  handlePeg = (idx) => {
    const guesses = [...this.state.guesses];
    const guess = {...guesses[guesses.length -1]};
    const code = [...guess.code];
    code[idx] = this.state.selColorIdx;
    guess.code = code;
    guesses[guesses.length - 1] = guess;
    this.setState({ guesses });
  };

  handleSubmitGuess = rowIdx => {
    let guesses = [...this.state.guesses];
    let guess = {...guesses[rowIdx]};
    let score = {...guess.score};
    let guessCode = [...guesses[rowIdx].code];
    let secretCode = [...this.state.code];
    let perfect = 0, almost = 0;

    guessCode.forEach((code, idx) => {
      if (secretCode[idx] === code) {
        perfect++;
        guessCode[idx] = secretCode[idx] = null;
      }
    });

    guessCode.forEach((code, idx) => {
      if (code === null) return;
      let foundIdx = secretCode.indexOf(code);
      if (foundIdx > -1) {
        almost++;
        secretCode[foundIdx] = null;
      }
    });

    score.perfect = perfect;
    score.almost = almost;

    guess.score = score;
    guesses[rowIdx] = guess;

    if (perfect === 4) {
      this.setState(async function() {
        if ((this.state.scores.length < 20 || this.isHighScore(guesses))) {
          let initials = prompt('Congrats, you have a top-20 score! Enter your initials:').substr(0, 3);
          await scoresService.create({ initials, numGuesses: guesses.length, seconds: this.state.elapsedTime });
          this.props.history.push('/high-scores');
        }
      });
    } else { 
      guesses.push(this.getNewGuess());
    };

    this.setState({guesses})
  };

  handleUpdateScores = (scores) => {
    this.setState({ scores });
  };

  async componentDidMount() {
    const scores = await scoresService.index();
    this.setState({ scores });
  }

  render() {
    let winTries = this.getWinTries();
    return ( 
      <div className="App">
        <header className='header-footer'>R E A C T &nbsp;&nbsp;&nbsp;  M A S T E R M I N D</header>
        <Switch>
          <Route exact path='/' render={() =>
            <GamePage
              winTries={winTries}
              colors={colors[this.state.difficulty]}
              selColorIdx={this.state.selColorIdx}
              guesses={this.state.guesses}
              handleColorSelect={this.handleColorSelect}
              handleNewGame={this.handleNewGame}
              handlePeg={this.handlePeg}
              handleSubmitGuess={this.handleSubmitGuess}
              elapsedTime={this.state.elapsedTime}
              handleTimerUpdate={this.handleTimerUpdate}
              user={this.state.user}
            />
          } /> 
          <Route exact path='/settings' render={props => 
            <SettingsPage 
            {...props}
            handleNewGame={this.handleNewGame}
            handleDiffChange={this.handleDiffChange}
            colors={colors}
            difficulty={this.state.difficulty}
            />
          } />
          <Route exact path='/signup' render={({ history }) => 
            <SignupPage
              history={history}
            />
          }/>
          <Route exact path='/login' render={() => 
            <LoginPage 
            />
          }/>
          <Route exact path='/high-scores' render={() => 
            <HighScoresPage
              scores={this.state.scores}
              handleUpdateScores={this.handleUpdateScores}
            />
          }/>
        </Switch>
      </div>
     );
  }
}
 
export default App;