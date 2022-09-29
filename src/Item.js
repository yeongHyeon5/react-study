import React from 'react'

function Item({item, index, removeItem}) {
  return (
    <div>
      {index+1}. {item.name} : {item.price}원
      <button onClick={() => {removeItem(index)}}>x</button>
    </div>
  )
}

export default Item