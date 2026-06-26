document.addEventListener('DOMContentLoaded', () => {
    // Initialize Scroll Animations
    AOS.init({
        duration: 1000,
        once: true
    });

    // Accordion Logic
    document.querySelectorAll('.faq-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            const icon = button.querySelector('span:last-child');
            const isExpanded = button.getAttribute('aria-expanded') === 'true';

            // Close other open items
            document.querySelectorAll('.faq-answer').forEach(el => {
                if (el !== answer) {
                    el.style.maxHeight = null;
                    const otherButton = el.previousElementSibling;
                    otherButton.setAttribute('aria-expanded', 'false');
                    otherButton.querySelector('span:last-child').style.transform = 'rotate(0deg)';
                }
            });

            // Toggle current item
            answer.style.maxHeight = isExpanded ? null : `${answer.scrollHeight}px`;
            button.setAttribute('aria-expanded', !isExpanded);
            icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(45deg)';
        });
    });

    // Auto-close mobile menu when a link is clicked
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.getElementById('mobile-menu');
            const hamburger = document.querySelector('.menu-hamburger');
            const close = document.querySelector('.menu-close');
            
            menu.classList.add('hidden');
            if (hamburger) hamburger.classList.remove('hidden');
            if (close) close.classList.add('hidden');
            document.body.style.overflow = '';
            const toggleBtn = document.querySelector('[aria-controls="mobile-menu"]');
            if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Dynamic Copyright Year
    const yearEl = document.getElementById('copyright-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ============================================================
    // MODERN DESIGN ENHANCEMENTS
    // ============================================================

    // ----- 1. Magnetic Buttons -----
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    
    if (!isTouchDevice) {
        document.querySelectorAll('.magnetic-btn').forEach(btn => {
            btn.addEventListener('mousemove', e => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ----- 2. Active Nav Highlighting on Scroll -----
    const sections = document.querySelectorAll('section[id]');
    const desktopNavLinks = document.querySelectorAll('.hidden.md\\:flex a[href^="#"]');
    
    function highlightNav() {
        let current = '';
        const scrollPos = window.scrollY + 120;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        desktopNavLinks.forEach(link => {
            link.classList.remove('nav-link-active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('nav-link-active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav(); // Run once on load

    // ----- 3. Process Timeline Draw -----
    const timeline = document.getElementById('process-timeline');
    if (timeline) {
        const timelineObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    timeline.classList.add('drawn');
                    timelineObserver.unobserve(timeline);
                }
            });
        }, { threshold: 0.15 });
        timelineObserver.observe(timeline);
    }

    // ----- 4. Review Card 3D Tilt -----
    if (!isTouchDevice) {
        document.querySelectorAll('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 25;
                const rotateY = (centerX - x) / 25;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }
});

// Global Toggles
window.toggleReadMore = () => {
    const moreInfo = document.getElementById('more-info');
    const btn = document.getElementById('read-more-btn');
    const isCollapsed = !moreInfo.style.maxHeight || moreInfo.style.maxHeight === "0px";
    
    moreInfo.style.maxHeight = isCollapsed ? `${moreInfo.scrollHeight}px` : "0px";
    btn.innerHTML = isCollapsed ? 'Read Less <span>↑</span>' : 'Read More <span>↓</span>';
};

window.toggleMobileMenu = () => {
    const menu = document.getElementById('mobile-menu');
    const hamburger = document.querySelector('.menu-hamburger');
    const close = document.querySelector('.menu-close');
    const toggleBtn = document.querySelector('[aria-controls="mobile-menu"]');
    const isHidden = menu.classList.contains('hidden');

    if (isHidden) {
        menu.classList.remove('hidden');
        if (hamburger) hamburger.classList.add('hidden');
        if (close) close.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
    } else {
        menu.classList.add('hidden');
        if (hamburger) hamburger.classList.remove('hidden');
        if (close) close.classList.add('hidden');
        document.body.style.overflow = '';
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    }
};
