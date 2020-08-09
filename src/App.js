import React from 'react';
import {Route, Redirect} from 'react-router-dom';

// 懒加载
import asyncComponent from "./utils/asyncComponent";

const Index = asyncComponent(() => import('./views/Index/Index'));
const Login = asyncComponent(() => import('./views/Login/Login'));
const Register = asyncComponent(() => import('./views/Register/Register'))
const ShopDetail = asyncComponent(()=>import('./views/ShopDetail/ShopDetail'))
const CateDetail = asyncComponent(()=>import('./views/CateDetail/CateDetail'))

function App() {
  return (
    <div className="App">
      <Route path='/login' component={Login}/>
      <Route path='/index' component={Index}/>
      <Route path='/register' component={Register}/>
      <Route path='/shopDetail/:id' component={ShopDetail}/>
      <Route path='/cateDetail' component={CateDetail}/>
      <Redirect to='/index'/>
    </div>
  );
}

export default App;
