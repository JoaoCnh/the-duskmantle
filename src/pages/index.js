import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout"
import BlogPost from "../components/blog-post"
import Container from "../components/container"

const IndexPage = props => (
  <Layout>
    <SEO
      title="Home"
      keywords={["gatsby", "application", "react", "blog", "javascript"]}
    />
    <Container>
      {props.data.allMarkdownRemark.edges.map(({ node }, i) => (
        <BlogPost key={i} node={node} />
      ))}
    </Container>
  </Layout>
)

export default IndexPage

export const listQuery = graphql`
  query ListQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          fields {
            slug
          }
          excerpt(pruneLength: 250)
          frontmatter {
            date
            tags
            title
            image {
              childImageSharp {
                resize(width: 300, height: 300) {
                  src
                }
                fluid(maxWidth: 786) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
