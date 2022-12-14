// local storage

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

// save to localStorage

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#search-button2').addEventListener('click', addCity);
});


// show in DOM:
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

