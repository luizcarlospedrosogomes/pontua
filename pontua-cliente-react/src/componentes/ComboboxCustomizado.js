import Dropdown from 'react-toolbox/lib/dropdown';
import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import '../assets/react-toolbox/theme.css';
import theme from '../assets/react-toolbox/theme.js';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

export default  class ComboboxCustomizado extends Component {
  state = {default: this.props.default};

  handleChange = (value) => {
    this.setState({default: value});
    PubSub.publish("valor-combo", value);
  };

  render () {
    return (
      <ThemeProvider  theme={theme}>
        <div className="form-group">
        <label htmlFor={this.props.id}>{this.props.label}  </label>
        
          <Dropdown
            className="form-control"
            source={this.props.source}
            onChange={this.handleChange}
            value={this.state.default}
          />
      </div>
      </ThemeProvider>
    );
  }
}