/**
 * DOM Utilities Module
 * Helper functions for DOM manipulation and element selection
 */

/**
 * Safely get element by ID
 * @param {string} elementId - Element ID
 * @returns {HTMLElement|null} Element or null if not found
 */
export function getElementById(elementId) {
    return document.getElementById(elementId) || null;
}

/**
 * Safely query element with selector
 * @param {string} selector - CSS selector
 * @param {HTMLElement} parent - Parent element (defaults to document)
 * @returns {HTMLElement|null} Element or null if not found
 */
export function querySelector(selector, parent = document) {
    return parent.querySelector(selector) || null;
}

/**
 * Query all elements matching selector
 * @param {string} selector - CSS selector
 * @param {HTMLElement} parent - Parent element (defaults to document)
 * @returns {NodeList} NodeList of matching elements
 */
export function querySelectorAll(selector, parent = document) {
    return parent.querySelectorAll(selector);
}

/**
 * Update element HTML safely
 * @param {HTMLElement} element - Element to update
 * @param {string} html - HTML content
 */
export function setHTML(element, html) {
    if (element) {
        element.innerHTML = html;
    }
}

/**
 * Add event listener with cleanup reference
 * @param {HTMLElement} element - Element to attach listener
 * @param {string} event - Event name
 * @param {Function} handler - Event handler function
 * @returns {Function} Function to remove listener
 */
export function addEventListener(element, event, handler) {
    if (element) {
        element.addEventListener(event, handler);
        return () => element.removeEventListener(event, handler);
    }
    return () => {};
}

/**
 * Toggle element class
 * @param {HTMLElement} element - Element to toggle
 * @param {string} className - Class name
 * @param {boolean} force - Optional force value
 * @returns {boolean} Whether class is now present
 */
export function toggleClass(element, className, force) {
    if (element) {
        return element.classList.toggle(className, force);
    }
    return false;
}

/**
 * Add class to element
 * @param {HTMLElement} element - Element
 * @param {string} className - Class name
 */
export function addClass(element, className) {
    if (element) {
        element.classList.add(className);
    }
}

/**
 * Remove class from element
 * @param {HTMLElement} element - Element
 * @param {string} className - Class name
 */
export function removeClass(element, className) {
    if (element) {
        element.classList.remove(className);
    }
}

/**
 * Check if element has class
 * @param {HTMLElement} element - Element
 * @param {string} className - Class name
 * @returns {boolean} Whether element has class
 */
export function hasClass(element, className) {
    return element ? element.classList.contains(className) : false;
}

/**
 * Attach multiple event listeners
 * @param {HTMLElement} parent - Parent element
 * @param {string} selector - CSS selector for target elements
 * @param {string} event - Event name
 * @param {Function} handler - Event handler function
 * @returns {Array} Array of cleanup functions
 */
export function attachDelegatedEventListeners(parent, selector, event, handler) {
    const elements = querySelectorAll(selector, parent);
    const cleanups = [];
    
    elements.forEach(element => {
        const cleanup = addEventListener(element, event, handler);
        cleanups.push(cleanup);
    });
    
    return cleanups;
}

/**
 * Smooth scroll element into view
 * @param {HTMLElement} element - Element to scroll to
 * @param {string} behavior - Scroll behavior ('smooth', 'auto')
 * @param {string} block - Block position ('start', 'center', 'end', 'nearest')
 */
export function scrollIntoView(element, behavior = 'smooth', block = 'center') {
    if (element) {
        element.scrollIntoView({ behavior, block });
    }
}
