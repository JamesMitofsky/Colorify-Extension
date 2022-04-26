# Colorify

A Chrome extension which changes the hue of words on any website to match the name of a color. For example, if the word "blue" is on a website, the extension will color that — in fact — the color blue. Any named color in CSS will be picked up like this!

[Install the extension here!](https://chrome.google.com/webstore/detail/colorify/gkfgdccfjiaokigodbfmgbdifbemopdb)

## Run Locally

1. Navigate to `chrome://extensions/`
2. Enable "Developer Mode"
3. Load Unpacked
4. Open local folder that contains manifest.json

## Example

If the extension is running, you should be viewing a radical improvement to quality of life:

Black, silver, gray, white, maroon, red, purple, fuchsia, green, lime, olive, yellow, navy, blue, teal, and aqua.


# Docs

Written using Mark.js for search and highlighting functionality, the extension also runs a contrast ratio check to determine if a text-shadow should be applied.

- forEach() loop isn't necessary generally speaking, but is used here to allow for RegExp parsing to accomodate plural forms

## ToDo

- [ ] Seperate very common colors from less common colors, placing them in seperate arrays. Then, hit these arrays one after the other, allowing Mark.js to run on each. This will provide a good user experience to most people while preserving a fun bonus for folks encountering uncommon colors.


