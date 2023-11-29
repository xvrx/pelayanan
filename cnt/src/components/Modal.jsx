import React from 'react'
import "./Modal.css"
import { ButtonOne, ButtonTwo } from './Button'


export const ButtonStatus = ({ButtonOneClick, ButtonTwoClick, buttonOneTitle, buttonOneLogo, buttonTwoTitle, buttonTwoLogo}) => {
  return (
    <div className='modal-button-wrapper'>
        <ButtonTwo title={buttonOneTitle} logo={buttonOneLogo} onClick={ButtonTwoClick}/>
        <ButtonOne title={buttonTwoTitle} logo={buttonTwoLogo} onClick={ButtonOneClick}/>
    </div>
  )
}


const Modal = ({title, content, buttonStatus, ButtonOneClick, ButtonTwoClick, buttonOneTitle, buttonOneLogo, buttonTwoTitle, buttonTwoLogo, closeButtonClick, buttonCloseLogo}) => {
  return (
    <div className='modal-outer-layer'>
            <div className="modal-outer-box">
                <div className="modal-inner-box">
                    <div className="modal-title">
                        <h3 id="modal-title">{title}</h3> 
                    </div>
                    <div className="modal-content">
                        <p style={{textAlign: 'center'}}>{content}</p>
                    </div>
                </div>
                { buttonStatus ? <ButtonStatus buttonOneTitle={buttonOneTitle}  buttonOneLogo={buttonOneLogo} buttonTwoTitle={buttonTwoTitle} buttonTwoLogo={buttonTwoLogo} ButtonOneClick={ButtonOneClick} ButtonTwoClick={ButtonTwoClick} /> : <div className='modal-button-wrapper'><ButtonOne title={'Ok'} logo={buttonCloseLogo} onClick={closeButtonClick}/></div>}
            </div>
    </div>
  )
}

export default Modal