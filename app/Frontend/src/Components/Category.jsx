import './Rec.css'

function Category(handleChange,value, name, color) {
  return (
    <div className=" flex items-center">Category
      <label className="sidebar-label-container">
        <input  onChange={handleChange} type="radio" value="" name="test"/>
        <span className="checkmark"></span>All
      </label>
       <label className="sidebar-label-container">
        <input  onChange={handleChange} type="radio" value="T-shirt" name="test"/>
        <span className="checkmark"></span>T-shirt
      </label>
       <label className="sidebar-label-container">
        <input onChange={handleChange}  type="radio" value="Top" name="test"/>
        <span className="checkmark"></span>Top
      </label>
       <label className="sidebar-label-container">
        <input onChange={handleChange}  type="radio" value="Socks" name="test"/>
        <span className="checkmark"></span>Socks
      </label>
    </div>
  )
}

export default Category