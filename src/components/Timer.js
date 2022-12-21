import TimeFormat from 'hh-mm-ss';

const Timer = ({ displayText, displayTime }) => {
  const sixtyMinutes = 3600000
  

  return (
      <div className="timer-container">
      <div id='timer-label'>{displayText}</div>
      <div id='time-left'>
        {(displayTime === sixtyMinutes) ? '60:00' : TimeFormat.fromMs(displayTime, 'mm:ss')}
        </div>
      </div>
  )
};

export default Timer;