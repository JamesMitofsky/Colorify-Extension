//TODOL add recognition for: CMYK, RGB

main()

function main() {

    // get main text by paragraph tag
    var allParagraphs = document.getElementsByTagName("p")

    for (para of allParagraphs) {
        // check the document for that color
        checkPageForColor(para)
    }

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
    ];

    const pluralizedColors = ["AliceBlues", "AntiqueWhites", "Aquas", "Aquamarines", "Azures", "Beiges", "Bisques", "Blacks", "BlanchedAlmonds", "Blues", "BlueViolets", "Browns", "BurlyWoods", "CadetBlues", "Chartreuses", "Chocolates", "Corals", "CornflowerBlues", "Cornsilks", "Crimsons", "Cyans", "DarkBlues", "DarkCyans", "DarkGoldenRods", "DarkGrays", "DarkGreys", "DarkGreens", "DarkKhakis", "DarkMagentas", "DarkOliveGreens", "DarkOranges", "DarkOrchids", "DarkReds", "DarkSalmons", "DarkSeaGreens", "DarkSlateBlues", "DarkSlateGrays", "DarkSlateGreys", "DarkTurquoises", "DarkViolets", "DeepPinks", "DeepSkyBlues", "DimGrays", "DimGreys", "DodgerBlues", "FireBricks", "FloralWhites", "ForestGreens", "Fuchsias", "Gainsboros", "GhostWhites", "Golds", "GoldenRods", "Grays", "Greys", "Greens", "GreenYellows", "HoneyDews", "HotPinks", "IndianReds", "Indigos", "Ivorys", "Khakis", "Lavenders", "LavenderBlushs", "LawnGreens", "LemonChiffons", "LightBlues", "LightCorals", "LightCyans", "LightGoldenRodYellows", "LightGrays", "LightGreys", "LightGreens", "LightPinks", "LightSalmons", "LightSeaGreens", "LightSkyBlues", "LightSlateGrays", "LightSlateGreys", "LightSteelBlues", "LightYellows", "Limes", "LimeGreens", "Linens", "Magentas", "Maroons", "MediumAquaMarines", "MediumBlues", "MediumOrchids", "MediumPurples", "MediumSeaGreens", "MediumSlateBlues", "MediumSpringGreens", "MediumTurquoises", "MediumVioletReds", "MidnightBlues", "MintCreams", "MistyRoses", "Moccasins", "NavajoWhites", "Navys", "OldLaces", "Olives", "OliveDrabs", "Oranges", "OrangeReds", "Orchids", "PaleGoldenRods", "PaleGreens", "PaleTurquoises", "PaleVioletReds", "PapayaWhips", "PeachPuffs", "Perus", "Pinks", "Plums", "PowderBlues", "Purples", "RebeccaPurples", "Reds", "RosyBrowns", "RoyalBlues", "SaddleBrowns", "Salmons", "SandyBrowns", "SeaGreens", "SeaShells", "Siennas", "Silvers", "SkyBlues", "SlateBlues", "SlateGrays", "SlateGreys", "Snows", "SpringGreens", "SteelBlues", "Tans", "Teals", "Thistles", "Tomatos", "Turquoises", "Violets", "Wheats", "Whites", "WhiteSmokes", "Yellows", "YellowGreens"];

    // these colors will be specially given black backgrounds; use sparingly
    const lightColors = ["white", "whites", "azure", "azures"]


    // check all colors
    for (color of cssColors) {
        checkLowerCase(color, para)
        checkCapitalized(color, para)

    }

    for (color of pluralizedColors) {
        checkPlural(color, para)
    }


    checkEdgeCases(para)


}


function checkLowerCase(color, para) {
    // lowercase for majority of reading
    var color = color.toLowerCase()

    // contains at least one instance of the color's word
    var paraString = para.innerText

    // if the desired color exists, edit the element
    if (paraString.includes(color)) {
        console.log(color, "found!")


        // "\\" escapes the first backslash, allowing it; "\b" == word boundary;
        // "g" == global search; "i" == case-insensitive;
        re = new RegExp("\\b" + color + "\\b", "gi");

        // general insert for color change
        var styleParams = `<span style="color:${color};font-weight:bolder;">${color}</span>`

        // add background-color if text color is too light
        if (color == "white") {
            styleParams = `<span style="color:${color};font-weight:bolder;background-color:black;padding:0 3px;border-radius:3px;">${color}</span>`
        } else if (color == "yellow") {
            styleParams = `<span style="color:gold;font-weight:bolder;">${color}</span>`
        }


        // add color to website HTML
        para.innerHTML = para.innerHTML.replace(re, styleParams)
    }
}

function checkCapitalized(color, para) {

    // contains at least one instance of the color's word
    var paraString = para.innerText

    // if the desired color exists, edit the element
    if (paraString.includes(color)) {
        console.log(color, "found!")


        // "\\" escapes the first backslash, allowing it; "\b" == word boundary;
        // "g" == global search; "i" == case-insensitive;
        re = new RegExp("\\b" + color + "\\b", "gi");


        var styleParams = `<span style="color:${color};font-weight:bolder;">${color}</span>`
        if (color == "white") {
            styleParams = `<span style="color:${color};font-weight:bolder;background-color:black;padding:0 3px;border-radius:3px;">${color}</span>`
        } else if (color == "yellow") {
            styleParams = `<span style="color:gold;font-weight:bolder;">${color}</span>`
        }


        // add color to website HTML
        para.innerHTML = para.innerHTML.replace(re, styleParams)
    }
}

function checkPlural(color, para) {
    // lowercase for majority of reading
    var color = color.toLowerCase()

    // contains at least one instance of the color's word
    var paraString = para.innerText

    // if the desired color exists, edit the element
    if (paraString.includes(color)) {
        console.log(color, "found!")


        // "\\" escapes the first backslash, allowing it; "\b" == word boundary;
        // "g" == global search; "i" == case-insensitive;
        re = new RegExp("\\b" + color + "\\b", "gi");


        var styleParams = `<span style="color:${color.slice(0,-1)};font-weight:bolder;">${color}</span>`
        if (color == "whites") {
            styleParams = `<span style="color:${color.slice(0,-1)};font-weight:bolder;background-color:black;padding:0 3px;border-radius:3px;">${color}</span>`
        } else if (color == "yellows") {
            styleParams = `<span style="color:gold;font-weight:bolder;">${color}</span>`
        }


        // add color to website HTML
        para.innerHTML = para.innerHTML.replace(re, styleParams)
    }
}

function checkEdgeCases(para) {

    // contains at least one instance of the color's word
    var paraString = para.innerText

    // check cyan, magenta, yellow, and key/black
    if (paraString.includes('CMYK')) {
        re = new RegExp("\\b" + 'CMYK' + "\\b", "gi");

        // wrap coloring here
        stylizedSpan = `<span style="color:cyan;font-weight:bolder;">C</span><span style="color:magenta;font-weight:bolder;">M</span><span style="color:gold;font-weight:bolder;">Y</span><span style="color:black;font-weight:bolder;">K</span>`

        // commit changes to website
        para.innerHTML = para.innerHTML.replace(re, stylizedSpan)

        // check for RBG string
    } else if (paraString.includes('RGB')) {
        re = new RegExp("\\b" + 'RGB' + "\\b", "gi");

        // wrap coloring here
        stylizedSpan = `<span style="color:red;font-weight:bolder;">R</span><span style="color:green;font-weight:bolder;">G</span><span style="color:blue;font-weight:bolder;">B</span>`

        // commit changes to website
        para.innerHTML = para.innerHTML.replace(re, stylizedSpan)
    }
}