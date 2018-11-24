import React, { Component } from 'react';
import styles from './styles.css';

export default class Field extends Component {
  onChange = e => {
    this.props.updateFields(e.target.value, e.target.name);
  }

  render() {
    const { type, name, value, placeholder } = this.props;
    return (
      <div className={styles.container}>
        <input
          className={styles.input}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
