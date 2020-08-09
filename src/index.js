import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import App from './App';
import store from "./store";

// 重置样式表
import './asset/css/reset.css';
// rem布局
import './asset/js/rem';
// antd UI框架
import 'antd-mobile/dist/antd-mobile.css';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App/>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
