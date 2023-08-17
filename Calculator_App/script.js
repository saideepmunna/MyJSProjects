let myOutput = document.querySelector('.output')
let buttons = document.querySelectorAll('button')

let string = ""

let arr = Array.from(buttons)

arr.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (e.target.innerHTML === '=') {
            let result = eval(string);
            myOutput.innerHTML = result;
        }
        else if (e.target.innerHTML == "\u2190") {
            if (string.length === 1 || myOutput.innerHTML === "0") {
                myOutput.innerHTML = "0";
            }
            else {
                string = string.slice(0, string.length - 1)
                myOutput.innerHTML = string;
                // let substr = string.slice(0,string.length-1)
                // myOutput.innerHTML=substr;
                // string = substr;
            }
        }
        else if (e.target.innerHTML === 'C') {
            myOutput.innerHTML = "0";
            string = "";
        }
        else {
            string += e.target.innerHTML;
            myOutput.innerHTML = string;
        }
    })
})
