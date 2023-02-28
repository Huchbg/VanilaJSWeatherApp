//https://api.openweathermap.org/data/2.5/weather?q={city name}&units=metric&appid={API key}
//https://source.unsplash.com/1600x900/?landscape
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const citySpan = document.querySelector("[data-spanCity]")
const degreesSpan = document.querySelector("[data-spanDegrees]")
const wetherIconsSpan = document.querySelector("[data-spanIcon]")
const wetherInfoSpan = document.querySelector("[data-spanText]")
const humiditySpan = document.querySelector("[data-spanHumidity]")
const windSpeedSpan = document.querySelector("[data-spanWindSpeed]")

const btn = document.querySelector(".searchIcon")
const inputText = document.querySelector("[data-SearchBar]")

let wether = {
  apiKey: "47a42cdcda89101e631b6cf2143448b8",
  fechWether: function (city) {
    city[0].toUpperCase()
   
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=47a42cdcda89101e631b6cf2143448b8`
    )
      .then((response) => response.json())
      .then((response) => {
        if(response.cod!='404'){
        wether.curentCity = city[0].toUpperCase() + city.slice(1, city.length)
        buildApp(response)
        
        }else{
          alert("Most likely the name of the location is wrong")
        }
      })
      
  },
  curentCity: "",
}

navigator.geolocation.getCurrentPosition(succes, problem)

function succes(position) {
  const lat = position.coords.latitude
  const log = position.coords.longitude
  //wether.fechWetherCords(lat,log)
  fetch(
    `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${log}&limit=1&appid=${wether.apiKey}`
  )
    .then((response) => response.json())
    .then((data) => wether.fechWether(data[0].name))
}

function problem() {
  wether.fechWether("Tokyo")
}

btn.addEventListener("click", () => {
  const city = inputText.value
  wether.fechWether(city)
})

function buildApp(data) {
  document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${wether.curentCity}')`
  citySpan.textContent = wether.curentCity
  degreesSpan.textContent = data.main.temp
  //https://openweathermap.org/img/wn/02d.png
  wetherIconsSpan.src =
    "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"
  wetherInfoSpan.textContent = data.weather[0].description
  humiditySpan.textContent = data.main.humidity
  windSpeedSpan.textContent = data.wind.speed
}
