import React from 'react';
import Map from './Map.js';

export default class App extends React.Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>MapD TweetMap</h1>
        <Map/>
      </div>);
  }
}
