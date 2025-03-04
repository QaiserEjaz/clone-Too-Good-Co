function locomotiveAnimation(){  // for smooth scrolling
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
    gsap.to("#nav-part1 svg",{
        transform:"translateY(-100%)",
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            start:"top 10",
            end:"top -5%",
            scrub:true
        }
    })
    
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


function loadinganimation(){
    gsap.from("#page1 h1", {
        y:100,
        opacity:0,
        delay:0.5,
        duration:0.9,
        stagger:0.3
    })
    gsap.from("#page1 #videocontainer", {
        scale:0.9,
        opacity:0,
        delay:1.3,
        duration:0.7,
    })
}
loadinganimation();


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
