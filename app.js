class PresentationApp {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 5;
        this.slides = [];
        this.prevBtn = null;
        this.nextBtn = null;
        this.slideCounter = null;
        
        this.init();
    }
    
    init() {
        // Get DOM elements
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.slideCounter = document.getElementById('slideCounter');
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize display
        this.updateDisplay();
    }
    
    setupEventListeners() {
        // Navigation button events
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides);
                    break;
            }
        });
        
        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const swipeDistance = startX - endX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swiped left - next slide
                this.nextSlide();
            } else {
                // Swiped right - previous slide
                this.previousSlide();
            }
        }
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.currentSlide++;
            this.updateDisplay();
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 1) {
            this.currentSlide--;
            this.updateDisplay();
        }
    }
    
    goToSlide(slideNumber) {
        if (slideNumber >= 1 && slideNumber <= this.totalSlides) {
            this.currentSlide = slideNumber;
            this.updateDisplay();
        }
    }
    
    updateDisplay() {
        // Update slide visibility
        this.slides.forEach((slide, index) => {
            if (index + 1 === this.currentSlide) {
                slide.classList.add('slide--active');
            } else {
                slide.classList.remove('slide--active');
            }
        });
        
        // Update navigation buttons
        this.prevBtn.disabled = this.currentSlide === 1;
        this.nextBtn.disabled = this.currentSlide === this.totalSlides;
        
        // Update slide counter
        this.slideCounter.textContent = `${this.currentSlide} / ${this.totalSlides}`;
        
        // Update document title with current slide
        const slideTitle = this.getCurrentSlideTitle();
        document.title = `${slideTitle} - Sleep Smarter Presentation`;
    }
    
    getCurrentSlideTitle() {
        const slideTitles = [
            'Sleep Smarter: 4 Quick Wins',
            'How Sleep Works: Two Key Systems',
            'Four Quick Wins',
            '3-Day Mini-Challenge',
            'Key References'
        ];
        
        return slideTitles[this.currentSlide - 1] || 'Sleep Smarter Presentation';
    }
    
    // Public method to get current slide number
    getCurrentSlide() {
        return this.currentSlide;
    }
    
    // Public method to get total slides
    getTotalSlides() {
        return this.totalSlides;
    }
}

// Initialize the presentation app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.presentationApp = new PresentationApp();
});

// Prevent context menu on right-click for a more presentation-like experience
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
    // Add any resize-specific logic here if needed
    console.log('Window resized');
});

// Add fullscreen toggle functionality (optional)
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Error attempting to enable fullscreen:', err);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// Add F11 key support for fullscreen
document.addEventListener('keydown', (e) => {
    if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
    }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PresentationApp;
}