import React, {Component} from 'react';
import {NavBar, Icon, InputItem, Button,Toast} from 'antd-mobile'
import {reqRegister} from "../../utils/request";
import BackHead from "../../components/BackHead/BackHead";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        phone: '',
        password: '',
        nickname: ''
      }
    }
  }

  changeUser(e, key) {
    this.setState({
      user: {
        ...this.state.user,
        [key]: e
      }
    })
  }

  register() {
    reqRegister(this.state.user).then(res=>{
      if (res.data.code === 200) {
        Toast.success(res.data.msg)
        this.props.history.push('/login')
      }else {
        Toast.fail(res.data.msg)
      }
    })
  }

  render() {
    const {user} = this.state
    return (
      <div>
        <BackHead back={true} tit={'注册'}/>
        <div className="main">
          <InputItem type='text' onChange={(e) => this.changeUser(e, 'phone')} placeholder='输入手机号'
                     value={user.phone}>手机号</InputItem>
          <InputItem type='text' onChange={(e) => this.changeUser(e, 'nickname')} placeholder='输入昵称'>昵称</InputItem>
          <InputItem type='password' onChange={(e) => this.changeUser(e, 'password')} placeholder='输入密码'>密码</InputItem>
          <Button style={{marginTop: '1rem', background: '#FF9900'}} type="primary"
                  onClick={() => this.register()}>注册</Button>
        </div>
      </div>
    );
  }
}

export default Register;
