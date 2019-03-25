---
title: Premature Optimization - Should we do it?
description: I dive into the difference between optimization and refactoring and how they affect development.
date: "2017-07-10"
tags: ["programming"]
---

> This is an opinion piece focusing on Web Development. If you do not agree with some/all of my arguments it’s okay. We can also have a peaceful discussion on these topics in a civilized manner and we call all learn.

I’ve had the pleasure to work with a lot of technologies and frameworks over the years, from ASP.NET (MVC and WebForms), Ruby on Rails, Node, Golang, PHP, and one thing I’ve noticed is that a lot of people are kind of obsessed with code optimization. **I’m all for code optimization but sometimes we just shouldn’t care or bother.**

## Confusing refactoring with optimization

Many people confuse **refactoring** with **optimization**.

## What is refactoring?

Refactoring is the process in which a developer restructures existing code, without changing its behavior, to make it more readable. For example changing variables/functions names to express in a better way what they do and making code simpler to read and understand.

For example this piece of code:

```javascript
if (data.length === 0 && helperClass.isValid(Math.ceil(data.someValue))) {
  runFunctionA(data)
} else {
  runFunctionB(data)
}
```

Can and should be refactored into:

```javascript
const dataIsEmpty = data.length === 0
const valueCeil = Math.ceil(data.someValue)
const valueCeilIsValid = helperClass.isValid(valueCeil)

if (dataIsEmpty && valueCeilIsValid) {
  runFunctionA(data)
} else {
  runFunctionB(data)
}
```

I feel that, like this, the code is more readable and more maintainable. That if statement is almost proper English and without spending too much **brain power** (cool word right?! 😏) we can easily say how that code is going to work and if one day one of the checks changes we can easily change it without being afraid to break the entire thing.

### A bad refactoring

In my opinion this code right here is bad refactoring for this example:

```javascript
const dataIsEmpty = data.length === 0
const valueCeil = Math.ceil(data.someValue)
const valueCeilIsValid = helperClass.isValid(valueCeil)

dataIsEmpty && valueCeilIsValid ? runFunctionA(data) : runFunctionB(data)
```

**What?! Are you crazy?! Inline ifs are bad refactoring??!!!111!!1! 😠 😠**

Hey, hear me out now 😅

> More code does not necessarily equate to bad code

Inline ifs are cool when we learn them in college or school, those times when we name variables/functions like **x, y and var1**. But in the real world (real apps, real jobs) we are not naming those kinds of variables/functions like that. Plus, if that feature one day needs to scale most likely you will turn that inline if into a regular if. You turn that inline if into multiple inline ifs combined…well…good luck maintaining that code yourself for 2-plus years buddy 😅

My point here being that inline ifs are not better than regular ifs, it depends on the project style guides imposed by the team or project manager. **If you are working alone feel free to do whatever you want. If you’re working in a team follow what was imposed or agreed upon by everyone. Having similar (if not equal) features, in the same project, coded completely different can be a maintenance hell. Please don’t do it for your sake and the sake of others.**

## What is optimization

Optimization is when a developer changes code so that it runs more efficiently and/or faster than it previously did.

In my opinion I think optimization should be debated when a team is designing an application. Even when they’re choosing which language to use.

**How will my application be used, how many users are we expecting?, will we grow?, how much will we grow? will we need threading?**

These are all things that matter. If you absolutely need a super, blazing fast system don’t choose a slow (compared to fast ones DUH!) framework to work on.

### Should we do it?

Well, my answer is:

Yes if you absolutely need it. Absolutely means that if you do not optimize your code, your production build does not run properly. If that is not the case, only optimize if it does not affect code readability. **These tweets put into perfect wording what I mean by this:**

https://twitter.com/creationix/status/875694752074747904

https://twitter.com/creationix/status/875694489112805380

**Sometimes early code optimization can go like this:**

You have a deadline to deliver a feature. You start coding it and you actually have it working and works just fine and fast. You do some refactoring here and there and you could push the finished feature. But you cannot resist that urge to optimize.

> Yeah, if I do this and I do that I can shave off 0.4ms of total running time of this entire feature. WOW!

