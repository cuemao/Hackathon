import React, { Component } from 'react';
import './index.css';
import Entry from './Entry';
import EventRow from './EventRow';
import EventInfo from './EventInfo';
import Create from './Create';

const axios = require('axios');
axios.defaults.baseURL = "http://127.0.0.1:3001";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      page: 'entry',
      events: [],
      eventInfo: {},
      available: [],
      eventIdx: undefined,
      title: '',
      description: '',
    };
    this.printAlert = this.printAlert.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
    this.sendSignup = this.sendSignup.bind(this);
    this.clickEvents = this.clickEvents.bind(this);
    this.clickCreate = this.clickCreate.bind(this);
    this.clickEventRow = this.clickEventRow.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.findUser = this.findUser.bind(this);
    this.invite = this.invite.bind(this);
  }

  printAlert(msg) {
    alert(msg);
  }

  sendLogin(acc, pwd) {
    console.log('acc: ', acc, ' pwd: ', pwd);
    return axios.post('/login', {
      acc: acc, pwd: pwd
    }).then((res) => {
      if (res.data.response === 'success') {
        this.setState({ page: 'events', user: acc });
        this.getEvents();
      } else alert('Account or Password incorrect!');
    });
  }

  getEvents() { 
    axios.post('/events', {
      acc: this.state.user
    }).then((res) => {
      this.setState({ events: res.data.events.reverse() });
    });
  }

  findUser(acc) {
    return axios.post('/users', {
      acc: acc
    });
  }
  
  sendSignup(acc, pwd, email) {
    console.log('acc: ', acc, ' pwd: ', pwd, ' email: ', email);
    return axios.post('/signup', {
      acc: acc, pwd: pwd, email: email
    }).then((res) => {
      if(res.data.response === 'success') {
        this.setState({ page: 'events', user: acc });
      } else alert('Account already exists!');
    });
  }

  clickEvents() {
    this.setState({ page: 'events' });
    this.getEvents();
  }

  clickCreate() {
    this.setState({ page: 'create' });
  }

  clickEventRow(idx) {
    axios.post('/eventInfo', {
      idx: idx
    }).then((res) => {
      const available = this.state.events.find((e) => e.idx === idx).available;
      console.log(available);
      this.setState({ eventInfo: res.data.eventInfo,
        page: 'info', available: available});
      console.log(this.state.eventInfo);
    });
  }

  createEvent(title, description, dates, invitees) {
    this.setState({title: title, description: description});
    axios.post('/createEvent', {
      host: this.state.user,
      title: title,
      description: description,
      dates: dates,
      invitees: invitees
    }).then((res) => {
      this.setState({ page: 'events', eventIdx: undefined,
        title: '', description: '',});
      this.getEvents();
    });
  }

  invite(invitees) {
    console.log('sendinvite');
    console.log('title', this.state.title);
    axios.post('/invite', {
      idx: this.state.eventIdx,
      title: this.state.title,
      invitees: invitees,
    }).then((res) => {
      this.setState({ page: 'events', eventIdx: undefined,
        title: '', description: '',});
        this.getEvents();
    });
  }

  render() {
    const ENTRY = (this.state.page === 'entry') ?
      <div>
        <h1>Home</h1>
        <Entry 
          onSendLogin={this.sendLogin}
          onSendSignup={this.sendSignup}
        />
      </div>: null;

    const HEADER = (this.state.page !== 'entry') ?
      <div className="Header">
        <h1>
          Hi, {this.state.user}!
        </h1>
        <span 
          className={(this.state.page === 'events' ||
            this.state.page === 'info') ?
            "PageBtn BtnClicked" : "PageBtn"}
          onClick={this.clickEvents}>
          Your Events
        </span>
        <span 
          className={(this.state.page === 'create' ||
            this.state.page === 'invite') ?
            "PageBtn BtnClicked" : "PageBtn"}
          onClick={this.clickCreate}>
          Create New Event
        </span>
      </div> : null;

    const HR = (this.state.page !== 'entry') ?
      <hr/> : null;
    
    const EVENTROWS = (this.state.page === 'events') ?
      this.state.events.map((e) =>
        <EventRow 
          key={e.idx} idx={e.idx}
          title={e.title}
          onClick={this.clickEventRow} /> ) : null;
   
    const EVENTINFO = (this.state.page === 'info') ?
      <EventInfo
        eventInfo={this.state.eventInfo}
        available={this.state.available}/> : null;

    const CREATE = (this.state.page === 'create') ?
      <Create
        onCreateEvent={this.createEvent}
        onFindUser={this.findUser}
        onInvite={this.invite}
        onAlert={this.printAlert}
        user={this.state.user}/> : null;
      
    return (
      <div className="App">
        {ENTRY}
        {HEADER}
        {HR}
        {EVENTROWS}
        {EVENTINFO}
        {CREATE}
      </div>
    );
  }
}

export default App;
