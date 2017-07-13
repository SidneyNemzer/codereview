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

Check an anchor element's host (`anchorElement.host`)

```
assert.file('index.html')
  .element('a')
  .custom() // TODO
```

## `assert.all`

Allows multiple assertions to be run

```javascript
assert.all(
  assert.file('index.html'),
  assert.file('style.css')
)
```
