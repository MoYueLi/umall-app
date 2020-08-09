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
import Mine from "../Mine/Mine";
import Home from "../Home/Home";
import Cate from "../Cate/Cate";
import ShopCar from "../ShopCar/ShopCar";

class Index extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 'index',
      hidden: false,
      fullScreen: false,
    }
  }

  goView(url) {
    this.props.history.push(url)
  }

  render() {
    const {pathname} = this.props.location;
    return (
      <div className='index'>
        <div>
          <Switch>

            <Route path='/index/mine' component={Mine}/>
            <Route path='/index/cate' component={Cate}/>
            <Route path='/index/shopcar' component={ShopCar}/>
            <Route path='/index/home' component={Home}/>
            <Redirect to='/index/home'/>
          </Switch>
        </div>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#FF9900"
          barTintColor="white"
        >
          <TabBar.Item
            title="首页"
            key="Home"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: `url(${homeImg}) center center /  21px 21px no-repeat`
            }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: `url(${homeActImg}) center center /  21px 21px no-repeat`
            }}
            />
            }
            selected={pathname === '/index/home'}
            onPress={() => {
              this.goView('/index/home')
            }}
          >
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: `url(${cateImg}) center center /  21px 21px no-repeat`
              }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: `url(${cateActImg}) center center /  21px 21px no-repeat`
              }}
              />
            }
            title="分类"
            key="Cate"
            selected={pathname === '/index/cate'}
            onPress={() => {
              this.goView('/index/cate')
            }}
          >
            {/*{this.renderContent(<Cate/>)}*/}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: `url(${carImg}) center center /  21px 21px no-repeat`
              }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: `url(${carActImg}) center center /  21px 21px no-repeat`
              }}
              />
            }
            title="购物车"
            key="shopCar"
            selected={pathname === '/index/shopcar'}
            onPress={() => {
              this.goView('/index/shopcar')
            }}
          >
            {/*{this.renderContent(<ShopCar/>)}*/}
          </TabBar.Item>
          <TabBar.Item
            icon={{uri: mineImg}}
            selectedIcon={{uri: mineActImg}}
            title="我的"
            key="my"
            selected={pathname === '/index/mine'}
            onPress={() => {
              this.goView('/index/mine')
            }}
          >
            {/*{this.renderContent(<Mine/>)}*/}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default Index;
