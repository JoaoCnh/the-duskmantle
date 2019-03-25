---
title: React/Javascript - A love story
description: I try to explain why React is Amazing.
date: "2017-07-02"
image: cover.jpg
tags: ["javascript", "react", "programming"]
---

Have you ever reached a point in your (programming) life where you feel like whatever you do feels boring and stale?

Over a year ago I felt a lot like this and I didn't understand why. I worked with ASP.NET, Ruby on Rails, PHP...
How can such variety of technologies be boring? Well, it wasn't the technologies fault, but what I was building with them.

The world of the Web changed tremendously and apps that are well-made (at least in my opinion) are those which are responsive, dynamic, animated and functional. The user never feels like he’s out of that applications world and everything interacts with the user in a smart and meaningful way.

What I was building in my company was none of that. The functional part was present (as it must always be) but I didn’t feel like I wanted to use those apps. I realised I didn’t want the standard MVC framework workflow anymore, I wanted something new, I wanted better!

> I wanted something new, I wanted better!

Soon after, my company proposed some tutorials and courses to learn more about Javascript (YES!) and more importantly, React JS. At the time I only had knowledge of Angular JS but React came in to blow my mind, Javascript to express UI? Sign me up.

> Javascript to express UI? Sign me up

To this day I’m hooked on React. We have so many things like Angular JS, Angular 2, 3, 4 (topkek), Vue JS, … but having tried them all, React is the clear winner for me. Nothing makes more sense to me than having my application composed by several interchangeable components and all that using and expressing myself with Javascript. I don’t need to know templating, directives, nothing… It’s all plain Javascript. The possibilites are endless.

I’m gonna try and demonstrante my feeling with an Example using Angular and another using React. Please no snowflakes in here, use whatever floats your boat.

---

## Simple Angular Example

2-way data binding right? sucks...

```javascript
var app = angular.module("testApp", [])

app.controller("testController", function($scope) {
  $scope.name = "Joao Cunha"
})

app.directive("helloWorld", function() {
  return {
    restrict: "E",
    template: "<div>Hello, {{name}}!</div>",
    scope: {
      name: "@",
    },
  }
})
```

```html
<html ng-app="testApp">
  <head></head>
  <body ng-controller="testController">
    <hello-world name="{{name}}" />
  </body>
</html>
```

[Link to example](https://codepen.io/Lokuzt/embed/owqmXv)

Now you can see the immediate pains of 2-way data binding and (in my opinion) the boring step of expressing UI with my html plus expressing it’s behavior with my Javascript. To me it never made any sense and always felt cumbersome.

## Enter React JS

```javascript
import React from "react"
import ReactDOM from "react-dom"

function Hello(props) {
  return `Hello ${props.name}`
}

function App() {
  return <Hello name="João Cunha" />
}

ReactDOM.render(<App />, document.getElementById("#app"))
```

To me this just screams **simplicity** and **smart**! My html is just a holder for my entire application. I express the UI and its behavior entirely with my JS code making it faster and easier to understand.

---

Now I know these are really simple examples and don’t express nothing that’s gonna be built in the real world. I used these examples in a shallow effort to express my love for React and it’s simplicity. I don’t want to start a debate I’m just expressing myself.

This is my ongoing love story with React and I hope to share many more things in the future built with it (got some in the oven right now).
