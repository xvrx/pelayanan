import React from 'react'
import './input.css'

export const Inputx = ({title, type="text",max, className, onChange, value,onBlur, onClick}) => {
  return (
    <div className={`tunggakan-modal-${className}`}>
        <div className={`modal-${className}-input-container`}>
            <input
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                onClick={onClick}
                autoComplete="off"
                spellCheck="false"
                className={`modal-${className}-input`}
                type={type}
                max={max}
                id={`modal-${className}-input`}
                required
            />
            <label
                id={`modal-${className}-input-label`}
                className={`${className}-modal-text`}
                htmlFor={`modal-${className}-input`}
            >{title}
            </label>
            <label
                id={`modal-${className}-input-garis`}
                className={`${className}-modal-line`}
                htmlFor={`modal-${className}-input`}
            ></label>
        </div>
    </div>
  )
}

export const Inputa = ({title, type="text", className, onChange, value,onBlur, onClick}) => {
  return (
    <div className={`tunggakan-modal-${className}`}>
        <div className={`modal-${className}-input-container`}>
            <textarea
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                onClick={onClick}
                autoComplete="off"
                spellCheck="false"
                className={`modal-${className}-input`}
                type={type}
                id={`modal-${className}-input`}
                required
            />
            <label
                id={`modal-${className}-input-label`}
                className={`${className}-modal-text`}
                htmlFor={`modal-${className}-input`}
            >{title}
            </label>
            <label
                id={`modal-${className}-input-garis`}
                className={`${className}-modal-line`}
                htmlFor={`modal-${className}-input`}
            ></label>
        </div>
    </div>
  )
}
