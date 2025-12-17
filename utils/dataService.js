/**
 * Data Service Module
 * Handles search and data filtering operations
 */

import { bushRosesBelowOneMeter, bushRosesAroundOneMeter, bushRosesAboveOneMeter, climbingRoses, getAllRoses } from '../data/roses.js';

/**
 * Create searchable rose catalog
 * @returns {Array} Array of roses with search metadata
 */
export function createRoseSearchCatalog() {
    return [
        ...bushRosesBelowOneMeter.map(r => ({ id: r.id, name: r.name, type: 'Bush Rose - Below 1m' })),
        ...bushRosesAroundOneMeter.map(r => ({ id: r.id, name: r.name, type: 'Bush Rose - Around 1m' })),
        ...bushRosesAboveOneMeter.map(r => ({ id: r.id, name: r.name, type: 'Bush Rose - Above 1m' })),
        ...climbingRoses.map(r => ({ id: r.id, name: r.name, type: 'Climbing Rose' })),
    ];
}

/**
 * Search roses by name
 * @param {string} query - Search query string
 * @param {Array} catalog - Rose search catalog
 * @returns {Array} Array of matching roses
 */
export function searchRoses(query, catalog) {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    return catalog.filter(rose =>
        rose.name.toLowerCase().includes(lowerQuery)
    );
}

/**
 * Get roses to display based on category and height tab
 * @param {string} category - Rose category ('bush', 'climbing', 'guide')
 * @param {string} heightTab - Height tab ID
 * @returns {Array} Array of roses to display
 */
export function getRosesToDisplay(category, heightTab) {
    if (category === 'guide' || category === 'climbing') {
        return category === 'climbing' ? climbingRoses : [];
    }
    
    switch (heightTab) {
        case 'below-1m':
            return bushRosesBelowOneMeter;
        case 'around-1m':
            return bushRosesAroundOneMeter;
        case 'above-1m':
            return bushRosesAboveOneMeter;
        default:
            return bushRosesBelowOneMeter;
    }
}

/**
 * Filter roses by wishlist
 * @param {Set} wishlist - Set of wishlisted rose IDs
 * @returns {Array} Array of wishlisted roses
 */
export function getWishlistedRoses(wishlist) {
    return getAllRoses().filter(rose => wishlist.has(rose.id));
}

/**
 * Parse search result type to determine category and height tab
 * @param {string} roseType - Rose type string (e.g., 'Bush Rose - Below 1m')
 * @returns {Object} Object with category and heightTab properties
 */
export function parseRoseType(roseType) {
    let category = 'bush';
    let heightTab = 'below-1m';
    
    if (roseType.includes('Climbing')) {
        category = 'climbing';
    } else if (roseType.includes('Around')) {
        heightTab = 'around-1m';
    } else if (roseType.includes('Above')) {
        heightTab = 'above-1m';
    }
    
    return { category, heightTab };
}
