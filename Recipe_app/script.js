const searchBox = document.getElementById('myInput');
const searchBtn = document.getElementById('myButton')
const recipeContainer = document.querySelector('.recipe-container');
const recipe = document.querySelector('.recipe')
const recipeCloseBtn = document.querySelector('.recipe-close-btn')
const recipeDetailsContent = document.querySelector('.recipe-details-content')
const recipeDetails = document.querySelector('.recipe-details')
const body = document.querySelector('.myBody')

const fetchRecipies = async (foodItem) => {
    recipeContainer.innerHTML = '<h3>fetching recipes...</h3>'
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodItem}`)
        const response = await data.json();
        recipeContainer.innerHTML = "";
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add("recipe")
            recipeDiv.innerHTML = `
         <img src="${meal.strMealThumb}">
         <h3>${meal.strMeal}</h3>
         <p>${meal.strArea} <span>${meal.strCategory}</span></p>
       `
            const button = document.createElement('button')
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);

            //    Adding event listener to every recipe button

            button.addEventListener('click', () => {
                openRecipePopup(meal);
            })
            recipeContainer.appendChild(recipeDiv);
        });
    }
    catch(err) {
        recipeContainer.innerHTML = `<h3>Error in fetching recipies</h3>`
    }

}
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(!searchBox.value){
        recipeContainer.innerHTML = "<h3>Kindly enter a meal</h3>"
        return;
    }
    const item = searchBox.value.trim();
    fetchRecipies(item);

    // console.log("button Clicked");
})

const fetchIngredients = (meal) => {
    let ingredientList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`]
            ingredientList += `<li>${measure} ${ingredient}</li>`
        }
        else {
            break;
        }
    }
    return ingredientList;

}

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
      <h2 class="recipeName">${meal.strMeal}</h2>
      <h3 class="myH3">Ingredients:</h3> 
      <ul class="ingredientList">${fetchIngredients(meal)}</ul>
      <div class="recipeInstructions">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
      </div>
     `
    recipeDetails.style.display = "block";

}

recipeCloseBtn.addEventListener('click', () => {
    recipeDetails.style.display = "none";
})

