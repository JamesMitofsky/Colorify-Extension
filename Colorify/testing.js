
main()


async function main() {

  // declare searching every element
  var instance = new Mark(document.querySelector("body"));


  // load every color
  let colorsObj = await loadColors()
  let cssColors = colorsObj.colors


  // check every color
  cssColors.forEach(color => {

    // set options for mark search
    let options = {
      // ignore partial matches
      "accuracy": "exactly",

      // override mark default to prevent browser from applying styles
      "element": "span",

      // set style param for all matches
      "each": (el) => {
        el.style.color = color
        el.style.fontWeight = "bolder"

        requiresBackground(el)
        console.log(el.innerText)

        // if (requiresBackground(el)) {
        //   el.style.textShadow = "0 0 2px black"
        // }
      },

      // ignore all links, code blocks, and their children
      "exclude": ["a", "a *", "pre", "pre *"]
    }


    // optionally catch pluralized color
    let colorExp = new RegExp(`(\\b${color}s?\\b)`, 'i')

    // match color exactly
    instance.markRegExp(colorExp, options)

  })
}



async function loadColors() {
  const url = chrome.runtime.getURL('data/colors.json');
  let response = await fetch(url)
  let json = await response.json()

  return json
}


function requiresBackground(el) {

  let computedStyles = window.getComputedStyle(el)

  let elColor = computedStyles.getPropertyValue('color')
  let elBackground = computedStyles.getPropertyValue('background-color')


  // must be fed the computed style (which is RGB or HEX)

  //  elColor = '000000'
  //  elBackground = '000000'

  console.log(el, elColor, elBackground)


  let result = calculateRatio(elColor, elBackground)

  console.log(result)

  // return whether a background is needed



}



// function from https://stackoverflow.com/a/5624139/3695983
function hexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToObject(rgb) {

  let digitsPattern = new RegExp('\\d{1,3}', 'gi')

  let rgbArray = rgb.match(digitsPattern)

  rgbObj = {
    r: parseInt(rgbArray[0]),
    g: parseInt(rgbArray[1]),
    b: parseInt(rgbArray[2])
  }


  return rgbObj

}



// function from https://stackoverflow.com/a/9733420/3695983                     
function luminance(r, g, b) {
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928
      ? v / 12.92
      : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function calculateRatio(color, background) {


  // if matches RGB, skip processing
  let rgbPattern = new RegExp('(?<=RGBA*\\().*(?=\\))', 'i')

  if (rgbPattern.test(color)) {
    colorRGB = rgbToObject(color, rgbPattern)
  } else {
    colorRGB = hexToRgb(color);

  }

  if (rgbPattern.test(background)) {
    backgroundRGB = rgbToObject(background, rgbPattern)
  } else {
    backgroundRGB = hexToRgb(background);
  }


  // calculate the relative luminance
  const backgroundLuminance = luminance(backgroundRGB.r, backgroundRGB.g, backgroundRGB.b);
  const colorLuminance = luminance(colorRGB.r, colorRGB.g, colorRGB.b);

  console.log(backgroundLuminance, colorLuminance)

  // calculate the color contrast ratio
  const ratio = backgroundLuminance > colorLuminance
    ? ((colorLuminance + 0.05) / (backgroundLuminance + 0.05))
    : ((backgroundLuminance + 0.05) / (colorLuminance + 0.05));

  return ratio;
}