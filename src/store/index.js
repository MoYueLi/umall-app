import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {
  reqCartDelete,
  reqCartEdit,
  reqGetBanner,
  reqGetCartList,
  reqGetCateTree,
  reqGetGoods,
  reqGetGoodsInfo,
  reqGetIndexGoods
} from "../utils/request";

const initState = {
  user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {},
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

// 存储user
export const reqSetUserAction = (user) => {
  return {
    type: 'setUser',
    payload: user
  }
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
export const reqGetCartListAction = (uid) => {
  return (dispatch, getState) => {
    // uid替换一下
    reqGetCartList({uid: uid}).then(res => {
      if (res.data.code === 200) {
        dispatch(createAction('changeCartList', res.data.list))
      }
    })
  }
}
// 点击选中单个购物车，
export const changeCheckedAction = (index) => {
  return {
    type: "changeChecked",
    index
  }
}

// 全选购物车
export const changeCheckedAllAction = (checked) => {
  return {
    type: 'checkAllCart',
    payload: checked
  }
}

// 修改购物车选中列表
export const editCartList = () => {
  return {type: 'changeEdit'}
}

// 添加减少购物车商品数量
export const reqEditCartGood = (id, type) => {
  return (dispatch, getState) => {
    reqCartEdit({id: id, type: type}).then(res => {
      if (res.data.code === 200) {
        dispatch(reqGetCartListAction(getState().user.uid));// 更换成uid
      }
    })
  }
}

// 删除购物车单个
export const reqCartDeleteAction = (id) => {
  reqCartDelete({id}).then(res => {
    if (res.data.code === 200) {

    }
  })
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    // 存储user
    case 'setUser':
      sessionStorage.setItem('user', JSON.stringify(action.payload))
      return {
        ...state,
        user: action.payload
      }
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
    //商品详情
    case 'changeGoodDetail':
      return {
        ...state,
        goodDetail: action.payload
      }
    // 商品分类列表
    case 'changeCateList':
      return {
        ...state,
        cateList: action.payload
      }
    // 商品分类详情
    case 'changeCateInfo':
      return {
        ...state,
        cateInfo: action.payload
      }
    // 当前商品分类id
    case 'changeCateId':
      return {
        ...state,
        cateId: action.payload
      }
    // 购物车列表
    case 'changeCartList':
      let cartOldList = [...state.cartList]

      let list = action.payload;
      if (list)
        list.forEach((item, index) => {
          if (cartOldList.length > index) {
            item.checked = cartOldList[index].checked;
            item.edit = cartOldList[index].edit;
          } else {
            item.checked = false;
            item.edit = false;
          }
        })
      return {
        ...state,
        cartList: list ? list : []
      }
    // 选中单个购物车
    case "changeChecked":
      let cartList = [...state.cartList];
      cartList[action.index].checked = !cartList[action.index].checked;
      return {
        ...state,
        cartList
      }
    // 选中全部购物车
    case 'checkAllCart':
      let cartAllList = [...state.cartList];
      cartAllList.forEach(item => {
        item.checked = action.payload
      })
      return {
        ...state,
        cartList: cartAllList
      }
    // 修改购物车编辑
    case 'changeEdit':
      let cartEditList = [...state.cartList];
      cartEditList.forEach(item => {
        item.edit = !item.edit;
      })
      return {
        ...state,
        cartList: cartEditList
      }
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

// 用户信息
export const getUser = state => state.user;
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
