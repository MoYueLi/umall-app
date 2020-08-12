import React, {Component} from 'react';
import {connect} from 'react-redux'
import {setGoodCartStateAction} from "../../../../store/modules/home";

class CartFoot extends Component {
  render() {
    const {setAddCartState} = this.props
    return (
      <div className='footer'>
        <div className='add' onClick={() => setAddCartState()}>
          加入购物车
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {}
}

const mapDispatch = (dispatch) => {
  return {
    setAddCartState: () => dispatch(setGoodCartStateAction())
  }
}

export default connect(mapState,mapDispatch)(CartFoot);