![wow](https://cdn-images-1.medium.com/max/800/1*bGo37peHzBWFxc5Ga1D52g.gif)

But sometimes things don’t go as expected, we all make mistakes and that optimized code changes some behavior deep in the features core.

And you feel like the cat below. Trying to get out of a sticky situation and properly missed the features deadline, rushing to get rid of the bugs introduced and properly still ending up with unpredictable, buggy code.

![oops](https://cdn-images-1.medium.com/max/800/1*7c-A_Q1jngrwopjKOmzk7Q.gif)

My example was **exaggerated** on purpose. It has happened to me, to people I know, all of us. But I chose to learn from it. **If I’m 100% certain I’ll need the optimization later, I’ll do it. If not?! Save it for later when you can benchmark your system (but please leave your code readable and easy to maintain)**.

### Some exceptions

Of course there are optimization exceptions. Things you can incorporate into your coding habits that will make your code better and in less need of being optimized.

It differs from language to language but some can be:

#### SQL queries

Of course you should spend always a bit of time making your database calls as optimized as you can. Since SQL will run in its own layer whatever framework you use won’t have any control over the speed.

**If you have the time** to spare optimize your queries. But learning good SQL practices is important.

#### Caching jQuery lookups (when using jQuery)

**BAD**

```javascript
function setSidebar() {
  $(".sidebar").hide()

  $(".sidebar").css({
    "background-color": "pink",
  })
}
```

**GOOD**

```javascript
function setSidebar() {
  var $sidebar = $(".sidebar")
  $sidebar.hide()

  $sidebar.css({
    "background-color": "pink",
  })
}
```

#### Javascript optimized for loop

```javascript
// normal loop
for (var i = 0; i < array.length; i++) {
  console.log(array[i])
}

// optimized loop
for (var i = array.length - 1; i >= 0; i--) {
  console.log(array[i])
}
```

In most cases you’ll never need this sort of for-loop optimization. But what happens is that in the normal loop you are evaluating **array.length** in each iteration of the loop whereas in the optimized loop you only evaluate **array.length** once, when you declare i.

If after these examples you’rethinking:

> Why do this loop if it isn’t that much faster?

That’s the point I’m trying to get across! The same thing can be said for **switch cases** and **if else**. It doesn’t matter if one is ms faster than the other. Code the one that is the most readable, maintainable and easier to scale (and makes sense 😏)!

## What to do?

![diagram](https://cdn-images-1.medium.com/max/800/1*Quvchl344XDQ7uVUxAVm4g.png)

When I first start a new feature I don’t care about top of the line optimization. For fast development and iteration I usually build a prototype.

I don’t care if this loop can be better, I don’t care if my variables/functions are not named properly, I don’t care if I didn’t declare my Internationalization Resources. What I care about is functionality and my use cases working.

Once that is done I go for a refactor round. I start separating code, extracting functions, properly naming variables and functions, adjusting if clauses and doing whatever needs to be done for my code to be readable and easy to maintain. Sometimes that’s easier said than done but we can always refactor to some point.

**You’d be surprised to how much faster you will be developing like this, at least I can develop much faster following these steps.**

If after some time in production you (or your clients) start noticing some performance issues it means that work must be allocated into making the system faster. **But you shouldn’t go blindly optimizing every bit of code you can find!**

First you should identify which parts of the system are slower and benchmark them. Benchmark everything, rendering times, SQL execution times, everything. Identify the problem(s) and start attacking those individual problems. **Again, easier said than done but it’s our job and someone’s gotta do it.**

### What to do - instead of focusing on loops, variables and inline ifs

These things are not real optimization. Get that in your head. Compilers, Interpreters, etc. are our friends and they do their job just fine for us.

We need to focus our efforts into making some maintainable code.

Real optimization might come in the form of caching SQL query results for example. Caching server side (Framework caching tools, Redis), Caching client side (localStorage, sessionStorage) do whatever you want.

> Cache

Cache is the main word here. Caching is one of the best forms of optimization nowadays in web development. Learn to properly cache stuff in your system and you can truly make it faster.

## Conclusion

> Write the code that is easiest to maintain, easiest to understand, the simplest and most elegant.

Don’t start worrying too much about optimization at the start. Worry more about code maintainability and readability. Optimization comes later and if you need it.

I repeat these are all my opinions and if you do not agree with me, you have the right to do so.
