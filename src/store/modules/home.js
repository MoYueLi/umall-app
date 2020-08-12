import createAction from '../../utils/createAction';
import {reqGetBanner, reqGetGoodsInfo, reqGetIndexGoods} from "../../utils/request";
// 首页
// 初始值
const initSate = {
  bannerList: [],// 轮播图
  list: [], // 首页商品列表
  goodDetail: {}, // 商品详情
}

// 获取首页信息
export const reqGetHomeListAction = () => {
  return (dispatch, getState) => {
    if (getState().home.list.length) {
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
export const reqGetHomeBannerAction = () => {
  return (dispatch, getState) => {
    if (getState().home.bannerList.length) {
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
export const reqGetGoodDetailAction = (id) => {
  return (dispatch, getState) => {
    if (getState().home.goodDetail.id === Number(id)) {
      return;
    }
    reqGetGoodsInfo({id: id}).then(res => {
      if (res.data.code === 200) {
        dispatch(createAction('changeGoodDetail', res.data.list[0]));
      }
    })
  }
}

// 处理方法
function reducer(state = initSate, action) {
  switch (action.type) {
    // 首页商品列表
    case 'changeHomeList':
      return {
        ...state,
        list: action.payload
      }
    //首页轮播图
    case 'changeHomeBanner':
      return {
        ...state,
        bannerList: action.payload
      }
    //商品详情
    case 'changeGoodDetail':
      return {
        ...state,
        goodDetail: action.payload
      }
    default:
      return state
  }
}

// 导出首页信息
export const homeList = state => state.home.list;
// 首页banner
export const homeBanner = state => state.home.bannerList;
// 商品详情
export const goodDetail = state => state.home.goodDetail;

// 导出
export default reducer
