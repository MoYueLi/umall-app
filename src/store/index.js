import {createStore, applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'

const moduleFiles = require.context('./modules', true, /\.js$/)

const modules = moduleFiles.keys().reduce(
  (modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = moduleFiles(modulePath)
    modules[moduleName] = value.default
    return modules
  }, {})

// 合并reducer
const reducer = combineReducers(modules);

const store = createStore(reducer, applyMiddleware(thunk))

export default store
