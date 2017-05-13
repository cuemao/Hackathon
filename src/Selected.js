/*eslint-disable*/
import React, { Component } from 'react';
import './index.css';

class Selected extends Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem() {
    this.props.onDelete(this.props.selected);
  }
  
  render() {
    return (
      <div className="Selected" onClick={this.deleteItem}>
        {this.props.selected}
      </div>
    );
  }
}

export default Selected;
