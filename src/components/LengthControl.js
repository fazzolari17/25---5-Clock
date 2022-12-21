const LengthControl = ({ id, setTime, time }) => {
  const label = id.charAt(0).toUpperCase() + id.slice(1);
  const timeInMinutes = time / 60000;
  const minute = 60000;




  return (
    <div className='length-control'>
      <div className='label' id={`${id}-label`}>{label} Length</div>
      <div className="controls-container">
        <button className="btn-level" id={`${id}-decrement`} value="-" onClick={() => setTime(-minute, id)}><i className="fa fa-arrow-down fa-2x"></i></button>
        <div className="btn-level" id={`${id}-length`}>{timeInMinutes}</div>
        <button className="btn-level" id={`${id}-increment`} value="+" onClick={() => setTime(minute, id)}><i className="fa fa-arrow-up fa-2x"></i></button>
      </div>
    </div>
  )
};

export default LengthControl;