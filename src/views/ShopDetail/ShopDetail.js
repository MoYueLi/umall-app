import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Tag, Toast} from 'antd-mobile'
import './ShopDetail.css'
import {filterPrice} from "../../utils/filters";
import {reqCartAdd} from "../../utils/request";
import {addCartState, goodDetail, reqGetGoodDetailAction, setGoodCartStateAction} from "../../store/modules/home";
import {getUser} from "../../store/modules/user";
import BackHead from "../../components/BackHead/BackHead";
import CartFoot from "./components/CartFoot/CartFoot";


class ShopDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addCar: false,
      specsAttr: [],
    }
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.reqGoodDetail(id);
  }

  hideAdd(e) {
    e.stopPropagation()
    this.props.setAddCartState()
  }

  stopHide(e) {
    e.stopPropagation()
  }

  // 修改选中的属性
  changeAttr(selected, item) {
    let {specsAttr} = this.state
    if (selected) {
      specsAttr.push(item)
    } else {
      specsAttr.splice(specsAttr.indexOf(item), 1)
    }

    this.setState({
      ...this.state,
      specsAttr: specsAttr
    })
  }

  // 添加购物车
  addCar(id) {
    const {user} = this.props
    reqCartAdd({uid: user.uid, goodsid: id, num: 1}).then(res => {
      if (res.data.code === 200) {
        Toast.info(res.data.msg, 1)
        this.setState({
          ...this.state,
          addCar: false
        })
      } else {
        Toast.info(res.data.msg, 1)
      }
    })
  }

  render() {
    const {goodDetail,addCartState} = this.props;
    if (!goodDetail.id) {
      return (<div></div>)
    }
    return (
      <div>
        <BackHead back={true} tit={'商品详情'}/>
        <div className="goodinfo">
          <img className='good' src={goodDetail.img}/>
          <div className="info">
            <div className='goodtitle'>
              <span className='goodname'>
                {goodDetail.goodsname}
              </span>
              <span className='shopcollect'>
                收藏
              </span>
            </div>
            <div className='cont'>
              <span className='price'>
                {filterPrice(goodDetail.price)}
              </span>
              {goodDetail.ishot === 1 ? <span className='isTag'>
                热卖
              </span> : null}
              {goodDetail.isnew === 1 ? <span className='isTag'>
                新品
              </span> : null}
            </div>
            <div className="foot">
              {filterPrice(goodDetail.market_price)}
            </div>

          </div>
          <div className='desc' dangerouslySetInnerHTML={{__html: goodDetail.description}}></div>
        </div>

        <CartFoot/>
        {addCartState ? <div onClick={(e) => this.hideAdd(e)} className='addCar'>
          <div onClick={(e) => this.stopHide(e)} className="addgoodinfo">
            <div className='carTit'>
              <img src={goodDetail.img}/>
              <span>{goodDetail.goodsname}</span>
            </div>
            <div className='specsname'>
              <i>{goodDetail.specsname}</i>
              <div className='attr'>
                {
                  JSON.parse(goodDetail.specsattr).map(item => {
                    return <Tag style={{
                      height: '0.7rem',
                      fontSize: '0.3rem',
                      textAlign: 'center',
                      lineHeight: '0.7rem',
                      marginRight: '0.3rem'
                    }} key={item} onChange={(selected) => this.changeAttr(selected, item)}>{item}</Tag>
                  })
                }
              </div>
            </div>
            <div className='add' onClick={() => this.addCar(goodDetail.id)}>
              加入购物车
            </div>
          </div>
        </div> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: getUser(state),
    goodDetail: goodDetail(state),
    addCartState: addCartState(state)
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    reqGoodDetail: (id) => dispatch(reqGetGoodDetailAction(id)),
    setAddCartState: () => dispatch(setGoodCartStateAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopDetail);
