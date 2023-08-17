const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const humidity = document.getElementById('humidity')
const wind_speed = document.getElementById('wind-speed')
const weatherBody = document.querySelector('.weather-body')
const location_not_found = document.querySelector('.location_not_found')
const Fahrenheit = 273


const myAPICall = async (city) => {
    let key = 'd4bf3cd17b8abee51081bfbdba28e4ac'
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    try {   
    let response = await fetch(url);
        if (response.status!=200) {
            throw new Error("City not Found")
        }
        else {
            let value = await response.json();
            weatherBody.style.display = "flex";
            let imgSelect = value.weather[0].main;
            switch (imgSelect) {
                case 'Drizzle':
                    weather_img.src = 'images/drizzle1.png';
                    break;
                case 'Rain':
                    weather_img.src = 'images/rain.png';
                    break;
                case 'Clouds':
                    weather_img.src = 'images/cloud.png'
                    break;
                case 'Mist':
                    weather_img.src = 'images/mist.png'
                    break;
                case 'Haze':
                    weather_img.src = 'images/haze.png'
                    break;
                case 'Clear':
                    weather_img.src = 'images/clear.jpeg'
                    break;
                case 'Snow':
                    weather_img.src = 'images/snow.png'
                    break;
                case 'Thunderstorm':
                    weather_img.src = 'images/thunderstorm.png'
                    break;
            }
            const temp = Math.round(value.main.temp - Fahrenheit)
            temperature.innerHTML = `${temp}<sup>°C</sup>`
            description.innerHTML = `${value.weather[0].main}`
            humidity.innerHTML = `${value.main.humidity}%`
            wind_speed.innerHTML = `${value.wind.speed}Kmph`

        }
    } catch (err) {
       location_not_found.style.display="flex";
    
    }
}
searchBtn.addEventListener('click', () => {
    myAPICall(inputBox.value)
})

inputBox.onkeydown =  (event) =>{
    if(event.key==='Enter'){
        myAPICall(inputBox.value)
    }
}