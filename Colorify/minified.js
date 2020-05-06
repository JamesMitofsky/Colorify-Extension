function main(){var e=document.getElementsByTagName("span");for(span of e)checkPageForColor(span);var o=document.getElementsByTagName("p");for(para of o)checkPageForColor(para);console.log("That's all folks!")}function checkPageForColor(e){let o=["Aqua","Aquamarine","Azure","Beige","Bisque","Black","Blue","Brown","Chartreuse","Chocolate","Coral","Crimson","Cyan","Gold","Gray","Grey","Green","Indigo","Ivory","Khaki","Lavender","Lime","Linen","Magenta","Maroon","Moccasin","Navy","Olive","Orange","Orchid","Peru","Pink","Plum","Purple","Red","Salmon","Sienna","Silver","Snow","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","Yellow"];for(color of o)checkAllWords(color,e);let n=["RGB","CMYK","rainbow","Rainbow","ROYGBIV","UVM","University of Vermont"];for(edgeCase of n)checkSpecificInstances(edgeCase,e)}function checkAllWords(e,o){var n=e.replace(" ","").toLowerCase();[e.toLowerCase().concat("s"),e.toLowerCase(),e.concat("s"),e].forEach(e=>{if(!o.innerText.includes(e))return;var t=`<ins style="text-decoration:none;color:${n};font-weight:bolder;">${e}</ins>`;isColorLight(n)&&(t=`<ins style="text-decoration:none;color:${n};font-weight:bolder;text-shadow: 0 0 2px black;">${e}</ins>`),"yellow"==n&&(t=`<ins style="text-decoration:none;color:gold;font-weight:bolder;">${e}</ins>`);let i=attemptHTMLRemoval(e,o," colorizing ");findColor=new RegExp("\\b("+e+")\\b","g"),o.innerHTML=o.innerHTML.replace(findColor,t),i&&checkHTMLMatches(e,n,i," colorizing ",o)})}function attemptHTMLRemoval(e,o,n){var t=new RegExp("(<[^<]*?("+e+")[^<]*?>.*?("+e+").*?</[^<>]*?>)","g"),i=o.innerHTML.match(t);return i&&(o.innerHTML=o.innerHTML.replace(t,n),console.log("match changed to temporary")),i}function checkHTMLMatches(e,o,n,t,i){for(match of n){if(isColorLight(o))var r="text-shadow: 0 0 2px black;";let n=`<ins style="text-decoration:none;color:${o};font-weight:bolder;${r}">${e}</ins>`,l=new RegExp(`\\b(${e})\\b(?!.*?(${e}))`,"g"),s=match.replace(l,n);i.innerHTML=i.innerHTML.replace(t,s)}}function checkSpecificInstances(e,o){if(o.innerText.includes(e)){if("RGB"==e)stylizedSpan='<ins style="text-decoration:none;color:red;font-weight:bolder;">R</ins><ins style="text-decoration:none;color:green;font-weight:bolder;">G</ins><ins style="text-decoration:none;color:blue;font-weight:bolder;">B</ins>';else if("CMYK"==e)stylizedSpan='<ins style="text-decoration:none;color:cyan;font-weight:bolder;">C</ins><ins style="text-decoration:none;color:magenta;font-weight:bolder;">M</ins><ins style="text-decoration:none;color:gold;font-weight:bolder;">Y</ins><ins style="text-decoration:none;color:black;font-weight:bolder;">K</ins>';else if("rainbow"==e)stylizedSpan='<ins style="text-decoration:none;color:red;font-weight:bolder;">r</ins><ins style="text-decoration:none;color:orange;font-weight:bolder;">a</ins><ins style="text-decoration:none;color:gold;font-weight:bolder;">i</ins><ins style="text-decoration:none;color:green;font-weight:bolder;">n</ins><ins style="text-decoration:none;color:blue;font-weight:bolder;">b</ins><ins style="text-decoration:none;color:indigo;font-weight:bolder;">o</ins><ins style="text-decoration:none;color:violet;font-weight:bolder;">w</ins>';else if("Rainbow"==e)stylizedSpan='<ins style="text-decoration:none;color:red;font-weight:bolder;">R</ins><ins style="text-decoration:none;color:orange;font-weight:bolder;">a</ins><ins style="text-decoration:none;color:gold;font-weight:bolder;">i</ins><ins style="text-decoration:none;color:green;font-weight:bolder;">n</ins><ins style="text-decoration:none;color:blue;font-weight:bolder;">b</ins><ins style="text-decoration:none;color:indigo;font-weight:bolder;">o</ins><ins style="text-decoration:none;color:violet;font-weight:bolder;">w</ins>';else if("ROYGBIV"==e)stylizedSpan='<ins style="text-decoration:none;color:red;font-weight:bolder;">R</ins><ins style="text-decoration:none;color:orange;font-weight:bolder;">O</ins><ins style="text-decoration:none;color:gold;font-weight:bolder;">Y</ins><ins style="text-decoration:none;color:green;font-weight:bolder;">G</ins><ins style="text-decoration:none;color:blue;font-weight:bolder;">B</ins><ins style="text-decoration:none;color:indigo;font-weight:bolder;">I</ins><ins style="text-decoration:none;color:violet;font-weight:bolder;">V</ins>';else if("UVM"==e)stylizedSpan='<ins style="text-decoration:none;color:green;font-weight:bolder;">UVM</ins>';else{if("University of Vermont"!=e)return;stylizedSpan='<ins style="text-decoration:none;color:green;font-weight:bolder;">University of Vermont</ins>'}let n=" colorizing ",t=attemptHTMLRemoval(e,o,n);if(console.log("matches",t),findColor=new RegExp("\\b("+e+")\\b","g"),o.innerHTML=o.innerHTML.replace(findColor,stylizedSpan),!t)return;for(match of t){let t=new RegExp(`\\b(${e})\\b(?!.*?(${e}))`,"g"),i=match.replace(t,stylizedSpan);o.innerHTML=o.innerHTML.replace(n,i)}}}function isColorLight(e){return["white","whites","azure","azures","ivory","ivories","linen","linens","lavender","lavenders","moccasin","moccasins","snow","snows"].some(o=>o==e)}main();