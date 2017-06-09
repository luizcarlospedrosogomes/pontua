import Dropdown from 'react-toolbox/lib/dropdown';
import React, { Component } from 'react';

export default  class ComboboxCustomizado extends Component {
  state = {
    albumSelected: 3,
    countrySelected: 'ES-es'
  };

  handleCountryChange = (value) => {
    this.setState({countrySelected: value});
  };

  customItem (item) {
    const containerStyle = {
      display: 'flex',
      flexDirection: 'row'
    };

    const imageStyle = {
      display: 'flex',
      width: '32px',
      height: '32px',
      flexGrow: 0,
      marginRight: '8px',
      backgroundColor: '#ccc'
    };

    const contentStyle = {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 2
    };

  }

  render () {
    return (
      <div className="pure-control-group">
       <label className ="_2WvFs"
	  		htmlFor={this.props.id}>{this.props.label}
        </label>
      
        <Dropdown
          source={this.props.source}
          onChange={this.handleCountryChange}
          value={this.state.countrySelected}
        />
      </div>
    );
  }
}

