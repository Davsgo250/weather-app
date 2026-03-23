import './styles.css';

import { createCards } from './createElementsCards.js';

window.addEventListener('DOMContentLoaded', async () => {
    // Call the function once with a default city
    const result = await getWeatherInfo('London');
    createCards('London', result);
});

const searchWeather = document.querySelector('#searchWeather');
const searchCity = document.querySelector('#searchCity');

const API_KEY = 'PRMFJGHZHPBV2Q8ZB9S6B9RDM';

searchWeather.addEventListener('click', async () => {
    const city = searchCity.value || 'london';
    const result = await getWeatherInfo(city);
    createCards(city, result);
});

async function getWeatherInfo(city) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}}?key=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Fetch failed:', error);
        console.log('Could not find that city or the service is down.');
    }
}
