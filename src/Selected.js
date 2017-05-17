import React, { Component } from 'react';
import deleteIco from './pic/delete.png';

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
      <div className="Selected">
        <img
          alt="Delete"
          className="DeleteBtn"
          src={deleteIco}
          onClick={this.deleteItem}
        />
        <div className="Name">
          {this.props.selected}
        </div>
      </div>
    );
  }
}

Selected.propTypes = {
  selected: React.PropTypes.string,
  onDelete: React.PropTypes.func,
};

export default Selected;
