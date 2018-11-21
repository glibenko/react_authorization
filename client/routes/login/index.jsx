import React, { Component } from 'react';

export default class Login extends Component {
  state = {
    name: '',
    password: '',
    passwordConf: '',
    showReg: false,
  }

  componentDidMount() {
    fetch('/api/auth/check')
      .then(res => {
        console.log('res', res);
      });
    console.log('this.props', this.props);
  }

  reg = () => {
    console.log('login', this.state);
    fetch('/api/auth/reg', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(this.state),
    })
      .then(res => res.json())
      .then(data => console.log('data', data));
  }

  login = () => {
    console.log('login', this.state);
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(this.state),
    })
      .then(res => res.json())
      .then(data => console.log('datalogin', data));
  }

  render() {
    const { name, password, passwordConf, showReg } = this.state;
    return (
      <div>
        <div>
          {showReg ? 'login' : 'registration'}
        </div>
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
        {showReg &&
          <input
            type="passwordConf"
            value={passwordConf}
            onChange={e => this.setState({ passwordConf: e.target.value })}
          />
        }

        <div onClick={() => {this.setState({showReg: !showReg})}}>
          {showReg ? 'go to login' : 'go to sing in'}
        </div>
        <div onClick={showReg ? this.reg : this.login}>
          send
        </div>
      </div>
    );
  }
}
