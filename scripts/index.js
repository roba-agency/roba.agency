document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, TextPlugin);

    //Home landing shapes
    gsap.to({}, {
        duration: 7,
        repeat: -1,
        ease: "none",
        onUpdate: function() {
            const progress = this.progress();
            const x = 12 * Math.sin(progress * Math.PI * 2);
            const y = 7 * Math.cos(progress * Math.PI * 2);
            gsap.set(".home-shape-orange", { x, y });
        }
    });

    gsap.to({}, {
        duration: 5,
        repeat: -1,
        ease: "none",
        onUpdate: function() {
            const progress = this.progress();
            const x = 8 * Math.sin(progress * Math.PI * -2 + Math.PI / 3);
            const y = 4 * Math.cos(progress * Math.PI * -2 + Math.PI / 3);
            gsap.set(".home-shape-blue", { x, y });
        }
    });

    gsap.to({}, {
        duration: 15,
        repeat: -1,
        ease: "none",
        onUpdate: function() {
            const progress = this.progress();
            const x = 16 * Math.sin(progress * Math.PI * 2 + Math.PI / 1.5);
            const y = 10 * Math.cos(progress * Math.PI * 2 + Math.PI / 1.5);
            gsap.set(".home-shape-purple", { x, y });
        }
    });

    //MASSIVE card
    let cardAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: '.home-card-container',
            pin: true,
            start: 'bottom bottom',
            end: '+=2000',
            scrub: 1,
        }
    });
        
        cardAnimation.from('.home-card1-line-path', { drawSVG:'0%' })
                     .to('.home-card1-line-path', { drawSVG:'100%' });

        cardAnimation.to('.home-card1-title', {
            text: "premium coding",
            ease: "none"
        });

        cardAnimation.to('.home-card1-subtitle', {
            text: "our sites have aerospace grade coding",
            ease: "none"
        }, "<" );


});