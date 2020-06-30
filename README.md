# Colorify
This is an extension for Chrome browsers which detects css recognized color names being used on websites and then colorizes them appropriately.


## Example
The quick brown fox jumps over the lazy rainbow dog.

Black, silver, gray, white, maroon, red, purple, fuchsia, green, lime, olive, yellow, navy, blue, teal, and aqua.


# Docs
Written using Mark.js for search and highlighting functionality, the extension also runs a contrast ratio check to determine if a text-shadow should be applied.

- forEach() loop isn't necessary generally speaking, but is used here to allow for RegExp parsing to accomodate plural forms

## ToDo

- [ ] Seperate very common colors from less common colors, placing them in seperate arrays. Then, hit these arrays one after the other, allowing Mark.js to run on each. This will provide a good user experience to most people while preserving a fun bonus for folks encountering uncommon colors.


