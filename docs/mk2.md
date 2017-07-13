# Introduction

## `assert.file()`

`assert.file()` is the entry point for all assertions

```javascript
assert.file('index.html')
```

Check for the existence of a file, and allow assertions to be run on the content of the file. The available assertions depend on the file type.

### Fails when

* The file is missing
  * `The file "${path}" is missing`
  
# HTML Assertions

The assertion tree for HTML files:

* `assert.file('index.html')`
  * `.element()` or `.querySelector()`
    * `.attr()` or `.attribute()`
      * `.value()`
    * `innerText()` or `text()`
    * `innerHTML()` or `html()` or `innerHtml()`
  * `.elements()` or `.querySelectorAll()`
    * `.count()` or `.number()`
    
## Examples:

Check the class of a `<div>`:

```javascript
assert.file('index.html')
  .element('div')
  .attribute('class')
  .value('banner')  
```

Check the class, ID, and innerText of an `<anchor>`:

```
assert.file('index.html')
  .element('a')
  .all(element => [
    element
      .attribute('class')
      .value('go-to-top'),
    element
      .attribute('id')
      .value('top'),
    element
      .text('Go to top')
  ])
```

Check an anchor element's host ("host" is a property on anchor elements, eg `anchorElement.host`)

```
assert.file('index.html')
  .element('a')
  .custom(
    anchor =>
      anchor.host === "www.ucode.com",
    "This is feedback"
  )
```

### `.custom(checker, feedback)`

#### Arguments

* `checker` : Function

  The callback function which preforms the check. It should accept one argument: the result of the previous function. For example, in the last example, the callback function would receive an anchor element, because the `element()` function was used to locate an anchor element. The callback should return `true` or `false`, based on the result of the check.
  
* `feedback` : String

  The feedback that will be used when the `checker` indicates that the assertion failed. The `checker` can also return a String, which will be used as feedback. This allows for dynamic feedback.


## `assert.all`

Allows multiple assertions to be run

```javascript
assert.all([
  assert.file('index.html'),
  assert.file('style.css')
])
```
