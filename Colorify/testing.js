
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