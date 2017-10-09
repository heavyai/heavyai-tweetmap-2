import Octicon from "react-octicon"
import Popover from "react-popover"
import PropTypes from "prop-types"
import React from "react"

class NavItem extends React.Component {
  static propTypes = {
    clickListener: PropTypes.func,
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
    // eslint-disable-next-line react/no-set-state
    this.setState({popover: true})
  }

  closePopover () {
    // eslint-disable-next-line react/no-set-state
    this.setState({popover: false})
  }

  render () {
    const handleClick = () => {
      // eslint-disable-next-line react/no-set-state
      this.setState({popover: false})
      if (this.props.clickListener) {
        this.props.clickListener()
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
          body={this.props.description}
          isOpen={this.state.popover}
          place="right"
        >
          <p>
            {typeof this.props.icon === "string" ? <Octicon mega name={this.props.icon} /> : this.props.icon}
            <span className="description">{this.props.description}</span>
          </p>
        </Popover>
      </a>
    )
  }
}

export default NavItem
