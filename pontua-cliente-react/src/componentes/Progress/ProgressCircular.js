import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const ProgressCircular = () => (
  <MuiThemeProvider>
    <div>
      <CircularProgress />
    </div>
  </MuiThemeProvider>
);

export default ProgressCircular;


