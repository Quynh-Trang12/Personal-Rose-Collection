// Rose Shopping Website - Vanilla JavaScript with New Navigation
// State Management
const state = {
    roseCategory: 'bush', // 'bush' or 'climbing'
    activeHeightTab: 'below-1m',
    wishlist: new Set(),
    searchQuery: '',
    sliderIntervals: new Map(),
    sliderStates: new Map(),
    sliderStartX: 0,
    sliderDraggedDistance: 0,
};

// Rose Data
const bushRosesBelowOneMeter = [
    {
        id: 'bush-below-1',
        name: 'Pink Paradise',
        description: 'A compact bush rose with delicate pink petals that brighten any small space. Perfect for containers on balconies or patios.',
        images: [
            'https://images.unsplash.com/photo-1697557167328-eafb1f94a731?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwcm9zZSUyMGdhcmRlbnxlbnwxfHx8fDE3NjUzMDk2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
            'https://images.unsplash.com/photo-1623945392355-12af183b7acd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHJvc2UlMjBmbG93ZXJ8ZW58MXx8fHwxNzY1MzA5NjYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
            'https://images.unsplash.com/photo-1719538832618-cd1d30219ee5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5ZWxsb3clMjByb3NlJTIwZ2FyZGVufGVufDF8fHx8MTc2NTMwOTY2MHww&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        price: '$24.99',
        color: 'Soft Pink',
        fragrance: 'Sweet and light',
        bloomingSeason: 'Spring to Fall',
        height: '0.6m - 0.8m',
    },
    {
        id: 'bush-below-2',
        name: 'Coral Dream',
        description: 'An eye-catching coral-colored rose with exceptional disease resistance. Thrives in containers and adds warmth to your garden.',
        images: [
            'https://images.unsplash.com/photo-1604504260717-fb83639201bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjByb3NlJTIwYmxvb208ZW58MXx8fHwxNzY1MzA5NjYxfDA&ixlib=rb-4.1.0&q=80&w=1080',
            'https://images.unsplash.com/photo-1697557167328-eafb1f94a731?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwcm9zZSUyMGdhcmRlbnxlbnwxfHx8fDE3NjUzMDk2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        price: '$22.99',
        color: 'Coral Orange',
        fragrance: 'Mild citrus notes',
        bloomingSeason: 'Summer',
        height: '0.5m - 0.7m',
    },
];

const bushRosesAroundOneMeter = [
    {
        id: 'bush-around-1',
        name: 'Ruby Romance',
        description: 'Classic deep red roses with strong fragrance. Creates a stunning hedge with continuous blooming throughout the season.',
        images: [
            'https://images.unsplash.com/photo-1662110497736-06601647fe27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjByb3NlJTIwYmxvb208ZW58MXx8fHwxNzY1MzA5NjYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
            'https://images.unsplash.com/photo-1604504260717-fb83639201bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjByb3NlJTIwYmxvb208ZW58MXx8fHwxNzY1MzA5NjYxfDA&ixlib=rb-4.1.0&q=80&w=1080',
            'https://images.unsplash.com/photo-1697557167328-eafb1f94a731?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwcm9zZSUyMGdhcmRlbnxlbnwxfHx8fDE3NjUzMDk2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        price: '$28.99',
        color: 'Deep Red',
        fragrance: 'Strong classic rose',
        bloomingSeason: 'Spring to Fall',
        height: '0.9m - 1.1m',
    },
    {
        id: 'bush-around-2',
        name: 'Golden Sunshine',
        description: 'Bright yellow blooms that bring cheerfulness to any hedge. Excellent repeat flowering with good heat tolerance.',
        images: [
            'https://images.unsplash.com/photo-1719538832618-cd1d30219ee5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5ZWxsb3clMjByb3NlJTIwZ2FyZGVufGVufDF8fHx8MTc2NTMwOTY2MHww&ixlib=rb-4.1.0&q=80&w=1080',
            'https://images.unsplash.com/photo-1662110497736-06601647fe27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjByb3NlJTIwYmxvb208ZW58MXx8fHwxNzY1MzA5NjYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        price: '$26.99',
        color: 'Bright Yellow',
        fragrance: 'Fruity and fresh',
        bloomingSeason: 'Spring and Summer',
        height: '1.0m - 1.2m',
    },
];

const bushRosesAboveOneMeter = [
    {
        id: 'bush-above-1',
        name: 'White Elegance',
        description: 'Stunning pure white roses that create an elegant border. Hardy and reliable with beautiful form and excellent disease resistance.',
        images: [
            'https://images.unsplash.com/photo-1623945392355-12af183b7acd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHJvc2UlMjBmbG93ZXJ8ZW58MXx8fHwxNzY1MzA5NjYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
            'https://images.unsplash.com/photo-1697557167328-eafb1f94a731?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwcm9zZSUyMGdhcmRlbnxlbnwxfHx8fDE3NjUzMDk2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
            'https://images.unsplash.com/photo-1719538832618-cd1d30219ee5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5ZWxsb3clMjByb3NlJTIwZ2FyZGVufGVufDF8fHx8MTc2NTMwOTY2MHww&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        price: '$32.99',
        color: 'Pure White',
        fragrance: 'Delicate and sweet',
        bloomingSeason: 'All Season',
        height: '1.3m - 1.5m',
    },
    {
        id: 'bush-above-2',
        name: 'Crimson Majesty',
        description: 'Majestic crimson blooms with velvety petals. Perfect for creating dramatic borders with its rich color and intense fragrance.',
        images: [
            'https://images.unsplash.com/photo-1662110497736-06601647fe27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjByb3NlJTIwYmxvb208ZW58MXx8fHwxNzY1MzA5NjYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
            'https://images.unsplash.com/photo-1623945392355-12af183b7acd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHJvc2UlMjBmbG93ZXJ8ZW58MXx8fHwxNzY1MzA5NjYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        price: '$34.99',
        color: 'Deep Crimson',
        fragrance: 'Rich and intense',
        bloomingSeason: 'Spring to Fall',
        height: '1.4m - 1.6m',
    },
];

const climbingRoses = [
    {
        id: 'climbing-1',
        name: 'Royal Climber',
        description: 'A vigorous climbing rose with abundant blooms. Perfect for covering walls, fences, or arbors with a spectacular floral display.',
        images: [
            'https://images.unsplash.com/photo-1468531428472-ad67ab141fdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYmluZyUyMHJvc2VzJTIwd2FsbHxlbnwxfHx8fDE3NjUyOTM3NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
            'https://images.unsplash.com/photo-1662110497736-06601647fe27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjByb3NlJTIwYmxvb208ZW58MXx8fHwxNzY1MzA5NjYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
            'https://images.unsplash.com/photo-1697557167328-eafb1f94a731?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwcm9zZSUyMGdhcmRlbnxlbnwxfHx8fDE3NjUzMDk2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        price: '$38.99',
        color: 'Pink and Red mix',
        fragrance: 'Sweet and strong',
        bloomingSeason: 'Spring to Summer',
        height: '2.5m - 3.5m',
    },
    {
        id: 'climbing-2',
        name: 'Sunset Vine',
        description: 'Stunning gradient blooms from orange to yellow. Creates a breathtaking sunset effect on vertical structures with continuous flowering.',
        images: [
            'https://images.unsplash.com/photo-1604504260717-fb83639201bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjByb3NlJTIwYmxvb208ZW58MXx8fHwxNzY1MzA5NjYxfDA&ixlib=rb-4.1.0&q=80&w=1080',
            'https://images.unsplash.com/photo-1719538832618-cd1d30219ee5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5ZWxsb3clMjByb3NlJTIwZ2FyZGVufGVufDF8fHx8MTc2NTMwOTY2MHww&ixlib=rb-4.1.0&q=80&w=1080',
            'https://images.unsplash.com/photo-1468531428472-ad67ab141fdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYmluZyUyMHJvc2VzJTIwd2FsbHxlbnwxfHx8fDE3NjUyOTM3NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        price: '$42.99',
        color: 'Orange to Yellow',
        fragrance: 'Citrus and honey',
        bloomingSeason: 'Summer to Fall',
        height: '3.0m - 4.0m',
    },
    {
        id: 'climbing-3',
        name: 'Snow Cascade',
        description: 'Graceful white climbing rose with cascading blooms. Exceptional for creating a romantic white garden with year-round interest.',
        images: [
            'https://images.unsplash.com/photo-1623945392355-12af183b7acd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHJvc2UlMjBmbG93ZXJ8ZW58MXx8fHwxNzY1MzA5NjYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
            'https://images.unsplash.com/photo-1468531428472-ad67ab141fdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYmluZyUyMHJvc2VzJTIwd2FsbHxlbnwxfHx8fDE3NjUyOTM3NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        ],
        price: '$45.99',
        color: 'Pure White',
        fragrance: 'Light and fresh',
        bloomingSeason: 'All Season',
        height: '2.8m - 3.8m',
    },
];

// All roses for search
const allRosesForSearch = [
    ...bushRosesBelowOneMeter.map(r => ({ id: r.id, name: r.name, type: 'Bush Rose - Below 1m' })),
    ...bushRosesAroundOneMeter.map(r => ({ id: r.id, name: r.name, type: 'Bush Rose - Around 1m' })),
    ...bushRosesAboveOneMeter.map(r => ({ id: r.id, name: r.name, type: 'Bush Rose - Above 1m' })),
    ...climbingRoses.map(r => ({ id: r.id, name: r.name, type: 'Climbing Rose' })),
];

// Rose Planting Guide Topics
const rosePlantingGuide = [
    {
        id: 'soil-preparation',
        title: 'Soil Preparation',
        description: 'Prepare the ideal soil foundation for healthy rose growth',
        icon: '🌱',
        content: [
            {
                subtitle: 'Soil Composition',
                details: 'Roses thrive in well-draining, fertile soil with a pH between 6.0 and 6.5. Mix garden soil with compost and organic matter to improve structure.'
            },
            {
                subtitle: 'Drainage',
                details: 'Ensure excellent drainage to prevent root rot. Add sand or perlite to heavy clay soils. Roses cannot tolerate waterlogged conditions.'
            },
            {
                subtitle: 'Preparation Steps',
                details: '1. Clear the area of weeds and debris\n2. Loosen soil to 12-18 inches deep\n3. Mix in 3-4 inches of compost\n4. Add aged manure for nutrients\n5. Create planting holes 18-24 inches wide'
            }
        ]
    },
    {
        id: 'watering',
        title: 'Watering',
        description: 'Master the art of proper hydration for vibrant roses',
        icon: '💧',
        content: [
            {
                subtitle: 'Watering Schedule',
                details: 'Water deeply 2-3 times per week, providing 1-2 inches of water. Adjust frequency based on rainfall and soil moisture.'
            },
            {
                subtitle: 'Best Practices',
                details: 'Water at the base of the plant, not the foliage, to prevent fungal diseases. Early morning watering is ideal. Avoid overhead watering during humid seasons.'
            },
            {
                subtitle: 'Seasonal Adjustments',
                details: 'Spring/Summer: More frequent watering as plants are actively growing\nFall: Reduce watering to encourage dormancy\nWinter: Minimal watering unless conditions are dry'
            }
        ]
    },
    {
        id: 'fertilizing',
        title: 'Fertilising Roses',
        description: 'Provide essential nutrients for continuous blooming',
        icon: '🌻',
        content: [
            {
                subtitle: 'Fertilizer Types',
                details: 'Use balanced fertilizers (10-10-10) or rose-specific formulas. Organic options include fish emulsion, bone meal, and blood meal.'
            },
            {
                subtitle: 'Feeding Schedule',
                details: 'Start fertilizing in spring when new growth appears. Feed every 4-6 weeks during growing season. Stop in late summer to prepare for dormancy.'
            },
            {
                subtitle: 'Application Tips',
                details: 'Apply fertilizer to moist soil to prevent root burn. Follow package instructions carefully. Consider slow-release fertilizers for convenience.'
            }
        ]
    },
    {
        id: 'mulching',
        title: 'Mulching Rose Gardens',
        description: 'Protect and nourish your roses with proper mulching',
        icon: '🍂',
        content: [
            {
                subtitle: 'Mulch Benefits',
                details: 'Mulch retains soil moisture, regulates temperature, suppresses weeds, and improves soil as it decomposes.'
            },
            {
                subtitle: 'Mulch Materials',
                details: 'Use organic mulches like wood chips, shredded bark, or straw. Apply 2-4 inches around the base, keeping it 6 inches away from the stem.'
            },
            {
                subtitle: 'Maintenance',
                details: 'Refresh mulch annually. In spring, remove old mulch before new growth. Add new mulch as needed throughout the growing season.'
            }
        ]
    },
    {
        id: 'pruning',
        title: 'Pruning Roses',
        description: 'Shape your roses for optimal health and blooming',
        icon: '✂️',
        content: [
            {
                subtitle: 'Pruning Goals',
                details: 'Remove dead or diseased wood, improve air circulation, and shape the plant for better blooming and disease resistance.'
            },
            {
                subtitle: 'When to Prune',
                details: 'Spring: Main pruning when buds swell\nSummer: Light pruning and deadheading\nFall: Minimal pruning to avoid new tender growth'
            },
            {
                subtitle: 'Pruning Techniques',
                details: 'Cut at 45-degree angles above outward-facing buds. Remove dead wood to the base. Thin dense areas for better air flow. Use sharp, sterilized tools.'
            }
        ]
    },
    {
        id: 'pest-disease',
        title: 'Pest & Disease Management',
        description: 'Keep your roses healthy and pest-free',
        icon: '🛡️',
        content: [
            {
                subtitle: 'Common Pests',
                details: 'Aphids, spider mites, and sawfly larvae are frequent rose pests. Inspect regularly and remove affected leaves or use organic insecticides.'
            },
            {
                subtitle: 'Common Diseases',
                details: 'Powdery mildew, black spot, and rose rosette virus are common. Ensure good air circulation, avoid overhead watering, and remove affected foliage promptly.'
            },
            {
                subtitle: 'Prevention Strategy',
                details: 'Choose disease-resistant varieties, maintain plant health, remove fallen leaves, sanitize tools, and monitor plants regularly.'
            }
        ]
    },
    {
        id: 'seasonal-care',
        title: 'Seasonal Care',
        description: 'Adjust your care routine with the seasons',
        icon: '🌤️',
        content: [
            {
                subtitle: 'Spring Care',
                details: 'Prune back dead wood, apply fresh mulch, start fertilizing, and increase watering as growth begins.'
            },
            {
                subtitle: 'Summer Care',
                details: 'Maintain consistent watering, deadhead spent blooms, monitor for pests and diseases, and provide afternoon shade in hot climates.'
            },
            {
                subtitle: 'Fall & Winter Care',
                details: 'Gradually reduce watering and fertilizing, protect from frost in cold climates, provide winter protection with extra mulch for tender varieties.'
            }
        ]
    }
];

// Height Tabs Configuration
const heightTabs = [
    { id: 'below-1m', label: 'Below 1m', description: 'For Pots'},
    { id: 'around-1m', label: 'Around 1m', description: 'For Hedge'},
    { id: 'above-1m', label: 'Above 1m', description: 'For Border'},
];

// Utility Functions
function loadWishlist() {
    const saved = localStorage.getItem('roseWishlist');
    if (saved) {
        state.wishlist = new Set(JSON.parse(saved));
    }
}

function saveWishlist() {
    localStorage.setItem('roseWishlist', JSON.stringify(Array.from(state.wishlist)));
}

function toggleWishlist(roseId) {
    if (state.wishlist.has(roseId)) {
        state.wishlist.delete(roseId);
    } else {
        state.wishlist.add(roseId);
    }
    saveWishlist();
    updateWishlistCount();
    renderRoses();
}

function updateWishlistCount() {
    const countElement = document.getElementById('wishlistCount');
    if (countElement) {
        countElement.textContent = state.wishlist.size;
    }
}

function updateRoseTypeLabel() {
    const labelElement = document.querySelector('#roseTypeBtn .dropdown-label');
    if (!labelElement) return;
    
    if (state.roseCategory === 'guide') {
        labelElement.textContent = 'Rose Planting';
    } else if (state.roseCategory === 'climbing') {
        labelElement.textContent = 'Climbing Rose';
    } else {
        labelElement.textContent = 'Bush Rose';
    }
}

function getRosesToDisplay() {
    let roses = [];
    
    if (state.roseCategory === 'guide') {
        return [];
    } else if (state.roseCategory === 'climbing') {
        roses = climbingRoses;
    } else {
        switch (state.activeHeightTab) {
            case 'below-1m':
                roses = bushRosesBelowOneMeter;
                break;
            case 'around-1m':
                roses = bushRosesAroundOneMeter;
                break;
            case 'above-1m':
                roses = bushRosesAboveOneMeter;
                break;
        }
    }
    
    return roses;
}

function getTabDescription() {
    if (state.roseCategory === 'climbing') {
        return;
    }

    switch (state.activeHeightTab) {
        case 'below-1m':
            // return 'Compact bush roses perfect for container gardening. Ideal for balconies, patios, and small spaces.';
            return;
        case 'around-1m':
            return;
        case 'above-1m':
            return;
        default:
            return '';
    }
}

// Render Functions
function renderHeightTabs() {
    const wrapper = document.getElementById('heightTabsWrapper');
    const tabs = state.roseCategory === 'climbing' ? [] : heightTabs;
    
    if (tabs.length === 0) {
        wrapper.innerHTML = '';
        return;
    }
    
    wrapper.innerHTML = tabs.map(tab => `
        <button 
            class="height-tab-button ${state.activeHeightTab === tab.id ? 'active' : ''}"
            data-tab="${tab.id}"
        >
            <span class="tab-label-text">${tab.label}</span>
            <span class="tab-subtitle-text">${tab.description}</span>
        </button>
    `).join('');
    
    wrapper.querySelectorAll('.height-tab-button').forEach(button => {
        button.addEventListener('click', () => {
            state.activeHeightTab = button.dataset.tab;
            renderHeightTabs();
            renderTabDescription();
            renderRoses();
        });
    });
}

function renderTabDescription() {
    const descriptionElement = document.getElementById('tabDescriptionText');
    if (!descriptionElement) return;
    descriptionElement.textContent = getTabDescription();
}

function createSlider(rose) {
    const sliderId = `slider-${rose.id}`;
    const currentIndex = state.sliderStates.get(rose.id) || 0;
    
    const sliderHTML = `
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
    
    return sliderHTML;
}

function initializeSliders() {
    state.sliderIntervals.forEach(interval => clearInterval(interval));
    state.sliderIntervals.clear();
    
    getRosesToDisplay().forEach(rose => {
        if (rose.images.length > 1) {
            const interval = setInterval(() => {
                handleSliderTransition(rose.id, 'next');
            }, 5000);
            state.sliderIntervals.set(rose.id, interval);
            
            // Add swipe support
            const sliderElement = document.getElementById(`slider-${rose.id}`);
            if (sliderElement) {
                setupSwipeGestures(sliderElement, rose.id);
            }
        }
    });
    
    document.querySelectorAll('.slider-nav-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const roseId = e.currentTarget.dataset.roseId;
            const direction = e.currentTarget.dataset.direction;
            handleSliderTransition(roseId, direction);
        });
    });
}

function setupSwipeGestures(sliderElement, roseId) {
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderElement.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        sliderElement.classList.add('grabbing');
    });
    
    sliderElement.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        sliderElement.classList.remove('grabbing');
        handleSwipe(roseId, touchStartX, touchEndX);
    });
}

function handleSwipe(roseId, startX, endX) {
    const threshold = 50;
    const distance = startX - endX;
    
    if (Math.abs(distance) > threshold) {
        if (distance > 0) {
            handleSliderTransition(roseId, 'next');
        } else {
            handleSliderTransition(roseId, 'prev');
        }
    }
}

function handleSliderTransition(roseId, direction) {
    const rose = [...bushRosesBelowOneMeter, ...bushRosesAroundOneMeter, ...bushRosesAboveOneMeter, ...climbingRoses]
        .find(r => r.id === roseId);
    
    if (!rose) return;
    
    const currentIndex = state.sliderStates.get(roseId) || 0;
    let newIndex;
    
    if (direction === 'next') {
        newIndex = currentIndex === rose.images.length - 1 ? 0 : currentIndex + 1;
    } else {
        newIndex = currentIndex === 0 ? rose.images.length - 1 : currentIndex - 1;
    }
    
    state.sliderStates.set(roseId, newIndex);
    updateSliderDisplay(roseId, newIndex);
}

function updateSliderDisplay(roseId, newIndex) {
    const slider = document.getElementById(`slider-${roseId}`);
    if (!slider) return;
    
    const images = slider.querySelectorAll('.slider-image');
    images.forEach((img, index) => {
        if (index === newIndex) {
            img.classList.add('active');
        } else {
            img.classList.remove('active');
        }
    });
}

function renderPlantingGuide() {
    const rosesList = document.getElementById('rosesList');
    
    rosesList.innerHTML = `
        <div class="planting-guide-container">
            <div class="guide-header">
                <h2 class="guide-title">🌹 Rose Planting Guide</h2>
                <p class="guide-subtitle">Learn everything you need to know about planting and caring for your roses</p>
            </div>
            
            <div class="guide-topics">
                ${rosePlantingGuide.map(topic => `
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

function renderRoses() {
    const rosesList = document.getElementById('rosesList');
    const roses = getRosesToDisplay();
    
    if (state.roseCategory === 'guide') {
        renderPlantingGuide();
        return;
    }
    
    if (roses.length === 0) {
        rosesList.innerHTML = `
            <div class="empty-wishlist">
                <svg class="empty-wishlist-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
                <h3 class="empty-wishlist-title">No roses available</h3>
                <p class="empty-wishlist-text">Select a different category or height to view roses</p>
            </div>
        `;
        return;
    }
    
    rosesList.innerHTML = roses.map(rose => `
        <div class="rose-card" id="rose-${rose.id}">
            <div class="rose-card-header">
                <h3 class="rose-card-title">${rose.name}</h3>
                <button class="wishlist-btn" data-rose-id="${rose.id}" aria-label="${state.wishlist.has(rose.id) ? 'Remove from wishlist' : 'Add to wishlist'}">
                    <svg class="wishlist-icon ${state.wishlist.has(rose.id) ? 'wishlisted' : ''}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                    </svg>
                </button>
            </div>
            <div class="rose-card-description-wrapper">
                <p class="rose-card-description">${rose.description}</p>
            </div>
            
            <div class="rose-slider-container">
                ${createSlider(rose)}
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
    `).join('');
    
    rosesList.querySelectorAll('.wishlist-btn').forEach(button => {
        button.addEventListener('click', () => {
            toggleWishlist(button.dataset.roseId);
        });
    });
    
    initializeSliders();
}

// Navigation Dropdown
function setupDropdownMenu() {
    const roseTypeBtn = document.getElementById('roseTypeBtn');
    const roseTypeDropdown = document.getElementById('roseTypeDropdown');
    const dropdownItems = roseTypeDropdown.querySelectorAll('.dropdown-item');
    
    roseTypeBtn.addEventListener('click', () => {
        const isOpen = roseTypeBtn.classList.toggle('open');
        roseTypeDropdown.classList.toggle('hidden', !isOpen);
    });
    
    dropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const category = item.dataset.category;
            state.roseCategory = category;
            
            if (category === 'climbing') {
                state.activeHeightTab = null;
            } else if (category === 'guide') {
                state.activeHeightTab = null;
            } else {
                state.activeHeightTab = 'below-1m';
            }
            
            roseTypeBtn.classList.remove('open');
            roseTypeDropdown.classList.add('hidden');
            updateRoseTypeLabel();
            
            renderHeightTabs();
            renderTabDescription();
            renderRoses();
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!roseTypeBtn.contains(e.target) && !roseTypeDropdown.contains(e.target)) {
            roseTypeBtn.classList.remove('open');
            roseTypeDropdown.classList.add('hidden');
        }
    });
}

// Wishlist Navigation Button
function setupWishlistButton() {
    const wishlistBtn = document.getElementById('wishlistBtn');
    wishlistBtn.addEventListener('click', () => {
        const allRoses = [...bushRosesBelowOneMeter, ...bushRosesAroundOneMeter, ...bushRosesAboveOneMeter, ...climbingRoses];
        const wishlistedRoses = allRoses.filter(rose => state.wishlist.has(rose.id));
        
        if (wishlistedRoses.length === 0) {
            const rosesList = document.getElementById('rosesList');
            rosesList.innerHTML = `
                <div class="empty-wishlist">
                    <svg class="empty-wishlist-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                    </svg>
                    <h3 class="empty-wishlist-title">No roses in your wishlist yet</h3>
                    <p class="empty-wishlist-text">Tap the heart icon on any rose to add it to your wishlist</p>
                </div>
            `;
            return;
        }
        
        const rosesList = document.getElementById('rosesList');
        rosesList.innerHTML = wishlistedRoses.map(rose => `
            <div class="rose-card" id="rose-${rose.id}">
                <div class="rose-card-header">
                    <div class="rose-card-info">
                        <h3 class="rose-card-title">${rose.name}</h3>
                        <p class="rose-card-description">${rose.description}</p>
                    </div>
                    <button class="wishlist-btn" data-rose-id="${rose.id}" aria-label="Remove from wishlist">
                        <svg class="wishlist-icon wishlisted" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                        </svg>
                    </button>
                </div>
                
                <div class="rose-slider-container">
                    ${createSlider(rose)}
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
        `).join('');
        
        rosesList.querySelectorAll('.wishlist-btn').forEach(button => {
            button.addEventListener('click', () => {
                toggleWishlist(button.dataset.roseId);
            });
        });
        
        initializeSliders();
        
        // Update description
        // const descriptionElement = document.getElementById('tabDescriptionText');
        // descriptionElement.textContent = 'Your saved rose collection. Keep track of roses you want to remember or purchase.';
    });
}

// Search Functions
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearchBtn');
    const suggestionsDropdown = document.getElementById('suggestionsDropdown');
    
    state.searchQuery = searchInput.value;
    
    if (state.searchQuery.trim()) {
        clearBtn.classList.remove('hidden');
        
        const filtered = allRosesForSearch.filter(rose =>
            rose.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
        
        if (filtered.length > 0) {
            suggestionsDropdown.innerHTML = filtered.map(rose => `
                <button class="suggestion-item" data-rose-id="${rose.id}" data-rose-type="${rose.type}">
                    <span class="suggestion-name">${rose.name}</span>
                    <span class="suggestion-type">${rose.type}</span>
                </button>
            `).join('');
            
            suggestionsDropdown.querySelectorAll('.suggestion-item').forEach(button => {
                button.addEventListener('click', () => {
                    selectRose(button.dataset.roseId, button.dataset.roseType);
                });
            });
        } else {
            suggestionsDropdown.innerHTML = `
                <div class="no-results">
                    <p>No roses found</p>
                </div>
            `;
        }
        
        suggestionsDropdown.classList.remove('hidden');
    } else {
        clearBtn.classList.add('hidden');
        suggestionsDropdown.classList.add('hidden');
    }
}

function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearchBtn');
    const suggestionsDropdown = document.getElementById('suggestionsDropdown');
    
    searchInput.value = '';
    state.searchQuery = '';
    clearBtn.classList.add('hidden');
    suggestionsDropdown.classList.add('hidden');
}

function selectRose(roseId, type) {
    let category = 'bush';
    let heightTab = 'below-1m';
    
    if (type.includes('Climbing')) {
        category = 'climbing';
    } else if (type.includes('Around')) {
        heightTab = 'around-1m';
    } else if (type.includes('Above')) {
        heightTab = 'above-1m';
    } else if (type.includes('Planting')) {
        category = 'guide';
    }
    
    state.roseCategory = category;
    state.activeHeightTab = heightTab;
    
    updateRoseTypeLabel();
    renderHeightTabs();
    // renderTabDescription();
    renderRoses();
    clearSearch();
    
    setTimeout(() => {
        const element = document.getElementById(`rose-${roseId}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('highlight-animation');
            setTimeout(() => {
                element.classList.remove('highlight-animation');
            }, 2000);
        }
    }, 100);
}

function handleClickOutside(event) {
    const searchContainer = document.getElementById('searchContainer');
    if (searchContainer && !searchContainer.contains(event.target)) {
        const suggestionsDropdown = document.getElementById('suggestionsDropdown');
        suggestionsDropdown.classList.add('hidden');
    }
}

// Initialize Application
function init() {
    // --- Initialize OverlayScrollbars ---
    const { OverlayScrollbars } = OverlayScrollbarsGlobal;
    OverlayScrollbars(document.body, {
        scrollbars: {
            theme: 'os-theme-rose', // Use our custom CSS theme
            // autoHide: 'leave',      // Hide when mouse leaves the window (fade-in effect)
            autoHide: 'scroll',     // Hide when scrolling stops
            autoHideDelay: 500,     // Wait 500ms before fading out
            clickScroll: true       // Allow clicking track to scroll
        }
    });

    loadWishlist();
    updateWishlistCount();
    updateRoseTypeLabel();
    renderHeightTabs();
    renderRoses();
    setupDropdownMenu();
    setupWishlistButton();
    
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);
    
    const clearBtn = document.getElementById('clearSearchBtn');
    clearBtn.addEventListener('click', clearSearch);
    
    document.addEventListener('mousedown', handleClickOutside);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

window.addEventListener('beforeunload', () => {
    state.sliderIntervals.forEach(interval => clearInterval(interval));
});
