import React, { Component } from 'react';
import Field from '../../ui/Field';
import styles from './styles.css';

export default class Login extends Component {
  state = {
    name: '',
    password: '',
    passwordConf: '',
    showReg: false,
    answear: '',
  }

  componentDidMount() {
    console.log('this.state', this.state, this.props)
    // fetch('/api/auth/check')
    //   .then(res => res.json())
    //   .then(data => {
    //     if (data.error === 0) {
    //       this.props.history.push('/main') 
    //     }
    //   });
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
      .then(data => {
        if (data.error === 0) {
          localStorage.setItem("token", data.token);
          this.props.history.push('/main') 
        }
        if (data.error === 1000) {
          this.setState({ answear: data.message }) 
        }
      });
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
      .then(data => {
        if (data.error === 0) {
          this.props.history.push('/main') 
        }
        if (data.error === 1000) {
          this.setState({ answear: data.message }) 
        }
      });
  }

  updateFields = (text, name) => {
    const updateData = {};

    updateData[name] = text;

    this.setState(updateData);
  }

  render() {
    const { name, password, passwordConf, showReg, answear } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.name}>
          {showReg ? 'Sing up' : 'Sing in'}
        </div>
        <div className={styles.fields}>
          <div className={styles.answear}>
            {answear}
          </div>
          <Field
            type="text"
            name="name"
            placeholder="login"
            value={name}
            updateFields={this.updateFields}
          />
          <Field
            type="password"
            name="password"
            placeholder="password"
            value={password}
            updateFields={this.updateFields}
          />
          {showReg
            && <>
              <Field
                type="password"
                name="passwordConf"
                placeholder="confirm password"
                value={passwordConf}
                updateFields={this.updateFields}
              />
            </>
          }
        </div>
        <div onClick={showReg ? this.reg : this.login} className={`${styles.btn} ${styles['btn-login']}`}>
          Continue
        </div>
        <div onClick={() => {this.setState({showReg: !showReg})}} className={`${styles.btn} ${styles['btn-change']}`}>
          {showReg ? 'Sing in' : 'Sing up'}
        </div>
      </div>
    );
  }
}
