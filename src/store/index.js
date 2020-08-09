import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {
  reqGetBanner,
  reqGetCartList,
  reqGetCateTree,
  reqGetGoods,
  reqGetGoodsInfo,
  reqGetIndexGoods
} from "../utils/request";

const initState = {
  homeInfo: [],
  homeBanner: [],
  goodDetail: {},
  cateList: [],
  cateInfo: [],
  cateId: 0,
  cartList: [],
}

// 创建action
function createAction(type, payload) {
  return {type, payload}
}

// 首页获取信息
export const reqGetHomeList = () => {
  return (dispatch, getState) => {
    if (getState().homeInfo.length) {
      return
    }
    reqGetIndexGoods().then(res => {
      if (res.data.code === 200) {
        dispatch(createAction('changeHomeList', res.data.list[0].content))
      }
    })
  }
}

// 首页获取banner图
export const reqGetHomeBanner = () => {
  return (dispatch, getState) => {
    if (getState().homeBanner.length) {
      return
    }
    reqGetBanner().then(res => {
      if (res.data.code === 200) {
        dispatch(createAction('changeHomeBanner', res.data.list))
      }
    })
  }
}

// 获取商品详情
export const reqGetGoodDetail = (id) => {
  return (dispatch, getState) => {
    if (getState().goodDetail.id === Number(id)) {
      return
    }
    reqGetGoodsInfo({id: id}).then(res => {
      if (res.data.code === 200) {
        dispatch(createAction('changeGoodDetail', res.data.list[0]))
      }
    })
  }
}

// 获取分类列表
export const reqGetCateList = () => {
  return (dispatch, getState) => {
    if (getState().cateList.length) {
      return
    }
    reqGetCateTree().then(res => {
      if (res.data.code === 200) {
        dispatch(createAction('changeCateList', res.data.list))
      }
    })
  }
}

// 获取分类信息
export const reqGetCateInfo = (id) => {
  return (dispatch, getState) => {
    if (id === getState().cateId) {
      return
    }
    reqGetGoods({fid: id}).then(res => {
      if (res.data.code === 200) {
        dispatch(createAction('changeCateInfo', res.data.list))
        dispatch(createAction('changeCateId', id))
      }
    })
  }
}

// 获取购物车列表
export const reqGetCartListAction = (id) => {
  return (dispatch, getState) => {
    if (getState().cartList.length) {
      return
    }
    reqGetCartList({uid: 123123}).then(res => {
      if (res.data.code === 200) {
        dispatch(createAction('changeCartList',res.data.list))
      }
    })
  }
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    // 首页商品列表
    case 'changeHomeList':
      return {
        ...state,
        homeInfo: action.payload
      }
    //首页轮播图
    case 'changeHomeBanner':
      return {
        ...state,
        homeBanner: action.payload
      }
    case 'changeGoodDetail':
      return {
        ...state,
        goodDetail: action.payload
      }
    case 'changeCateList':
      return {
        ...state,
        cateList: action.payload
      }
    case 'changeCateInfo':
      return {
        ...state,
        cateInfo: action.payload
      }
    case 'changeCateId':
      return {
        ...state,
        cateId: action.payload
      }
    case 'changeCartList':
      return {
        ...state,
        cartList: action.payload
      }
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

// 导出首页信息
export const homeList = state => state.homeInfo;
// 首页banner
export const homeBanner = state => state.homeBanner;
// 商品详情
export const goodDetail = state => state.goodDetail;
// 分类树形结构
export const cateList = state => state.cateList;
// 分类具体商品
export const cateInfo = state => state.cateInfo;
// 购物车列表
export const cartList = state => state.cartList;

export default store
