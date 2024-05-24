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

// sorting per continent

document.addEventListener('DOMContentLoaded', () => {
    const continentSelect = document.getElementById('continent');
    const countryList = document.getElementById('countries');

    let countriesByContinent = {};

       fetch('data.json')
        .then(response => response.json())
        .then(data => {
            countriesByContinent = data;
        })
        .catch(error => console.error( error));

    continentSelect.addEventListener('change', () => {
        const selectedContinent = continentSelect.value;
        updateCountryList(selectedContinent);
    });

    function updateCountryList(continent) {
        countryList.innerHTML = '';

        if (continent && countriesByContinent[continent]) {
            const countries = countriesByContinent[continent];
            countries.forEach(country => {
                const listItem = document.createElement('li');
                listItem.textContent = country;
                countryList.appendChild(listItem);
            });
        }
    }
});