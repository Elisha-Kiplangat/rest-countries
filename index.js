const countriesByContinent = {};


const loadCountryAPI = () =>{
    
    fetch('data.json')
    .then(res => res.json())
    .then(data => displayCountries(data))
    .then(data => {
        data.countries.forEach(country => {
            if (!countriesByContinent[country.region]) {
                countriesByContinent[country.region] = [];
            }
            countriesByContinent[country.region].push(country);
        });
    })
}

const displayCountries = countries =>{
    const countriesHTML = countries.map(country => getCountry(country));
    const container = document.getElementById('countries');
    container.innerHTML = countriesHTML.join(' ');
}

const getCountry = (country) =>{
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

// sorting per continent

document.addEventListener('DOMContentLoaded', () => {
    const continentSelect = document.getElementById('continent');
    const countryList = document.getElementById('countries');

    continentSelect.addEventListener('change', () => {
        const selectedContinent = continentSelect.value;
        updateCountryList(selectedContinent);
    });

    function updateCountryList(continent) {
        if (continent && countriesByContinent[continent]) {
            const countries = countriesByContinent[continent];
            displayCountries(countries);
        } else {
            countryList.innerHTML = '<p>No countries available for the selected continent.</p>';
        }
    }
});
