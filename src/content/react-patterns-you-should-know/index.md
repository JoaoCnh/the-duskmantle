---
title: React patterns you should know
description: And what the near future holds.
date: "2018-02-07"
image: cover.jpeg
tags: ["react", "javascript"]
---

Throughout your React carreer you will find yourself wondering, several times, how can I achieve what I want in a simple and effective way?!

![sort of like this](https://media.giphy.com/media/y3QOvy7xxMwKI/giphy.gif)

Gladly, applying some useful patterns, you can rid yourself of messy and over-complicated code.

Many times I see developers asking questions of “How to do X in React”. Some times it is adequate to ask this question, however, if you just think about it, in other cases you can just look at it as a Javascript problem and not a React one. Many interesting solutions and patterns are born from this thinking.

> React is just javascript!

Let’s go through some common hickups and how you can apply some patterns to solve them.

## Global app data and cross-cutting concerns

Every modern web application probably has some kind of variable(s) or object(s) that need to be used somewhere inside the application at one given point in time. It can be something like a localization helper (I18n) like [polyglot](http://airbnb.io/polyglot.js/) or maybe even the permissions that the current logged user has for the app. These particular things won’t change often (depending on the requirements) and for that reason, there is not much sense in storing them in state.

In the initialization process of our application we define our locale strings / user permissions and we’re ready to use them…… but how?

Wait…. do you mean we have to pass it down as **props** and pass them down forever and ever until there are no more components, just so we can access them deep down into the app?

![wait what?](https://media.giphy.com/media/12xsYM8AbsyoCs/giphy.gif)

No, chill! If you try and think of a similar behaviour it is easy to find something that already has an identic requirement. Right?!

- react-redux

We define our state in the store and then, whenever we need it, we **connect** our component to the store and voilá! we have access to the store state. What react-redux uses is something called a **Provider** and a connect **HOC (Higher Order Component)**

- react-router

In react-router **Router** works as the **Provider** and **withRouter** is the **HOC** that let's you access the router props.

### Provider

The Provider uses React’s [Context API](https://reactjs.org/docs/context.html) to pass props through the component tree without having to pass the props down manually at every level. We can easily “setup” our stuff and pass down whatever we want “down” into the rest of the components.

Let’s pick up the localization helper example I have and build a **Provider** that receives the current locale, initializes polyglot for said locale and then passes the translate function and the locale down the component tree.

```javascript
import React, { Component } from "react"
import PropTypes from "prop-types"
import Polyglot from "node-polyglot"

// for example
import translations from "../my-translations.json"

class I18nProvider extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  }

  static contextTypes = {
    t: PropTypes.func,
    locale: PropTypes.string,
  }

  static childContextTypes = {
    t: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
  }

  getChildContext() {
    const { locale } = this.props

    const polyglot = new Polyglot({
      locale: locale,
      phrases: translations,
    })

    const t = polyglot.t.bind(polyglot)

    return { t, locale }
  }

  render() {
    const { children } = this.props

    return React.Children.only(children)
  }
}
```

Done! Now anywhere in our application we can access the t function and the **locale** that is defined for the application, as long as we get it from context.

But if we access it many, many times we would repeat a lot of code. To deal with this we can use an **HOC**.

### Higher Order Components (HOCs)

A [Higher Order Component](https://reactjs.org/docs/higher-order-components.html) is, basically, a function that receives one Component and returns another one. You can immediately understand how we are going to pair this with our **Provider**. It provided the stuff and now we must get the stuff. It is dead simple:

```javascript
import React, { Component } from "react"
import PropTypes from "prop-types"

const withI18n = ComponentToWrap => {
  return class I18nComponent extends Component {
    static contextTypes = {
      t: PropTypes.func.isRequired,
      locale: PropTypes.string.isRequired,
    }

    render() {
      const { t, locale } = this.context

      return <ComponentToWrap {...this.props} t={t} locale={locale} />
    }
  }
}
```

As you can see, **withI18n**, gets a Component (ComponentToWrap) as a parameter, accesses the provided props from context and returns a brand new Component with those props passed down to it.

So now, whenever we want to access the t function or the app’s **locale** we can just:

```javascript
@withI18n
class MyComponent extends Component {
  render() {
    return <div>{this.props.locale}</div>
  }
}

// or -- depending on your decorator usage

class MyComponent extends Component {
  render() {
    return <div>{this.props.locale}</div>
  }
}

export default withI18n(MyComponent)
```

This stuff is amazing and is something that every React developer should have on his or her’s toolset.

But we don’t always need **Providers** and **HOCs** for cross-cutting concerns. Sometimes it is just too much and the amount of code is just not needed. For these situations we can use one of my favorites.

### [Render props](https://reactjs.org/docs/render-props.html)

> The term [“render prop”](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) refers to a simple technique for sharing code between React components using a prop whose value is a function.

I’ve written about these bad boys before so, if you want to check it out, it’s in the link above.

Used by folks like [Formik](https://github.com/jaredpalmer/formik), [react-router](https://github.com/ReactTraining/react-router) and [react-motion](https://github.com/chenglou/react-motion) this pattern is one of my favorites. Spot your points of code repetition in your code and refactor away.

Like I explain in my post you can use the render props pattern simplify many “day to day” coding problems like list fetching and form submissions.

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

![render props got me dancing](https://media.giphy.com/media/13ugIxvEttdLFe/giphy.gif)

## The future ✨

As I’m writing this piece, the release of a new React version is nearing. **v16.3.0!** And it introduces some new yummy news for the Context API.

Please take a a look a this great post to see what is up in React land!

[What's new in React 16.3(.0-alpha)](https://medium.com/@baphemot/whats-new-in-react-16-3-d2c9b7b6193b)
