const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: "pages" })
    actions.createNodeField({ node, name: "slug", value: slug })
  }
}

exports.createPages = ({ actions, graphql }) => {
  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            limit: 1000
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.error(result.errors)
          return reject(result.errors)
        }

        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          actions.createPage({
            path: node.fields.slug,
            component: path.resolve("src/templates/blog-post.js"),
            context: { slug: node.fields.slug },
          })
        })
      })
    )
  })
}
