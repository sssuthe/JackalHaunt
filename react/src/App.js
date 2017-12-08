import React, { Component } from 'react';
import logo from './assets/maxheadroom.gif';
import defaultVideo from './assets/SampleVideo_1280x720_2mb.mp4';
import './App.css';

const sessionId = 'video@skittles.g';
const displayName = 'ReactUser';
const authToken = '';
let remoteVideoSource = defaultVideo;
const foxdenjs = window.foxdenjs
const fdSession = foxdenjs.createSession({sessionId, displayName, authToken});

fdSession.start().then( () => {
  fdSession.on('remoteStreamAdded', (stream) => {
    if (stream.getVideoTracks().length) {
      console.log('remoteStreamAdded');
      remoteVideoSource = stream;
    }
  });
  fdSession.on('remoteStreamRemoved', () => {});
  fdSession.on('localStreamStopped', () => {});
  foxdenjs.getCameraStream().then((stream) => {
    foxdenjs.attachMediaStream(document.getElementById('remoteVideo'),stream);
  });
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome</h1>
        </header>
        <video src={remoteVideoSource} id='remoteVideo' autoPlay='true' loop width="100%" height="100%"/>
      </div>
    );
  }
}

export default App;
