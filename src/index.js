import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom'
import App from './App';

// 重置样式表
import './asset/css/reset.css';
// rem布局
import './asset/js/rem';
// antd UI框架
import 'antd-mobile/dist/antd-mobile.css';

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);
