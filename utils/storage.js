/**
 * Storage Service Module
 * Handles localStorage operations for wishlist persistence
 */

const WISHLIST_KEY = 'roseWishlist';

/**
 * Load wishlist from localStorage
 * @returns {Set} Set of wishlisted rose IDs
 */
export function loadWishlist() {
    try {
        const saved = localStorage.getItem(WISHLIST_KEY);
        return new Set(saved ? JSON.parse(saved) : []);
    } catch (error) {
        console.error('Error loading wishlist:', error);
        return new Set();
    }
}

/**
 * Save wishlist to localStorage
 * @param {Set} wishlist - Set of rose IDs to save
 */
export function saveWishlist(wishlist) {
    try {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(Array.from(wishlist)));
    } catch (error) {
        console.error('Error saving wishlist:', error);
    }
}

/**
 * Add rose to wishlist
 * @param {Set} wishlist - Current wishlist
 * @param {string} roseId - Rose ID to add
 * @returns {Set} Updated wishlist
 */
export function addToWishlist(wishlist, roseId) {
    wishlist.add(roseId);
    saveWishlist(wishlist);
    return wishlist;
}

/**
 * Remove rose from wishlist
 * @param {Set} wishlist - Current wishlist
 * @param {string} roseId - Rose ID to remove
 * @returns {Set} Updated wishlist
 */
export function removeFromWishlist(wishlist, roseId) {
    wishlist.delete(roseId);
    saveWishlist(wishlist);
    return wishlist;
}

/**
 * Toggle rose in wishlist
 * @param {Set} wishlist - Current wishlist
 * @param {string} roseId - Rose ID to toggle
 * @returns {boolean} Whether rose is now in wishlist
 */
export function toggleWishlistItem(wishlist, roseId) {
    const isInWishlist = wishlist.has(roseId);
    
    if (isInWishlist) {
        removeFromWishlist(wishlist, roseId);
    } else {
        addToWishlist(wishlist, roseId);
    }
    
    return !isInWishlist;
}

/**
 * Check if rose is in wishlist
 * @param {Set} wishlist - Current wishlist
 * @param {string} roseId - Rose ID to check
 * @returns {boolean} Whether rose is in wishlist
 */
export function isInWishlist(wishlist, roseId) {
    return wishlist.has(roseId);
}

/**
 * Clear all wishlist data
 */
export function clearWishlist() {
    try {
        localStorage.removeItem(WISHLIST_KEY);
    } catch (error) {
        console.error('Error clearing wishlist:', error);
    }
}
