import React from 'react';
import Map from './Map.js';
import { startConnection } from '../services/connector';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      crossfilter: null,
      connection: null
    };
  }

  componentDidMount() {
    startConnection((cf, con) => {
      this.setState({
        crossfilter: cf,
        connection: con
      });
    });
  }

  render() {
    if (this.state.crossfilter && this.state.connection) {
      return (
        <div>
          <Map crossfilter={this.state.crossfilter}
            connection={this.state.connection}
          />
        </div>);
    }
    else {
      return <div>Loading...</div>;
    }
  }
}
