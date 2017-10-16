import React from "react"

const defaultViewBox = "0 0 48 48"

const getHtml = (name) => ({
  __html: `<use xlink:href="#icon-${name}" ></use>`
})

Icon.propTypes = {
  className: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  viewBox: React.PropTypes.string
}

/* eslint-disable */

export default function Icon ({name, className = "icon", viewBox = defaultViewBox}) {
  return (
    <svg className={className} viewBox={viewBox} dangerouslySetInnerHTML={getHtml(name)}/>
  )
}

/* eslint-enable */
