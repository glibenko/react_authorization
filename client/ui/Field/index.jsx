import React, { Component } from 'react';

export default class Field extends Component {
  onChange = e => {
    this.props.updateFields(e.target.value, e.target.name);
  }

  render() {
    const { type, name, value } = this.props;
    return (
      <div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
