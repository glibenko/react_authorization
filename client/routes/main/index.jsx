import React, { Component } from 'react';
import styles from './styles.css';

export default class index extends Component {
  componentDidMount() {
    fetch('/api/auth/check')
      .then(res => {
        console.log(res)
        if (res && res.status !== 200) {
          this.props.history.push('/login');
        }
      });
  }

  logout = () => {
    fetch('/api/auth/logout')
      .then(res => {
        if (res && res.status === 401) {
          this.props.history.push('/login');
        }
        return res.json();
      })
      .then(() => this.props.history.push('/login'));
  }

  render() {
    return (
      <div>
        <div className={styles.name}>hi, you are inside</div>
        <div onClick={this.logout} className={styles.btn}> logout</div>
      </div>
    );
  }
}
