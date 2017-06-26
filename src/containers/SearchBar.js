import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { filterSearch } from '../thunks/search'
import Octicon from 'react-octicon'

class SearchBar extends React.Component {
  static propTypes = {
    queries: PropTypes.array.isRequired,
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

    let queries = this.state.value.split(/\s+/);
    queries = [...new Set(this.props.queries.concat(queries))]
    console.log(queries)
    this.props.dispatch(filterSearch(queries))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>

        <div className="input-group">
          <span className="input-group-addon" id="basic-addon1">
            <Octicon name="search"/>
          </span>

          <input
            type="text"
            className="form-control"
            placeholder="Search Tweets"
            aria-describedby="basic-addon1"
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
          />
        </div>

      </form>
    );
  }
}

const mapStateToProps = state => {
  const { queryTerms, ...rest } = state
  return {queries: queryTerms}
}

export default connect(mapStateToProps)(SearchBar)
