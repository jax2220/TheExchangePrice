'use strict';
// logic for fetcing most active stocks from the api
function activeStocks(){
    console.log('activeStoksRan')
    fetch(`https://financialmodelingprep.com/api/v3/stock/actives`)
    .then(response => response.json())
    .then(responseJson => displayResultsActiveStocks(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'))
    
};
//  logic for displaying the most active stocks to the dom
function displayResultsActiveStocks(responseJson){
    $('.active-stocks').empty();
    console.log('display ran')
    console.log(responseJson)
    for( let i = 0; i < responseJson.mostActiveStock.length; i++){
         $('.active-stocks').append(`<li class="active-stock-box">Ticker: ${responseJson.mostActiveStock[i].ticker} Change: ${responseJson.mostActiveStock[i].changesPercentage}</li>`)
    }
}





// logic for displaying the API request to the DOM for the users stock ticker search and unhiding results-section
function displayResults(responseJson){
    console.log(responseJson);
    $('.js-error').empty();
    $('.search-results').empty();
    $('.search-results').append(`<li class="symbol"> <span class="ls-name">Name:</span> ${responseJson.profile.companyName}</li>` + `<br>` + `<li><span class="ls-name">price:</span> &#36;${responseJson.profile.price}</li>` + `<li><span class="ls-name">description:</span> ${responseJson.profile.description}</li>`)
    $('#results-section').removeClass('hidden');
}



// logic for fetching API request for users search
function getStock(baseUrl, searchStock){
    const url = baseUrl + searchStock;
    fetch(url)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error (response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('.js-error').text(`Something went wrong: The ticker symbol could be wrong or it's a privit company`);
    })
};

// logic for the search form. searches for stock info using company ticker. searchStock is the users search. 
function watchForm(){
    console.log('watchForm ran')
    $('#search').submit(event => {
        event.preventDefault();
        const baseUrl = 'https://financialmodelingprep.com/api/v3/company/profile/';
        const searchStock = $('#input').val();
        getStock(baseUrl, searchStock);
    })
};

// calling functions
function ready(){
    watchForm();
    activeStocks();
};

ready();






