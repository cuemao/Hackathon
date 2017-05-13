import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Selected from './Selected';
import './index.css';
import 'react-datepicker/dist/react-datepicker.css';

function to2Digits(str) {
  return (`0${str}`).slice(-2);
}

function getTimeStr(str) {
  const time = new Date(str);
  const weekday = new Array(7);
  weekday[0] = 'Sun';
  weekday[1] = 'Mon';
  weekday[2] = 'Tue';
  weekday[3] = 'Wed';
  weekday[4] = 'Thu';
  weekday[5] = 'Fri';
  weekday[6] = 'Sat';
  return `${time.getFullYear()}/${to2Digits(time.getMonth() + 1)}/` +
    `${to2Digits(time.getDate())} (${weekday[time.getDay()]})`
}

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      startDate: moment(),
      dates: [],
      inviteeAcc: '',
      invitees: [],
      waiting: false,
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleAccChange = this.handleAccChange.bind(this);
    this.findUser = this.findUser.bind(this);
    this.clickSave = this.clickSave.bind(this);
  }

  handleDateChange(date) {
    const dates = this.state.dates;
    const dateStr = getTimeStr(date._d);
    if (dates.find((d) => d === dateStr) === undefined) {
      dates.push(dateStr);
      dates.sort();
    }
    this.setState({
      startDate: date
    });
    console.log(this.state.dates);
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }
  
  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  handleAccChange(e) {
    this.setState({ inviteeAcc: e.target.value });
  }

  clickSave() {
    this.props.onCreateEvent(this.state.title, this.state.description,
    	this.state.dates, this.state.invitees);
  }

  findUser() {    
      if(this.state.inviteeAcc === this.props.user) {
        this.props.onAlert('Cannot invite yourself!');
        this.setState({ inviteeAcc: ''});
      } else {
        this.setState({ waiting: true });
        this.props.onFindUser(this.state.inviteeAcc)
        .then((res) => {
          console.log(res.data);
          if (res.data.user !== undefined) {
            const invitees = this.state.invitees;
            invitees.push(this.state.inviteeAcc);
          } else this.props.onAlert("User not found!");
          this.setState({ waiting: false, inviteeAcc: ''});
        });
      }
    
  }

  render() {
    const dot = '\u25cf';
    const colon = '\uff1a';
    const SELECTED = this.state.dates.map((date) =>
        <Selected key={date} selected={date} />);
    const INVITEES = this.state.invitees.map((invitee, i) =>
      <Selected key={i} selected={invitee} />);
    
    return (
      <div className="Create">
        <input
          disabled={(this.state.waiting) ? 'disabled' : null}
          type="text" placeholder="title"
          onChange={this.handleTitleChange}
        />
        <textarea
          disabled={(this.state.waiting) ? 'disabled' : null}
          type="text" placeholder="description"
          onChange={this.handleDescriptionChange}
        />
        <div className="Date">
          <DatePicker
            inline
            selected={this.state.startDate}
            onChange={this.handleDateChange}
          />
        </div>
        {dot} Selected{colon}
        {SELECTED}

        <input
          disabled={(this.state.waiting) ? 'disabled' : null}
          type="text" placeholder="invitee's account"
          value={this.state.inviteeAcc}
          onChange={this.handleAccChange}
        />
        <div className="LogSignBtn"
          onClick={this.findUser}>
          Invite
        </div>
        {INVITEES}

        <div className="LogSignBtn"
          onClick={this.clickSave}>
          Save
        </div>
      </div>
      
    );
  }
}

export default Create;
