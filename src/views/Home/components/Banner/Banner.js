import React, {Component} from 'react';
import {Carousel} from 'antd-mobile'

class Banner extends Component {
  render() {
    const {banner} = this.props;
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
}

export default Banner;
