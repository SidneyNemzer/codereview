# Code Evaluation System

'Rules' are defined, which preform checks on submitted code, then return a pass or fail result.

Rules may be created globaly, and applied to multiple submissions

1. Rules
2. The `env`
3. Assert

## Rules

A 'rule' is a function that takes an `env` Object (and possibly some options), preforms a check on the submitted code, then returns a pass or fail result.

### `rules.new( Object: ruleDefinition )`

#### Simple rule definition

```javascript
rules.new({
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
rules.new({
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
rules.new({
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

All feedback may contain special templates, which are dynamically filled in before being presented to the user.

Some use cases of tempated feedback:

* Dynamically pluralize words
  * "There **is** 1 **error**" VS "There **are** 2 **errors**"
* Dynamically insert an array into a scentence
  * `['body', 'html', 'head']` -> "You're missing the **body, html, and head** tag**s**"
  * `['body', 'html']` -> "You're missing the **body and html** tag**s**"
  * `['body']` -> "You're missing the **body** tag"
  
```javascript
rule.new({
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

See the "Feedback" section for exact usage of template feedback

### `rules.alias( Object: aliasDefinition )`

Rules may be *aliased* to create a new rule, which uses an existing rule and a new default options

```javascript
// Assumes we have the 'basic-structure' rule from the last example
rule.alias({
  name: 'basic-structure', // The existing rule
  alias: 'has-body-tag', // The alias to create
  options: {
    checkFor: ['body', 'html', 'head']
  }
})
```

An important aspect of the library is that it can check that names make sense. For example, if you try to alias the `basic-structur` rule, it could error, and say "Hey, you don't *have* a 'basic-structur' rule". Or if an alias tries to provide a default for the `checkFar` option, it errors and tells you that the 'basic-structure' rule doesn't have a 'checkFar' option.

This aspect will be a huge help when developing exercises, because it's a big step toward preventing an exercise from failing due to a mistake in the assertion code.

## Assert

The `assert` function
