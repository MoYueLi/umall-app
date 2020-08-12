import React, {Component} from 'react';
import {TabBar} from 'antd-mobile';
import {Route, Switch, Redirect,} from 'react-router-dom';
// 需要用的图片
import homeActImg from '../../asset/img/tab_home_hig.png';
import homeImg from '../../asset/img/tab_home_nor.png';
import mineActImg from '../../asset/img/tab_me_hig.png';
import mineImg from '../../asset/img/tab_me_nor.png';
import cateActImg from '../../asset/img/tab_menu_hig.png';
import cateImg from '../../asset/img/tab_menu_nor.png';
import carActImg from '../../asset/img/tab_shopping_hig.png';
import carImg from '../../asset/img/tab_shopping_nor.png';

import './Index.css'
import RouterInter from "../../components/RouterInter/RouterInter";
import asyncComponent from '../../utils/asyncComponent'
const Mine = asyncComponent(() => import('../Mine/Mine'));
const Home = asyncComponent(() => import('../Home/Home'));
const Cate = asyncComponent(() => import('../Cate/Cate'));
const ShopCar = asyncComponent(() => import('../ShopCar/ShopCar'));

class Index extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 'index',
      hidden: false,
      fullScreen: false,
      // 导航栏数组
      tabs: [
        {
          title: '首页',
          key: 'Home',
          img: homeImg,
          actImg: homeActImg,
          pathname: '/index/home'
        },
        {
          title: '分类',
          key: 'Cate',
          img: cateImg,
          actImg: cateActImg,
          pathname: '/index/cate'
        },
        {
          title: '购物车',
          key: 'Cart',
          img: carImg,
          actImg: carActImg,
          pathname: '/index/shopcar'
        },
        {
          title: '我的',
          key: 'Mine',
          img: mineImg,
          actImg: mineActImg,
          pathname: '/index/mine'
        },
      ]
    }
  }

  goView(url) {
    this.props.history.push(url)
  }

  render() {
    const {pathname} = this.props.location;
    const {tabs} = this.state;
    return (
      <div className='index'>
        <div>
          <Switch>
            <RouterInter path='/index/mine' component={Mine}/>
            <RouterInter path='/index/cate' component={Cate}/>
            <RouterInter path='/index/shopcar' component={ShopCar}/>
            <Route path='/index/home' component={Home}/>
            <Redirect to='/index/home'/>
          </Switch>
        </div>
        <TabBar unselectedTintColor="#949494" tintColor="#FF9900" barTintColor="white">
          {
            tabs.map(item => {
              return (
                <TabBar.Item title={item.title} key={item.key} icon={<div style={{
                  width: '22px', height: '22px',
                  background: `url(${item.img}) center center /  21px 21px no-repeat`}}/>} selectedIcon={<div style={{width: '22px', height: '22px',
                  background: `url(${item.actImg}) center center /  21px 21px no-repeat`}}/>} selected={pathname === item.pathname} onPress={() => {this.goView(item.pathname)}}>
                </TabBar.Item>
              )
            })
          }
        </TabBar>
      </div>
    );
  }
}

export default Index;
