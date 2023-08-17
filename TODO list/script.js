const input = document.getElementById('input-box');
const button = document.querySelector('.button');
const myList = document.getElementById('list-container');
// const newListItem = document.querySelector('.newList')
let arr = [];

function addTask() {
    if (input.value === '') {
        alert("please enter a task");
    }
    else {
        let newListElement = document.createElement('li');
        newListElement.innerHTML = input.value;
        myList.appendChild(newListElement);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        newListElement.appendChild(span);

    }
    input.value = "";
    saveData();
}
myList.addEventListener('click', (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle('checked');
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
})

function saveData() {
    localStorage.setItem("data", myList.innerHTML)
}

function renderData() {
    myList.innerHTML = localStorage.getItem('data');
}
button.addEventListener('click', () => {
    addTask();
})
input.addEventListener('keydownF', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
renderData();