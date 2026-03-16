try {
    if (window.lucide) {
        lucide.createIcons();
    }
} catch (e) {
    console.warn("Lucide err:", e);
}

const initGsapAnimations = () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".hero-anim", 
        { y: 40, opacity: 0, filter: "blur(5px)", scale: 0.98 },
        {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out",
            delay: 0.2
        }
    );

    const bentoCards = gsap.utils.toArray('.bento-reveal');
    bentoCards.forEach(card => {
        gsap.fromTo(card,
            { opacity: 0, y: 45, autoAlpha: 0 },
            {
                opacity: 1, 
                y: 0, 
                autoAlpha: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 88%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    const nav = document.getElementById('main-nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('shadow-sm');
                nav.style.background = 'rgba(255,255,255,0.9)';
            } else {
                nav.classList.remove('shadow-sm');
                nav.style.background = 'rgba(244, 246, 248, 0.75)';
            }
        });
    }
};

const initAppShowcase = () => {
    const colorBtns = document.querySelectorAll('.color-btn');
    const glowTargetIcon = document.querySelector('.glow-target-icon');
    const glowTargetContainer = document.querySelector('.glow-target');
    const appAmbient = document.getElementById('smart-app-ambient');
    const appCard = document.getElementById('smart-app-card');
    const dotsAmbient = document.getElementById('smart-dots-ambient');
    const dotsCard = document.getElementById('smart-dots-card');

    if (colorBtns.length === 0) return;

    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const color = btn.getAttribute('data-color');
            
            if (glowTargetIcon) {
                glowTargetIcon.style.color = color;
                glowTargetIcon.style.filter = `drop-shadow(0 0 12px ${color})`;
            }
            
            if (glowTargetContainer) {
                glowTargetContainer.style.boxShadow = `inset 4px 4px 10px rgba(0,0,0,0.05), 0 0 45px ${color}`;
            }

            if (appAmbient) {
                appAmbient.style.background = `radial-gradient(circle at 75% 75%, ${color}45 0%, ${color}00 80%)`;
                appAmbient.style.opacity = '1';
            }

            if (dotsAmbient) {
                dotsAmbient.style.background = `radial-gradient(circle at center, ${color}35 0%, ${color}00 80%)`;
                dotsAmbient.style.opacity = '1';
            }

            if (appCard) {
                appCard.style.boxShadow = `0 40px 80px rgba(0,0,0,0.5), 0 0 100px ${color}40`;
                appCard.style.borderColor = `${color}30`;
            }

            if (dotsCard) {
                dotsCard.style.boxShadow = `0 40px 80px rgba(0,0,0,0.5), 0 0 100px ${color}40`;
                dotsCard.style.borderColor = `${color}30`;
            }
            
            btn.style.transform = 'scale(0.85)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 100);
        });
    });
};

const initHeroSwitch = () => {
    const magicSwitch = document.getElementById('magic-switch');
    const dayImg = document.getElementById('hero-day-img');
    const overlay = document.getElementById('hero-overlay');
    const switchTrack = document.getElementById('switch-track');
    const switchThumb = document.getElementById('switch-thumb');
    const switchText = document.getElementById('switch-text');
    const statusText = document.getElementById('hero-status-text');
    const statusDot = document.getElementById('hero-status-dot');

    if (!magicSwitch) return;

    let isNight = false;

    magicSwitch.addEventListener('click', () => {
        isNight = !isNight;

        if (isNight) {
            if(dayImg) dayImg.style.opacity = '0';
            if(overlay) {
                overlay.classList.remove('opacity-0');
                overlay.classList.add('opacity-100');
            }
            
            if(switchTrack) switchTrack.className = 'w-10 h-5 rounded-full relative shadow-inner p-1 transition-colors duration-300 bg-[#cba35c]';
            if(switchThumb) switchThumb.className = 'w-3 h-3 bg-white rounded-full shadow-md transform transition-transform duration-300 translate-x-5';
            if(switchText) switchText.textContent = 'Day Mode';
            
            if(statusText) statusText.textContent = 'System Active';
            if(statusDot) statusDot.className = 'w-2.5 h-2.5 rounded-full bg-[#cba35c] transition-colors duration-500 shadow-[0_0_10px_#cba35c]';
        } else {
            if(dayImg) dayImg.style.opacity = '1';
            if(overlay) {
                overlay.classList.remove('opacity-100');
                overlay.classList.add('opacity-0');
            }
            
            if(switchTrack) switchTrack.className = 'w-10 h-5 rounded-full relative shadow-inner p-1 transition-colors duration-300 bg-gray-300';
            if(switchThumb) switchThumb.className = 'w-3 h-3 bg-white rounded-full shadow-md transform transition-transform duration-300 translate-x-0';
            if(switchText) switchText.textContent = 'Night Mode';
            
            if(statusText) statusText.textContent = 'Invisible';
            if(statusDot) statusDot.className = 'w-2.5 h-2.5 rounded-full bg-gray-300 transition-colors duration-500';
        }
    });
};

const initPreloader = () => {
    const preloader = document.getElementById('smart-preloader');
    let isCleanupDone = false;
    
    const cleanupPreloader = () => {
        if (isCleanupDone) return;
        isCleanupDone = true;
        
        if (preloader) preloader.style.display = 'none';
        document.body.style.overflow = '';
        try { initGsapAnimations(); } catch(e){}
    };
    
    if (!preloader) {
        cleanupPreloader();
        return;
    }
    
    document.body.style.overflow = 'hidden';
    let isPreloaderDone = false;
    
    function hidePreloader() {
        if (isPreloaderDone) return;
        isPreloaderDone = true;
        preloader.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(cleanupPreloader, 1000);
    }

    setTimeout(hidePreloader, 1500);
    setTimeout(cleanupPreloader, 3000);
};

const initMobileMenu = () => {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = menu ? menu.querySelectorAll('a') : [];
    const icon = document.getElementById('menu-icon');

    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        menu.classList.toggle('translate-x-full');
        if (icon) {
            const isOpen = !menu.classList.contains('translate-x-full');
            icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
            if (window.lucide) lucide.createIcons();
        }
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('translate-x-full');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                if (window.lucide) lucide.createIcons();
            }
        });
    });
};

const initAll = () => {
    try { initAppShowcase(); } catch(e) { console.warn(e); }
    try { initHeroSwitch(); } catch(e) { console.warn(e); }
    try { initMobileMenu(); } catch(e) { console.warn(e); }
    try { initPreloader(); } catch(e) { 
        const pl = document.getElementById('smart-preloader');
        if (pl) pl.style.display = 'none';
        document.body.style.overflow = '';
        initGsapAnimations();
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}
