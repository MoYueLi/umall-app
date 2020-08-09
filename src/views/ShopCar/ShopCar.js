import React, {Component} from 'react';
import BackHead from "../../components/BackHead/BackHead";
import {connect} from 'react-redux'
import {cartList, reqGetCartListAction} from "../../store";
import './ShopCar.css'

// 需要的图片
import radioNor from '../../asset/img/radio_nor.png'
import radioHig from '../../asset/img/radio_hig.png'
import storeIcon from '../../asset/img/store.png'
import {filterPrice, filterPriceNo} from "../../utils/filters";

class ShopCar extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.reqGetCart();
  }

  render() {
    console.log(this.props)
    const {cartList} = this.props;
    if (!cartList.length) {
      return (
        <div>
          <BackHead back={false} tit={'购物车'}/>
          暂时没有东西
        </div>
      )
    }
    return (
      <div className='container'>
        <BackHead back={false} tit={'购物车'}/>
        <div className="cartlist">
          {
            cartList.map(item => {
              return(
                <div className='listcont' key={item.id}>
                  <div className="tit">
                    <img src={storeIcon} alt=""/>
                    <span>杭州保税区仓</span>
                  </div>
                  <div className="content">
                    <div className="left">
                      <img className='check' src={radioNor} alt=""/>
                      <img className='goods' src={item.img} alt=""/>
                    </div>
                    <div className="cont">
                      <span className="goodname">
                        {item.goodsname}
                      </span>
                      <div className='edit'>
                        <span className='btn'>-</span>
                        <span className="num">
                          {item.num}
                        </span>
                        <span className='btn'>+</span>
                      </div>
                      <span className="allprice">
                        总价:&nbsp;{filterPriceNo(item.price*item.num)}
                      </span>
                    </div>
                    <div className="right">
                      {filterPrice(item.price)}
                    </div>

                  </div>
                </div>
              )
            })
          }
        </div>

        <div className='cartfoot'>
          <div className="checkall">
            <img src={radioNor} alt=""/>
            <div>全选</div>
          </div>
          <div className="edit">
            <img src={radioHig} alt=""/>
            <div>编辑</div>
          </div>
          <div className="allprice">
            合计: {0.00}
            <div>
              (不含运费)
            </div>
          </div>
          <div className="btn">
            去结算
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartList: cartList(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reqGetCart: (id) => dispatch(reqGetCartListAction(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopCar);
