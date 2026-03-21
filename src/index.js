const searchWeather = document.querySelector('#searchWeather');
const searchCity = document.querySelector('#searchCity');

const API_KEY = 'PRMFJGHZHPBV2Q8ZB9S6B9RDM';

searchWeather.addEventListener('click', async () => {
    const city = searchCity.value || 'london';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}}?key=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Fetch failed:', error);
        console.log('Could not find that city or the service is down.');
    }
});
