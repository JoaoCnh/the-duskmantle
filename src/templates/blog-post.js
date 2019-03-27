import React from "react"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import Layout from "../components/layout"

function BlogPost(props) {
  const post = props.data.markdownRemark
  const { title, image } = post.frontmatter

  return (
    <Layout>
      {!!image ? <Img fluid={image.childImageSharp.fluid} /> : null}
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  )
}

export default BlogPost

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        image {
          childImageSharp {
            resize(width: 1000, height: 300) {
              src
            }
            fluid(maxWidth: 1500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
