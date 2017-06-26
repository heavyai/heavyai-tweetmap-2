import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class SearchBar extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default connect()(SearchBar)
