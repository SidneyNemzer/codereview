## Rules Object

Rules are functions that check a specific part of the code. If a rule fails, the submitted code fails. If all rules pass, the submitted code passes.

Define a rule to check that no style elements are used in the submitted code:

```javascript
/* Example 1 */
rules = {
  // The key is the name of the rule
  // The name is used to enable or disable the rule later
  'no-style-element': function (env) {
    // We'll do the body in the next example
  },

  // Alternatively
  'no-style-element': env => {

  },

  // Or
  noStyleElement(env) {

  }  
}
```

The first or second definitions are preferred, because rules should use dashes (`-`) instead of camel case, similarly to ESLint or JSHint. However, the third method does work.

### The `env` Object

Rules inspect the given code using the `env` Object. The `env` looks like this:

(See the next section for specific usage)

```javascript
env = {
  rawInput: 'string', /* the exact code that was submitted */
  findElement: 'function', /* locate an element in the processed page */
  /* ... more to come later */
}
```


## Feedback Object

```javascript
feedback = {

}
```

Keys are the name of a rule, and the value is used to turn the rule on or off, or change the feedback.

```javascript
/* Example 1 */
feedback = {
  'rule-1': true,
  'rule-2': false,
  'rule-3': 'rule three failed'
}
```

In `Example 1`, `rule-1` is turned on, `rule-2` is turned off, and `rule-3` is turned on.

Rule 1 uses it's default feedback, while rule 3 uses special feedback (`"rule three failed"`)

Set a rule to one of the following:

### `Boolean`

Rule is turned on when the boolean is `true`, off when `false`

```javascript
feedback = {
  'rule-1': true,
  'rule-2': false
}
```

### `String`

Rule is turned on, uses the given string as feedback

```javascript
feedback = {
  'rule-1': 'Rule 1 failed' // Obviously this is very bad feedback -- it's just an example
}
```

### `Object`

Turns the rule on, and may set special keys to modify the rule.

```javascript
feedback = {
  'rule-1': {
    feedback: 'Rule 1 failed', // Feedback to use for the rule
    options: { // An object that gets passed to the rule
      option1: false // Options can be arbitrarily defined by the rule
    }
  }
}
```
