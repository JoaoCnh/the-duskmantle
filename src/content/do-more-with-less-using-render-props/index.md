---
title: Do more with less! Using render props
description: Exposing the Render prop technique in React development.
date: "2018-01-22"
image: cover.jpg
tags: ["react", "javascript"]
---

## Before proceeding! What are render props?

If you haven't read the excellent post about Render props by Michael Jackson (No, not the singer), you must give it a try before proceeding with this article.

[Use a Render Prop!](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)

If you are too lazy to read I can hook you up witha video (that is also included in the article)

`youtube: https://www.youtube.com/watch?v=BcVAq3YFiuc`

Shamelessly quoting MJ's article:

> A render prop is a function prop that a component uses to know what to render.
>
> More generally speaking, the idea is this: instead of "mixing in" or decorating a component to share behavior, just render a regular component with a function prop that it can use to share some state with you.

If you want more info there is even a [page](https://reactjs.org/docs/render-props.html) talking about render props in the React docs.

> The term "render prop" refers to a simple technique for sharing code between React components using a prop whose value is a function.

## How can I use render props to solve problems?

Let’s talk business! In this section of the article I’ll go over 2 common situations (**using simple to understand examples**) in apps that can be adapted to any of your requirements!

In the end you will understand how the render props pattern can make our lives easier.

### The repetitive data fetching on lists

I’m sure we’ve all had that use-case where you have a list or a table that fetches data from your API, while it’s fetching you show a loading indicator with a nice animation and when it finally finishes it’s job, you render the list.

Imagine that list was for Cars. How would that go? Maybe something like this:

```javascript
export default class CarsList extends React.Component {
  state = {
    cars: [],
    isLoading: false,
  };

  _fetch = async () => {
    const res = await fetch("api/url");
    const json = await res.json();

    this.setState({ cars: json, isLoading: false });
  };

  componentDidMount() {
    this.setState({ isLoading: true }, this._fetch);
  }

  render() {
   const { cars, isLoading } = this.state;

   return (
     <div>
      <h3>My cards</h3>
      {isLoading && <p>Loading cards m8</p>}
      {cars.length > 0 && (
        <ul>
          {cars.map(car => (
            <li key={car.id}>
              {car.title}
            </li>
          )}
        </ul>
      )}
    </div>
   );
  }
}
```

Now imagine this propagated in an entire app with 10 or more lists. It gets tiring fast always typing that loading boilerplate, right? Now add pagination, sorting and filtering and you’ll probably go nuts quickly.

Render props is here to help. Using the pattern we quickly can make a simple List component that fetches an url and handles the loading state of a list for us.

```javascript
import React from "react"
import PropTypes from "prop-types"

class List extends React.Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
  }

  state = {
    list: [],
    isLoading: false,
  }

  _fetch = async () => {
    const res = await fetch(this.props.url)
    const json = await res.json()

    this.setState({
      list: json,
      isLoading: false,
    })
  }

  componentDidMount() {
    this.setState({ isLoading: true }, this._fetch)
  }

  render() {
    return this.props.render(this.state)
  }
}
```

It’s really this simple. If all your lists have common JSX templating you can even add it in this component taking out another form of repetition. Just by looking at the code you can easily assess that you can modify it to fit whatever needs you have.

Adding pagination, sorting, filtering and even a refresh button are simple features to add. Go nuts!

![easy to just DO IT with render props](https://media.giphy.com/media/qDPg6HNz2NfAk/giphy.gif)

Now all we have to do is just use our component in our App and we’re good to go.

```javascript
<List
  url="https://api.github.com/users/JoaoCnh/repos"
  render={({ list, isLoading }) => (
    <div>
      <h2>My repos</h2>
      {isLoading && <h2>Loading...</h2>}

      <ul>
        {list.length > 0 &&
          list.map(repo => <li key={repo.id}>{repo.full_name}</li>)}
      </ul>
    </div>
  )}
/>
```

![easy peasy](https://media.giphy.com/media/NaboQwhxK3gMU/giphy.gif)

Take a look at the CodeSandbox below to see how it is done and maybe fiddle around with it.

[Code Sandbox](https://codesandbox.io/embed/4326n3zj90)

### The repetitive form posting to server

Here’s a little bit more complicated example. Forms are the bread and butter of most applications. It’s important to handle forms correctly to make sure everything works as intended.

Let’s imagine a situation where you have about 10 forms in your app. All of them POST to the server, while they are POSTing the submit button shows a loading indicator or message and it’s disabled and after it’s done you want to run some code.

![imagination](https://media.giphy.com/media/QIiqoufLNmWo8/giphy.gif)

How would that look like normally? **I’m gonna use Formik for form handling.**

```javascript
import React from "react"
import { Formik, Form, Field } from "formik"
import yup from "yup"

class Form extends React.Component {
  state = { error: false }

  _submit = async (values, { setSubmitting }) => {
    // build form data
    const formData = new FormData()
    formData.append("email", values.email)
    formData.append("name", values.name)

    try {
      const res = await fetch("/api/url", { method: "POST", body: formData })
      const json = res.json()

      setSubmitting(false)
      // redirect or do something else.
    } catch (error) {
      setSubmitting(false)
      this.setState({ error: error.message })
    }
  }

  render() {
    return (
      <div>
        {this.state.error && (
          <div className="alert alert-danger">
            <h3>Oops...</h3>
            <pre>{this.state.error.message}</pre>
          </div>
        )}
        <Formik
          initialValues={{
            name: "",
            email: "",
          }}
          validationSchema={yup.object().shape({
            name: yup.string().required(),
            email: yup
              .string()
              .email()
              .required(),
          })}
          onSubmit={this._submit}
          render={({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Field type="text" name="name" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <Field type="email" name="email" className="form-control" />
              </div>

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        />
      </div>
    )
  }
}
```

By looking at the code we can easily point out that the biggest point of repetition is the **POST fetch request** to the server and the error handling. Form fields and validation will always change but you can have an app that always posts to the server with formData.

Now let’s do some work on it and apply render props to re-use all that yummy logic.

```javascript
import React from "react"
import PropTypes from "prop-types"

class AjaxForm extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    onSuccess: PropTypes.func.isRequired,
  }

  static defaultProps = {
    type: "POST",
  }

  state = {
    error: false,
  }

  _sendRequest = async (values, { setSubmitting }) => {
    // here you can process values however you wish
    const { url, fields, type, onSuccess } = this.props

    try {
      const formData = new FormData()

      for (let field of fields) {
        formData.append(field, values[field])
      }

      const res = await fetch(url, { method: type, body: formData })
      const json = await res.json()

      setSubmitting(false)
      onSuccess(json)
    } catch (error) {
      setSubmitting(false)
      this.setState({ error: error.message })
    }
  }

  render() {
    const { render } = this.props

    return render({
      ...this.state,
      sendRequest: this._sendRequest,
    })
  }
}
```

With little work we’ve abstracted the main point of repetition and just made our lives easier by creating the AjaxForm render prop Component.

It takes any url and even gives you an **onSuccess** callback. Now the long and repetive processes of adding form submition to your app is long gone.

Check the CodeSandbox below to see an example

NOTE: It does not submit anywhere (only has example url given) but you can see how it works and please feel free to tinker with it.
