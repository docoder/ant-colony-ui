
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class RoutesContainer extends Component {

  componentWillMount() {
    this.unlisten = this.props.history.listen((...rest) => {
        if(this.props.onRouteChange) this.props.onRouteChange(...rest)
    });
  }
  componentWillUnmount() {
      this.unlisten();
  }
  render() {
     return (
         <div>{this.props.children}</div>
      );
  }
}
export default withRouter(RoutesContainer);