/**
 * Rose Shopping Website - Modular Application
 * Main entry point with clean separation of concerns
 */

// Import data modules
import { climbingRoses } from './data/roses.js';
import { rosePlantingGuide } from './data/guide.js';
import { heightTabs, CATEGORIES, DEFAULT_HEIGHT_TAB, getDefaultState, OVERLAY_SCROLLBARS_CONFIG } from './data/config.js';

// Import utility modules
import { loadWishlist, toggleWishlistItem, isInWishlist } from './utils/storage.js';
import { searchRoses, getRosesToDisplay, parseRoseType, createRoseSearchCatalog, getWishlistedRoses } from './utils/dataService.js';
import { generateRoseCard, generateSliderHTML, generateHeightTabsHTML, generatePlantingGuideHTML, generateEmptyStateHTML, generateSuggestionsHTML } from './utils/rendering.js';
import { getElementById, querySelector, querySelectorAll, setHTML, toggleClass, scrollIntoView } from './utils/dom.js';
import { initializeSliders, cleanupSliders } from './utils/slider.js';

// ============================================================================
// APPLICATION STATE
// ============================================================================

let state = getDefaultState();
const roseSearchCatalog = createRoseSearchCatalog();

// ============================================================================
// RENDERING FUNCTIONS
// ============================================================================

/**
 * Render height tabs based on current category
 */
function renderHeightTabs() {
    const wrapper = getElementById('heightTabsWrapper');
    const tabs = state.roseCategory === CATEGORIES.CLIMBING ? [] : heightTabs;
    
    if (tabs.length === 0) {
        setHTML(wrapper, '');
        return;
    }
    
    const html = generateHeightTabsHTML(tabs, state.activeHeightTab);
    setHTML(wrapper, html);
    
    querySelectorAll('.height-tab-button', wrapper).forEach(button => {
        button.addEventListener('click', () => {
            state.activeHeightTab = button.dataset.tab;
            renderHeightTabs();
            renderRoses();
        });
    });
}

/**
 * Render planting guide
 */
function renderPlantingGuide() {
    const rosesList = getElementById('rosesList');
    const html = generatePlantingGuideHTML(rosePlantingGuide);
    setHTML(rosesList, html);
}

/**
 * Render rose cards or planting guide
 */
function renderRoses() {
    const rosesList = getElementById('rosesList');
    
    if (state.roseCategory === CATEGORIES.GUIDE) {
        renderPlantingGuide();
        return;
    }
    
    const roses = getRosesToDisplay(state.roseCategory, state.activeHeightTab);
    
    if (roses.length === 0) {
        const html = generateEmptyStateHTML(
            'No roses available',
            'Select a different category or height to view roses'
        );
        setHTML(rosesList, html);
        return;
    }
    
    // Generate rose cards
    const cardsHTML = roses.map(rose => {
        const isWishlisted = isInWishlist(state.wishlist, rose.id);
        const currentIndex = state.sliderStates.get(rose.id) || 0;
        const sliderHTML = generateSliderHTML(rose, currentIndex);
        return generateRoseCard(rose, isWishlisted, sliderHTML);
    }).join('');
    
    setHTML(rosesList, cardsHTML);
    
    // Attach wishlist button listeners
    querySelectorAll('.wishlist-btn', rosesList).forEach(button => {
        button.addEventListener('click', () => {
            const roseId = button.dataset.roseId;
            toggleWishlist(roseId);
        });
    });
    
    // Initialize sliders
    initializeSliders(roses, state.sliderStates, state.sliderIntervals);
}

/**
 * Update rose type label in dropdown
 */
function updateRoseTypeLabel() {
    const labelElement = querySelector('#roseTypeBtn .dropdown-label');
    if (!labelElement) return;
    
    const labels = {
        [CATEGORIES.GUIDE]: 'Rose Planting',
        [CATEGORIES.CLIMBING]: 'Climbing Rose',
        [CATEGORIES.BUSH]: 'Bush Rose',
    };
    
    labelElement.textContent = labels[state.roseCategory] || 'Rose Type';
}

/**
 * Update wishlist count display
 */
function updateWishlistCount() {
    const countElement = getElementById('wishlistCount');
    if (countElement) {
        countElement.textContent = state.wishlist.size;
    }
}

// ============================================================================
// WISHLIST FUNCTIONS
// ============================================================================

/**
 * Toggle rose in wishlist and update UI
 */
function toggleWishlist(roseId) {
    toggleWishlistItem(state.wishlist, roseId);
    updateWishlistCount();
    renderRoses();
}

/**
 * Display wishlisted roses
 */
function displayWishlistedRoses() {
    const rosesList = getElementById('rosesList');
    const wishlistedRoses = getWishlistedRoses(state.wishlist);
    
    if (wishlistedRoses.length === 0) {
        const html = generateEmptyStateHTML(
            'No roses in your wishlist yet',
            'Tap the heart icon on any rose to add it to your wishlist'
        );
        setHTML(rosesList, html);
        return;
    }
    
    // Generate wishlisted rose cards
    const cardsHTML = wishlistedRoses.map(rose => {
        const currentIndex = state.sliderStates.get(rose.id) || 0;
        const sliderHTML = generateSliderHTML(rose, currentIndex);
        return generateRoseCard(rose, true, sliderHTML);
    }).join('');
    
    setHTML(rosesList, cardsHTML);
    
    // Attach wishlist button listeners
    querySelectorAll('.wishlist-btn', rosesList).forEach(button => {
        button.addEventListener('click', () => {
            const roseId = button.dataset.roseId;
            toggleWishlist(roseId);
        });
    });
    
    // Initialize sliders
    initializeSliders(wishlistedRoses, state.sliderStates, state.sliderIntervals);
}

