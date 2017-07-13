# `assert` Object

The entry point for all assertions

## `assert.file( path )`

Check for the existance of a file, and allow assertions to be run on the content of the file. The availible assertions depend on the file type.

```
assert.file('index.html')
```

### Fails when

* The file is missing
  * `The file "${path}" is missing`

## `assert.all`

Allows multiple top-level assertions to be run

```
assert.all(
  assert.file('index.html'),
  assert.file('style.css')
)
```
