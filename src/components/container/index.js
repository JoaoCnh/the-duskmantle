import React from "react"

import styles from "./container.module.css"

export default props => (
  <section className={styles.container}>{props.children}</section>
)
