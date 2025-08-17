/**
 * Modern Portfolio JavaScript - Version 5
 * Author: Tuan Tran
 * Features: Advanced animations, smooth scrolling, theme switching, magnetic effects
 */

class ModernPortfolio {
    constructor() {
        this.isLoading = true;
        this.currentTheme = 'light';
        this.scrollProgress = 0;
        this.mousePosition = { x: 0, y: 0 };
        this.isTouch = 'ontouchstart' in window;
        
        // Initialize all features
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupPortfolio());
        } else {
            this.setupPortfolio();
        }
    }

    setupPortfolio() {
        console.log('🚀 Initializing Modern Portfolio...');
        
        // Core setup
        this.setupLoading();
        this.setupTheme();
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupCursor();
        this.setupMagneticEffects();
        this.setupTypingEffect();
        this.setupCounters();
        this.setupIntersectionObserver();
        this.setupEventListeners();
        
        console.log('✅ Portfolio initialized successfully!');
    }

    // ========================================
    // Loading Screen
    // ========================================
    setupLoading() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (!loadingScreen) return;

        // Simulate loading time
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            this.isLoading = false;
            
            // Remove from DOM after transition
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
            
            // Start main animations
            this.startMainAnimations();
        }, 2000);
    }

    startMainAnimations() {
        // Animate hero elements
        this.animateHeroElements();
        
        // Start typing effect
        this.startTypingEffect();
        
        // Animate counters
        this.animateCounters();
    }

    // ========================================
    // Theme Management
    // ========================================
    setupTheme() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        // Get saved theme or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        this.currentTheme = savedTheme || systemTheme;

        // Apply theme
        this.applyTheme(this.currentTheme);

        // Theme toggle handler
        themeToggle.addEventListener('click', () => {
            this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            this.applyTheme(this.currentTheme);
            localStorage.setItem('theme', this.currentTheme);
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.currentTheme = e.matches ? 'dark' : 'light';
                this.applyTheme(this.currentTheme);
            }
        });
    }

    applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    // ========================================
    // Navigation
    // ========================================
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!navbar) return;

        // Mobile menu toggle
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Smooth scrolling for nav links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                // Close mobile menu
                if (navMenu) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });

        // Navigation scroll effects
        this.setupNavigationScroll(navbar, navLinks);
    }

    setupNavigationScroll(navbar, navLinks) {
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            // Add scrolled class
            if (scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll
            if (scrollY > lastScrollY && scrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            lastScrollY = scrollY;

            // Update active nav link
            this.updateActiveNavLink(navLinks);
        });
    }

    updateActiveNavLink(navLinks) {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ========================================
    // Scroll Effects
    // ========================================
    setupScrollEffects() {
        // Scroll progress indicator
        this.createScrollProgress();
        
        // Parallax effects
        this.setupParallax();
        
        // Reveal animations on scroll
        this.setupScrollReveal();
    }

    createScrollProgress() {
        // Create scroll progress bar
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--color-primary), var(--color-primary-light));
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = `${scrolled}%`;
        });
    }

    setupParallax() {
        const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach((element, index) => {
                const speed = (index + 1) * 0.1;
                element.style.transform = `translateY(${rate * speed}px)`;
            });
        });
    }

    setupScrollReveal() {
        const revealElements = document.querySelectorAll('.text-block, .quality-item, .timeline-item, .stat-item');
        
        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
        });
    }

    // ========================================
    // Animations
    // ========================================
    setupAnimations() {
        // Add animation classes to elements
        this.addAnimationClasses();
        
        // Setup GSAP if available
        if (typeof gsap !== 'undefined') {
            this.setupGSAPAnimations();
        }
    }

    addAnimationClasses() {
        // Hero animations
        const heroElements = document.querySelectorAll('.hero-greeting, .hero-title, .hero-subtitle, .hero-description, .hero-stats, .hero-actions, .hero-social');
        heroElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.1}s`;
        });
    }

    animateHeroElements() {
        const heroElements = document.querySelectorAll('.hero-greeting, .hero-title, .hero-subtitle, .hero-description, .hero-stats, .hero-actions, .hero-social');
        
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // ========================================
    // Custom Cursor
    // ========================================
    setupCursor() {
        if (this.isTouch) return;

        const cursor = document.getElementById('cursor');
        if (!cursor) return;

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mousePosition = { x: e.clientX, y: e.clientY };
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .btn, .social-link, .tech-item');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
    }

    // ========================================
    // Magnetic Effects
    // ========================================
    setupMagneticEffects() {
        if (this.isTouch) return;

        const magneticElements = document.querySelectorAll('[data-magnetic]');
        
        magneticElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transition = 'transform 0.3s ease';
            });
            
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const strength = 0.3;
                element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    // ========================================
    // Typing Effect
    // ========================================
    setupTypingEffect() {
        this.typingTexts = [
            'Full Stack Developer',
            'React Specialist',
            '.NET Expert',
            'UI/UX Enthusiast',
            'Clean Code Advocate'
        ];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typingSpeed = 100;
        this.deletingSpeed = 50;
        this.pauseDuration = 2000;
    }

    startTypingEffect() {
        const dynamicText = document.getElementById('dynamicText');
        if (!dynamicText) return;

        this.typeText(dynamicText);
    }

    typeText(element) {
        const currentText = this.typingTexts[this.currentTextIndex];
        
        if (this.isDeleting) {
            // Deleting text
            element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
            
            if (this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentTextIndex = (this.currentTextIndex + 1) % this.typingTexts.length;
                setTimeout(() => this.typeText(element), 500);
            } else {
                setTimeout(() => this.typeText(element), this.deletingSpeed);
            }
        } else {
            // Typing text
            element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
            
            if (this.currentCharIndex === currentText.length) {
                this.isDeleting = true;
                setTimeout(() => this.typeText(element), this.pauseDuration);
            } else {
                setTimeout(() => this.typeText(element), this.typingSpeed);
            }
        }
    }

    // ========================================
    // Counter Animation
    // ========================================
    setupCounters() {
        this.counters = document.querySelectorAll('.stat-number');
        this.counterAnimated = new Set();
    }

    animateCounters() {
        this.counters.forEach(counter => {
            if (this.counterAnimated.has(counter)) return;
            
            const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current >= target) {
                    counter.textContent = target + (counter.textContent.includes('%') ? '%' : '+');
                    this.counterAnimated.add(counter);
                } else {
                    counter.textContent = Math.floor(current) + (counter.textContent.includes('%') ? '%' : '+');
                    requestAnimationFrame(updateCounter);
                }
            };
            
            updateCounter();
        });
    }

    // ========================================
    // Intersection Observer
    // ========================================
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Trigger specific animations
                    if (entry.target.classList.contains('stat-item')) {
                        this.animateCounters();
                    }
                    
                    // Unobserve after animation
                    this.observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements
        const elementsToObserve = document.querySelectorAll('.text-block, .quality-item, .timeline-item, .stat-item, .about-text, .about-visual, .skill-category, .experience-item, .project-card, .contact-info, .contact-form-container');
        elementsToObserve.forEach(element => {
            this.observer.observe(element);
        });
        
        // Setup additional features
        this.setupScrollToTop();
        // this.setupContactForm(); // Disabled - using EmailJS handler
        this.setupTooltips();
        this.setupAdditionalFeatures();
    }

    // ========================================
    // Scroll to Top
    // ========================================
    setupScrollToTop() {
        const scrollToTopBtn = document.getElementById('scrollToTop');
        if (!scrollToTopBtn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // Contact Form
    // ========================================
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(contactForm);
        });

        // Add floating label effects
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.value.trim() === '') {
                    input.removeAttribute('data-filled');
                } else {
                    input.setAttribute('data-filled', 'true');
                }
            });
        });
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Show loading state
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        const originalIcon = submitBtn.querySelector('.btn-icon').innerHTML;
        
        submitBtn.querySelector('.btn-text').textContent = 'Đang gửi...';
        submitBtn.querySelector('.btn-icon').innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            // Success state
            submitBtn.querySelector('.btn-text').textContent = 'Đã gửi!';
            submitBtn.querySelector('.btn-icon').innerHTML = '<i class="fas fa-check"></i>';
            
            // Show success message
            this.showNotification('Tin nhắn đã được gửi thành công!', 'success');
            
            // Reset form
            form.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.querySelector('.btn-text').textContent = originalText;
                submitBtn.querySelector('.btn-icon').innerHTML = originalIcon;
                submitBtn.disabled = false;
            }, 2000);
            
        }, 2000);

        // Track form submission
        trackEvent('contact_form_submitted', {
            name: data.name,
            email: data.email,
            subject: data.subject
        });
    }

    // ========================================
    // Tooltips
    // ========================================
    setupTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target, e.target.getAttribute('data-tooltip'));
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }

    showTooltip(element, text) {
        if (this.isTouch) return;

        let tooltip = document.getElementById('tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'tooltip';
            tooltip.style.cssText = `
                position: absolute;
                background: var(--color-gray-900);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 500;
                white-space: nowrap;
                z-index: 9999;
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.2s ease;
                pointer-events: none;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            `;
            document.body.appendChild(tooltip);
        }

        tooltip.textContent = text;
        
        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltipRect.width / 2}px`;
        tooltip.style.top = `${rect.top - tooltipRect.height - 8}px`;
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(0)';
    }

    hideTooltip() {
        const tooltip = document.getElementById('tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(10px)';
        }
    }

    // ========================================
    // Notifications
    // ========================================
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--color-success)' : 'var(--color-primary)'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            font-weight: 500;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // ========================================
    // Additional Features
    // ========================================
    setupAdditionalFeatures() {
        // Setup lazy loading for images
        this.setupLazyLoading();
        
        // Setup service worker
        this.setupServiceWorker();
        
        // Setup keyboard shortcuts
        this.setupKeyboardShortcuts();
        
        // Setup performance monitoring
        this.setupPerformanceMonitoring();
        
        // Enhance skill bars animation
        this.enhanceSkillBars();
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Home/End for navigation
            if (e.key === 'Home') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            
            if (e.key === 'End') {
                e.preventDefault();
                window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
            }
        });
    }

    setupPerformanceMonitoring() {
        // Monitor page load time
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('📊 Performance Metrics:', {
                    loadTime: Math.round(perfData.loadEventEnd - perfData.fetchStart),
                    domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart)
                });
            }, 0);
        });
    }

    enhanceSkillBars() {
        const skillCategories = document.querySelectorAll('.skill-category');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        skillCategories.forEach(category => {
            skillObserver.observe(category);
        });
    }

    // ========================================
    // Event Listeners
    // ========================================
    setupEventListeners() {
        // Window resize
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Page visibility
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });

        // Escape key to close modals/menus
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });

        // Smooth scroll for all internal links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }

    // ========================================
    // Utility Functions
    // ========================================
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    handleResize() {
        // Recalculate positions and sizes
        this.updateScrollProgress();
    }

    pauseAnimations() {
        // Pause CSS animations
        document.body.style.animationPlayState = 'paused';
    }

    resumeAnimations() {
        // Resume CSS animations
        document.body.style.animationPlayState = 'running';
    }

    closeAllModals() {
        // Close mobile menu
        const navMenu = document.getElementById('navMenu');
        const menuToggle = document.getElementById('menuToggle');
        
        if (navMenu && menuToggle) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    }

    updateScrollProgress() {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        this.scrollProgress = scrolled;
    }

    // ========================================
    // Performance Monitoring
    // ========================================
    measurePerformance() {
        // Log performance metrics
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('🚀 Performance Metrics:', {
                    'DOM Content Loaded': Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                    'Load Complete': Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                    'Total Load Time': Math.round(perfData.loadEventEnd - perfData.fetchStart)
                });
            }, 0);
        });
    }

    // ========================================
    // Accessibility Enhancements
    // ========================================
    setupAccessibility() {
        // Respect reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduce-motion');
        }

        // Keyboard navigation
        this.setupKeyboardNavigation();
        
        // Focus management
        this.setupFocusManagement();
    }

    setupKeyboardNavigation() {
        // Tab navigation for custom elements
        const focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        
        focusableElements.forEach(element => {
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    if (element.tagName === 'BUTTON' || element.hasAttribute('role')) {
                        e.preventDefault();
                        element.click();
                    }
                }
            });
        });
    }

    setupFocusManagement() {
        // Skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--color-primary);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 9999;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // ========================================
    // Error Handling
    // ========================================
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Portfolio Error:', e.error);
            // Could send to analytics service
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled Promise Rejection:', e.reason);
            // Could send to analytics service
        });
    }
}

// ========================================
// Initialize Portfolio
// ========================================
const portfolio = new ModernPortfolio();

// ========================================
// Additional Utilities
// ========================================

// Preload critical images
function preloadImages() {
    const imageUrls = [
        // Add any critical images here
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Service Worker for PWA (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you want PWA functionality
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Analytics integration (placeholder)
function trackEvent(eventName, properties = {}) {
    // Google Analytics 4 or other analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    console.log('Event tracked:', eventName, properties);
}

// Export for external use
window.ModernPortfolio = ModernPortfolio;

// Initialize critical features immediately
preloadImages();
