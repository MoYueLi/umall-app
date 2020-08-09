import React, {Component} from 'react';
import {NavBar,Icon} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

function BackHead(props) {
  return (
    <div className='head'>
      <NavBar
        onLeftClick={props.back?() => props.history.goBack():null}
        icon={props.back ? <Icon type="left"/> : null}
        mode="light"
      >{props.tit}</NavBar>
    </div>
  );
}

export default withRouter(BackHead);
