import React, { Component } from 'react';

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      func: '',
      acc: '',
      pwd: '',
      email: '',
      waiting: false,
    };
    this.handleAccChange = this.handleAccChange.bind(this);
    this.handlePwdChange = this.handlePwdChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.clickLogin = this.clickLogin.bind(this);
    this.clickSignup = this.clickSignup.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
    this.sendSignup = this.sendSignup.bind(this);
  }

  handleAccChange(e) {
    this.setState({ acc: e.target.value });
  }

  handlePwdChange(e) {
    this.setState({ pwd: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  clickLogin() {
    this.setState({ func: 'login', acc: '', pwd: '' });
  }

  clickSignup() {
    this.setState({
      func: 'signup',
      acc: '',
      pwd: '',
      email: '',
    });
  }

  sendLogin(e) {
    if (e.key === 'Enter' &&
      this.state.acc !== '' && this.state.pwd !== '') {
      this.setState({ waiting: true });
      this.props.onSendLogin(this.state.acc, this.state.pwd)
        .then(() => {
          this.setState({ waiting: false });
        });
    }
  }

  sendSignup(e) {
    if (e.key === 'Enter' &&
      this.state.acc !== '' && this.state.pwd !== '' &&
      this.state.email !== '') {
      this.setState({ waiting: true });
      this.props.onSendSignup(this.state.acc, this.state.pwd,
        this.state.email)
        .then(() => {
          this.setState({ waiting: false });
        });
    }
  }

  render() {
    const loginField = (this.state.func === 'login') ?
      <div>
        <input
          disabled={(this.state.waiting) ? 'disabled' : null}
          type="text"
          placeholder="account"
          onChange={this.handleAccChange}
          onKeyPress={this.sendLogin}
        />
        <input
          disabled={(this.state.waiting) ? 'disabled' : null}
          type="text"
          placeholder="password"
          onChange={this.handlePwdChange}
          onKeyPress={this.sendLogin}
        />
      </div> : null;

    const signupField = (this.state.func === 'signup') ?
      <div>
        <input
          disabled={(this.state.waiting) ? 'disabled' : null}
          type="text"
          placeholder="account"
          onChange={this.handleAccChange}
          onKeyPress={this.sendSignup}
        />
        <input
          disabled={(this.state.waiting) ? 'disabled' : null}
          type="text"
          placeholder="password"
          onChange={this.handlePwdChange}
          onKeyPress={this.sendSignup}
        />
        <input
          disabled={(this.state.waiting) ? 'disabled' : null}
          type="text"
          placeholder="E-mail address"
          onChange={this.handleEmailChange}
          onKeyPress={this.sendSignup}
        />
      </div> : null;

    return (
      <div className="App">
        <div className="Entry">
          <div className="LogSignBtn" onClick={this.clickLogin}>Login</div>
          {loginField}
          <div className="LogSignBtn" onClick={this.clickSignup}>Sign up</div>
          {signupField}
        </div>
      </div>
    );
  }
}

Entry.propTypes = {
  onSendLogin: React.PropTypes.func,
  onSendSignup: React.PropTypes.func,
};

export default Entry;
