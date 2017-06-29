# Code Evaluation System

> v1.0  
> Well, not yet. I'm still working on this MVP. But once I'm done, I'll call it version 1.0

## Introduction

The most effective learning makes use of instruction *and* evaluation. Instruction is fairly straight-forward. And in many cases, so is evaluation. Multiple choice questions can enhance learning, but the best evaluation for programing is *code exercises*, where the student writes their own code to complete a goal.

Ideally, these *code exercises* can be graded automatically. Maybe a human is needed to setup the grading, bycreating rules for what the code should look like. However, there are a few issues with automatically grading code.

Most programing languages are designed to be written correctly. That is, most compilers or interpreters don't handle certian mistakes well. Forget a single character, or missplace a token, and the resulting errors can be unintelligible to a beginner. Beginners benefit from careful guidence, but at the same time, compilers/interpreters shouldn't have to concern themselves with the mistakes that a beginner could make.

An instructor or teacher could provide such guidance, but reading lines upon lines of microscopic mistakes is exhausting. The next best option is to make a computer read the code, and provide guidence.

The concept is simple, but the implementation may not be; we must create code that reads code, points out common mistakes, and verifies that the goal was acheived.

Furthermore, the 'goal' cannot be hard-coded; it will be different for each exercise. So this system should also allow the goal to be specified, and allow helpful feedback to be provided which guides the student toward the goal.

Version 1.0 is targeted at HTML and CSS. Exercise 'rules' are written in JavaScript.

**TLDR** This API assists in auto-grading code exercises

## The Code Review API

The designer creates 'rules', which preform checks on submitted code, then return a pass or fail result. The `codeReview` Object provides access to this API.

## Table of Contents

1. Rules
  1. The `env` variable
1. Assert
1. Feedback

## Rules

A 'rule' is a function that takes an `env` Object (and possibly some options), preforms a check on the submitted code, then returns a pass or fail result. (Read more about the `env` in the next section).

### `ces.newRule( Object: ruleDefinition )`

#### Simple rule definition

```javascript
ces.newRule({
  name: 'example-name', 
  // string, must be unique
  
  feedback: "You're missing a `doctype` tag! You should always include a doctype declaration",
  // string, used if the check fails
  
  check: env =>
    env.doctype == 'HTML5'
  // function, returns true/false if the check passed/failed
})
```

#### Rule that accepts arguments

```javascript
ces.newRule({
  name: 'example-name', 
  feedback: "You're missing a `doctype` tag! You should always include a doctype declaration",  
  
  options: { // Object, keys are the name of options
    version: 'HTML5' // value is the default for the option. 
                     // type is strict (eg the rule may not be called with an array if the default is a string)
  }, 
  
  check: (env, options) => // check should accept 'options' object too
    env.doctype == options.version
      
  // alternate syntax (ES2015)
  check: (env, {version}) =>
    env.doctype == version
})
```

#### Rule that returns dynamic feedback

```javascript
ces.newRule({
  name: 'example-name',
  
  // No 'feedback' key is needed in this case
  
  check: env => {
    if (env.doctype == 'HTML4') {
      return 'It looks like you used the HTML4 doctype! Please use the HTML5 doctype.'
    } else if (env.doctype != 'HTML5') {
      return "You're missing a `doctype` tag! You should always include a doctype declaration"
    }
  }
  // returning a string means 'fail' and the string is used as feedback
  // returning 'true' or 'undefined' means 'pass'
})
```

#### Using templated feedback

All feedback may contain special templates, which are dynamically filled in before being presented to the user

```javascript
ces.newRule({
    name: 'basic-structure',
    feedback: "You're missing {{ an_some }} important {{ word }}: {{ list }}",
    // In this example, the number of items in the 'list' is used
    // to derive whether or not the scentence is plural
    
    // Example result:
    // "You're missing some important elements: body, html, and head"
    
    options: {
        checkFor: ['body', 'html', 'head']
    },
    check: (env, options) => {
        const checkFor = options.checkFor
        
        const missingElements = checkFor.filter(tagName => {
            return !env[tagName]
        })
        
        return { // Returning an Object means "This failed" and "Use the Object to template the feedback"
            list: missingElements, 
            word: 'element'
        }
    }
})
```

