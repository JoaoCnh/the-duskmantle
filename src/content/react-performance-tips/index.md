---
title: React performance tips
description: Make your React app fly!.
date: "2018-01-31"
image: cover.jpeg
tags: ["react", "javascript"]
---

React is awesome! it allows you to start building apps with ease, be it small and simple apps or big and complex apps. As applications evolve, it is only natural for requirements to do so as well and, in consequence, you will eventually need to boost some performance out of your app. There are some problems you might encounter and luckily for you it’s not hard!

**If, for now, you’re stuck building simple applications for learning purposes do not neglect these topics. Please, do browse them and keep them in mind for your future!**

Let’s get to it then!

## Long lists of data

This is a tricky one! When I first started working in React I hit this issue much sooner than I expected. I wanted to render a big list that would be infinite scrolled for more items and pretty soon it became clear that, with 1000+ items being rendered, the app started to lag a little bit.

[react-virtualized](https://github.com/bvaughn/react-virtualized) is the answer!

This package uses a technique called “windowing”. Basically it will only render a small set of the total amount of rows reducing by a large amount the amount of DOM nodes created and the time it takes to render the list.

It gives us some components:

- [List](https://bvaughn.github.io/react-virtualized/#/components/List)  —  to help you render a common scrollable list
- [Grid ](https://bvaughn.github.io/react-virtualized/#/components/Grid) —  to help you render a data grid
- [Table](https://bvaughn.github.io/react-virtualized/#/components/Table)  —  to help you render tabular data
- [Masonry](https://bvaughn.github.io/react-virtualized/#/components/Masonry)  —  to help you render a cool looking list of cards (similar to Pinterest)

This package is truly amazing and as soon as you apply these components you will immediately see some big boosts in performance if long lists were your problem.

If you’re intimidated and by looking at react-virtualized you’re starting to get scared, there is no need to be. They have a wizard that suggests a starting point based on your requirements. Check it [here](https://bvaughn.github.io/react-virtualized/#/wizard)!

## Wasted renders

In big and complex apps, states and updates will be flying everywhere and it is to be expected multiple re-renders of the elements. It is up to you to deal with the **really important** task of avoiding [reconciliation](https://reactjs.org/docs/reconciliation.html).

### First off what is a wasted render?

A wasted render is when a component gets re-rendered when nothing changed within itself and the time that it took to render it was a complete waste. If nothing changes that component should not be rendered right?

### What can you do to detect wasted renders?

First off, Install React Developer Tools for Chrome or Firefox.

[React Developer Tools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

[React Developer Tools for Firefox](https://addons.mozilla.org/en-GB/firefox/addon/react-devtools/)

This will be your best companion to see which components can get optimized and which can’t.

To start looking for updates you can open up developer tools on your Chrome and go to the React tab. Once inside the React tab you will see your app’s JSX structure and some options. Toggle **ON** the option on **Highlight Updates**.

See a full example of this below actually running on Facebook!

https://twitter.com/dan_abramov/status/913730763169914882

As you can see, with proper reconciliation control, as soon as he starts writing a comment, nothing else renders. You will need this tool many times as a React developer to carefully pinpoint what might be tanking your app’s performance.

### You've identified your problematic Components. What can you do?

So you’ve tracked down those pesky components that are rendering needlessly and are taking up rendering time? Let’s take care of them with [shouldComponentUpdate](https://reactjs.org/docs/react-component.html#shouldcomponentupdate)!

![shouldComponentUpdate reconciliation example tree](https://cdn-images-1.medium.com/max/800/1*D7xzr8X02K3ROQFfGTGWSA.png)

> Use shouldComponentUpdate() to let React know if a component’s output is not affected by the current change in state or props. The default behavior is to re-render on every state change, and in the vast majority of cases you should rely on the default behavior.
>
> shouldComponentUpdate() is invoked before rendering when new props or state are being received. Defaults to true. This method is not called for the initial render or when forceUpdate() is used.

Let’s say you have an Avatar component that renders the user’s photo at all times and if you click it, a dropdown opens below.

Just from specifying my example it is easy to understand that such a simple thing should not be re-rendering at all times. It is wasting time and resources.

With a quick **shouldComponentUpdate** refactoring your component can become a time-saver.

```javascript
import React from "react"

export default class Avatar extends React.Component {
  state = {
    open: false,
  }

  shouldComponentUpdate(nextProps, nextState) {
    const photoChanged = this.props.avatarUrl !== nextProps.avatarUrl
    const optionsWereToggled = this.state.open !== nextState.open

    return photoChanged || optionsWereToggled
  }

  render() {
    return (
      <div>
        <img src={this.props.avatarUrl} />
        {this.state.open && <Dropdown />}
      </div>
    )
  }
}
```

It receives the avatar url by props and has its own state so, in **shouldComponentUpdate**, we check if the url changed or if the options were toggled ON. If any of these statements gets verified then it should re-render.

You can even simplify it further! If you’re getting tired of making simple checks (only one prop or two) you can simply extend from [React.PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent) instead of **Component** because it does the checking for you.

> React.PureComponent is similar to React.Component. The difference between them is that React.Component doesn’t implement shouldComponentUpdate(), but React.PureComponent implements it with a shallow prop and state comparison.

The first time I refactored a codebase to actually have reconciliation control the difference was night and day. I was amazed!

![my genuine reaction](https://cdn-images-1.medium.com/max/800/1*bGo37peHzBWFxc5Ga1D52g.gif)

## Last but not least, Gigantic bundles

Apps begin as a super small affair and with time they start becoming huge behemoths, as features start getting added and dependencies are poured in. Soon enough you end up with a **HUGE** production file that you feel bad for actually deploying. Not anymore!

### Make sure you separate your vendor bundle from your app's bundle

Get to know the awesome CommonsChunkPlugin for Webpack.

[Commons Chunk Plugin for Webpack](https://webpack.js.org/plugins/commons-chunk-plugin/)

This is pretty straight forward. Instead of bundling everything into your **app.bundle.js**, webpack will put every single vendor related code into another bundle (let’s say **vendor.bundle.js**) separating the original one into 2 and, in consequence, reducing the original file size.

To some apps this is enough but you can go a step further!

### Code-splitting

Code-splitting is basically separating your 1 bundle app into several other bundles that can be “lazy-loaded” at runtime.

[Code-Splitting - React](https://reactjs.org/docs/code-splitting.html)

> Code-splitting your app can help you “lazy-load” just the things that are currently needed by the user, which can dramatically improve the performance of your app. While you haven’t reduced the overall amount of code in your app, you’ve avoided loading code that the user may never need, and reduced the amount of code needed during the initial load.

This is extremely important and yet, incredibly easy to achieve!

**[react-loadable](https://github.com/thejameskyle/react-loadable) makes it dead simple to lazy load components when they’re needed and it even works with react-router! So you also have lazy-loaded routes!**

[React Router: Declarative Routing for React](https://reacttraining.com/react-router/web/guides/code-splitting)

### How can I identify problematic bundles or chunks of code?

If you want to check what exactly is being bundled into your final file you can use the fantastic [Webpack Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)!

![webpack analyzer in action](https://cdn-images-1.medium.com/max/800/1*dusVhPiL44VDoS4gJHMWSg.gif)

With a drop of just one line of code (defaults) you can fire up an analyzer window on build to see what constitutes your bundle. Make use of this tool and you can start improving your app in no time.

**This package also helps you analyze good opportunities to take advantage of [tree-shaking](https://webpack.js.org/guides/tree-shaking/) (dead-code elimination).**

If you’re app uses lodash (let’s say 3 or 4 functions) for some reason, using wepback-bundle-analyzer you would see a really large square of the lodash code taking up a big chunk of the bundle. That is because lodash doesn’t use ES Modules and Webpack doesn’t know how to “shake off” the dead code that you aren’t using. This is a nice point to improve and luckily there is a [lodash implemented using ES Modules](https://www.npmjs.com/package/lodash-es) that webpack can eliminate all the code you aren’t importing in your app.

If you want a more simple view with more details of what is happening during build you can use tools like:

[zouhir/jarvis](https://github.com/zouhir/jarvis)

[FormidableLabs/webpack-dashboard](https://github.com/FormidableLabs/webpack-dashboard)

---

Hey! You have arrived at the end! I really hope you’ve learned some useful tips for improving performance on your React app and before anything else I must thank you for sticking until the end 😃

![domo arigato](https://media.giphy.com/media/3oz8xIsloV7zOmt81G/giphy.gif)
