/*eslint-disable*/
import React, { Component } from 'react';
import './index.css';

class Selected extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="Selected">
        {this.props.selected}
      </div>
    );
  }
}

export default Selected;
