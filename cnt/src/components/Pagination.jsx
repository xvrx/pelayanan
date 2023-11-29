import React from 'react'
import { Inputx } from './Inputx'

const Pagination = ({ setOnBlur, totalPages, pageOnClick, currentPage, activeStatus, pageInputVal, pageInputOC}) => {
    const tempPage = []

    for (let i = 1; i <= totalPages; i++) {
        tempPage.push(i)
    }    

    function aboveZero(x) {
        if (x < 0) {
            return 0
        } else {
            return x
        }
    }

    const slicedPage = tempPage.slice(aboveZero(currentPage-4),currentPage +4)

    return (
        <div className="buttons-container">
            <div className="inputPage" style={{display:'flex', marginRight:'33px'}}><Inputx value={pageInputVal} onChange={(e) => pageInputOC(e)} onBlur={(e) => setOnBlur(e.target.value)} title='page' className={'pagination-input'}/> <p id='totalPages'>/ {totalPages}</p> </div>
            {slicedPage.map((page,idx) => (
                <button key={idx + 1} className={activeStatus == (page) ? "page-navigation-btn active" :"page-navigation-btn"} onClick={() => pageOnClick(page)}>{page}</button>
            ))}
        </div>
    )
}

export default Pagination