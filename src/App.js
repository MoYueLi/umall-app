import React from 'react';
import {Route, Redirect} from 'react-router-dom';

// 懒加载
import asyncComponent from "./utils/asyncComponent";

const Index = asyncComponent(() => import('./views/Index/Index'));
const Login = asyncComponent(() => import('./views/Login/Login'));
const Register = asyncComponent(() => import('./views/Register/Register'))

function App() {
  return (
    <div className="App">
      <Route path='/login' component={Login}/>
      <Route path='/index' component={Index}/>
      <Route path='/register' component={Register}/>
      <Redirect to='/login'/>
    </div>
  );
}

export default App;
