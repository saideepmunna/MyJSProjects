let myData = document.querySelector(".container")
let myButton = document.querySelector(".btn")
const myApiCall = async () => {

    try {
        const interval= setInterval(()=>{
            myData.innerHTML = "<p>Fetching data in a moment</p>"
        },400)

        
        let response = await fetch("https://fakestoreapi.com/products");
        if (response.status != 200) {
            throw new Error("Couldn't fetch data");
        }
        clearInterval(interval)
        let posts = await response.json();
        return posts;
    } catch (err) {
        document.body.innerHTML = `<p>${err}</p>`
    }
}

myButton.addEventListener("click", async () => {

    let posts = await myApiCall()
    let data = ""
    data += `<table class="table">
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Title</th>
        <th scope="col">descrption</th>
        <th scope="col">Image</th>
      </tr>
    </thead>
    <tbody class="tableBody">
    ${posts.map((val) => 
        `<th scope="row">${val.id}</th>
        <td>${val.title}</td>
        <td>${val.description}</td>
        <td><img src="${val.image}"/></td>
        </tr>`
    ).join("\n")
        
    }
    
 </tbody>
</table>`

    myData.innerHTML = data


})
