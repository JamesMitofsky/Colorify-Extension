// TODO:
// Fix color formats function, making it non-specific to wiki like the main character cases function

main()

function main() {

    // get paragraph and span tags
    var paraTags = document.getElementsByTagName("p");
    // var spanTags = document.getElementsByTagName("span")

    //check every para tag
    for (para of paraTags) {
        checkPageForColor(para)
    }




    // var counter = 0
    // for (span of spanTags) {
    //     checkPageForColor(span)
    //     counter++
    // }
    // console.log(counter)

    console.log("That's all folks!")
}


function checkPageForColor(para) {

    let cssColors = [
        "AliceBlue",
        "AntiqueWhite",
        "Aqua",
        "Aquamarine",
        "Azure",
        "Beige",
        "Bisque",
        "Black",
        "BlanchedAlmond",
        "Blue",
        "BlueViolet",
        "Brown",
        "BurlyWood",
        "CadetBlue",
        "Chartreuse",
        "Chocolate",
        "Coral",
        "CornflowerBlue",
        "Cornsilk",
        "Crimson",
        "Cyan",
        "DarkBlue",
        "DarkCyan",
        "DarkGoldenRod",
        "DarkGray",
        "DarkGrey",
        "DarkGreen",
        "DarkKhaki",
        "DarkMagenta",
        "DarkOliveGreen",
        "DarkOrange",
        "DarkOrchid",
        "DarkRed",
        "DarkSalmon",
        "DarkSeaGreen",
        "DarkSlateBlue",
        "DarkSlateGray",
        "DarkSlateGrey",
        "DarkTurquoise",
        "DarkViolet",
        "DeepPink",
        "DeepSkyBlue",
        "DimGray",
        "DimGrey",
        "DodgerBlue",
        "FireBrick",
        "FloralWhite",
        "ForestGreen",
        "Fuchsia",
        "Gainsboro",
        "GhostWhite",
        "Gold",
        "GoldenRod",
        "Gray",
        "Grey",
        "Green",
        "GreenYellow",
        "HoneyDew",
        "HotPink",
        "IndianRed",
        "Indigo",
        "Ivory",
        "Khaki",
        "Lavender",
        "LavenderBlush",
        "LawnGreen",
        "LemonChiffon",
        "LightBlue",
        "LightCoral",
        "LightCyan",
        "LightGoldenRodYellow",
        "LightGray",
        "LightGrey",
        "LightGreen",
        "LightPink",
        "LightSalmon",
        "LightSeaGreen",
        "LightSkyBlue",
        "LightSlateGray",
        "LightSlateGrey",
        "LightSteelBlue",
        "LightYellow",
        "Lime",
        "LimeGreen",
        "Linen",
        "Magenta",
        "Maroon",
        "MediumAquaMarine",
        "MediumBlue",
        "MediumOrchid",
        "MediumPurple",
        "MediumSeaGreen",
        "MediumSlateBlue",
        "MediumSpringGreen",
        "MediumTurquoise",
        "MediumVioletRed",
        "MidnightBlue",
        "MintCream",
        "MistyRose",
        "Moccasin",
        "NavajoWhite",
        "Navy",
        "OldLace",
        "Olive",
        "OliveDrab",
        "Orange",
        "OrangeRed",
        "Orchid",
        "PaleGoldenRod",
        "PaleGreen",
        "PaleTurquoise",
        "PaleVioletRed",
        "PapayaWhip",
        "PeachPuff",
        "Peru",
        "Pink",
        "Plum",
        "PowderBlue",
        "Purple",
        "RebeccaPurple",
        "Red",
        "RosyBrown",
        "RoyalBlue",
        "SaddleBrown",
        "Salmon",
        "SandyBrown",
        "SeaGreen",
        "SeaShell",
        "Sienna",
        "Silver",
        "SkyBlue",
        "SlateBlue",
        "SlateGray",
        "SlateGrey",
        "Snow",
        "SpringGreen",
        "SteelBlue",
        "Tan",
        "Teal",
        "Thistle",
        "Tomato",
        "Turquoise",
        "Violet",
        "Wheat",
        "White",
        "WhiteSmoke",
        "Yellow",
        "YellowGreen",
    ]

    // check all colors
    for (color of cssColors) {
        // lower and proper case checks for singular and plural forms
        checkAllCases(color, para)

    }

    // handle initialized color formats
    let colorFormats = ['RGB', 'CYMK']
    for (color of colorFormats) {
        checkColorFormats(para, colorFormats)
    }

}


