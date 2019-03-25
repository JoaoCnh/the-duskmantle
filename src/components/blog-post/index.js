import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import Tags from "../tags"
import styles from "./blogpost.module.css"

export default props => (
  <article className={styles.article}>
    <div className={styles.content}>
      {!!props.node.frontmatter.image ? (
        <div className={styles.cover}>
          <Img fluid={props.node.frontmatter.image.childImageSharp.fluid} />
        </div>
      ) : null}

      <div className={styles.info}>
        <time pubdate="pubdate" className={styles.date}>
          {props.node.frontmatter.date}
        </time>
        <h1 className={styles.title}>{props.node.frontmatter.title}</h1>
        <Tags tags={props.node.frontmatter.tags} />
        <p className={styles.excerpt}>{props.node.excerpt}</p>
        <Link to={props.node.fields.slug} className={styles.link}>
          read more
        </Link>
      </div>
    </div>
  </article>
)
