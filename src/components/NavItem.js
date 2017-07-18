import Octicon from "react-octicon"
import Popover from "react-popover"
import PropTypes from "prop-types"
import React from "react"

class NavItem extends React.Component {
  static propTypes = {
    body: PropTypes.object,
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
  }

  render () {
    const handleClick = () => {
      this.setState({popover: true})
      this.props.clicked()
    }

    const isMobile = window.innerWidth < 992

    return (
      <a
        href={this.props.url}
        onClick={handleClick}
        onMouseEnter={isMobile ? null : () => this.setState({popover: true})}
        onMouseLeave={() => this.setState({popover: false})}
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
            {isMobile ? this.props.description : null}
          </p>
        </Popover>
      </a>
    )
  }
}

export default NavItem
