import React, { Component } from 'react';
import Option from './Option';


class EventInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventInfo: this.props.eventInfo,
      available: this.props.available,
    };
    this.checkItem = this.checkItem.bind(this);
    this.clickSave = this.clickSave.bind(this);
  }

  checkItem(optionIdx, check) {
    const available = this.state.available;
    const eventInfo = this.state.eventInfo;
    const option = eventInfo.options[optionIdx];
    if (check) {
      available.push(optionIdx);
      option.available.push(this.props.user);
    } else {
      available.splice(available.indexOf(optionIdx), 1);
      option.available.splice(
        option.available.indexOf(this.props.user), 1);
    }
    this.setState({ available: available, eventInfo: eventInfo });
  }

  clickSave() {
    this.props.onCheckItem(this.state.eventInfo.idx, this.state.available);
  }


  render() {
    const eventInfo = this.state.eventInfo;
    const available = this.state.available;
    const Options = eventInfo.options.map((op) =>
      <Option
        key={op.idx}
        idx={op.idx}
        time={op.time}
        invitees={eventInfo.invitees}
        available={op.available}
        check={available.indexOf(op.idx) !== -1}
        onCheckItem={this.checkItem}
      />);

    const Description = eventInfo.description.split('\n').map((seg) =>
      <span>
        {seg}
        <br />
      </span>);

    return (
      <div className="EventInfo">
        <h2>
          {eventInfo.title}
        </h2>
        <div className="Description">
          {Description}
        </div>
        <div className="Holder">
          held by{' '}{eventInfo.host}
        </div>
        <div className="Options">
          {Options}
        </div>
        <div
          className="LogSignBtn SaveBtn"
          onClick={this.clickSave}
        >
          Save
        </div>
      </div>
    );
  }
}

EventInfo.propTypes = {
  user: React.PropTypes.string,
  eventInfo: React.PropTypes.object,
  available: React.PropTypes.array,
  onCheckItem: React.PropTypes.func,
};

export default EventInfo;
