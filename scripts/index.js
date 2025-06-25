document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText );

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

    let cardAnimation = gsap.timeline({

    });
        
    cardAnimation.from('.home-card1-line-path', { 
        drawSVG:'0%',
    })

    .to('.home-card1-line-path', { 
        drawSVG:'100%',
        // scrollTrigger: {
        //     trigger: '.home-card1',
        //     pin: true,
        //     start: 'center center',
        //     scrub: 1,
        //     end: '+=589'
        //     // anticipatePin: 1,
        // }
    });

    let typing = SplitText.create(".home-card2-content", { type: "chars" });

    cardAnimation.from(typing.chars, {
        autoAlpha: 0,
        stagger: 0.02,

        // scrollTrigger: {
        //     trigger: '.home-card2',
        //     pin: true,
        //     start: 'center center',
        //     scrub: 1,
        //     end: '+=589'
        //     // anticipatePin: 1,
        // }
    })

    cardAnimation.from('.home-card3-line-path', { 
        drawSVG:'0%',
    })

    .to('.home-card3-line-path', { 
        drawSVG:'100%',
        // scrollTrigger: {
        //     trigger: '.home-card3',
        //     pin: true,
        //     start: 'center center',
        //     scrub: 1,
        //     end: '+=589'
        //     // anticipatePin: 1,
        // }
    });

    
});