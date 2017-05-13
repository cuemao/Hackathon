/*eslint-disable*/
import React, { Component } from 'react';
import './index.css';
import Option from './Option';

class EventInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const eventInfo = this.props.eventInfo;
    const Options = eventInfo.options.map((e) =>
      <Option key={e.idx} time={e.time}/> );

    const Description = eventInfo.description.split('\n').map((seg) =>
      <span>
        {seg}
        <br/>
      </span> );

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
        <div className="Date">
          {Options}
        </div>
      </div>
    );
  }
}

export default EventInfo;
