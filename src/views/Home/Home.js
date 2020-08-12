import React, {Component} from 'react';
import Header from "./components/Header/Header";
import './Home.css'
import Banner from "./components/Banner/Banner";
import {connect} from 'react-redux'
import seckillimg from '../../asset/img/seckill.jpg'
import Seckill from "./components/SecKill/Seckill";
import GoodsList from "./components/GoodsList/GoodsList";
import {
  homeBanner,
  homeList,
  reqGetHomeBannerAction,
  reqGetHomeListAction
} from "../../store/modules/home";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seckills: [
        {
          img: seckillimg,
          name: '限时抢购'
        },
        {
          img: seckillimg,
          name: '积分商城'
        },
        {
          img: seckillimg,
          name: '联系我们'
        },
        {
          img: seckillimg,
          name: '商品分类'
        },
      ]
    }
  }

  componentDidMount() {
    console.log(this.props)
    this.props.reqHomeList();
    this.props.reqHomeBanner();
  }

  render() {
    console.log(this.props)
    const {seckills} = this.state
    const {homeList,homeBanner} = this.props
    return (
      <div className='container'>
        <Header/>
        <Banner banner={homeBanner}/>
        <Seckill seckills={seckills}/>
        <GoodsList goods={homeList}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    homeList: homeList(state),
    homeBanner: homeBanner(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reqHomeList: () => dispatch(reqGetHomeListAction()),
    reqHomeBanner: () => dispatch(reqGetHomeBannerAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
