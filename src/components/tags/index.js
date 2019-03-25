import React from "react"

import styles from "./tags.module.css"

export default function Tags(props) {
  if (!props.tags || props.tags.length === 0) return null

  return (
    <div className={styles.tags}>
      {props.tags.map((tag, idx) => (
        <span key={`tag-${idx}`} className={styles.tag}>
          {tag}
        </span>
      ))}
    </div>
  )
}
