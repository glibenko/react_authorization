import React, { Component } from 'react';

export default class index extends Component {
  componentDidMount() {
    fetch('/api/auth/check')
      .then(res => {
        if (res && res.status == 401) {
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
        <div> hi</div>
        <div onClick={this.logout}> logout</div>
      </div>
    )
  }
}
