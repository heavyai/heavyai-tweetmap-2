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
    return (
      <a
        href={this.props.url}
        onClick={() => {
          this.setState({popover: true})
          this.props.clicked()
        }}
        onMouseEnter={window.innerWidth > 992 ? () => this.setState({popover: true}) : null}
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
            {window.innerWidth < 992 ? this.props.description : null}
          </p>
        </Popover>
      </a>
    )
  }
}

export default NavItem
