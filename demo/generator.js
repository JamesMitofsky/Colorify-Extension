generateDemoPage(manifest, flatColors, null, 5)

function generateDemoPage(ipsumText, arrColors, wordCount, identCount) {

    let ipsumWords = ipsumText.split(" ")
    let numColors = arrColors.length
    let numWords = ipsumWords.length
    let wpc = Math.round(numWords / numColors)

    let i = 0

    let parentify = (str) => `<div class="parent"> ${str} </div>`

    let output = arrColors.map(c => {

        let text = ipsumWords.slice(i * wpc, i * wpc + wpc).join(" ")
        let color = `<div class="color">${c}</div>`
        let mani = `<div class="ipsum">${text}</div>`
        let html = `${color} ${mani}`

        // indent per indentation count
        for (j = 0; j < identCount.length; i++) {
            html = parentify(html)
        }

        i++

        return html

    })

    return output.join("\n")
}