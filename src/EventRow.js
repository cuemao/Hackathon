import React, { Component } from 'react';
import './index.css';

class EventRow extends Component {
  constructor(props) {
    super(props);
    this.clicked = this.clicked.bind(this);
  }

  clicked() {
    this.props.onClick(this.props.idx);
  }

  render() {
    return (
      <div 
        className="EventRow"
        onClick={this.clicked}>
        {this.props.title}
      </div>
    );
  }
}

export default EventRow;
