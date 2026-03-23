import { getWeatherIcon } from './chooseWeatherImage.js';
const mainCard = document.querySelector('.mainCard');
const cardsNodeList = document.querySelectorAll('.card');
const cardsArray = [...cardsNodeList];

function makeElement(tag, options = {}) {
    const element = document.createElement(tag);

    if (options.id) element.id = options.id;

    if (options.className) {
        if (Array.isArray(options.className)) {
            element.classList.add(...options.className);
        } else {
            element.classList.add(options.className);
        }
    }

    if (options.text) element.textContent = options.text;

    if (options.attributes) {
        for (const [key, value] of Object.entries(options.attributes)) {
            element.setAttribute(key, value);
        }
    }

    if (options.childs && Array.isArray(options.childs)) {
        for (const child of options.childs) {
            if (child instanceof Node) {
                element.appendChild(child);
            }
        }
    }

    return element;
}

function createMainCard(city, info) {
    mainCard.replaceChildren();

    const condition = info.conditions || 'Clear';
    const imageSrc = getWeatherIcon(condition);

    mainCard.appendChild(makeElement('h2', { text: city.charAt(0).toUpperCase() + city.slice(1) }));

    const mainCardInfo = makeElement('div', { className: ['mainDayInfo'] });
    const imgCard = makeElement('div', {
        className: ['imageMainInfo'],
        childs: [
            makeElement('img', {
                attributes: { src: imageSrc, alt: 'Icon of the weather condition' },
            }),
        ],
    });

    const tempInfo = makeElement('div', {
        className: ['tempInfo'],
        childs: [
            makeElement('p', { id: 'temp', text: `${info.temp}°C` }),
            makeElement('p', { id: 'conditions', text: condition }),
        ],
    });

    const tempMoreInfo = makeElement('div', {
        className: ['tempMoreInfo'],
        childs: [
            makeElement('p', { id: 'humidity', text: `Humidity: ${info.humidity}` }),
            makeElement('p', { id: 'wind', text: `Wind: ${info.windspeed}km/h SW` }),
            makeElement('p', { id: 'dew', text: `Dew: ${info.dew}%` }),
        ],
    });

    mainCardInfo.appendChild(imgCard);
    mainCardInfo.appendChild(tempInfo);
    mainCardInfo.appendChild(tempMoreInfo);
    mainCard.appendChild(mainCardInfo);
}

function createDaysCards(info) {
    for (const card of cardsArray) {
        card.replaceChildren();

        const index = cardsArray.indexOf(card);
        const dayTempInfo = info[`${index}`];

        const dayName = getDate(dayTempInfo.datetime);
        const imageWeather = getWeatherIcon(dayTempInfo.conditions);
        const temp = `${dayTempInfo.temp}°C`;

        card.appendChild(makeElement('p', { className: ['day'], text: dayName }));
        card.appendChild(
            makeElement('img', { attributes: { src: imageWeather, alt: 'Icon of the weather condition' } })
        );
        card.appendChild(makeElement('p', { className: ['temp'], text: temp }));
    }
}

function getDate(dateStr) {
    const apiDate = dateStr;
    const parts = apiDate.split('-');
    const dateInfo = new Date(parts[0], parts[1] - 1, parts[2]);
    const dayName = dateInfo.toLocaleDateString('en-US', { weekday: 'short' });
    return dayName;
}

function createCards(city, info) {
    createMainCard(city, info.currentConditions);
    createDaysCards(info.days);
}

export { createCards };
