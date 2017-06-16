import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { filterSearch } from '../thunks/searchBar'

class SearchBar extends React.Component {
  static propTypes = {
    isConnected: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    if (this.props.isConnected) {
      this.props.dispatch(filterSearch(this.state.value))
    }
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Search Tweets" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
      </form>
    );
  }
}

const mapStateToProps = state => {
  const { isConnected, ...rest } = state
  return {isConnected}
}

export default connect(mapStateToProps)(SearchBar)
