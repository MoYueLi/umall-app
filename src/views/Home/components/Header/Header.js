import React from 'react';
import {SearchBar} from 'antd-mobile'

import logoImg from '../../../../asset/img/logo.jpg'

function Header() {
    return (
      <div className='header-con'>
        <img src={logoImg} alt=""/>
        <SearchBar placeholder="寻找商品" maxLength={8} />
      </div>
    )
}

export default Header;
