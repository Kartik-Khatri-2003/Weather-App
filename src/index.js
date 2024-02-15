
    const searchBox = document.querySelector("#search_box");
    const searchBtn = document.querySelector("#search_btn");
    const weather = document.querySelector("#weather");
    const weatherIcon = document.querySelector("#weather_icon");
    const cityName = document.querySelector("#city");
    const temp = document.querySelector("#temp");
    const humidity = document.querySelector("#humidity_percentage");
    const windSpeed = document.querySelector("#wind_speed");  
    const error = document.querySelector( "#error");
        
        
    error.style.display = "none";  // Hide the error message initially

    const apiKey = "b4d6c5ac4e04c102e21b04b99eb70b45"; // we removed appid(key) from original apiURL and put it here
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    // {units=metric} is used to specify the unit. {q=City Name} is used to define city name.

    /*
       async function => is an asynchrnous function.
       it enables use of 'await' keyword inside a function tp pause execution of function until a promise is resolved or rejected.      
    */
   
       weather.style.display = "none";

    async function checkWeather(city){
        const response = await fetch(apiURL + city  + "&appid=" + apiKey);
        /* 
            'await' keyword can only be used inside an 'async function' 
            this keyword waits for promise to be resolved and then returns the result

            'fetch' keyword is buily-in js function used to make network requests,to get resoucres from server.
            by defualt it performs a 'GET' request
            commonly used for making API calls to retrieve data from  server.

            so the above line waits for fetch request to resolve before contine execution.
        */
            

        if (response.status == 404) {
            error.style.display = "block";
            weather.style.display = "none";               
        } else {
         
           
            var data = await response.json();
            //waits for response to be converted to  json format before firther execution.

            console.log(data);

            cityName.innerHTML = data.name;
            temp.innerHTML = Math.round(data.main.temp) + "°C";
            humidity.innerHTML = data.main.humidity + "%";
            windSpeed.innerHTML = Math.round(data.wind.speed) + " km/h"; 

           weatherIcon.className = "";
           function setWeatherIcon(icon) {
            if (icon == "Clear") {
               weatherIcon.classList.add("bx", "bxs-sun");
            }else if(icon == "Clouds"){
               weatherIcon.classList.add("bx","bx-cloud");
            }else if(icon == "Rain"){
               weatherIcon.classList.add("bx","bx-cloud-rain");
            }else if(icon == "Drizzle"){
               weatherIcon.classList.add("bx","bx-cloud-drizzle");
            }else if(icon == "Haze") {
               weatherIcon.classList.add("bx","bxs-cloud");
            }
            }           

            setWeatherIcon(data.weather[0].main);  

            error.style.display = "none";
            weather.style.display = "block"; 

        }                  
    }      

    searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);
    });
