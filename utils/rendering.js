/**
 * Rendering Utilities Module
 * Handles HTML generation for various components
 */

/**
 * Generate HTML for a rose card
 * @param {Object} rose - Rose data object
 * @param {boolean} isWishlisted - Whether the rose is in wishlist
 * @param {string} sliderHTML - Pre-generated slider HTML
 * @returns {string} HTML string for rose card
 */
export function generateRoseCard(rose, isWishlisted, sliderHTML) {
    return `
        <div class="rose-card" id="rose-${rose.id}">
            <div class="rose-card-header">
                <h3 class="rose-card-title">${rose.name}</h3>
                <button class="wishlist-btn" data-rose-id="${rose.id}" aria-label="${isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}">
                    <svg class="wishlist-icon ${isWishlisted ? 'wishlisted' : ''}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                    </svg>
                </button>
            </div>
            <div class="rose-card-description-wrapper">
                <p class="rose-card-description">${rose.description}</p>
            </div>
            
            <div class="rose-slider-container">
                ${sliderHTML}
            </div>
            
            <div class="rose-details">
                <div class="rose-details-box">
                    <div class="rose-price-row">
                        <span class="rose-price-label">Price</span>
                        <span class="rose-price-value">${rose.price}</span>
                    </div>
                    
                    <div class="rose-details-grid">
                        <div class="rose-detail-item">
                            <span class="rose-detail-label">Color</span>
                            <span class="rose-detail-value">${rose.color}</span>
                        </div>
                        
                        <div class="rose-detail-item">
                            <span class="rose-detail-label">Height</span>
                            <span class="rose-detail-value">${rose.height}</span>
                        </div>
                        
                        <div class="rose-detail-item">
                            <span class="rose-detail-label">Fragrance</span>
                            <span class="rose-detail-value">${rose.fragrance}</span>
                        </div>
                        
                        <div class="rose-detail-item">
                            <span class="rose-detail-label">Blooming</span>
                            <span class="rose-detail-value">${rose.bloomingSeason}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Generate HTML for slider component
 * @param {Object} rose - Rose data object
 * @param {number} currentIndex - Current image index
 * @returns {string} HTML string for slider
 */
export function generateSliderHTML(rose, currentIndex = 0) {
    const sliderId = `slider-${rose.id}`;
    
    return `
        <div class="rose-slider" id="${sliderId}">
            <div class="slider-images">
                ${rose.images.map((img, index) => `
                    <img 
                        src="${img}" 
                        alt="${rose.name} ${index + 1}"
                        class="slider-image ${index === currentIndex ? 'active' : ''}"
                        loading="lazy"
                    />
                `).join('')}
            </div>
            
            ${rose.images.length > 1 ? `
                <button class="slider-nav-btn prev" data-rose-id="${rose.id}" data-direction="prev">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m15 18-6-6 6-6"/>
                    </svg>
                </button>
                
                <button class="slider-nav-btn next" data-rose-id="${rose.id}" data-direction="next">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m9 18 6-6-6-6"/>
                    </svg>
                </button>
            ` : ''}
        </div>
    `;
}

/**
 * Generate HTML for height tabs
 * @param {Array} tabs - Tab configuration array
 * @param {string} activeTabId - ID of active tab
 * @returns {string} HTML string for tabs
 */
export function generateHeightTabsHTML(tabs, activeTabId) {
    return tabs.map(tab => `
        <button 
            class="height-tab-button ${activeTabId === tab.id ? 'active' : ''}"
            data-tab="${tab.id}"
        >
            <span class="tab-label-text">${tab.label}</span>
            <span class="tab-subtitle-text">${tab.description}</span>
        </button>
    `).join('');
}

/**
 * Generate HTML for planting guide
 * @param {Array} guideTopics - Array of guide topics
 * @returns {string} HTML string for planting guide
 */
export function generatePlantingGuideHTML(guideTopics) {
    return `
        <div class="planting-guide-container">
            <div class="guide-header">
                <h2 class="guide-title">🌹 Rose Planting Guide</h2>
                <p class="guide-subtitle">Learn everything you need to know about planting and caring for your roses</p>
            </div>
            
            <div class="guide-topics">
                ${guideTopics.map(topic => `
                    <div class="guide-topic-card" id="guide-${topic.id}">
                        <div class="topic-header">
                            <span class="topic-icon">${topic.icon}</span>
                            <div class="topic-title-wrapper">
                                <h3 class="topic-title">${topic.title}</h3>
                                <p class="topic-description">${topic.description}</p>
                            </div>
                        </div>
                        
                        <div class="topic-content">
                            ${topic.content.map(section => `
                                <div class="topic-section">
                                    <h4 class="section-subtitle">${section.subtitle}</h4>
                                    <p class="section-details">${section.details.split('\n').join('<br>')}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

/**
 * Generate empty state HTML
 * @param {string} title - Empty state title
 * @param {string} text - Empty state description text
 * @returns {string} HTML string for empty state
 */
export function generateEmptyStateHTML(title, text) {
    return `
        <div class="empty-wishlist">
            <svg class="empty-wishlist-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
            <h3 class="empty-wishlist-title">${title}</h3>
            <p class="empty-wishlist-text">${text}</p>
        </div>
    `;
}

/**
 * Generate search suggestion items
 * @param {Array} results - Array of search results
 * @returns {string} HTML string for suggestions
 */
export function generateSuggestionsHTML(results) {
    if (results.length === 0) {
        return `
            <div class="no-results">
                <p>No roses found</p>
            </div>
        `;
    }
    
    return results.map(rose => `
        <button class="suggestion-item" data-rose-id="${rose.id}" data-rose-type="${rose.type}">
            <span class="suggestion-name">${rose.name}</span>
            <span class="suggestion-type">${rose.type}</span>
        </button>
    `).join('');
}
