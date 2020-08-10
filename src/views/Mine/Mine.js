import React, {Component} from 'react';
import BackHead from "../../components/BackHead/BackHead";
import './Mine.css'
import {Badge} from 'antd-mobile'

// 需要的图片
import headerImg from '../../asset/img/mine/header.jpg';
import setImg from '../../asset/img/mine/set.png';
import newsImg from '../../asset/img/mine/news.png';
import keepImg from '../../asset/img/mine/keep.png';
import payImg from '../../asset/img/mine/icon_boligation.png';
import receiveImg from '../../asset/img/mine/icon_consignee.png';
import deliverImg from '../../asset/img/mine/prepare.png';
import afterSaleImg from '../../asset/img/mine/icon_refund.png';
import evaluateImg from '../../asset/img/mine/icon_evaluate.png'

class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mines: [
        {
          img: payImg,
          name: '待付款'
        },
        {
          img: deliverImg,
          name: '待发货'
        },
        {
          img: receiveImg,
          name: '待收货'
        },
        {
          img: evaluateImg,
          name: '  评价'
        },
        {
          img: afterSaleImg,
          name: '  售后'
        },
      ]
    }
  }

  render() {
    return (
      <div className='container'>
        <BackHead back={false} tit={'个人中心'}/>
        <div className="minetitle">
          <img className='mineset' src={setImg} alt=""/>
          <div className='minenew'>
            <img src={newsImg} alt=""/>
            <span>
              <Badge text={11} overflowCount={9}/>
            </span>

          </div>

        </div>
        <div className="orangebg"></div>
        <div className="whitebg">
          <div className="headerimg">
            <img src={headerImg}/>
          </div>
        </div>
        <div className="collect">
          <img src={keepImg} alt=""/>
          <span>我的收藏({'5'})</span>
        </div>
        <div className="order">
          <span>我的订单</span>
          <span className="seeorder">
            查看订单
          </span>
        </div>
        <div className="orderoper">
          {
            this.state.mines.map(item=>{
              return(
                <div key={item.name}>
                  <img src={item.img} alt=""/>
                  <span>{item.name}</span>
                </div>
              )
            })
          }
        </div>
        <div className="receive">
          收货地址管理
        </div>
      </div>
    );
  }
}

export default Mine;
