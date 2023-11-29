import React from 'react'
import './checkbox.css'

const Checkbox = ({title, onChange, checked}) => {
  return (
    <div>
        <label className="container">{title}
        <input checked={checked}  onChange={onChange} type="checkbox" value={title}/>
        <span className="checkmark"></span>
        </label>
    </div>
  )
}

export default Checkbox