
main()


async function main() {


  // load colors in batches from json - disabled because it slowed down performance 2x from 3s to 6s
  let colorsObj = await loadColors()
  let colorsArray = [colorsObj.commonColors, colorsObj.uncommonColors]

  colorsArray.forEach(arrayGroup => {
    
    markColor(arrayGroup)

  })

}




function markColor(readableColors) {

  // declare searching every element
  let instance = new Mark(document.querySelector("body"));

  // check every color
  readableColors.forEach(color => {
    let cssColor = color.replace(/ /g, "")

    let options = {
      // ignore partial matches
      "accuracy": "exactly",
      // override mark default to prevent browser from applying styles
      "element": "span",
      // ignore all links, code blocks, and their children
      "exclude": ["a", "a *", "pre", "pre *"],
      // keep search values connected
      "separateWordSearch": false,

      // set style param for each  match
      "each": (el) => {
        el.style.color = cssColor
        el.style.fontWeight = "bolder"

        let background = requiresBackground(el)
        if (background.state) {
          // el.style.backgroundColor = background.shade
          el.style.textShadow = `0 0 2px ${background.shade}`
        }
      }
    }


    // catch singular and plural forms with any casing
    let colorExp = new RegExp(`(\\b${color}s?\\b)`, 'i')

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

  // get elm color
  let computedStyles = window.getComputedStyle(el)
  let elColorStyle = computedStyles.getPropertyValue('color')
  let elColor = rgbToObject(elColorStyle)

  // return object from function with RGB
  let elBackground = scanForBackgroundColor(el)


  // must be fed the computed style (which is RGB or HEX)
  let result = calculateRatio(elColor, elBackground)

  console.log(elBackground)
  console.log(result.backgroundLuminance, result.colorLuminance)


  // if ratio is accessible, exit function
  // 0.14285 (7.0:1) for small text in AAA-level
  // 0.22222 (4.5:1) for small text in AA-level, or large text in AAA-level
  // 0.33333 (3.0:1) for large text in AA-level
  // set to .5 based on silver appearing against white
  if (result.ratio < .55555) return { state: false }


  if (result.backgroundLuminance >= result.colorLuminance) {
    console.log("background is lighter,")
    return {
      state: true,
      shade: 'black'
    }
  } else {
    console.log("background is darker")
    return {
      state: true,
      shade: 'white'
    }
  }


}


function scanForBackgroundColor(el) {


  // set baseline to traverse
  let elBackground = window.getComputedStyle(el).getPropertyValue('background-color')
  let colorValues = rgbToObject(elBackground)


  while (colorValues.a == 0) {

    // select new element to inspect
    el = el.parentNode;

    // get background to be checked by next iteration
    elBackground = window.getComputedStyle(el).getPropertyValue('background-color')
    colorValues = rgbToObject(elBackground)
  }

  return colorValues
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
    b: parseInt(rgbArray[2]),
    a: parseInt(rgbArray[3])
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


// assume values are given as object of RGB
function calculateRatio(color, background) {

  // calculate the relative luminance; higher number means lighter
  const backgroundLuminance = luminance(background.r, background.g, background.b);
  const colorLuminance = luminance(color.r, color.g, color.b);

  // calculate the color contrast ratio
  const ratio = backgroundLuminance > colorLuminance
    ? ((colorLuminance + 0.05) / (backgroundLuminance + 0.05))
    : ((backgroundLuminance + 0.05) / (colorLuminance + 0.05));

  return { ratio, backgroundLuminance, colorLuminance }
}