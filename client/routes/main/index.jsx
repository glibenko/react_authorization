import React, { Component } from 'react';
import styles from './styles.css';

export default class index extends Component {
  componentDidMount() {
    console.log('login', this.state);
    fetch('/api/auth/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ token: localStorage.getItem('token') }),
    })
      .then(res => {
        if (res && res.status !== 200) {
          this.props.history.push('/login');
        }
      });
  }

  logout = () => {
    fetch('/api/auth/logout')
      .then(res => {
        localStorage.clear();
        if (res && res.status === 401) {
          this.props.history.push('/login');
        }
        return res.json();
      })
      .then(() => this.props.history.push('/login'));
  }

  render() {
    console.log('main this.props', this.props);
    return (
      <div>
        <div className={styles.name}>hi, you are inside</div>
        <div onClick={this.logout} className={styles.btn}> logout</div>
      </div>
    );
  }
}
