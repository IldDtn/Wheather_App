// need to add date with moment js
var date = moment();
// 1

// add city to search history

let searchHistory = [];

const addCity = function (e) {
    e.preventDefault();
    let city = {
        id: Date.now(),
        cityName: document.querySelector('#search-input').value
    }
    searchHistory.push(city);
    document.querySelector('form').reset();
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#search-button2').addEventListener('click', addCity);
});


// show search history in DOM:
var searchButton = document.querySelector('#search-button2');
searchButton.addEventListener('click', display);                                                                                                                      
function display () {

let sHistory = document.querySelector('#history')
let cityInput = document.querySelector('#search-input')
let output = document.createElement('button');                           
output.classList.add('button1');  
output.textContent = cityInput.value;
sHistory.append(output);    
};

// 2 APIs
// first need to fetch data from geocoding, get converted coordinated for inoput city name
// then fetch data from weather API using fetched lon lat values 

var APIKey = '30f62bac5796553c7e164d11c08eac11';



// base URL https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// quey URL example https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=30f62bac5796553c7e164d11c08eac11
// https://api.openweathermap.org/data/2.5/weather?${searchText}&appid=30f62bac5796553c7e164d11c08eac11

// geocoding example
// url http://api.openweathermap.org/geo/1.0/direct?q=London&limit=2&appid=30f62bac5796553c7e164d11c08eac11

// this returns:

// [
//     {
//     name: "London",
//     local_names: {},
//     lat: 51.5073219,      this needs to be included in 2nd fetch
//     lon: -0.1276474,      this needs to be included in 2nd fetch
//     country: "GB",
//     state: "England"
//     },
//     {}
//     ]

searchButton.addEventListener('click', getCityCoordinates);

function getCityCoordinates() {
    let cityInput2 = document.querySelector('#search-input')
    var searchText = cityInput2.value.trim().toLowerCase();
    var responsePromise = fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchText}&limit=2&appid=30f62bac5796553c7e164d11c08eac11`);

    function handleResponse(responseObj) {
        return responseObj.json();
    }

    responsePromise
        .then(handleResponse)
        .then(function (data) {
            var lati = (data[0].lat);
            var longt = (data[0].lon);
            console.log(lati);
            console.log(longt);

            var responsePromise2 = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longt}&appid=30f62bac5796553c7e164d11c08eac11&units=metric`);

            function handleResponse(responseObj1) {
                return responseObj1.json();
            }

            responsePromise2
                .then(handleResponse)
                .then(function (data1) {
                    var searchedCity = data1.name;
                    var temperature = data1.main.temp;
                    var humidity = data1.main.humidity;
                    var wind = data1.wind.speed;
                    var icon = data1.weather[0].icon;
                    var iconURL = 'https://openweathermap.org/img/w/';

                    // add to DOM, do I need a forloop to make it disappear and create new?
                    var today = document.querySelector('.border');
                    today.insertAdjacentHTML('beforeend', `<h1>${searchedCity} <span class='date'> ${date.format("D MMM YYYY")} ${iconURL + icon + '.png'}</span> </h1>
                    <p> Temperature : ${temperature} &#8451</p>
                    <p> Humidity: ${humidity} %</p>
                    <p> Wind: ${wind} KPH</p>`)
                });
                var responsePromise3 = fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lati}&lon=${longt}&appid=30f62bac5796553c7e164d11c08eac11&units=metric`);
                
                function handleResponse(responseObj2) {
                    return responseObj2.json();
                }

                responsePromise3
                .then(handleResponse)
                .then(function (data2) {
                    console.log(data2)
                    var forecastDate1 = data2.list[0].dt_txt;
                    var forecastDate1s = forecastDate1.substring(0, forecastDate1.length - 8);
                    var forecastTemperature1 = data2.list[0].main.temp;
                    var forecastHumidity1 =  data2.list[0].main.humidity;

                    var day1 = document.querySelector('#day1');
                    day1.insertAdjacentHTML('beforeend', `
                    <p> Date : ${forecastDate1s} </p>
                    <p> Temperature : ${forecastTemperature1} &#8451</p>
                    <p> Humidity : ${forecastHumidity1} %</p>`)

                    var forecastDate2 = data2.list[8].dt_txt;
                    var forecastDate2s = forecastDate2.substring(0, forecastDate2.length - 8);
                    var forecastTemperature2 = data2.list[8].main.temp;
                    var forecastHumidity2 =  data2.list[8].main.humidity;

                    var day2 = document.querySelector('#day2');
                    day2.insertAdjacentHTML('beforeend', `
                    <p> Date : ${forecastDate2s} </p>
                    <p> Temperature : ${forecastTemperature2} &#8451</p>
                    <p> Humidity : ${forecastHumidity2} %</p>`)

                    var forecastDate3 = data2.list[16].dt_txt;
                    var forecastDate3s = forecastDate3.substring(0, forecastDate3.length - 8);
                    var forecastTemperature3 = data2.list[16].main.temp;
                    var forecastHumidity3 =  data2.list[16].main.humidity;

                    var day3 = document.querySelector('#day3');
                    day3.insertAdjacentHTML('beforeend', `
                    <p> Date : ${forecastDate3s} </p>
                    <p> Temperature : ${forecastTemperature3} &#8451</p>
                    <p> Humidity : ${forecastHumidity3} %</p>`)

                    var forecastDate4 = data2.list[24].dt_txt;
                    var forecastDate4s = forecastDate4.substring(0, forecastDate4.length - 8);
                    var forecastTemperature4 = data2.list[24].main.temp;
                    var forecastHumidity4 =  data2.list[24].main.humidity;

                    var day4 = document.querySelector('#day4');
                    day4.insertAdjacentHTML('beforeend', `
                    <p> Date : ${forecastDate4s} </p>
                    <p> Temperature : ${forecastTemperature4} &#8451</p>
                    <p> Humidity : ${forecastHumidity4} %</p>`)
                     
                    var forecastDate5 = data2.list[32].dt_txt;
                    var forecastDate5s = forecastDate5.substring(0, forecastDate5.length - 8); 
                    var forecastTemperature5 = data2.list[32].main.temp;
                    var forecastHumidity5 =  data2.list[32].main.humidity;

                    var day5 = document.querySelector('#day5');
                    day5.insertAdjacentHTML('beforeend', `
                    <p> Date : ${forecastDate5s} </p>
                    <p> Temperature : ${forecastTemperature5} &#8451</p>
                    <p> Humidity : ${forecastHumidity5} %</p>`)
                    

                    
                });
                
                

        })
    

    };

