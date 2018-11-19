import React, { Component } from 'react';

export default class Login extends Component {
  state = {
    name: '',
    password: '',
    passwordConf: '',
  }

  login = () => {
    console.log('login', this.state);
    fetch('/api/reg', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(this.state),
    })
      .then(res => res.json())
      .then(data => console.log('data', data));

  }

  render() {
    const { name, password, passwordConf } = this.state;
    return (
      <div>
        <input
          type="text"
          value={name}
          onChange={e => this.setState({ name: e.target.value })}
        />
        <input
          type="password"
          value={password}
          onChange={e => this.setState({ password: e.target.value })}
        />
        <input
          type="passwordConf"
          value={passwordConf}
          onChange={e => this.setState({ passwordConf: e.target.value })}
        />
        <div onClick={this.login}>
          registration
        </div>
      </div>
    );
  }
}
