import React, {Component} from 'react';
import {Carousel} from 'antd-mobile'

function Banner(props) {
  // console.log(props.banner)
  const {banner} = props
  return (
    <div className='banner'>
      <Carousel
        autoplay={true}
        infinite
      >
        {
          banner.map(item => {
            return (
              <img key={item.id} src={item.img} alt=""/>
            )
          })
        }
      </Carousel>
    </div>
  );
}

export default Banner;
