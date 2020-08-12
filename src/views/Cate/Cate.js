import React, {Component} from 'react';
import {Tabs} from 'antd-mobile'
import {connect} from 'react-redux'
import './Cate.css'
import {cateList, reqGetCateListAcion} from "../../store/modules/cate";
import BackHead from "../../components/BackHead/BackHead";

class Cate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cateIndex: 0
    }
  }

  changeList(tab, index) {
    this.setState({...this.state, cateIndex: index})
  }

  componentDidMount() {
    this.props.reqCateList()
  }

  toInfo(id,name) {
    this.props.history.push(`/cateDetail?id=${id}&tit=${name}`)
  }

  render() {
    const {cateList} = this.props
    const {cateIndex} = this.state
    if (!this.props.cateList.length) {
      return (<div></div>)
    }

    let tabs = cateList.map(item => {
      return {title: item.catename, key: item.id}
    })
    return (
      <div className='container'>
        <BackHead tit={'商品详情'}/>
        <div className="cateNav">
          <div style={{width: '100vw', height: '60vh', fontSize: '0.4rem'}}>
            <Tabs style={{height: '6rem',}} tabs={tabs}
                  tabBarPosition="left"
                  tabDirection="vertical"
                  renderTabBar={props => <Tabs.DefaultTabBar {...props} page={tabs.length}/>}
                  onTabClick={(tab, index) => this.changeList(tab, index)}
            >
            </Tabs>
          </div>
        </div>
        <div className="cate">
          {
            cateList[cateIndex].children.map(item => {
              return (
                <div onClick={() => this.toInfo(item.pid,item.catename)} className='cateItem' key={item.id}>
                  <img src={item.img} alt=""/>
                  <span>{item.catename}</span>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cateList: cateList(state)
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    reqCateList: () => dispatch(reqGetCateListAcion())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cate);
