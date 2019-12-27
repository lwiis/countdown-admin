import React, { Component } from 'react';
import FlexView from 'react-flexview';
import Dropdown from './Dropdown/Dropdown';
import Switch from './Switch/Switch';
// import CustomSlider from './CustomSlider/CustomSlider';
import './App.css';

const clientId = Date.now();
console.log('me = ' + clientId);

class App extends Component {

  constructor() {
    super();

    this.state = {
      isRunning: true,
      route: 'main',
      temperature1: 20,
      temperature2: 20,
      isListening: false,
      senderId: clientId,
    };

    this.server = 'http://192.168.1.90:4000';
    this.eventSource = new EventSource(new URL('/events', this.server));
    // console.log('eventSource.withCredentials: ' + this.eventSource.withCredentials);
    // console.log('eventSource.readyState: ' + this.eventSource.readyState);
    // console.log('eventSource.url: ' + this.eventSource.url);
  }

  componentDidMount() {
    // https://alligator.io/nodejs/server-sent-events-build-realtime-app/
    if (!this.state.isListening) {
      this.eventSource.onopen = (event) => {
        console.log("Connection to server opened.");
        // console.log('eventSource.readyState: ' + event.target.readyState);
      };

      this.eventSource.onmessage = (event) => {
        // console.log('message received');
        // console.log(event);
        const parsedData = JSON.parse(event.data);
        // console.log('state from event');
        // console.log(parsedData);
        // console.log('me: ' + clientId + '; senderId: ' + parsedData.senderId);
        if(parsedData.senderId!==clientId) {
          // console.log(' --> update status');
          this.setState(parsedData);
        }
      };
      this.setState({ isListening: true });
    }

    this.eventSource.onerror = () => {
      console.log("EventSource failed.");
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('componentDidUpdate');
    // console.log(this.state);
    // console.log(prevState);
    if (this.state.route !== prevState.route
      || this.state.isRunning !== prevState.isRunning
      || this.state.temperature1 !== prevState.temperature1
      || this.state.temperature2 !== prevState.temperature2) {
      // console.log('pushing new state to server');
      fetch(new URL('/state', this.server), {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state)
      });
    }
  }

  render() {
    return (
      <FlexView column vAlignContent='center' hAlignContent='center' height='80vh' width='80vw'>
        <Dropdown onChange={(x) => this.setState({ route: x, senderId: clientId })} value={this.state.route} label='Route' values={["main", "hack", "countdown", "temperature", "code", "win"]} />
        <FlexView height='50px' />
        <Switch onChange={(x) => this.setState({ isRunning: x, senderId: clientId  })} value={this.state.isRunning} label='Running' />
        <FlexView height='50px' />
        {/* <CustomSlider onChange={(x) => this.setState({ temperature1: x, senderId: clientId  })} value={this.state.temperature1} label='Temperature Left' /> */}
        <Dropdown onChange={(x) => this.setState({ temperature1: x, senderId: clientId })} value={this.state.temperature1} label='Temperature Left' values={[20,22,24,26,28,30]} />
        <FlexView height='50px' />
        {/* <CustomSlider onChange={(x) => this.setState({ temperature2: x, senderId: clientId  })} value={this.state.temperature2} label='Temperature Right' /> */}
        <Dropdown onChange={(x) => this.setState({ temperature2: x, senderId: clientId })} value={this.state.temperature2} label='Temperature Right' values={[20,22,24,26,28,30]} />
      </FlexView>
    );
  }
}

export default App;
