import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import styles from "./header.module.css"

const Header = ({ siteTitle }) => (
  <header className={styles.header}>
    <div className={styles.container}>
      <h1 className={styles.title}>
        <Link to="/" className={styles.link}>
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
