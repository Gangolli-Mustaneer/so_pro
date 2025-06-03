// Daily Fitness Tips
const fitnessTips = [
    "Stay hydrated! Drink at least 8 glasses of water daily.",
    "Take the stairs instead of the elevator for extra cardio.",
    "Get 7-8 hours of sleep for optimal muscle recovery.",
    "Include protein in every meal to support muscle growth.",
    "Stretch before and after workouts to prevent injuries.",
    "Mix up your workout routine to prevent plateaus.",
    "Track your progress to stay motivated.",
    "Focus on form over weight when lifting.",
    "Take rest days to allow your body to recover.",
    "Eat a balanced diet rich in whole foods."
];

// Function to get a random tip
function getNewTip() {
    const tipContent = document.getElementById('tip-content');
    const randomIndex = Math.floor(Math.random() * fitnessTips.length);
    tipContent.textContent = fitnessTips[randomIndex];
    
    // Add animation
    tipContent.style.animation = 'none';
    tipContent.offsetHeight; // Trigger reflow
    tipContent.style.animation = 'fadeInUp 0.5s ease';
}

// Initialize with a random tip
document.addEventListener('DOMContentLoaded', () => {
    getNewTip();
});

// Smooth scrolling for navigation links
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

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.boxShadow = 'none';
    }
});

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.animation = 'fadeInUp 0.5s ease';
    });
});

// Mobile menu toggle
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    // Add button to navbar
    navbar.insertBefore(mobileMenuBtn, navLinks);
    
    // Toggle menu on click
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
};

// Initialize mobile menu
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Add hover effect to category cards
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add lazy loading to images
document.querySelectorAll('img').forEach(img => {
    img.loading = 'lazy';
});

// Theme Switcher
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Modal functionality
const modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = `
    <div class="modal-content">
        <div class="modal-header">
            <h2></h2>
            <button class="close-modal" aria-label="Close modal"></button>
        </div>
        <div class="modal-body"></div>
    </div>
`;
document.body.appendChild(modal);

// Keep track of currently playing video
let currentVideo = null;

// Function to stop all videos
function stopAllVideos() {
    if (currentVideo) {
        const iframe = currentVideo.querySelector('iframe');
        if (iframe) {
            // Reset the iframe source to stop the video
            const videoId = iframe.src.split('/').pop().split('?')[0];
            iframe.src = ''; // Clear the source completely
            iframe.src = `https://www.youtube.com/embed/${videoId}`; // Reset with clean URL
        }
        currentVideo = null;
    }
}

// Function to open modal with content
function openModal(content, title = '') {
    // Stop any currently playing videos
    stopAllVideos();
    
    const modalBody = modal.querySelector('.modal-body');
    const modalTitle = modal.querySelector('.modal-header h2');
    
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add active class for animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

// Function to close modal
function closeModal() {
    modal.classList.remove('active');
    stopAllVideos(); // Stop video when closing modal
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Additional cleanup
        const modalBody = modal.querySelector('.modal-body');
        if (modalBody) {
            modalBody.innerHTML = ''; // Clear modal content
        }
    }, 300);
}

// Close modal when clicking the close button or outside the modal
modal.querySelector('.close-modal').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Add click handlers for navigation menu items
document.addEventListener('DOMContentLoaded', () => {
    // Handle navigation menu clicks
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('href').substring(1);
            const sectionElement = document.getElementById(section);
            
            if (sectionElement) {
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }

                // Smooth scroll to section
                sectionElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Handle tutorial video clicks
    document.querySelectorAll('.tutorial-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const iframe = card.querySelector('iframe');
            const videoId = iframe.src.split('/').pop().split('?')[0];
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            
            const content = `
                <div class="tutorial-modal">
                    <div class="video-container">
                        <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                        </iframe>
                    </div>
                    <div class="tutorial-info">
                        <h3>${title}</h3>
                        <p>${description}</p>
                    </div>
                </div>
            `;
            openModal(content, title);
            
            // Set the new video as current
            currentVideo = modal.querySelector('iframe');
        });
    });

    // Handle workout category clicks
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const videoId = card.getAttribute('data-video');
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            
            if (videoId) {
                const content = `
                    <div class="tutorial-modal">
                        <div class="video-container">
                            <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen>
                            </iframe>
                        </div>
                        <div class="tutorial-info">
                            <h3>${title}</h3>
                            <p>${description}</p>
                        </div>
                    </div>
                `;
                openModal(content, title);
                
                // Set the new video as current
                currentVideo = modal.querySelector('iframe');
            }
        });
    });

    // Handle blog card clicks
    document.querySelectorAll('.blog-card .read-more').forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            const blogCard = e.target.closest('.blog-card');
            const blogType = blogCard.getAttribute('data-blog');
            const imageSrc = blogCard.querySelector('img').src;
            const title = blogCard.querySelector('h3').textContent;
            const description = blogCard.querySelector('p').textContent;

            try {
                const response = await fetch(`blogs/${blogType}.html`);
                if (!response.ok) {
                    throw new Error('Failed to load article content');
                }
                const content = await response.text();
                
                const modalContent = `
                    <div class="article-modal">
                        <img src="${imageSrc}" alt="${title}" class="article-image">
                        <div class="article-content">
                            <h3>${title}</h3>
                            <div class="article-description">${description}</div>
                            ${content}
                        </div>
                    </div>
                `;
                
                openModal(modalContent, title);
            } catch (error) {
                console.error('Error loading article:', error);
                const modalContent = `
                    <div class="article-modal">
                        <img src="${imageSrc}" alt="${title}" class="article-image">
                        <div class="article-content">
                            <h3>${title}</h3>
                            <div class="article-description">${description}</div>
                            <div class="article-body">
                                <p>Sorry, the article content could not be loaded at this time. Please try again later.</p>
                            </div>
                        </div>
                    </div>
                `;
                openModal(modalContent, title);
            }
        });
    });
});

// Add event listener for ESC key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
}); 