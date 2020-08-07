import React, {Component} from 'react';
import {NavBar, InputItem, Button, Toast} from 'antd-mobile';
import './Login.css'
import {reqLogin} from "../../utils/request";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        phone: '',
        password: ''
      }
    }
  }

  toRegsiter() {
    this.props.history.push('/register');
  }

  changeUser(e, key) {
    this.setState({
      user: {
        ...this.state.user,
        [key]: e
      }
    })
  }

  login() {
    // console.log(this.state.user)
    reqLogin(this.state.user).then(res => {
      if (res.data.code === 200) {
        Toast.success('登录成功', 1)
      } else {
        Toast.fail(res.data.msg)
      }
    })
  }

  render() {
    const {user} = this.state
    return (
      <div>
        <NavBar
          mode="light"
        >登录</NavBar>
        <div className='reg' onClick={() => this.toRegsiter()}>注册</div>
        <div className="main">
          <InputItem type='text' onChange={(e) => this.changeUser(e, 'phone')} placeholder='输入手机号'
                     value={user.phone}>账号</InputItem>
          <InputItem type='password' onChange={(e) => this.changeUser(e, 'password')} placeholder='输入密码'>密码</InputItem>
          <Button style={{marginTop: '1rem', background: '#FF9900'}} type="primary"
                  onClick={() => this.login()}>登录</Button>
        </div>
      </div>
    );
  }
}

export default Login;
