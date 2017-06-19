import React, { Component } from 'react';
import ProgressBar from 'react-toolbox/lib/progress_bar/ProgressBar';
import '../assets/react-toolbox/theme.css';
import theme from '../assets/react-toolbox/theme.js';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider'
export default  class ProgressCustomizado extends Component{

initialState = {
  progress: 10,
  buffer: 10
};


  state = this.initialState;

  componentDidMount () {      
    this.simulateProgress();
  }

  simulateProgress () {
      console.log("montou progress bar")
    setTimeout(() => {
      if (this.state.progress < 100) {
        this.increaseProgress();
        if (this.state.progress > this.state.buffer) this.increaseBuffer();
      } else {
        this.setState(this.initialState);
      }
      this.simulateProgress();
    }, (Math.random() * 1 + 1) * 1000);
  }

  increaseProgress () {
    this.setState({
      progress: Math.random() * 1000 + this.state.progress
    });
  }

  increaseBuffer () {
    this.setState({
      buffer: Math.random() * (1000 - this.state.progress) + this.state.progress
    });
  }

  render () {
    return (
      <section>
        <ThemeProvider theme={theme}>
                <ProgressBar
                  mode='indeterminate'
                  value={this.state.progress} 
                  buffer={this.state.buffer}
                  max={100}
                />        
        </ThemeProvider>
      </section>
    );
  }


}