function checkAllCases(sentColor, para) {

    // declare different forms
    var pluralColor = sentColor.toLowerCase().concat("s");
    var singularColor = sentColor.toLowerCase();
    var properCasePluralColor = sentColor.concat("s");
    var properCaseColor = sentColor

    // list plurals first, ensuring the shorter singulars don't negate them
    var differentForms = [pluralColor, singularColor, properCasePluralColor, properCaseColor];

    differentForms.forEach(color => {

        // check for a singular color
        if (para.innerText.includes(color)) {


            // baseline formula
            var stylizedWord = `<span style="color:${singularColor};font-weight:bolder;">${color}</span>`;

            // if contrast is likely to be low, darken the background
            if (isColorLight(singularColor)) {
                // includes dark background
                stylizedWord = `<span style="color:${singularColor};font-weight:bolder;background-color:black;padding:0 3px;border-radius:3px;">${color}</span>`
            }

            // catch the color yellow
            if (singularColor == "yellow") {
                stylizedWord = `<span style="color:gold;font-weight:bolder;">${color}</span>`
            }

            // remove any color-keyword sensetive HTML
            let htmlMatches = attemptHTMLRemoval(color, para)


            // find colors located in plain text
            findColor = new RegExp('\\b(' + color + ')\\b', 'g');
            // colorize words by their name, using a span tag
            para.innerHTML = para.innerHTML.replace(findColor, stylizedWord);


            // if no HTML had to be removed, there's nothing more to do
            if (!htmlMatches) { return }

            // if HTML was removed, let's add it back in
            checkHTMLMatches(color, singularColor, htmlMatches)






        }
    })


}

function attemptHTMLRemoval(color, para) {
    // finds only the first half of an HTML element declaration, checking if the keyword is in it, making it susceptible to unwanted changes
    var colorInHTML = new RegExp('(<[^<]*?(' + color + ')[^<]*?>.*?(' + color + ').*?<\/[^<>]*?>)', 'g');

    // record html strings for to be injected later
    var htmlMatches = para.innerHTML.match(colorInHTML);

    if (htmlMatches) {
        // if there are non-zero # of HTML matches, remove them for the time being
        para.innerHTML = para.innerHTML.replace(colorInHTML, ' TEMPORARY ');
    }

    return htmlMatches
}

function checkHTMLMatches(color, singularColor, htmlMatches) {
    // reformat all HTML strings
    for (match of htmlMatches) {


        // nuance styles to match situation
        if (isColorLight(singularColor)) {
            var darkBackground = 'background-color:black;padding:0 3px;border-radius:3px;'
        }

        // final stylized productS
        stylizedWord = `<span style="color:${singularColor};font-weight:bolder;text-decoration:underline;text-decoration-color:blue;${darkBackground}">${color}</span>`

        // find last instance of the color-value (looks ahead, validating there are no other encounters with the keyword, not checking for word breaks since we can be more flexible in our rejection criteria)
        lastColor = new RegExp(`\\b(${color})\\b(?!.*?(${color}))`, 'g');

        // stylize the color right before the HTML tag closes
        changedMatch = match.replace(lastColor, stylizedWord);

        // send the HTML string back to the website, replacing the placeholder text
        para.innerHTML = para.innerHTML.replace(' TEMPORARY ', changedMatch);

    }
}


// checks irregular color formattings
function checkColorFormats(para, sentColor) {


    // check cyan, magenta, yellow, and key/black
    if (para.innerText.includes(sentColor)) {

        if (sentColor == 'RGB') {
            let stylizedSpan = `<span style="color:red;font-weight:bolder;">R</span><span style="color:green;font-weight:bolder;">G</span><span style="color:blue;font-weight:bolder;">B</span>`
        } else if (sentColor == 'CYMK') {
            let stylizedSpan = `<span style="color:cyan;font-weight:bolder;">C</span><span style="color:magenta;font-weight:bolder;">M</span><span style="color:gold;font-weight:bolder;">Y</span><span style="color:black;font-weight:bolder;">K</span>`
        }

        // baseline regExp
        sentColor = new RegExp('\\b(' + color + ')\\b', 'gi');


        // remove HTML instances



        // commit change to website
        para.innerHTML = para.innerHTML.replace(sentColor, stylizedSpan)
    }
}

// determines if dark background is needed
function isColorLight(color) {
    // these colors will be specially given black backgrounds; use sparingly
    const lightColors = ["white", "azure", "Azure", "White"]

    // test if the current color is light
    let activeLightColor = lightColors.some(testingColor => {
        return testingColor == color
    })

    // send back out of function
    return activeLightColor
}