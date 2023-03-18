main();

var t0 = performance.now();
var t1 = performance.now();

async function main() {
    logPerf("init");

    var allText = document.body.textContent;
    var usedColors = allColors.filter((c) => allText.includes(c));
    logPerf("used colors");

    let colorExp = new RegExp(`\\b(${usedColors.join("|")})s?\\b`, "i");

    // declare searching every element
    let instance = new Mark(document.body);

    let options = {
        element: "span", // override mark default to prevent browser from applying styles
        exclude: ["a", "a *", "pre", "pre *"], // ignore all links, code blocks, and their children
        className: "colorify",
        each: onMark,
    };

    instance.markRegExp(colorExp, options);

    logPerf("mark");

    let matches = [...document.querySelectorAll(".colorify")];

    //await Promise.all(matches.map(onMark));

    logPerf("colorify");

    console.log(`${usedColors.length} unique colors`);
    console.log(`${matches.length} matched elements`);
}

async function onMark(el) {
    let color = el.textContent;
    let cssColor = color.replace(/ |s$/g, "");
    el.style.color = cssColor;
    el.style.fontWeight = "bolder";

    let background = requiresBackground(el);
    if (background.state) {
        // el.style.backgroundColor = background.shade
        el.style.textShadow = `0 0 2px ${background.shade}`;
    }

    await new Promise((r) => setTimeout(r, 0));
}

function logPerf(msg) {
    t1 = performance.now();
    console.log(`${msg}: +${t0 ? (t1 - t0).toFixed(5) : 0} ms`);
    t0 = t1;
}

function requiresBackground(el) {
    // get elm color
    let computedStyles = window.getComputedStyle(el);
    let elColorStyle = computedStyles.getPropertyValue("color");
    let elColor = rgbToObject(elColorStyle);

    // return object from function with RGB
    let elBackground = scanForBackgroundColor(el);

    // must be fed the computed style (which is RGB or HEX)
    let result = calculateRatio(elColor, elBackground);

    // console.log(elBackground)
    // console.log(result.backgroundLuminance, result.colorLuminance)

    // if ratio is accessible, exit function
    // 0.14285 (7.0:1) for small text in AAA-level
    // 0.22222 (4.5:1) for small text in AA-level, or large text in AAA-level
    // 0.33333 (3.0:1) for large text in AA-level
    // set to .5 based on silver appearing against white
    if (result.ratio < 0.55555) return { state: false };

    if (result.backgroundLuminance >= result.colorLuminance) {
        // console.log("background is lighter,")
        return {
            state: true,
            shade: "black",
        };
    } else {
        // console.log("background is darker")
        return {
            state: true,
            shade: "white",
        };
    }
}

function scanForBackgroundColor(el) {
    // set baseline to traverse
    let elBackground = window
        .getComputedStyle(el)
        .getPropertyValue("background-color");
    let colorValues = rgbToObject(elBackground);

    while (colorValues.a == 0) {
        // select new element to inspect
        el = el.parentNode;

        // get background to be checked by next iteration
        elBackground = window
            .getComputedStyle(el)
            .getPropertyValue("background-color");
        colorValues = rgbToObject(elBackground);
    }

    return colorValues;
}

// function from https://stackoverflow.com/a/5624139/3695983
function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
}

function rgbToObject(rgb) {
    let digitsPattern = new RegExp("\\d{1,3}", "gi");

    let rgbArray = rgb.match(digitsPattern);

    rgbObj = {
        r: parseInt(rgbArray[0]),
        g: parseInt(rgbArray[1]),
        b: parseInt(rgbArray[2]),
        a: parseInt(rgbArray[3]),
    };

    return rgbObj;
}

// function from https://stackoverflow.com/a/9733420/3695983
function luminance(r, g, b) {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// assume values are given as object of RGB
function calculateRatio(color, background) {
    // calculate the relative luminance; higher number means lighter
    const backgroundLuminance = luminance(
        background.r,
        background.g,
        background.b
    );
    const colorLuminance = luminance(color.r, color.g, color.b);

    // calculate the color contrast ratio
    const ratio =
        backgroundLuminance > colorLuminance
            ? (colorLuminance + 0.05) / (backgroundLuminance + 0.05)
            : (backgroundLuminance + 0.05) / (colorLuminance + 0.05);
}
