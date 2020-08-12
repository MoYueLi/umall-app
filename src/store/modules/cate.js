import createAction from '../../utils/createAction';
import {reqGetCateTree, reqGetGoods} from "../../utils/request";
// 分类
// 初始值
const initSate = {
  cateList: [],// 分类列表
  cateInfo: [], // 分类详情
  cateId: 0, // 当前分类的id
}

// 获取分类列表
export const reqGetCateListAcion = () => {
  return (dispatch, getState) => {
    if (getState().cate.cateList.length) {
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
export const reqGetCateInfoAction = (id) => {
  return (dispatch, getState) => {
    if (id === getState().cate.cateId) {
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

// 处理方法
function reducer(state=initSate,action) {
  switch (action.type) {
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
    default:
      return state
  }
}

// 分类树形结构
export const cateList = state => state.cate.cateList;
// 分类具体商品
export const cateInfo = state => state.cate.cateInfo;

// 导出
export default reducer
