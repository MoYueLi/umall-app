import React, {Component} from 'react';
import BackHead from "../../components/BackHead/BackHead";
import {connect} from 'react-redux'
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
import {reqCartDelete} from "../../utils/request";
import {
  cartAllPrice,
  cartIsAll, cartIsEdit,
  cartList,
  changeCartGoodAction,
  changeCartListAction,
  changeCheckedAction, changeIsAllAction,
  changeIsEditorAction
} from "../../store/modules/shopCart";
import {getUser} from "../../store/modules/user";

class ShopCar extends Component {
  constructor(props) {
    super(props);
    this.alert = Modal.alert;
  }

  componentDidMount() {
    this.props.reqGetCart();
  }

  // 删除单个购物车
  del(id) {
    const {editGood,reqGetCart,user} = this.props
    this.alert('', '你确定要删除吗?', [
      {text: '取消', onPress: () => null},
      {
        text: '确认', onPress: () => reqCartDelete({id}).then(res => {
          if (res.data.code === 200) {
            editGood();
            Toast.success(res.data.msg,1)
            reqGetCart(user.uid)
          }
        })
      },
    ])
  }

  editCart(id, type, num) {
    if (type === 1 && num === 1) {
      Toast.info('不能少于1件', 1);
      return;
    }
    this.props.editCartGood(id, type);
  }

  render() {
    const {cartList,cartIsAll,cartIsEdit,cartAllPrice,checkAllGood,checkGood,editGood} = this.props;
    // 如果没有值或者购物车为空，就渲染空的页面
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
        <BackHead tit={'购物车'}/>
        <div className="cartlist">
          {
            cartList.map((item, index) => {
              return (
                <div className='listcont' key={item.id}>
                  <div className="tit">
                    <img src={storeIcon}/>
                    <span>杭州保税区仓</span>
                  </div>
                  <div className={cartIsEdit ? 'content editlist' : "content"}>
                    <div onClick={()=>checkGood(index)} className="left">
                      <img className='check'
                           src={item.checked ? radioHig : radioNor} alt=""/>
                      <img className='goods' src={item.img}/>
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
          <div onClick={() => checkAllGood()} className="checkall">
            <img src={cartIsAll ? radioHig : radioNor}/>
            <div>全选</div>
          </div>
          <div onClick={() => editGood()} className="edit">
            <img src={cartIsEdit ? editorHig : editorNor}/>
            <div>编辑</div>
          </div>
          <div className="allprice">
            合计: {filterPriceNo(cartAllPrice)}
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
    cartList: cartList(state),
    cartIsAll: cartIsAll(state),
    cartIsEdit: cartIsEdit(state),
    cartAllPrice: cartAllPrice(state),
    user: getUser(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reqGetCart: () => dispatch(changeCartListAction()),
    checkGood: (index) => dispatch(changeCheckedAction(index)),
    editGood: () => dispatch(changeIsEditorAction()),
    editCartGood: (id, type) => dispatch(changeCartGoodAction(id, type)),
    checkAllGood: () => dispatch(changeIsAllAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopCar);
