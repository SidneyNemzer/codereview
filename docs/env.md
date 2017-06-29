# The `env` variable

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

# The custom `HTMLElement`

Note that this is *not* the same as the standardized 'HTMLElement'

Overview of the custom `HTMLElement`

```javascript

```
