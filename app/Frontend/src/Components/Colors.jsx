import './Rec.css';
function Colors(handleChange) {
  return (
    <div className='items-center'>
       Color 
       <label className="sidebar-label-container">
        <input onChange={handleChange} type="radio" name="test2"/>
        <span className="checkmark"></span>All
      </label>
       <label className="sidebar-label-container">
        <input   onChange={handleChange} type="radio" value="black" color="black" name="test1"/>
        <span className="checkmark"></span>Black
      </label>
       <label className="sidebar-label-container">
        <input  onChange={handleChange} type="radio"  value="green" color="green" name="test1"/>
        <span className="checkmark"></span>Green
      </label>
       <label className="sidebar-label-container">
        <input  onChange={handleChange} type="radio"  value="pink" color="pink" name="test1"/>
        <span className="checkmark"></span>Pink
      </label>
      <label className="sidebar-label-container">
        <input  onChange={handleChange} type="radio"  value="white" color="white" name="test1"/>
        <span className="checkmark"></span>White
      </label>
      <label className="sidebar-label-container">
        <input  onChange={handleChange} type="radio"  value="beige" color="beige" name="test1"/>
        <span className="checkmark"></span>Beige
      </label>
    </div>
  )
}

export default Colors