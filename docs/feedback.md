# Feedback

The 'feedbacker' function provides a simple way to create flexible feedback

## `ces.feedbacker( string: template, Object: options )`

### Pluralize a noun based on a number

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

### Insert an array into a sentence

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
