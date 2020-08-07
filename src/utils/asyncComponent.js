import React, {Component} from 'react';

function asyncComponent(com) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        LazyComponent: null
      }
    }

    componentDidMount() {
      com().then(res => {
        this.setState({
          LazyComponent: res.default
        })
      })
    }

    render() {
      const {LazyComponent} = this.state
      return (
        <div>
          {LazyComponent ? <LazyComponent {...this.props}/> : null}
        </div>
      );
    }
  }

  return AsyncComponent
}

export default asyncComponent;
