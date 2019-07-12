import React from 'react';
import styles from './GameTimer.module.css';

function formatTime(seconds) {
   let mins = Math.floor(seconds / 60).toString().padStart(2, '0');
   let secs = (seconds % 60).toString().padStart(2, '0');
   return `${mins}:${secs}`;
}

class GameTimer extends React.PureComponent {

   handleTick = () => {
      if (this.props.firstRow.includes(null)) return;
      if (this.props.winTries) return;
      this.props.handleTimerUpdate();
   }

   componentDidMount() {
      this.timerId = setInterval(this.handleTick, 1000);
   }

   componentWillUnmount() {
      clearInterval(this.timerId);
   }

   render() { 
      return (
      <div className={`${styles.GameTimer} flex-h`}>
         {formatTime(this.props.elapsedTime)}
      </div> );
   }
}
 
export default GameTimer;