import React, { Component } from 'react';
import './index.css';

class Option extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  
  render() {
    return (
      <div className="EventRow">
        {this.props.time}
      </div>
    );
  }
}

export default Option;
