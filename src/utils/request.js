import axios from 'axios'
import qs from 'qs'
import store from '../store/index'

axios.interceptors.request.use(config => {
  console.log(store.getState())
  if (config.url !== '/api/userlogin') {
    config.headers.authorization = store.getState().user.user.token;
  }
  return config
})

// axios回包打印
axios.interceptors.response.use(res => {
  console.group('res请求头' + res.config.url)
  console.log(res)
  console.groupEnd()
  if (res.data.msg === '登录已过期或访问权限受限'){
    window.open('http://localhost:3001/#/login','_self');
    return res;
  }
  return res;
})

// axios 同一添加请求头


// 获取首页分类信息
export const reqGetCate = () => axios({
  url: '/api/getcate',
  method: 'get'
})

// 获取首页轮播图信息
export const reqGetBanner = () => axios({
  url: '/api/getbanner',
  method: 'get'
})

// 获取首页限时秒杀信息
export const reqGetSeckill = () => axios({
  url: '/api/getseckill',
  method: 'get'
})

// 获取首页商品信息
export const reqGetIndexGoods = () => axios({
  url: '/api/getindexgoods',
  method: 'get'
})

// 获取分类树形结构
export const reqGetCateTree = () => axios({
  url: '/api/getcatetree',
  method: 'get'
})

// 获取分类商品
export const reqGetGoods = (params) => axios({
  url: '/api/getgoods',
  method: 'get',
  params
})

// 获取一个商品信息
export const reqGetGoodsInfo = (params) => axios({
  url: '/api/getgoodsinfo',
  method: 'get',
  params
})

// 会员注册
export const reqRegister = (data) => axios({
  url: '/api/register',
  method: 'post',
  data: qs.stringify(data)
})

// 会员登录
export const reqLogin = (data) => axios({
  url: '/api/login',
  method: 'post',
  data: qs.stringify(data)
})

// 购物车列表
export const reqGetCartList = (params) => axios({
  url: '/api/cartlist',
  method: 'get',
  params
})

// 购物车添加
export const reqCartAdd = (data) => axios({
  url: '/api/cartadd',
  method: 'post',
  data: qs.stringify(data)
})

// 购物车删除
export const reqCartDelete = (data) => axios({
  url: '/api/cartdelete',
  method: 'post',
  data: qs.stringify(data)
})

// 购物车修改
export const reqCartEdit = (data) => axios({
  url: '/api/cartedit',
  method: 'post',
  data: qs.stringify(data)
})

