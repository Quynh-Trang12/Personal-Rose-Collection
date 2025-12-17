/**
 * Application Configuration Module
 * Centralized constants and configurations
 */

export const heightTabs = [
    { id: 'below-1m', label: 'Below 1m', description: 'For Pots' },
    { id: 'around-1m', label: 'Around 1m', description: 'For Hedge' },
    { id: 'above-1m', label: 'Above 1m', description: 'For Border' },
];

export const CATEGORIES = {
    BUSH: 'bush',
    CLIMBING: 'climbing',
    GUIDE: 'guide',
};

export const DEFAULT_CATEGORY = CATEGORIES.BUSH;
export const DEFAULT_HEIGHT_TAB = 'below-1m';

export const OVERLAY_SCROLLBARS_CONFIG = {
    scrollbars: {
        theme: 'os-theme-rose',
        autoHide: 'scroll',
        autoHideDelay: 500,
        clickScroll: true
    }
};

export const SLIDER_CONFIG = {
    AUTO_ADVANCE_INTERVAL: 5000, // 5 seconds
    SWIPE_THRESHOLD: 50, // pixels
};

/**
 * Get default initial state
 * @returns {Object} Default application state
 */
export function getDefaultState() {
    return {
        roseCategory: DEFAULT_CATEGORY,
        activeHeightTab: DEFAULT_HEIGHT_TAB,
        wishlist: new Set(),
        searchQuery: '',
        sliderIntervals: new Map(),
        sliderStates: new Map(),
        sliderStartX: 0,
        sliderDraggedDistance: 0,
    };
}
