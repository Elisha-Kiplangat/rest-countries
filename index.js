const countriesByContinent = {};

const loadCountryAPI = () => {
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(country => {
                if (!countriesByContinent[country.region]) {
                    countriesByContinent[country.region] = [];
                }
                countriesByContinent[country.region].push(country);
            });
            displayCountries(data); 
        })
        .catch(error => console.error('Error fetching the JSON data:', error));
};

const displayCountries = countries => {
    const countriesHTML = countries.map(country => getCountryHTML(country));
    const container = document.getElementById('countries');
    container.innerHTML = countriesHTML.join('');
};

const getCountryHTML = country => {
    return `
        <div class="country-div">
            <img src="${country.flags.png}" alt="Flag of ${country.name}">
            <h2>${country.name}</h2>
            <hr>
            <h4>Population: ${country.population}</h4>
            <h4>Region: ${country.region}</h4>
            <h4>Capital: ${country.capital}</h4>
        </div>
    `;
};

loadCountryAPI();

document.addEventListener('DOMContentLoaded', () => {
    const continentSelect = document.getElementById('continent');
    const countryList = document.getElementById('countries');
    const themeToggle = document.getElementById('theme-toggle');
    const searchInput = document.getElementById('search');

    continentSelect.addEventListener('change', () => {
        const selectedContinent = continentSelect.value;
        updateCountryList(selectedContinent);
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        if (query) {
            const filteredCountries = searchCountry(query);
            displayCountries(filteredCountries);
        } else {
            updateCountryList(continentSelect.value);
        }
    });

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    });

    function updateCountryList(continent) {
        if (continent && countriesByContinent[continent]) {
            const countries = countriesByContinent[continent];
            displayCountries(countries);
        } else {
            displayCountries([]);
        }
    }

    function searchCountry(query) {
        const allCountries = Object.values(countriesByContinent).flat();
        return allCountries.filter(country => country.name.toLowerCase().includes(query));
    }
});
