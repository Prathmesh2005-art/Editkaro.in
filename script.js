const portfolioData = [
    {
        id: 1,
        title: "Viral TikTok Series",
        category: "short-form",
        description: "Engaging short-form content that generated over 2M views",
        thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=250&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        id: 2,
        title: "Epic Gaming Montage",
        category: "gaming",
        description: "High-energy gaming highlights with dynamic transitions",
        thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4"
    },
    {
        id: 3,
        title: "Football Skills Compilation",
        category: "football",
        description: "Professional football highlights with cinematic grading",
        thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
    },
    {
        id: 4,
        title: "Product Launch Campaign",
        category: "ecommerce",
        description: "Converting eCommerce ad that boosted sales by 300%",
        thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=2Vv-BfVoq4g"
    },
    {
        id: 5,
        title: "Documentary Feature",
        category: "documentary",
        description: "Award-winning documentary with compelling storytelling",
        thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U"
    },
    {
        id: 6,
        title: "Anime Music Video",
        category: "anime",
        description: "Stylized anime content with custom effects",
        thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=5O0YDHiosD0"
    },
    {
        id: 7,
        title: "Corporate Presentation",
        category: "long-form",
        description: "Professional long-form corporate content",
        thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        id: 8,
        title: "Color Grading Showcase",
        category: "color-grading",
        description: "Before/after color grading transformation",
        thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4"
    },
    {
        id: 9,
        title: "Brand Advertisement",
        category: "ads",
        description: "High-converting brand advertisement campaign",
        thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
    },
    {
        id: 10,
        title: "Instagram Reels Pack",
        category: "short-form",
        description: "Trending Instagram reels with viral potential",
        thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=250&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=2Vv-BfVoq4g"
    },
    {
        id: 11,
        title: "YouTube Tutorial Series",
        category: "long-form",
        description: "Educational content with engaging visuals",
        thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U"
    },
    {
        id: 12,
        title: "Esports Highlights",
        category: "gaming",
        description: "Professional esports tournament highlights",
        thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=5O0YDHiosD0"
    }
];

// DOM Elements
const portfolioGrid = document.getElementById('portfolioGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const modalClose = document.querySelector('.modal-close');

// State
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderPortfolio();
    initializeFilters();
    initializeModal();
    animateOnScroll();
    smoothScroll();
    animateCounters();
});

// Render portfolio items
function renderPortfolio(filter = 'all') {
    portfolioGrid.innerHTML = '';
    
    const filteredData = filter === 'all' 
        ? portfolioData 
        : portfolioData.filter(item => item.category === filter);

    filteredData.forEach((item, index) => {
        const portfolioItem = createPortfolioItem(item, index);
        portfolioGrid.appendChild(portfolioItem);
    });

    // Animate items
    setTimeout(() => {
        document.querySelectorAll('.portfolio-item').forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
}

// Create portfolio item element
function createPortfolioItem(item, index) {
    const div = document.createElement('div');
    div.className = 'portfolio-item';
    div.style.animationDelay = `${index * 0.1}s`;
    
    div.innerHTML = `
        <div class="video-container" onclick="openModal('${item.videoUrl}')">
            <img src="${item.thumbnail}" alt="${item.title}" class="video-thumbnail">
            <div class="play-overlay">▶️</div>
        </div>
        <div class="item-info">
            <div class="item-category">${getCategoryDisplayName(item.category)}</div>
            <h3 class="item-title">${item.title}</h3>
            <p class="item-description">${item.description}</p>
        </div>
    `;

    return div;
}

// Get display name for category
function getCategoryDisplayName(category) {
    const categoryMap = {
        'short-form': 'Short Form',
        'long-form': 'Long Form',
        'gaming': 'Gaming',
        'football': 'Football',
        'ecommerce': 'eCommerce',
        'documentary': 'Documentary',
        'color-grading': 'Color Grading',
        'anime': 'Anime',
        'ads': 'Advertisements'
    };
    return categoryMap[category] || category;
}

// Initialize filter functionality
function initializeFilters() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filter = button.getAttribute('data-filter');
            currentFilter = filter;
            
            // Add loading effect
            portfolioGrid.classList.add('loading');
            
            // Render filtered portfolio
            setTimeout(() => {
                renderPortfolio(filter);
                portfolioGrid.classList.remove('loading');
            }, 300);
        });
    });
}

// Initialize modal functionality
function initializeModal() {
    modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Open modal
function openModal(videoUrl) {
    // For demo purposes, we'll show a placeholder message
    // In a real implementation, you would set the video source
    alert('Video modal would open here. In a real implementation, this would play: ' + videoUrl);
    
    // Real implementation would be:
    // modalVideo.src = videoUrl;
    // modal.style.display = 'block';
    // document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
    modalVideo.pause();
    modalVideo.src = '';
    document.body.style.overflow = 'auto';
}

// Animate elements on scroll
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe stat items
    document.querySelectorAll('.stat-item').forEach(item => {
        observer.observe(item);
    });
}

// Smooth scroll for navigation
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Header scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;

    // Add blur effect on scroll
    if (scrollTop > 50) {
        header.style.background = 'rgba(15, 15, 35, 0.95)';
        header.style.backdropFilter = 'blur(25px)';
    } else {
        header.style.background = 'rgba(15, 15, 35, 0.9)';
        header.style.backdropFilter = 'blur(20px)';
    }
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const target = counter.innerText;
        const isPlus = target.includes('+');
        const isM = target.includes('M');
        const is24 = target.includes('/');
        
        let numericTarget = parseInt(target.replace(/[^\d]/g, ''));
        
        const updateCount = () => {
            const count = +counter.innerText.replace(/[^\d]/g, '');
            const increment = numericTarget / speed;

            if (count < numericTarget) {
                let newCount = Math.ceil(count + increment);
                if (isM) {
                    counter.innerText = newCount + 'M+';
                } else if (is24) {
                    counter.innerText = '24/7';
                } else {
                    counter.innerText = newCount + (isPlus ? '+' : '');
                }
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };

        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counter.innerText = '0';
                    updateCount();
                    observer.unobserve(counter);
                }
            });
        });

        observer.observe(counter);
    });
}

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.bg-animated');
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
});

// Add loading states for better UX
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Mobile menu toggle (if needed)
function createMobileMenu() {
    const header = document.querySelector('header .header-content');
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-toggle';
    mobileToggle.innerHTML = '☰';
    mobileToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        @media (max-width: 768px) {
            display: block;
        }
    `;
    
    header.appendChild(mobileToggle);
}

// Initialize mobile menu
createMobileMenu();

// Performance optimization: Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('fade-in');
            observer.unobserve(img);
        }
    });
});

// Observe all portfolio images
setTimeout(() => {
    document.querySelectorAll('.video-thumbnail').forEach(img => {
        imageObserver.observe(img);
    });
}, 1000);

// Export functions for global access
window.openModal = openModal;
window.closeModal = closeModal;