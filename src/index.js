import './css/styles.css';
import debounce from "lodash/debounce";
import {fetchCountries} from "./js/fetchCountries.js";
const DEBOUNCE_DELAY = 300;
const inputName = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');



inputName.addEventListener('input', debounce(() => {
    countryList.innerHTML = "";
    if (inputName.value.trim() !== '')
    {
       fetchCountries(inputName.value.trim(), countryList);
    } 
}, DEBOUNCE_DELAY));