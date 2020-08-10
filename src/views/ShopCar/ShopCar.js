import React, {Component} from 'react';
import BackHead from "../../components/BackHead/BackHead";
import {connect} from 'react-redux'
import {
  cartList,
  changeCheckedAction,
  changeCheckedAllAction,
  editCartList, getUser,
  reqEditCartGood,
  reqGetCartListAction
} from "../../store";
import './ShopCar.css'
import {Modal, Toast} from 'antd-mobile'

// 需要的图片
import radioNor from '../../asset/img/radio_nor.png'
import radioHig from '../../asset/img/radio_hig.png'
import storeIcon from '../../asset/img/store.png'
import editorHig from '../../asset/img/editor_hig.png';
import editorNor from '../../asset/img/editor_nor.png';
import shopCarNor from '../../asset/img/tab_shopping_nor.png'

// 过滤器
import {filterPrice, filterPriceNo} from "../../utils/filters";
import {reqCartDelete, reqCartEdit} from "../../utils/request";

class ShopCar extends Component {
  constructor(props) {
    super(props);
    this.alert = Modal.alert;
    this.state = {}
  }

  componentDidMount() {
    const {user} = this.props;
    this.props.reqGetCart(user.uid);
  }

  computedPrice() {
    const {cartList} = this.props;
    let price = 0
    cartList.forEach(item => {
      if (item.checked) {
        price += item.num * item.price;
      }
    })
    return filterPriceNo(price)
  }

  checkGoodList(index, isAll,checked) {
    if (isAll)
      this.props.checkAllGood(checked)
    else
      this.props.checkGood(index)
  }

  editList() {
    this.props.editGood()
  }

  del(id, uid) {
    this.alert('', '你确定要删除吗?', [
      {text: '取消', onPress: () => null},
      {
        text: '确认', onPress: () => reqCartDelete({id}).then(res => {
          if (res.data.code === 200) {
            Toast.success(res.data.msg)
            this.props.reqGetCart(uid)
          }
        })
      },
    ])
  }

  editCart(id, type, num) {
    if (type === 1 && num === 1) {
      Toast.info('不能少于1件',1);
      return;
    }
    this.props.editCartGood(id, type);
  }

  render() {
    console.log(this.props)
    const {cartList} = this.props;
    let checkAll = cartList.every(item => item.checked)
    if (!cartList || !cartList.length) {
      return (
        <div className='container containerNo'>
          <BackHead back={false} tit={'购物车'}/>
          <div className="contNo">
            <img src={shopCarNor} alt=""/>
            <div className="tip">
              <div>购物车还是空的</div>
              <div>快去逛逛吧！</div>
            </div>
          </div>

        </div>
      )
    }
    return (
      <div className='container'>
        <BackHead back={false} tit={'购物车'}/>
        <div className="cartlist">
          {
            cartList.map((item, index) => {
              return (
                <div className='listcont' key={item.id}>
                  <div className="tit">
                    <img src={storeIcon} alt=""/>
                    <span>杭州保税区仓</span>
                  </div>
                  <div className={item.edit ? ' content editlist' : "content"}>
                    <div className="left">
                      <img onClick={() => this.checkGoodList(index)} className='check'
                           src={item.checked ? radioHig : radioNor} alt=""/>
                      <img className='goods' src={item.img} alt=""/>
                    </div>
                    <div className="cont">
                      <span className="goodname">
                        {item.goodsname}
                      </span>
                      <div className='edit'>
                        <span onClick={() => this.editCart(item.id, 1, item.num)} className='btn'>-</span>
                        <span className="num">
                          {item.num}
                        </span>
                        <span onClick={() => this.editCart(item.id, 2)} className='btn'>+</span>
                      </div>
                      <span className="allprice">
                        总价:&nbsp;{filterPriceNo(item.price * item.num)}
                      </span>
                    </div>
                    <div className="right">
                      {filterPrice(item.price)}
                    </div>
                    <div onClick={() => this.del(item.id, item.uid)} className="del">
                      删
                      <br/>
                      除
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>

        <div className='cartfoot'>
          <div onClick={() => this.checkGoodList(0, true,!checkAll)} className="checkall">
            <img src={checkAll ? radioHig : radioNor} alt=""/>
            <div>全选</div>
          </div>
          <div className="edit">
            <img onClick={() => this.editList()} src={cartList.every(item => item.edit) ? editorHig : editorNor}
                 alt=""/>
            <div>编辑</div>
          </div>
          <div className="allprice">
            合计: {this.computedPrice()}
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
    user: getUser(state),
    cartList: cartList(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reqGetCart: (uid) => dispatch(reqGetCartListAction(uid)),
    checkGood: (index, isAll) => dispatch(changeCheckedAction(index, isAll)),
    editGood: () => dispatch(editCartList()),
    editCartGood: (id, type) => dispatch(reqEditCartGood(id, type)),
    checkAllGood: (checked) => dispatch(changeCheckedAllAction(checked))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopCar);
