import {IS_MOBILE} from "../constants"
import Octicon from "react-octicon"
import Popover from "react-popover"
import PropTypes from "prop-types"
import React from "react"

class NavItem extends React.Component {
  static propTypes = {
    body: PropTypes.node,
    className: PropTypes.string,
    clicked: PropTypes.func,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    url: PropTypes.string
  }

  constructor () {
    super()
    this.state = {
      popover: false
    }

    this.openPopover = this.openPopover.bind(this)
    this.closePopover = this.closePopover.bind(this)
  }

  openPopover () {
    if (IS_MOBILE) { return }
    // eslint-disable-next-line react/no-set-state
    this.setState({popover: true})
  }

  closePopover () {
    // eslint-disable-next-line react/no-set-state
    this.setState({popover: false})
  }

  render () {
    const handleClick = () => {
      if (this.props.description === "Search Location") {
        // eslint-disable-next-line react/no-set-state
        this.setState({popover: true})
      }

      if (this.props.clicked) {
        this.props.clicked()
      }
    }

    return (
      <a
        href={this.props.url}
        onClick={handleClick}
        onMouseEnter={this.openPopover}
        onMouseLeave={this.closePopover}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Popover
          body={this.props.body || this.props.description}
          className={this.props.className}
          isOpen={this.state.popover}
          place="right"
        >
          <p>
            <Octicon mega name={this.props.icon} />
            {IS_MOBILE ? this.props.description : null}
          </p>
        </Popover>
      </a>
    )
  }
}

export default NavItem
