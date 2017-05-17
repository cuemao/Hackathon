import React, { Component } from 'react';

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
        onClick={this.clicked}
      >
        {this.props.title}
      </div>
    );
  }
}

EventRow.propTypes = {
  onClick: React.PropTypes.func,
  idx: React.PropTypes.number,
  title: React.PropTypes.string,
};

export default EventRow;
