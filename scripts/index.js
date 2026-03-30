document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText, MotionPathPlugin, ScrollSmoother, CustomEase);

    const isDesktop = window.matchMedia("(min-width: 981px)").matches;

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    // Cache DOM nodes
    const homeLandingOrb = document.querySelector('.home-landing-orb');
    const card1Line = document.querySelector('.home-card1-line-path');
    const card3MeterDot = document.querySelector('.home-card3-meter-dot');
    const card3MeterPath = document.querySelector('.home-card3-meter-outline-path');
    const info2ContentRight = Array.from(document.querySelectorAll('.home-info2-content-right-text'));
    const info2Buttons = Array.from(document.querySelectorAll('.home-info2-content-left-text'));
    const faqItems = Array.from(document.querySelectorAll('.home-faq-a'));

    // Precompute SplitText
    const card2Text = document.querySelector(".home-card2-content");
    const card2Chars = SplitText.create(card2Text, { type: "chars", aria: "none" }).chars;

    CustomEase.create("home-info1-click", "M0,0 C0.2,0 0.2,0.5 0.25,0.5 C0.3,0.5 0.3,0 0.35,0 C0.4,0 0.4,0.5 0.45,0.5 C0.5,0.5 0.5,0 0.55,0 C0.6,0 0.6,0.5 0.65,0.5 C0.7,0.5 0.7,0 0.75,0 C0.8,0 0.8,0.5 0.85,0.5 C0.9,0.5 0.9,0 0.95,0 C1,0 1,1 1,1");
    
    // Orb animation
    gsap.to(homeLandingOrb, {
        x: window.innerWidth,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1
    });

    // Card1 animation
    let card1Animation = gsap.timeline({
        scrollTrigger: {
            trigger: '.home-card1',
            pin: isDesktop ? true : false,
            start: 'center center+=33',
            scrub: isDesktop ? 1 : false,
            end: '+=589',
        }
    });
    card1Animation.fromTo(card1Line, { drawSVG: '0%' }, { drawSVG: '100%' });

    // Card2 animation
    let card2Animation = gsap.timeline({
        scrollTrigger: {
            trigger: '.home-card2',
            pin: isDesktop ? true : false,
            start: 'center center+=33',
            scrub: isDesktop ? 1 : false,
            end: '+=589',
        }
    });
    card2Animation.from(card2Chars, {
        autoAlpha: 0,
        stagger: 0.03,
        duration: 0.005,
        ease: 'power2',
    });

    // Card3 animation
    // Precompute motion path positions
    const card3PathBBox = card3MeterPath.getBBox();
    gsap.set(card3MeterDot, {
        motionPath: {
            path: card3MeterPath,
            align: card3MeterPath,
            alignOrigin: [0.5, 0.5],
            start: 0.03,
            end: 0.03
        }
    });

    let card3Animation = gsap.timeline({
        scrollTrigger: {
            trigger: '.home-card3',
            pin: isDesktop ? true : false,
            start: 'center center+=33',
            scrub: isDesktop ? 1 : false,
            end: '+=589'
        }
    });

    card3Animation.to(card3MeterDot, {
        motionPath: {
            path: card3MeterPath,
            align: card3MeterPath,
            alignOrigin: [0.5, 0.5],
            start: 0.03,
            end: 0.97
        },
        ease: 'bounce.out',
        duration: 2.5
    });


    card3Animation.from('.home-card3-meter-inside-number', {
        innerText: 0, 
        snap: {
            innerText: 1
        },
        duration: 1,
    }, "<");


    // Home info animations
    gsap.timeline({
        scrollTrigger: {
            trigger: '.home-info1-left',
            pin: true,
            start: 'center center',
            end: '+=244'
        }
    });

    

    // gsap.to('.home-info2-title-highlight', {
    //     '--reveal': '100%',
    //     duration: 1.5,
    //     ease: 'power2.out',
    //     scrollTrigger: {
    //         trigger: '.home-info2-title',
    //         start: 'top 60%',
    //         end: 'top 20%',
    //         toggleActions: 'play none none none'
    //     }
    // });

    gsap.set('.home-info2-content-right-1', { visibility: 'visible', opacity: 1, y: 0 });
    document.querySelector('.home-info2-content-left-1').classList.add('active');

    window.handleInfoOptions = function (buttonName) {
        const targetContent = document.querySelector(`.home-info2-content-right-${buttonName}`);
        const activeButton = document.querySelector(`.home-info2-content-left-${buttonName}`);

        // reset buttons
        info2Buttons.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');

        // animate content
        info2ContentRight.forEach(content => {
            if (content === targetContent) return;
            gsap.to(content, {
                opacity: 0, y: 12, duration: 0.25, ease: 'power2.out', onComplete: () => {
                    gsap.set(content, { visibility: 'hidden', y: 0 });
                }
            });
        });

        gsap.set(targetContent, { visibility: 'visible', y: 12 });
        gsap.to(targetContent, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
    };

    window.handleFAQ = function (newFaqClassName) {
        const newFaqContent = document.querySelector(newFaqClassName);
        faqItems.forEach(content => {
            if (content === newFaqContent) return;
            gsap.to(content, {
                opacity: 0, 
                height: 0, 
                duration: 0.5, 
                ease: 'power2.out', 
                onComplete: () => {
                    content.classList.remove("home-faq-a-active");
                }
            });
        });

        newFaqContent.classList.add("home-faq-a-active");
        gsap.to(newFaqContent, 
            { 
                height: 'auto', 
                opacity: 1, 
                duration: 0.5, 
                ease: 'power2.out' 
            });
    };
});