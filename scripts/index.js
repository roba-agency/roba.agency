document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText, MotionPathPlugin);

    var jmediaquery = window.matchMedia( "(min-width: 981px)" );

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    gsap.to('.home-landing-orb', {
        left: '100%',
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1
    });
        
    //card animations
    //set meter dot in card3 to corrent position so animation doenst look sketchy
    gsap.set('.home-card3-meter-dot', {
        motionPath: {
            path: '.home-card3-meter-outline-path',
            align: '.home-card3-meter-outline-path',
            alignOrigin: [0.5, 0.5],
            start: 0.03,
            end: 0.03,
        },
        duration: 0,
    });

    //card 1
    let card1Animation;
    if (jmediaquery.matches) {
        card1Animation = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-card1',
                pin: true,
                start: 'center center+=33',
                scrub: 1,
                end: '+=589',
            }
        })
    } 
    
    else {
        card1Animation = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-card1',
                start: 'center center+=33',
                end: '+=589'
            }
        })
    }

    card1Animation.from('.home-card1-line-path', { 
        drawSVG:'0%',
    });

    card1Animation.to('.home-card1-line-path', { 
        drawSVG:'100%',
    });

    let card1to2Animation = gsap.timeline({
        scrollTrigger: {
            trigger: '.home-card2',
            start: 'center center+=622',
            scrub: 1,
            end: '+=589',
            snap: [0, 1],
        }
    })


    //card 2
    let card2Animation;
    if (jmediaquery.matches) {
        card2Animation = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-card2',
                pin: true,
                start: 'center center+=33',
                scrub: 1,
                end: '+=589',
            }
        });
    } else {
        card2Animation = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-card2',
                start: 'center center+=33',
                end: '+=589',
            }
        });
    }
    let card2typing = SplitText.create(".home-card2-content", { type: "chars", aria: "none"  });

    card2Animation.from(card2typing.chars, {
        autoAlpha: 0,
        stagger: 0.03,
        duration: 0.005,
        ease: 'power2',
    });

    //card 3
    let card3Animation;
    if (jmediaquery.matches) {
        card3Animation = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-card3',
                pin: true,
                start: 'center center+=33',
                scrub: 1,
                end: '+=589',
            }
        });
    } else {
        card3Animation = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-card3',
                start: 'center center+=33',
                end: '+=589',
            }
        });
    }

    card3Animation.to('.home-card3-meter-dot', {
        motionPath: {
            path: '.home-card3-meter-outline-path',
            align: '.home-card3-meter-outline-path',
            alignOrigin: [0.5, 0.5],
            start: 0.03,
            end: 0.97,
        },
        ease: 'bounce.out',
        duration: 2.5,
    });

    card3Animation.from('.home-card3-meter-inside-number', {
        innerText: 0, 
        snap: {
            innerText: 1
        },
        duration: 1,
    }, "<");

    //card 4

    // ...existing code...

    gsap.timeline({
        scrollTrigger: {
            trigger: '.home-info1-left',
            pin: true,
            start: 'center center',
            end: '+=244',
        }
    })


    gsap.to('.home-info2-title-highlight', {
        '--reveal': '100%',
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.home-info2-title',
            start: 'top 60%',
            end: 'top 20%', 
            toggleActions: 'play none none none',
        }
    });


    gsap.set('.home-info2-content-right-1', {
        visibility: 'visible',
        opacity: 1,
        y: 0
    });

    document
    .querySelector('.home-info2-content-left-1')
    .classList.add('active');

    window.handleInfoOptions = function (buttonName) {
        const allContent = document.querySelectorAll(
            '.home-info2-content-right-text'
        );

        const allButtons = document.querySelectorAll(
            '.home-info2-content-left-text'
        );

        const target = document.querySelector(
            `.home-info2-content-right-${buttonName}`
        );

        const activeButton = document.querySelector(
            `.home-info2-content-left-${buttonName}`
        );

        // reset buttons
        allButtons.forEach(btn => btn.classList.remove('active'));

        // activate current button
        activeButton.classList.add('active');

        // animate content out
        gsap.to(allContent, {
            opacity: 0,
            y: 12,
            duration: 0.25,
            ease: 'power2.out',
            onComplete: () => {
                gsap.set(allContent, {
                    visibility: 'hidden',
                    y: 0
                });

                gsap.set(target, {
                    visibility: 'visible',
                    y: 12
                });

                gsap.to(target, {
                    opacity: 1,
                    y: 0,
                    duration: 0.35,
                    ease: 'power2.out'
                });
            }
        });
    };
    
    window.handleFAQ = function (newFaqClassName) {
        allFaqContent = document.querySelectorAll('.home-faq-a')
        newFaqContent = document.querySelector(newFaqClassName)

        allFaqContent.forEach(content => {
            if (content === newFaqContent) return;
            gsap.to(content, {
                opacity: 0,
                height: 0,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {content.classList.remove("home-faq-a-active")}
            });
        })

        newFaqContent.classList.add("home-faq-a-active")
        gsap.to(newFaqContent, {
            opacity: 1,
            height: 'auto',
            duration: 0.5,
            ease: 'power2.out',
        });
    };
});