import React, { Component } from 'react';
import Field from '../../ui/Field';


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
      .then(data => data.error === 0 && this.props.history.push('/main'));
  }

  login = () => {
    console.log('login', this.state);
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(this.state),
    })
      .then(res => res.json())
      .then(data => data.error === 0 && this.props.history.push('/main'));
  }

  updateFields = (text, name) => {
    const updateData = {};

    updateData[name] = text;

    this.setState(updateData);
  }

  render() {
    const { name, password, passwordConf, showReg } = this.state;
    return (
      <div className="form">
        <div>
          {showReg ? 'registration' : 'login'}
        </div>
        <Field
          type="text"
          name="name"
          value={name}
          updateFields={this.updateFields}
        />
        <Field
          type="password"
          name="password"
          value={password}
          updateFields={this.updateFields}
        />
        {showReg
          && <>
            <Field
              type="passwordConf"
              name="password"
              value={passwordConf}
              updateFields={this.updateFields}
            />
          </>
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
