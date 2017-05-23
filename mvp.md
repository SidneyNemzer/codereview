# Code Evaluation System

'Rules' are defined, which preform checks on submitted code, then return a pass or fail result.

Rules may be created globaly, and applied to multiple

1. Rules
2. The `env`
3. Assert

## Rules

A 'rule' is a function that takes an `env` Object (and possibly some options), preforms a check on the submitted code, then returns a pass or fail result.

### The `rules` API

#### `rules.new(` rule definition `)

```javascript
/* Simple rule definition */
rules.new({
  name: 'example-name', 
  // string, must be unique
  
  feedback: "You're missing a `doctype` tag! You should always include a doctype declaration",
  // string, used if the check fails
  
  check: env =>
      env.doctype == 'HTML5'
  // function, returns true/false if the check passed/failed
})


/* Rule that accepts arguments */
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
