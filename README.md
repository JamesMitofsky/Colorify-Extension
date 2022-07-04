# Colorify

A Chrome extension which changes the hue of words on any website to match the name of a color. For example, if the word "blue" is on a website, the extension will recolor the word to _literally_ be blue. [🧑‍🎨 Install the extension!](https://chrome.google.com/webstore/detail/colorify/gkfgdccfjiaokigodbfmgbdifbemopdb)

## Example
This is an excerpt from the rainbow page of Wikipedia:

<img width="450" alt="Capture d’écran 2022-07-04 à 15 07 14" src="https://user-images.githubusercontent.com/12516538/177161280-abcc4999-e9aa-4e73-8716-954e06952c3f.png">

## Demo

But if you install the extension, you should be viewing a radical improvement to your quality of life:

Black, silver, gray, white, maroon, red, purple, fuchsia, green, lime, olive, yellow, navy, blue, teal, and aqua.


# Docs

## Run Locally
1. Navigate to `chrome://extensions/`
2. Enable "Developer Mode"
3. Load Unpacked
4. Open local folder that contains manifest.json

Written using Mark.js for search and highlighting functionality, the extension also runs a contrast ratio check to determine if a text-shadow should be applied.

- forEach() loop isn't necessary generally speaking, but is used here to allow for RegExp parsing to accomodate plural forms

## To-Dos

- [ ] Seperate very common colors from less common colors, placing them in seperate arrays. Then, hit these arrays one after the other, allowing Mark.js to run on each. This will provide a good user experience to most people while preserving a fun bonus for folks encountering uncommon colors.


