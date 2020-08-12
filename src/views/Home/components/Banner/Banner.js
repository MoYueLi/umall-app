import React from 'react';
import {Carousel} from 'antd-mobile'

function Banner(props) {
  const {banner} = props;
  return (
    <div className='banner'>
      <Carousel autoplay={true} infinite>
        {
          banner.map(item => {
            return (
              <img key={item.id} src={item.img}/>
            )
          })
        }
      </Carousel>
    </div>
  )

}

export default Banner;
