import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { filterSearch } from '../thunks/searchBar'
import Octicon from 'react-octicon'

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

          <div className="input-group">
            <span className="input-group-addon" id="basic-addon1">
              <Octicon name="search"/>
            </span>

            <input type="text"
              className="form-control"
              placeholder="Search Tweets"
              aria-describedby="basic-addon1"
              value={this.state.value}
              onChange={this.handleChange}/>
          </div>

      </form>
    );
  }
}

const mapStateToProps = state => {
  const { isConnected, ...rest } = state
  return {isConnected}
}

export default connect(mapStateToProps)(SearchBar)
