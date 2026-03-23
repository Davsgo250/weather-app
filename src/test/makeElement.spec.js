/**
 * @jest-environment jsdom
 */

import { makeElement } from '../createElementsCards.js';

describe('makeElement Utility', () => {
    test('creates a basic element with text and ID', () => {
        const el = makeElement('h1', {
            id: 'title',
            text: 'Hello Modules',
        });

        expect(el.tagName).toBe('H1');
        expect(el.id).toBe('title');
        expect(el.textContent).toBe('Hello Modules');
    });

    test('handles array-based class names', () => {
        const classes = ['flex', 'items-center', 'justify-between'];
        const el = makeElement('div', { className: classes });

        expect(el.classList.contains('flex')).toBe(true);
        expect(el.classList.contains('justify-between')).toBe(true);
        expect(el.classList).toHaveLength(3);
    });

    test('preserves original options object (immutability)', () => {
        const options = { text: 'test' };
        makeElement('p', options);

        // Check that we didn't accidentally delete or change the input
        expect(options).toEqual({ text: 'test' });
    });
});
