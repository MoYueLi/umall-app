import React, {Component} from 'react';
import {NavBar, Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import querystring from 'querystring';
import {filterPrice} from "../../utils/filters";
import './CateDetail.css'
import {cateInfo, reqGetCateInfoAction} from "../../store/modules/cate";
import BackHead from "../../components/BackHead/BackHead";

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
    const {cateInfo} = this.props
    return (
      <div>
        <div className='head'>
          <BackHead back={true} tit={title}/>
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
    reqGetCateInfo: (id) => dispatch(reqGetCateInfoAction(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CateDetail);