// ============================================================================
// DROPDOWN AND NAVIGATION
// ============================================================================

/**
 * Setup dropdown menu for rose category selection
 */
function setupDropdownMenu() {
    const roseTypeBtn = getElementById('roseTypeBtn');
    const roseTypeDropdown = getElementById('roseTypeDropdown');
    const dropdownItems = querySelectorAll('.dropdown-item', roseTypeDropdown);
    
    // Toggle dropdown open/close
    roseTypeBtn.addEventListener('click', () => {
        const isOpen = toggleClass(roseTypeBtn, 'open');
        toggleClass(roseTypeDropdown, 'hidden', !isOpen);
    });
    
    // Handle category selection
    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.dataset.category;
            state.roseCategory = category;
            
            // Set active height tab
            if (category === CATEGORIES.CLIMBING || category === CATEGORIES.GUIDE) {
                state.activeHeightTab = null;
            } else {
                state.activeHeightTab = DEFAULT_HEIGHT_TAB;
            }
            
            // Close dropdown and update UI
            toggleClass(roseTypeBtn, 'open', false);
            toggleClass(roseTypeDropdown, 'hidden', true);
            updateRoseTypeLabel();
            
            renderHeightTabs();
            renderRoses();
        });
    });
    
    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
        if (!roseTypeBtn.contains(e.target) && !roseTypeDropdown.contains(e.target)) {
            toggleClass(roseTypeBtn, 'open', false);
            toggleClass(roseTypeDropdown, 'hidden', true);
        }
    });
}

/**
 * Setup wishlist navigation button
 */
function setupWishlistButton() {
    const wishlistBtn = getElementById('wishlistBtn');
    wishlistBtn.addEventListener('click', () => {
        displayWishlistedRoses();
    });
}

// ============================================================================
// SEARCH FUNCTIONALITY
// ============================================================================

/**
 * Handle search input
 */
function handleSearch() {
    const searchInput = getElementById('searchInput');
    const clearBtn = getElementById('clearSearchBtn');
    const suggestionsDropdown = getElementById('suggestionsDropdown');
    
    state.searchQuery = searchInput.value;
    
    if (state.searchQuery.trim()) {
        clearBtn.classList.remove('hidden');
        
        const filtered = searchRoses(state.searchQuery, roseSearchCatalog);
        const html = generateSuggestionsHTML(filtered);
        setHTML(suggestionsDropdown, html);
        
        // Attach suggestion click handlers
        querySelectorAll('.suggestion-item', suggestionsDropdown).forEach(button => {
            button.addEventListener('click', () => {
                selectRose(button.dataset.roseId, button.dataset.roseType);
            });
        });
        
        suggestionsDropdown.classList.remove('hidden');
    } else {
        clearBtn.classList.add('hidden');
        suggestionsDropdown.classList.add('hidden');
    }
}

/**
 * Clear search input and suggestions
 */
function clearSearch() {
    const searchInput = getElementById('searchInput');
    const clearBtn = getElementById('clearSearchBtn');
    const suggestionsDropdown = getElementById('suggestionsDropdown');
    
    searchInput.value = '';
    state.searchQuery = '';
    clearBtn.classList.add('hidden');
    suggestionsDropdown.classList.add('hidden');
}

/**
 * Handle rose selection from search results
 */
function selectRose(roseId, roseType) {
    const { category, heightTab } = parseRoseType(roseType);
    
    state.roseCategory = category;
    state.activeHeightTab = heightTab;
    
    updateRoseTypeLabel();
    renderHeightTabs();
    renderRoses();
    clearSearch();
    
    // Scroll to and highlight the selected rose
    setTimeout(() => {
        const element = getElementById(`rose-${roseId}`);
        if (element) {
            scrollIntoView(element);
            element.classList.add('highlight-animation');
            setTimeout(() => {
                element.classList.remove('highlight-animation');
            }, 2000);
        }
    }, 100);
}

/**
 * Handle click outside search to close suggestions
 */
function handleClickOutside(event) {
    const searchContainer = getElementById('searchContainer');
    if (searchContainer && !searchContainer.contains(event.target)) {
        const suggestionsDropdown = getElementById('suggestionsDropdown');
        suggestionsDropdown.classList.add('hidden');
    }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize OverlayScrollbars
 */
function initializeScrollbars() {
    if (window.OverlayScrollbarsGlobal) {
        const { OverlayScrollbars } = window.OverlayScrollbarsGlobal;
        OverlayScrollbars(document.body, OVERLAY_SCROLLBARS_CONFIG);
    }
}

/**
 * Main initialization function
 */
function init() {
    // Initialize scrollbars
    initializeScrollbars();
    
    // Load wishlist from storage
    state.wishlist = loadWishlist();
    
    // Setup UI
    updateWishlistCount();
    updateRoseTypeLabel();
    renderHeightTabs();
    renderRoses();
    
    // Setup event listeners
    setupDropdownMenu();
    setupWishlistButton();
    
    // Setup search
    const searchInput = getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    const clearBtn = getElementById('clearSearchBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearSearch);
    }
    
    document.addEventListener('mousedown', handleClickOutside);
}

/**
 * Initialize when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

/**
 * Cleanup on page unload
 */
window.addEventListener('beforeunload', () => {
    cleanupSliders(state.sliderIntervals);
});
