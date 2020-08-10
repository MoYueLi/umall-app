import React, {Component} from 'react';
import {withRouter,Route,Redirect} from 'react-router-dom'

// 路由拦截
function RouterInter(props) {
  const user = sessionStorage.getItem('user');
  return (
    <div>
      {user ? <Route {...props}/> : <Redirect to='/login'/>}
    </div>
  );
}

export default withRouter(RouterInter);
