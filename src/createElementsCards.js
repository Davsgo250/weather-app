import { getWeatherIcon } from './chooseWeatherImage.js';
const mainCard = document.querySelector('.mainCard');
const cards = document.querySelectorAll('.card');

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
                attributes: { src: imageSrc, alt: 'iconWeatherMain' },
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

function createDaysCards(city, info) {
    console.log(info);
    console.log('Creating Days Cards...');
    console.log(cards);
}

function createCards(city, info) {
    createMainCard(city, info.currentConditions);
    createDaysCards(city, info.days);
}

export { createCards };
