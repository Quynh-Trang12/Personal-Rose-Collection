/**
 * Rose Planting Guide Data Module
 * Contains comprehensive guides for rose care and cultivation
 */

export const rosePlantingGuide = [
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

/**
 * Get all planting guide topics
 * @returns {Array} Array of guide topics
 */
export function getGuideTopics() {
    return rosePlantingGuide;
}

/**
 * Find a guide topic by ID
 * @param {string} topicId - The ID of the topic to find
 * @returns {Object|null} The topic object or null if not found
 */
export function findGuideTopicById(topicId) {
    return rosePlantingGuide.find(topic => topic.id === topicId) || null;
}
