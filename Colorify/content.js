// TODO:
// Make it so more complex cssColors can be recognized (this may be as simple as adding spaces to the array items)
// deal with the "blue" wiki page

main()

function main() {

    // testing spans, which aren't working - probably because inserted spans are being checked
    var spanTags = document.getElementsByTagName("span")
    for (span of spanTags) {
        checkPageForColor(span)
    }

    // get paragraph and span tags
    var paraTags = document.getElementsByTagName("p");
    for (para of paraTags) {
        checkPageForColor(para)
    }

    console.log("That's all folks!")
}


function checkPageForColor(para) {

    let cssColors = [
        "Aqua",
        "Aquamarine",
        "Azure",
        "Beige",
        "Bisque",
        "Black",
        "Blue",
        "Brown",
        "Chartreuse",
        "Chocolate",
        "Coral",
        "Crimson",
        "Cyan",
        "Gold",
        "Gray",
        "Grey",
        "Green",
        "Indigo",
        "Ivory",
        "Khaki",
        "Lavender",
        "Lime",
        "Linen",
        "Magenta",
        "Maroon",
        "Moccasin",
        "Navy",
        "Olive",
        "Orange",
        "Orchid",
        "Peru",
        "Pink",
        "Plum",
        "Purple",
        "Red",
        "Salmon",
        "Sienna",
        "Silver",
        "Snow",
        "Tan",
        "Teal",
        "Thistle",
        "Tomato",
        "Turquoise",
        "Violet",
        "Wheat",
        "White",
        "Yellow",
    ]

    // check all colors
    for (color of cssColors) {
        // lower and proper case checks for singular and plural forms
        checkAllWords(color, para)
    }

    // handle initialized color formats
    let edgeCases = ['RGB', 'CMYK', 'rainbow', 'Rainbow', 'ROYGBIV', 'UVM', 'University of Vermont']

    for (edgeCase of edgeCases) {
        checkSpecificInstances(edgeCase, para)
    }

}


function checkAllWords(sentColor, para) {

    // declare different forms
    var cssFormattedColor = sentColor.replace(' ', '').toLowerCase()

    var pluralColor = sentColor.toLowerCase().concat("s");
    var singularColor = sentColor.toLowerCase();
    var properCasePluralColor = sentColor.concat("s");
    var properCaseColor = sentColor


    // list plurals first, ensuring the shorter singulars don't negate them
    var differentForms = [pluralColor, singularColor, properCasePluralColor, properCaseColor];

    differentForms.forEach(color => {

        // check for a singular color
        if (!para.innerText.includes(color)) { return }


        // baseline formula
        var stylizedWord = `<ins style="text-decoration:none;color:${cssFormattedColor};font-weight:bolder;">${color}</ins>`;

        // if contrast is likely to be low, darken the background
        if (isColorLight(cssFormattedColor)) {
            // includes dark background
            stylizedWord = `<ins style="text-decoration:none;color:${cssFormattedColor};font-weight:bolder;text-shadow: 0 0 2px black;">${color}</ins>`
        }

        // catch the color yellow
        if (cssFormattedColor == "yellow") {
            stylizedWord = `<ins style="text-decoration:none;color:gold;font-weight:bolder;">${color}</ins>`
        }

        // remove any color-keyword sensetive HTML, using a placeholder value to find later
        let temporaryValue = ' colorizing '
        let htmlMatches = attemptHTMLRemoval(color, para, temporaryValue)


        // find colors located in plain text
        findColor = new RegExp('\\b(' + color + ')\\b', 'g');
        // colorize words by their name, using a span tag
        para.innerHTML = para.innerHTML.replace(findColor, stylizedWord);


        // if no HTML had to be removed, there's nothing more to do
        if (!htmlMatches) { return }

        // if HTML was removed, let's add it back in
        // let temporaryValue = 'colorizing'
        checkHTMLMatches(color, cssFormattedColor, htmlMatches, temporaryValue, para)







    })


}

// returns any matches
function attemptHTMLRemoval(color, para, temporaryValue) {
    // finds only the first half of an HTML element declaration, checking if the keyword is in it, making it susceptible to unwanted changes
    var colorInHTML = new RegExp('(<[^<]*?(' + color + ')[^<]*?>.*?(' + color + ').*?<\/[^<>]*?>)', 'g');

    // record html strings for to be injected later
    var htmlMatches = para.innerHTML.match(colorInHTML);

    if (htmlMatches) {
        // if there are non-zero # of HTML matches, remove them for the time being
        para.innerHTML = para.innerHTML.replace(colorInHTML, temporaryValue);
        console.log('match changed to temporary')

    }

    return htmlMatches
}

function checkHTMLMatches(color, cssFormattedColor, htmlMatches, temporaryValue, para) {
    // reformat all HTML strings
    for (match of htmlMatches) {

        // nuance styles to match situation
        if (isColorLight(cssFormattedColor)) {
            var darkBackground = 'text-shadow: 0 0 2px black;'
        }

        // stylize finished end product
        // TODO: something weird is happening during the loops. You can see it if you add unique styles here. Words are getting double wrapped.
        let stylizedWord = `<ins style="text-decoration:none;color:${cssFormattedColor};font-weight:bolder;${darkBackground}">${color}</ins>`

        // find last instance of the color-value (looks ahead, validating there are no other encounters with the keyword, not checking for word breaks since we can be more flexible in our rejection criteria)
        let lastColor = new RegExp(`\\b(${color})\\b(?!.*?(${color}))`, 'g');

        // stylize the color right before the HTML tag closes
        let changedMatch = match.replace(lastColor, stylizedWord);

        // send the HTML string back to the website, replacing the placeholder text
        para.innerHTML = para.innerHTML.replace(temporaryValue, changedMatch);

    }
}


