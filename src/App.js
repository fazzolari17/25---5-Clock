import './App.css';
import React, { useState, useEffect } from 'react';
import LengthControl from './components/LengthControl';
import Timer from './components/Timer';
import TimerControls from './components/TimerControls';
import accurateInterval from 'accurate-interval';
import Footer from './components/Footer';

// all time is kept track in milliseconds and converted for the display
function App() {
  const oneMinute = 60000;
  const sixtyMinutes = oneMinute * 60
  const initialBreakTime = 5 * oneMinute;
  const initialSessionTime = 25 * oneMinute;
  const initialDisplayTime = initialSessionTime;

  const [displayTime, setDisplayTime] = useState(initialSessionTime);
  const [breakTime, setBreakTime] = useState(initialBreakTime);
  const [sessionTime, setSessionTime] = useState(initialSessionTime);
  const [onBreak, setOnBreak] = useState(false);
  const [timerOn, setTimerOn] = useState(false);

  const buzzer = document.querySelector('#beep');

  useEffect(() => {
    if (onBreak) {
      setDisplayTime(breakTime);
    } else {
      setDisplayTime(sessionTime);
    }
  }, [sessionTime, breakTime, onBreak])

  const playBuzzer = () => {
    buzzer.currentTime = 0;
    buzzer.play();
  };

  const resetBuzzer = () => {
    buzzer.pause();
    buzzer.currentTime = 0;
  };

  const changeTime = (amount, type) => {
    if (type === 'break') {
      if ((breakTime === oneMinute && amount < 0) || (breakTime === sixtyMinutes && amount > 0)) {
        return;
      }
      setBreakTime(prev => prev + (amount));
    } else if (type === 'session') {
      if ((sessionTime === oneMinute && amount < 0) || (sessionTime === sixtyMinutes && amount > 0)) {
        return;
      }
      setSessionTime(prev => prev + (amount));
    }
  };

  const changeTimer = () => {
    if (!onBreak) {
      setOnBreak(prev => !prev);
      setDisplayTime(breakTime);
      startTimer();
    } else if (onBreak) {
      setOnBreak(prev => !prev);
      setDisplayTime(sessionTime);
      startTimer();
    }
  };

  const pauseTimer = () => {
    let count = 0;
      while (count < 1000) {
        window.clearTimeout(count);
        count++;
      }
  };

  const startTimer = () => {
    let foo = accurateInterval(function (scheduledTime) {
      setDisplayTime(prev => {
        if (prev <= 1000) {
          return 0;
        };
        return prev -= 1000;
      });
          // console.log('Actual time: ' + Date.now() + ' -- Scheduled time: ' + scheduledTime);
      }, 1000, { aligned: true, immediate: true });
      
    setTimeout(function () {
      foo.clear();
      setDisplayTime(0);
      playBuzzer();

      setTimeout(() => {
        changeTimer();
      }, 500);
      }, displayTime);
  };

  const handleReset = () => {
    setSessionTime(initialSessionTime);
    setBreakTime(initialBreakTime);
    setDisplayTime(initialDisplayTime);
    pauseTimer();
    setTimerOn(false);
    setOnBreak(false);
    resetBuzzer();
  };

  const handlePlayPause = () => {
    setTimerOn(prev => !prev);
      if (!timerOn) {
        startTimer();
      } else {
        pauseTimer();
      }
  };

  return (
    <div className="App">
      <h1 className='header'>25 + 5 Clock</h1>
      <div className='timer-control-container'>
        <LengthControl 
          id={'break'}
          setTime={changeTime}
          time={breakTime}
        />
        <LengthControl 
          id={'session'}
          setTime={changeTime}
          time={sessionTime}
        />
      </div>

      <Timer
        displayText={onBreak ? 'Break' : 'Session'}
        displayTime={displayTime}
      />
      <TimerControls
        timerOn={timerOn}
        handlePlayPause={handlePlayPause}
        handleReset={handleReset}
      />
      <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
        <Footer />
    </div>
  );
}

export default App;
