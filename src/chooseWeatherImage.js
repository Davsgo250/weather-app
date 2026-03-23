import cloudsIcon from './images/weather-icons/clouds.png';
import rainyDayIcon from './images/weather-icons/rainy-day.png';
import snowsIcon from './images/weather-icons/snows.png';
import sunCloudIcon from './images/weather-icons/sun-cloud.png';
import sunshineIcon from './images/weather-icons/sunshine.png';
import thunderstormIcon from './images/weather-icons/thunderstorm.png';

const iconMap = {
    // Priority: Thunderstorms
    thunder: thunderstormIcon,
    storm: thunderstormIcon,
    lightning: thunderstormIcon,

    // Snow/Ice
    snow: snowsIcon,
    ice: snowsIcon,
    hail: snowsIcon,
    freezing: snowsIcon,
    'diamond dust': snowsIcon,

    // Rain/Drizzle
    rain: rainyDayIcon,
    drizzle: rainyDayIcon,
    precip: rainyDayIcon,
    mist: rainyDayIcon,

    // Clouds/Overcast
    cloud: sunCloudIcon,
    overcast: cloudsIcon,
    fog: sunCloudIcon,

    // Clear/Sunny
    clear: sunshineIcon,
    sun: sunshineIcon,
};

export function getWeatherIcon(condition) {
    if (!condition) return sunshineIcon; // Fallback

    const lowerCondition = condition.toLowerCase();

    // Check keywords in order of importance
    // We check 'thunder' first, then 'snow', then 'rain' etc.
    const keys = Object.keys(iconMap);

    for (const key of keys) {
        if (lowerCondition.includes(key)) {
            return iconMap[key];
        }
    }

    return sunshineIcon; // Default fallback if no match found
}
