const TimerControls = ({ handleReset, handlePlayPause, timerOn }) => {
  return (
    <div className="timer-control">
      <button id="start_stop" className="btn-level" onClick={handlePlayPause}>
        {!timerOn
          ? <i className="fa fa-play fa-2x"></i>
          : <i className="fa fa-pause fa-2x"></i>}
      </button>
      <button id="reset" className="btn-level" onClick={handleReset}>
        <i className="fa fa-refresh fa-2x"></i>
      </button>
    </div>
  )
};

export default TimerControls;