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
        showTemp(result);
    } catch (error) {
        console.error('Fetch failed:', error);
        console.log('Could not find that city or the service is down.');
    }
});

function showTemp(apiInfo) {
    console.log(apiInfo);
    console.log(`Today Temp: ${apiInfo.currentConditions.temp} - Humidity: ${apiInfo.currentConditions.humidity}`);
    for (const day in apiInfo.days) {
        if (!Object.hasOwn(apiInfo.days, day)) continue;

        const element = apiInfo.days[day];
        console.log(element);
        console.log(
            `Date: ${element.datetime} - Temp: ${element.temp} - Humidity: ${element.humidity} - Condition: ${element.conditions}`
        );
    }
}
