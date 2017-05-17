import React, { Component } from 'react';
import checkboxIco from './pic/checkbox.png';
import checkIco from './pic/check.png';

class Option extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: this.props.check,
      show: false,
    };
    this.checkItem = this.checkItem.bind(this);
    this.showParticipant = this.showParticipant.bind(this);
  }

  checkItem() {
    this.props.onCheckItem(this.props.idx, !this.state.check);
    this.setState({ check: !this.state.check });
  }

  showParticipant() {
    this.setState({ show: !this.state.show });
  }
  render() {
    const checkBox = this.state.check ?
      <img
        alt="avail"
        className="CheckBox"
        src={checkIco}
        onClick={this.checkItem}
      /> :
      <img
        alt="unavail"
        className="CheckBox"
        src={checkboxIco}
        onClick={this.checkItem}
      />;
    const percent =
      `${(this.props.available.length / this.props.invitees.length) * 100}%`;
    const time =
      <div className="Time">
        <div className="Percentage" style={{ width: percent }}>
          {this.props.time}
        </div>
        {this.props.time}
      </div>;
    const count =
      <div
        className="Count"
        onClick={this.showParticipant}
      >
        {this.props.available.length}
      </div>;

    const participants = this.state.show ?
      this.props.invitees.map((i) =>
        <div className="OptionRow">
          <div className="Participant">
            <span className="Check">
              {(this.props.available.indexOf(i) === -1) ? 'x' : 'v'}
            </span>
            {' '}
            <span> {i} </span>
          </div>
        </div>) : null;

    return (
      <div>
        <div className="OptionRow">
          {checkBox}
          {time}
          {count}
        </div>
        {participants}
      </div>
    );
  }
}

Option.propTypes = {
  check: React.PropTypes.bool,
  idx: React.PropTypes.number,
  invitees: React.PropTypes.array,
  available: React.PropTypes.array,
  onCheckItem: React.PropTypes.func,
  time: React.PropTypes.string,
};

export default Option;
