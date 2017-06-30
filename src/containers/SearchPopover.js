import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { geocode } from '../thunks/map'

class SearchPopover extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.state = {value: ''};
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.value === '') {return}

    this.props.dispatch(geocode(this.state.value))
    this.setState({value: ''});
  }

  componentDidMount() {
    this.input.focus();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search Location"
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
            ref={(input) => { this.input = input }}
          />
        </div>
      </form>
    );
  }
}

export default connect()(SearchPopover)
