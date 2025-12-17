/**
 * Slider Management Module
 * Handles image slider functionality and animations
 */

import { SLIDER_CONFIG } from '../data/config.js';
import { findRoseById } from '../data/roses.js';
import { getElementById, querySelectorAll } from './dom.js';

/**
 * Initialize all sliders for roses
 * @param {Array} roses - Array of rose objects
 * @param {Map} sliderStates - Map of slider states
 * @param {Map} sliderIntervals - Map of slider intervals
 * @param {Function} onTransition - Callback when slider transitions
 */
export function initializeSliders(roses, sliderStates, sliderIntervals, onTransition) {
    clearAllIntervals(sliderIntervals);
    sliderIntervals.clear();
    
    roses.forEach(rose => {
        if (rose.images.length > 1) {
            // Start auto-advance interval
            const interval = setInterval(() => {
                handleSliderTransition(rose.id, 'next', roses, sliderStates, onTransition);
            }, SLIDER_CONFIG.AUTO_ADVANCE_INTERVAL);
            
            sliderIntervals.set(rose.id, interval);
            
            // Setup swipe gestures
            const sliderElement = getElementById(`slider-${rose.id}`);
            if (sliderElement) {
                setupSwipeGestures(sliderElement, rose.id, roses, sliderStates, onTransition);
            }
        }
    });
    
    // Setup navigation buttons
    attachSliderNavButtons(roses, sliderStates, onTransition);
}

/**
 * Handle slider image transition
 * @param {string} roseId - Rose ID
 * @param {string} direction - Direction ('next' or 'prev')
 * @param {Array} roses - Array of all roses
 * @param {Map} sliderStates - Slider states map
 * @param {Function} onTransition - Callback function
 */
export function handleSliderTransition(roseId, direction, roses, sliderStates, onTransition) {
    const rose = findRoseById(roseId);
    if (!rose) return;
    
    const currentIndex = sliderStates.get(roseId) || 0;
    let newIndex;
    
    if (direction === 'next') {
        newIndex = currentIndex === rose.images.length - 1 ? 0 : currentIndex + 1;
    } else {
        newIndex = currentIndex === 0 ? rose.images.length - 1 : currentIndex - 1;
    }
    
    sliderStates.set(roseId, newIndex);
    updateSliderDisplay(roseId, newIndex);
    
    if (onTransition) {
        onTransition(roseId, newIndex);
    }
}

/**
 * Update slider display to show image at index
 * @param {string} roseId - Rose ID
 * @param {number} newIndex - Index of image to show
 */
export function updateSliderDisplay(roseId, newIndex) {
    const slider = getElementById(`slider-${roseId}`);
    if (!slider) return;
    
    const images = querySelectorAll('.slider-image', slider);
    images.forEach((img, index) => {
        img.classList.toggle('active', index === newIndex);
    });
}

/**
 * Setup swipe gesture detection
 * @param {HTMLElement} sliderElement - Slider DOM element
 * @param {string} roseId - Rose ID
 * @param {Array} roses - Array of all roses
 * @param {Map} sliderStates - Slider states map
 * @param {Function} onTransition - Callback function
 */
export function setupSwipeGestures(sliderElement, roseId, roses, sliderStates, onTransition) {
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderElement.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        sliderElement.classList.add('grabbing');
    });
    
    sliderElement.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        sliderElement.classList.remove('grabbing');
        handleSwipe(roseId, touchStartX, touchEndX, roses, sliderStates, onTransition);
    });
}

/**
 * Handle swipe gesture
 * @param {string} roseId - Rose ID
 * @param {number} startX - Swipe start X position
 * @param {number} endX - Swipe end X position
 * @param {Array} roses - Array of all roses
 * @param {Map} sliderStates - Slider states map
 * @param {Function} onTransition - Callback function
 */
function handleSwipe(roseId, startX, endX, roses, sliderStates, onTransition) {
    const distance = startX - endX;
    
    if (Math.abs(distance) > SLIDER_CONFIG.SWIPE_THRESHOLD) {
        const direction = distance > 0 ? 'next' : 'prev';
        handleSliderTransition(roseId, direction, roses, sliderStates, onTransition);
    }
}

/**
 * Attach event listeners to slider navigation buttons
 * @param {Array} roses - Array of all roses
 * @param {Map} sliderStates - Slider states map
 * @param {Function} onTransition - Callback function
 */
export function attachSliderNavButtons(roses, sliderStates, onTransition) {
    const buttons = querySelectorAll('.slider-nav-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const roseId = e.currentTarget.dataset.roseId;
            const direction = e.currentTarget.dataset.direction;
            handleSliderTransition(roseId, direction, roses, sliderStates, onTransition);
        });
    });
}

/**
 * Clear all slider intervals
 * @param {Map} sliderIntervals - Map of slider intervals
 */
export function clearAllIntervals(sliderIntervals) {
    sliderIntervals.forEach(interval => clearInterval(interval));
}

/**
 * Cleanup slider resources
 * @param {Map} sliderIntervals - Map of slider intervals
 */
export function cleanupSliders(sliderIntervals) {
    clearAllIntervals(sliderIntervals);
    sliderIntervals.clear();
}
