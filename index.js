const loadCountryAPI = () =>{
    
    fetch('data.json')
    .then(res => res.json())
    .then(data => displayCountries(data))
}

const displayCountries = countries =>{
    const countriesHTML = countries.map(country => getCountry(country));
    const container = document.getElementById('countries');
    container.innerHTML = countriesHTML.join(' ');
}

const getCountry = (country) =>{
    console.log(country)
    return `
        <div class="country-div">
        <img src="${country.flags.png}">
        <h2>${country.name}</h2>
        <hr>
        <h4>Population: ${country.population}</h4>
        <h4>Regoin: ${country.region}</h4>
        <h4>Capital: ${country.capital}</h4>
        </div>
    `
}

loadCountryAPI()