import Notiflix from 'notiflix';
export function fetchCountries(name, list) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
          }
       return response.json();
    })
    .then(country => {
        //console.log(country);
        if (country.length > 10) {
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        } else if (country.length >= 2) {
            const outputList = country.map(({name, flags}) => 
            `<li style="list-style-type: none;"><img src="${flags.png}" height="16" style="margin-right: 10px;"><span>${name.common}</span></li>`
            ).join("");
            list.insertAdjacentHTML('beforeend', outputList);
        } else {
            const outputList = country.map(({capital, population, languages, name, flags}) => 
            `<li style="list-style-type: none;"><img src="${flags.png}" height="16" style="margin-right: 10px;"><span>${name.common}</span>
            <p>Capital: ${capital[0]}</p>
            <p>Population: ${population}</p>
            <p>Languages: ${Object.values(languages)}</p></li>`
            ).join("");
            list.insertAdjacentHTML('beforeend', outputList);
        }
        return country;
    })
    .catch(error => {
        Notiflix.Notify.failure("Oops, there is no country with that name");
       // console.log(error);
    });
}