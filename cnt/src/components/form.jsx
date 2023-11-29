import React from 'react'

const form = () => {
  return (
    <div>
         <input
        onChange={(e) => {
          setinputHandle(e.target.value);
        }}
        value={inputHandle}
        type="text"
      />
      <input
        onChange={(e) => {
          setinputHandle2(e.target.value);
        }}
        value={inputHandle2}
        type="text"
      />
      <button onClick={addBruh}>ok</button>
      <div>
        {bruh.map((data, index) => {
          return (
            <p key={index}>
              {data.nama}, kelas : {data.kelas}
            </p>
          );
        })}
      </div>
    </div>
  )
}

export default form