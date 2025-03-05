function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll as per the instrurctor advice...
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: -10, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
        
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! 
    //So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile.
    //We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    
}
locomotiveAnimation()

// const scroll = new LocomotiveScroll({
//     el: document.querySelector('#main'),
//     smooth: true
// });

function navbarAnimation(){
    gsap.to("#nav-part1 .logo-initial", {
        transform:"translateY(-100%)",
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            start:"top 10",
            end:"top -5%",
            scrub:true,
            onUpdate: () => {
                document.querySelector('#nav').classList.add('scrolled');
                document.querySelector('.logo-initial').style.opacity = '0';
                document.querySelector('.logo-scrolled').style.opacity = '1';
                document.querySelector('.logo-scrolled').style.display = 'block';
            },
            onLeaveBack: () => {
                document.querySelector('#nav').classList.remove('scrolled');
                document.querySelector('.logo-initial').style.opacity = '1';
                document.querySelector('.logo-scrolled').style.opacity = '0';
                document.querySelector('.logo-scrolled').style.display = 'none';
            }
        }
    });

    gsap.to("#nav-part2 #links",{
        transform:"translateY(-100%)",
        opacity:0,
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            start:"top 0",
            end:"top -5%",
            scrub:true
        }
    })
}
navbarAnimation()

function videoconAnimation(){
    var videocon = document.querySelector("#video-container")
    var playbtn = document.querySelector("#play")

    videocon.addEventListener("mouseenter",function(){
        gsap.to(playbtn,{
            scale:1,
            opacity:1,
            duration: 0.3
        })
    })
        
    videocon.addEventListener("mouseleave",function(){
        gsap.to(playbtn,{
            scale:0,
            opacity: 0,
            duration: 0.3
        })
    })
    
    videocon.addEventListener("mousemove", function(dets){
        gsap.to(playbtn,{
            left:dets.x,
            top:dets.y,
            duration: 0.1
        })
    })

    playbtn.addEventListener("click", function(){
        window.open("https://www.youtube.com/watch?v=your-video-id", "_blank");
        // Replace 'your-video-id' with actual YouTube video ID or any other video link
    })
}
videoconAnimation();


function loadingAnimation(){
    gsap.from("#page1 h1", {
        y:100,
        opacity:0,
        delay:0.5,
        duration:0.9,
        stagger:0.3
    })
    gsap.from("#video-container", { // Fixed selector typo
        scale:0.9,
        opacity:0,
        delay:1.3,
        duration:0.7,
    })
}
loadingAnimation();

function cursorAnimation(){
    document.addEventListener("mousemove", function(dets){
        gsap.to("#cursor",{
            left:dets.x,
            top:dets.y
        })
    })
    
    // document.querySelector("#child1").addEventListener("mouseenter", function(){
    //     gsap.to("#cursor",{
    //         transform:'translate(-50%,-50%) scale(1)'
    
    //     })
    // })
    
    // document.querySelector("#child1").addEventListener("mouseleave", function(){
    //     gsap.to("#cursor",{
    //         transform:'translate(-50%,-50%) scale(0)'
    
    //     })
    // })
    
    document.querySelectorAll(".child").forEach(function(elem){
        elem.addEventListener('mouseenter', function(){
            gsap.to('#cursor', {
                transform: 'translate(-50%,-50%) scale(1)',
            });
        });
        elem.addEventListener('mouseleave', function(){
            gsap.to('#cursor', {
                transform: 'translate(-50%,-50%) scale(0)',
            });
            
        });
    
    });
}
cursorAnimation()

// Mobile Menu Toggle
// document.querySelector('.menu-toggle').addEventListener('click', function() {
//     document.querySelector('.mobile-menu').classList.add('active');
//     document.querySelector('#icons')
// });

// document.querySelector('.close-menu').addEventListener('click', function() {
//     document.querySelector('.mobile-menu').classList.remove('active');
// });


// ... existing code ...

function initializeMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('#mobile-menu');
    const closeMenu = document.querySelector('.close-menu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        menuToggle.style.display = 'none';
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuToggle.style.display = 'block';
    });
}

// Add this to your existing initialization
window.addEventListener('load', function() {
    locomotiveAnimation();
    navbarAnimation();
    videoconAnimation();
    cursorAnimation();
    initializeMenuToggle();
});