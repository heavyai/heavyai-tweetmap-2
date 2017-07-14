import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFilters } from '../thunks/search';
import Octicon from 'react-octicon';

class SearchBar extends React.Component {
  static propTypes = {
    queryTerms: PropTypes.arrayOf(PropTypes.string).isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = { value: '' };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.value === '') {
      return;
    }

    let queries = this.state.value.toLowerCase().split(/\s+/);
    this.props.dispatch(addFilters(queries));

    this.setState({ value: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="textBar">
          <div>
            <Octicon name="search" />
          </div>

          <input
            type="text"
            placeholder="Search Tweets"
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  const { queryTerms, ...rest } = state;
  return { queryTerms };
};

export default connect(mapStateToProps)(SearchBar);
