import React from "react"

import styles from "./footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <small>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org" className={styles.link}>
            Gatsby
          </a>
        </small>
      </div>
    </footer>
  )
}
