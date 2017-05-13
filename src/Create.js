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
    this.deleteDate = this.deleteDate.bind(this);
    this.deleteInvitee = this.deleteInvitee.bind(this);
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
    if(this.state.inviteeAcc !== '') {
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
  }

  deleteDate(date) {
    const dates = this.state.dates;
    dates.splice(dates.indexOf(date), 1);
    this.setState(dates: dates);
  }

  deleteInvitee(inv) {
    const invitees = this.state.invitees;
    invitees.splice(invitees.indexOf(inv), 1);
    this.setState(invitees: invitees);
  }

  render() {
    const dot = '\u25cf';
    const colon = '\uff1a';
    const SELECTED = this.state.dates.map((date) =>
      <Selected key={date} selected={date}
        onDelete={this.deleteDate}/>);
    const INVITEES = this.state.invitees.map((invitee) =>
      <Selected key={invitee} selected={invitee}
        onDelete={this.deleteInvitee}/>);
    
    return (
      <div className="Create">
        <div className="Info">
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
        </div>

        <div className="Info">
          <div className="Date">
            <DatePicker
              inline
              selected={this.state.startDate}
              onChange={this.handleDateChange}
            />
          </div>
          {(this.state.dates.length>0) ?
            <span> {dot} Selected{colon} </span> : null }
          {SELECTED}
        </div>

        <div className="Info">
          <input
            disabled={(this.state.waiting) ? 'disabled' : null}
            type="text" placeholder="invitee's account"
            value={this.state.inviteeAcc}
            onChange={this.handleAccChange}
          />
          <div className="LogSignBtn InviteBtn"
            onClick={this.findUser}>
            Invite
          </div>
          {(this.state.invitees.length>0) ?
            <span> {dot} Invitees{colon} </span> : null }
          {INVITEES}
        </div>

        <div className="LogSignBtn SaveBtn"
          onClick={this.clickSave}>
          Save
        </div>
      </div>
      
    );
  }
}

export default Create;
