// grab colors from json file




main()

async function main() {

    // search every element for text highlighting
    var instance = new Mark(document.querySelector("body"));

    let colorsObj = await loadColors()


    let cssColors = colorsObj.colors

    

    // check every color
    cssColors.forEach(color => {

        let options = {

            // ignore partial matches
            "accuracy": "exactly",

            // override mark default to prevent browser applying styles
            "element": "span",

            // set style param for all matches
            "each": (el) => {
                el.style.color = color
                el.style.fontWeight = "bolder"
            },

            // catch all links and their children
            "exclude": ["a", "a *"]
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