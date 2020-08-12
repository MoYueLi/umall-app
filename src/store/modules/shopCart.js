import createAction from '../../utils/createAction';
import {reqCartEdit, reqGetCartList} from "../../utils/request";
import {getUser} from "./user";

// 初始数据
const initState = {
  cartList: [],
  isAll: false,// 是否全选
  isEdit: false // 是否编辑
}

// 获取购物车列表
export const changeCartListAction = () => {
  return (dispatch, getState) => {
    reqGetCartList({uid: getUser(getState()).uid}).then(res => {
      if (res.data.code === 200) {
        dispatch(createAction('changeCartList', res.data.list))
      }
    })
  }
}

// 修改编辑购物车
export const changeIsEditorAction = () => ({
  type: "changeIsEditor"
})

//修改isAll 全选购物车
export const changeIsAllAction = () => ({
  type: "changeIsAll"
})

// 点击选中单个购物车，
export const changeCheckedAction = (index) => {
  return {
    type: "changeChecked",
    index
  }
}

// 添加减少购物车商品数量
export const changeCartGoodAction = (id, type) => {
  return (dispatch, getState) => {
    reqCartEdit({id: id, type: type}).then(res => {
      if (res.data.code === 200) {
        dispatch(changeCartListAction());
      }
    })
  }
}

// 改变数据
function reducer(state = initState, action) {
  switch (action.type) {
    // 购物车列表
    case 'changeCartList':
      // 之前的购物车列表
      let cartOldList = [...state.cartList];
      // 如果购物车没有值就变成空数组
      let list = action.payload ? action.payload : [];
      // list = list ? list : [];
      list.forEach((item, index) => {
        // 修改购物车的选中。
        item.checked = cartOldList.length > index ? cartOldList[index].checked : false
      })
      return {
        ...state,
        cartList: list
      }
    // 是否编辑购物车
    case "changeIsEditor":
      return {
        ...state,
        isEdit: !state.isEdit
      }
    // 是否全选
    case "changeIsAll":
      return {
        ...state,
        isAll: !state.isAll,
        list: state.cartList.map(item => {
          item.checked = !state.isAll;
          return item
        })
      }
    // 选中单个购物车
    case "changeChecked":
      let cartList = [...state.cartList];
      cartList[action.index].checked = !cartList[action.index].checked;
      return {
        ...state,
        cartList,
        isAll: cartList.every(item => item.checked)
      }
    default:
      return state;
  }
}

// 购物车列表
export const cartList = state => state.shopCart.cartList;
// 购物车列表
export const cartIsAll = state => state.shopCart.isAll;
// 购物车列表
export const cartIsEdit = state => state.shopCart.isEdit;
// 购物车列表
export const cartAllPrice = state => {
  const {cartList} = state.shopCart;
  return cartList.reduce((val, item) => item.checked ? val + item.price * item.num : val, 0)
}


// 导出的修改方法
export default reducer
