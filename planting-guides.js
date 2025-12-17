// Data: All your gardening guides live here.
const guidesData = [
    {
        id: 'soil',
        title: "Soil Preparation",
        excerpt: "The foundation of a healthy rose bush starts underground. Learn how to test, amend, and prepare your soil for lasting success.",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1470&auto=format&fit=crop",
        content: `
            <p>Roses are often called "heavy feeders," but what they really need is a strong foundation. The secret to a rose bush that blooms continuously isn't just in the fertilizer you buy later—it's in the soil you prepare today.</p>
            
            <h2>1. Testing Your Soil pH</h2>
            <p>Before you dig, you need to know what you are working with. Roses prefer slightly acidic soil with a pH between <strong>6.0 and 6.5</strong>. If your soil is too alkaline (above 7.0), your roses may suffer from iron chlorosis, leading to yellow leaves.</p>
            
            <h2>2. Texture and Drainage</h2>
            <p>Roses hate "wet feet." If water sits around the roots for too long, they will rot. However, sandy soil that drains too fast will leave them thirsty. The goal is <strong>loam</strong>—a crumbly mix that holds moisture but drains excess water away.</p>
            
            <h2>3. The Magic Mix</h2>
            <p>We recommend a mix of 50% native soil and 50% organic compost. Mix in a cup of bone meal at the bottom of the hole to encourage strong root development early in the season.</p>
        `
    },
    {
        id: 'watering',
        title: "Watering Your Roses",
        excerpt: "Roses are thirsty plants, but overwatering can be deadly. Discover the best watering schedules and techniques.",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?q=80&w=1374&auto=format&fit=crop",
        content: `
            <p>Water is the lifeblood of your rose garden. Proper watering produces lush foliage and large blooms, while poor watering invites disease.</p>
            <h2>The Deep Soak Method</h2>
            <p>Avoid frequent shallow sprinkling. Instead, water deeply 2-3 times a week. This encourages roots to grow deep into the ground searching for moisture, making your plants more drought-resistant.</p>
            <h2>Keep Foliage Dry</h2>
            <p>Always water at the base of the plant. Wet leaves are a breeding ground for black spot and powdery mildew. If you must use overhead sprinklers, do it early in the morning so leaves dry off quickly.</p>
        `
    },
    {
        id: 'fertilising',
        title: "Fertilising Roses",
        excerpt: "Unlock massive blooms with the right nutrients. We explain N-P-K ratios and exactly when to feed your garden.",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1622383563227-0440113a09a3?q=80&w=1372&auto=format&fit=crop",
        content: `
            <p>Roses are hungry plants. To sustain those repeated flushes of blooms, they need a steady supply of nutrients.</p>
            <h2>When to Feed</h2>
            <p>Start feeding in early spring when the new leaves are about 2 inches long. Continue feeding every 4-6 weeks throughout the growing season. <strong>Stop feeding</strong> 6 weeks before your first expected frost to let the plant go dormant.</p>
            <h2>Organic vs. Synthetic</h2>
            <p>We prefer organic options like fish emulsion or alfalfa meal. They feed the soil microbes as well as the plant, creating a healthier ecosystem over time.</p>
        `
    },
    {
        id: 'mulching',
        title: "Mulching Rose Gardens",
        excerpt: "Retain moisture, suppress weeds, and regulate temperature. Learn which mulch types are best for rose beds.",
        readTime: "3 min read",
        image: "https://images.unsplash.com/photo-1637656683827-047ae378dfb9?q=80&w=1470&auto=format&fit=crop",
        content: `
            <p>Mulch is the unsung hero of the rose garden. A simple layer of organic material can reduce your watering by 50%.</p>
            <h2>Best Mulch Types</h2>
            <p>Wood chips, shredded bark, or pine straw are excellent choices. They break down slowly, enriching the soil.</p>
            <h2>Application Tips</h2>
            <p>Apply a 2-3 inch layer around the base of the rose. Important: Leave a small gap around the main stem (the crown) to prevent rot.</p>
        `
    },
    {
        id: 'pruning',
        title: "Pruning Roses",
        excerpt: "Don't be afraid to cut! Proper pruning encourages new growth and better airflow. Here is how to do it safely.",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1614959541556-6f31f8769189?q=80&w=1374&auto=format&fit=crop",
        content: `
            <p>Pruning intimidates many gardeners, but it's essential for plant health. It removes dead wood and shapes the plant for the season ahead.</p>
            <h2>The 3 D's</h2>
            <p>First, remove anything Dead, Damaged, or Diseased. Cut these canes back to healthy white wood.</p>
            <h2>Open the Center</h2>
            <p>Remove canes that cross or rub against each other. You want an open "vase" shape to allow sunlight and air to reach the center of the plant.</p>
        `
    }
];

// Logic: Handle Navigation and Rendering
document.addEventListener('DOMContentLoaded', () => {
    const gridView = document.getElementById('gridView');
    const articleView = document.getElementById('articleView');
    
    // Check if we are viewing a specific guide (URL params)
    const urlParams = new URLSearchParams(window.location.search);
    const currentGuideId = urlParams.get('id');

    if (currentGuideId) {
        renderArticle(currentGuideId);
    } else {
        renderGrid();
    }

    // Function to render the Grid of Cards
    function renderGrid() {
        gridView.classList.remove('hidden-section');
        articleView.classList.add('hidden-section');
        
        const gridContainer = document.getElementById('topicsGrid');
        gridContainer.innerHTML = guidesData.map(guide => `
            <a href="?id=${guide.id}" class="topic-card">
                <div class="topic-image-wrapper">
                    <img src="${guide.image}" alt="${guide.title}" loading="lazy">
                </div>
                <div class="topic-content">
                    <h3 class="topic-title">${guide.title}</h3>
                    <p class="topic-excerpt">${guide.excerpt}</p>
                    <span class="read-more-btn">Read Guide &rarr;</span>
                </div>
            </a>
        `).join('');
    }

    // Function to render a specific Article
    function renderArticle(id) {
        const guide = guidesData.find(g => g.id === id);
        
        // If ID not found, go back to grid
        if (!guide) {
            window.location.href = 'how-to-plant.html';
            return;
        }

        gridView.classList.add('hidden-section');
        articleView.classList.remove('hidden-section');

        // Populate article content
        document.getElementById('articleTitle').textContent = guide.title;
        document.getElementById('articleMeta').textContent = `Gardening Guide • ${guide.readTime}`;
        document.getElementById('articleImage').src = guide.image;
        document.getElementById('articleContent').innerHTML = guide.content;
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
});