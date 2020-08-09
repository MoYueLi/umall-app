import React, {Component} from 'react';

function Seckill(props) {
  const {seckills} = props
  return (
    <div className='seckill'>
      {
        seckills.map(item => {
          return (
            <span key={item.name}>
                  <img src={item.img} alt=""/>
                  <i>{item.name}</i>
                </span>
          )
        })
      }
    </div>
  );
}

export default Seckill;
