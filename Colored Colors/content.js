//TODO:
//- handle colors being used in HTML attributes. We're not interested in them.

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

    const cssColors = [
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

    //reg expressions here:
    // maybe: find angle brackets, push the matches to an array in order of occurence, then, replace each match with "TEMP"; after colorization, replace "TEMP" with array items without /g flag, as as to replace them in their order

    // fancy pants expression to deal with wikipedia links
    // ignoresHTMLBeforeColor = new RegExp('(?<=<[^<]*?(' + color + ')[^<]*?>[^<]*?)(?<=.*?)(\\b(' + color + ')\\b)', 'gi')

    // simple pants expression for most cases
    // findsColorOutsideBrackets = new RegExp('(?<=>.*?)\\b(' + color + ')\\b(?=<.*?)', 'gi')



    // check all colors
    for (color of cssColors) {
        // Lower case is looking primo rn
        checkLowerCase(color, para)

        // checkProperCase(color, para)
    }

    // handle initialized color formats
    // checkColorFormats(para)


}


function checkLowerCase(color, para) {

    // singular and plural forms of the color
    var singularColor = color.toLowerCase()
    var pluralColor = color.toLowerCase().concat("s")

    // merge into array
    var pluralAndSingular = [pluralColor, singularColor];
    // check plural first, since checking singular 1st would eliminate all instances of plural
    pluralAndSingular.forEach(color => {

        // check for a singular color
        if (para.innerText.includes(color)) {


            // formula for inserting the color change
            var stylizedWord = `<span style="color:${singularColor};font-weight:bolder;">${color}</span>`
                // if contrast is likely to be low, darken the background
            if (isColorLight(singularColor)) {
                stylizedWord = `<span style="color:${singularColor};font-weight:bolder;background-color:black;padding:0 3px;border-radius:3px;">${color}</span>`
            }
            // catch the color yellow
            if (color == "yellow" || color == "yellows") {
                stylizedWord = `<span style="color:gold;font-weight:bolder;">${color}</span>`
            }

            // finds only the first half of an HTML element declaration
            var colorInHTML = new RegExp('(<[^<]*?(' + color + ')[^<]*?>.*?(' + color + ').*?<\/[^<>]*?>)', 'gi');
            // record html strings for to be injected later
            var htmlMatches = para.innerHTML.match(colorInHTML);



            // now, having saved the html values, remove them from the page
            if (htmlMatches) {
                // if there are non-zero # of HTML matches, remove them for the time being
                para.innerHTML = para.innerHTML.replace(colorInHTML, ' TEMPORARY ');
            }




            // find colors located in plain text
            findColor = new RegExp('\\b(' + color + ')\\b', 'gi');
            // colorize words by their name, using a span tag
            para.innerHTML = para.innerHTML.replace(findColor, stylizedWord);




            // if there were any instances of an HTML color
            if (htmlMatches) {
                // reintroduce the temporarily removed HTML
                for (match of htmlMatches) {

                    // adds blue underlining to indicate these are links
                    stylizedWord = `<span style="color:${singularColor};font-weight:bolder;text-decoration:underline;text-decoration-color:blue;">${color}</span>`

                    // find last instance of the color-value
                    lastColor = new RegExp(`\\b(${color})\\b(?!.*?(${color}))`, 'gi');
                    // in string format, stylize this last color (aka: the color not wrapped in the HTML tag) within the context of the match
                    changedMatch = match.replace(lastColor, stylizedWord);

                    // send the HTML match back to the website, removing the placeholder text
                    para.innerHTML = para.innerHTML.replace(' TEMPORARY ', changedMatch);

                }
            }



        }
    })


}

function checkProperCase(color, para, findColor) {

    // contains at least one instance of the color's word
    var paraString = para.innerText

    // if the desired color exists, edit the element
    if (paraString.includes(color)) {


        // formula for inserting the color change
        var stylizedWord = `<span style="color:${color};font-weight:bolder;">${color}</span>`

        // if contrast is likely to be low, darken the background
        if (isColorLight(color)) {
            stylizedWord = `<span style="color:${color};font-weight:bolder;background-color:black;padding:0 3px;border-radius:3px;">${color}</span>`
        }

        // catch the color yellow
        if (color == "Yellow" || color == "Yellows") {
            stylizedWord = `<span style="color:gold;font-weight:bolder;">${color}</span>`
        }

        // add color to website HTML
        findColor = new RegExp('\\b(' + color + ')\\b', 'gi')

        // handle wiki
        if (document.location.href.includes('wikipedia')) {
            findColor = new RegExp('(?<=<[^<]*?(' + color + ')[^<]*?>[^<]*?)(?<=.*?)(\\b(' + color + ')\\b)', 'gi')
        }
        para.innerHTML = para.innerHTML.replace(findColor, stylizedWord)
    }
}

function checkColorFormats(para, findColor) {

    // contains at least one instance of the color's word
    var paraString = para.innerText

    // check cyan, magenta, yellow, and key/black
    if (paraString.includes('CMYK')) {

        color = 'CMYK'

        // wrap coloring here
        stylizedSpan = `<span style="color:cyan;font-weight:bolder;">C</span><span style="color:magenta;font-weight:bolder;">M</span><span style="color:gold;font-weight:bolder;">Y</span><span style="color:black;font-weight:bolder;">K</span>`

        // add color to website HTML
        findColor = new RegExp('\\b(' + color + ')\\b', 'gi');
        // wikipedia
        if (document.location.href.includes('wikipedia')) {
            findColor = new RegExp('(?<=<[^<]*?(' + color + ')[^<]*?>[^<]*?)(?<=.*?)(\\b(' + color + ')\\b)', 'gi')
        }

        para.innerHTML = para.innerHTML.replace(findColor, stylizedSpan)

        // check for RBG string
    } else if (paraString.includes('RGB')) {

        color = 'RGB'

        // wrap coloring here
        stylizedSpan = `<span style="color:red;font-weight:bolder;">R</span><span style="color:green;font-weight:bolder;">G</span><span style="color:blue;font-weight:bolder;">B</span>`


        // add color to website HTML
        findColor = new RegExp('\\b(' + color + ')\\b', 'gi');
        // wikipedia
        if (document.location.href.includes('wikipedia')) {
            findColor = new RegExp('(?<=<[^<]*?(' + color + ')[^<]*?>[^<]*?)(?<=.*?)(\\b(' + color + ')\\b)', 'gi')
        }

        para.innerHTML = para.innerHTML.replace(findColor, stylizedSpan)
    }
}

function isColorLight(color) {
    // these colors will be specially given black backgrounds; use sparingly
    const lightColors = ["white", "azure", "Azure"]

    // test if the current color is light
    let activeLightColor = lightColors.some(testingColor => {
        return testingColor == color
    })

    // send back out of function
    return activeLightColor
}

// test function
function checkHTMLBodyTest(color) {
    var body = document.body.innerHTML



    // formula for inserting the color change
    var stylizedWord = `<span style="color:${color};font-weight:bolder;">PROOF</span>`


    // add color to website HTML
    findColor = new RegExp('\\b(' + color + ')\\b', 'gi')
    body = body.replace(findColor, stylizedWord)
}