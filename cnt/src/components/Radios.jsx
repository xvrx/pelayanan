import React from 'react'
import './Radios.css'

const Radios = ({title, name, onClick, checked, value, onChange}) => {
  return (
    <div>
        <label className="radio-container">{title}
        <input onChange={onChange} checked={checked} onClick={onClick} type="radio" name={name} value={value}/>
        <span className="radio-checkmark"></span>
        </label>
    </div>
  )
}

export default Radios