// checks irregular color formattings
function checkSpecificInstances(sentColor, para) {

    // check cyan, magenta, yellow, and key/black
    if (para.innerText.includes(sentColor)) {

        if (sentColor == 'RGB') {
            stylizedSpan = `<ins style="text-decoration:none;color:red;font-weight:bolder;">R</ins><ins style="text-decoration:none;color:green;font-weight:bolder;">G</ins><ins style="text-decoration:none;color:blue;font-weight:bolder;">B</ins>`
        } else if (sentColor == 'CMYK') {
            stylizedSpan = `<ins style="text-decoration:none;color:cyan;font-weight:bolder;">C</ins><ins style="text-decoration:none;color:magenta;font-weight:bolder;">M</ins><ins style="text-decoration:none;color:gold;font-weight:bolder;">Y</ins><ins style="text-decoration:none;color:black;font-weight:bolder;">K</ins>`
        } else if (sentColor == 'rainbow') {
            stylizedSpan = '<ins style="text-decoration:none;color:red;font-weight:bolder;">r</ins><ins style="text-decoration:none;color:orange;font-weight:bolder;">a</ins><ins style="text-decoration:none;color:gold;font-weight:bolder;">i</ins><ins style="text-decoration:none;color:green;font-weight:bolder;">n</ins><ins style="text-decoration:none;color:blue;font-weight:bolder;">b</ins><ins style="text-decoration:none;color:indigo;font-weight:bolder;">o</ins><ins style="text-decoration:none;color:violet;font-weight:bolder;">w</ins>'
        } else if (sentColor == 'Rainbow') {
            stylizedSpan = '<ins style="text-decoration:none;color:red;font-weight:bolder;">R</ins><ins style="text-decoration:none;color:orange;font-weight:bolder;">a</ins><ins style="text-decoration:none;color:gold;font-weight:bolder;">i</ins><ins style="text-decoration:none;color:green;font-weight:bolder;">n</ins><ins style="text-decoration:none;color:blue;font-weight:bolder;">b</ins><ins style="text-decoration:none;color:indigo;font-weight:bolder;">o</ins><ins style="text-decoration:none;color:violet;font-weight:bolder;">w</ins>'
        } else if (sentColor == 'ROYGBIV') {
            stylizedSpan = '<ins style="text-decoration:none;color:red;font-weight:bolder;">R</ins><ins style="text-decoration:none;color:orange;font-weight:bolder;">O</ins><ins style="text-decoration:none;color:gold;font-weight:bolder;">Y</ins><ins style="text-decoration:none;color:green;font-weight:bolder;">G</ins><ins style="text-decoration:none;color:blue;font-weight:bolder;">B</ins><ins style="text-decoration:none;color:indigo;font-weight:bolder;">I</ins><ins style="text-decoration:none;color:violet;font-weight:bolder;">V</ins>'
        } else if (sentColor == 'UVM') {
            stylizedSpan = `<ins style="text-decoration:none;color:green;font-weight:bolder;">UVM</ins>`
        } else if (sentColor == 'University of Vermont') {
            stylizedSpan = `<ins style="text-decoration:none;color:green;font-weight:bolder;">University of Vermont</ins>`
        } else { return }


        // remove any color-keyword sensetive HTML
        let temporaryValue = ' colorizing '
        let htmlMatches = attemptHTMLRemoval(sentColor, para, temporaryValue)

        console.log('matches', htmlMatches)

        // baseline regExp, hanlding normal text
        findColor = new RegExp('\\b(' + sentColor + ')\\b', 'g');
        // commit change to website
        para.innerHTML = para.innerHTML.replace(findColor, stylizedSpan)


        // end if no HTML was removed, but continue if some needs to be added back in
        if (!htmlMatches) { return }

        for (match of htmlMatches) {
            // last instance of the format
            let lastColor = new RegExp(`\\b(${sentColor})\\b(?!.*?(${sentColor}))`, 'g');

            // stylize the color right before the HTML tag closes
            let changedMatch = match.replace(lastColor, stylizedSpan);

            // send the HTML string back to the website, replacing the placeholder text

            para.innerHTML = para.innerHTML.replace(temporaryValue, changedMatch);
        }
    }
}

// determines if dark background is needed
function isColorLight(cssColor) {
    // these colors will be specially given black backgrounds; use sparingly
    const lightColors = ["white","whites", "azure","azures", "ivory", "ivories", "linen", "linens", "lavender", "lavenders", "moccasin", "moccasins", "snow", "snows"]

    // test if the current color is light
    let activeLightColor = lightColors.some(testingColor => {
        return testingColor == cssColor
    })

    // send back out of function
    return activeLightColor
}