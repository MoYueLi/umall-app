import React, {Component} from 'react';
import {filterPrice} from '../../../../utils/filters'
import {withRouter} from 'react-router-dom'


function GoodsList(props) {
  const {goods} = props;
  return (
    <div className='goodlist'>
      {
        goods.map(item => {
          return (
            <div className='good' key={item.id}>
              <img src={item.img} alt=""/>
              <div className='right'>
                <div className='goodtitle'>
                  {item.goodsname}
                </div>
                <div className='price'>
                  {filterPrice(item.price)}
                </div>
                <div onClick={() => props.history.push('/shopDetail/' + item.id)} className='btn'>立即抢购
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

export default withRouter(GoodsList);