See the "Feedback" section for the exact usage of template feedback

### `ces.aliasRule( Object: aliasDefinition )`

Rules may be *aliased* to create a new rule, which uses an existing rule and a new default options

```javascript
// Assumes we have the 'basic-structure' rule from the last example
ces.aliasRule({
  name: 'basic-structure', // The existing rule
  alias: 'has-body-tag', // The alias to create
  options: {
    checkFor: ['body', 'html', 'head']
  }
})
```

An important aspect of the library is that it can check that names are correct. For example, if you try to alias the `basic-structur` rule, it should error, and say "Hey, you don't *have* a 'basic-structur' rule". Or if an alias tries to provide a default for the `checkFar` option, it errors and tells you that the 'basic-structure' rule doesn't have a 'checkFar' option.

This aspect will be a huge help when developing exercises, because it's a big step toward preventing an exercise from failing due to a mistake in the assertion code.

## The `env` variable

The `env` variable is passed to 'check' functions, and allows the function to inspect the submitted code.

Here's an overveiw of the `env`:

*Note: I plan to add a custom element Object*

```javascript
env.element( String: cssSelector ) -> Object: HTMLElement
env.elements( String: cssSelector ) -> Array of HTMLElement

env.html -> Object: HTMLElement // Shortcut to 'html' element
env.head -> Object: HTMLElement // Shortcut to 'head' element
env.body -> Object: HTMLElement // Shortcut to 'body' element
```

## The custom `HTMLElement`

Note that this is *not* the same as the standardized 'HTMLElement'

Overview of the custom `HTMLElement`

```javascript

```

## Assert

The `assert` function

## Feedback

The 'feedbacker' function provides a simple way to create flexible feedback

### `ces.feedbacker( string: template, Object: options )`

#### Pluralize a noun based on a number

```javascript
ces.feedbacker('There {{ is_are }} {{ number }} {{ word }}',
  {
    word: 'error',
    number: 10
  })
// -> "There are 10 errors"
```

`word` is pluralized with an 's' automatically. If the word pluralizes in a special way:

```javascript
ces.feedbacker('There {{ is_are }} {{ number }} {{ word }}',
  {
    word: {
      singular: 'city',
      plural: 'cities'
    },
    number: 10
  })
// -> "There are 10 cities"
```

To have the number spelled out:

```javascript
ces.feedbacker('There {{ is_are }} {{ spell_number }} {{ word }}',
  {
    word: 'error',
    number: 10
  })
// -> "There are ten errors"
```

### Insert an array into a scentence

In this case, `word` is pluralized based on the number of items in `list`

```javascript
ces.feedbacker("You're missing the {{ list }} {{ word }}",
  {
    word: 'element',
    list: [
      'body',
      'html'
    ]
  })
// -> "You're missing the body and html elements"
```

```javascript
ces.feedbacker("You're missing the {{ list }} {{ word }}",
  {
    word: 'element',
    list: [
      'body'
    ]
  })
// -> "You're missing the body element"
```

### Dynamic feedback from a rule

Rules can return dynamic feedback by setting their `feedback` key to the template string, then return an Object to use as options

`number` uses the lenght of the `list`, if a `list` is provided

```javascript
ces.newRule({
    name: 'basic-structure',
    feedback: "You're missing {{ number }} important {{ word }}: {{ list }}",
    options: {
        checkFor: ['body', 'html', 'head']
    },
    check: (env, options) => {
        const checkFor = options.checkFor
        
        const missingElements = checkFor.filter(tagName => {
            return !env[tagName]
        })
        
        return { // Returning an Object means "This failed" and "Use the Object to template the feedback"
            list: missingElements, 
            word: 'element'
        }
    }
})
```
