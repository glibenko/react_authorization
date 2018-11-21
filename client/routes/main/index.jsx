import React, { Component } from 'react';

export default class index extends Component {
  componentDidMount() {
    fetch('/api/auth/check')
      .then(res => {
        if (res && res.status == 401) {
          this.props.history.push('/login');
        }
      });
    console.log('this.props', this.props);
  }

  render() {
    return (
      <div>
        hi
      </div>
    )
  }
}
