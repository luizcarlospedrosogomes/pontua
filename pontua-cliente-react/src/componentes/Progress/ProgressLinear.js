import React, { Component } from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const ProgressLinear = () => (
  <MuiThemeProvider>
    <div>
      <LinearProgress mode="indeterminate" /> 
    </div>
  </MuiThemeProvider>
);

export default ProgressLinear;


