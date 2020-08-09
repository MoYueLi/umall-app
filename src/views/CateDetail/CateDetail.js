import React, {Component} from 'react';
import {NavBar, Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import {cateInfo, reqGetCateInfo} from "../../store";
import querystring from 'querystring';
import {filterPrice} from "../../utils/filters";
import './CateDetail.css'

class CateDetail extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
    }
  }

  componentDidMount() {
    let params = querystring.parse(this.props.location.search.slice(1))
    this.props.reqGetCateInfo(params.id);
    this.setState({
      ...this.state,
      title: params.tit
    })
  }

  toShopDetail(id) {
    this.props.history.push('/shopDetail/' + id);
  }

  render() {
    const {title} = this.state;
    console.log(this.props)
    const {cateInfo} = this.props
    return (
      <div>
        <div className='head'>
          <NavBar
            onLeftClick={() => this.props.history.goBack()}
            icon={<Icon type="left"/>}
            mode="light"
          >{title}</NavBar>
        </div>
        <div className="goodsList">
          {
            cateInfo.length ? (
              cateInfo.map(item => {
                return (
                  <div className='gooditem' key={item.id}>
                    <div className='left'>
                      <img src={item.img} alt=""/>
                    </div>

                    <div className="right">
                      <div className='tit'>
                      {item.goodsname}
                    </div>
                      <div className="price">
                      {filterPrice(item.price)}
                    </div>
                      <div onClick={() => this.toShopDetail(item.id)} className="btn">
                        立即抢购
                      </div>
                    </div>
                  </div>
                )
              })
            ) : null

          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cateInfo: cateInfo(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reqGetCateInfo: (id) => dispatch(reqGetCateInfo(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CateDetail);
