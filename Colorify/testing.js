// grab colors from json file




main()

function main() {

    // search every element for text highlighting
    var instance = new Mark(document.querySelector("body"));

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

    // check every color
    cssColors.forEach(color => {

        let options = {
            "accuracy": "exactly",
            "element": "span",
            "each": (el) => {
                el.style.color = color
                el.style.fontWeight = "bolder"
            }
        }


        // optionally catch pluralized color
        let colorExp = new RegExp(`(\\b${color}s?\\b)`, 'i')

        // match color exactly
        instance.markRegExp(colorExp, options)

    })


}



