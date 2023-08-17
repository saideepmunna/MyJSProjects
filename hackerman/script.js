const myArr = [
    "Initializing hack program...", "Hacking virat.kohli username....", "username found virat.kohli...", "connecting to instagram..."
];
let sett = document.getElementById('hello');


sett.innerHTML = ""
function sleep(seconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true)
        }, seconds * 1000);
    })
}

const showHack = async (message)=>{
        await sleep(2)
        sett.innerHTML += `${message}<br>`;
}
(async ()=>{
    for(let i=0;i<myArr.length;i++){
    await showHack(myArr[i]);
}
})();
