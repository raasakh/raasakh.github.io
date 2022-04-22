/* Table of content
--------------------------------------------

========
--------
LOADER
THREE JS GRAPHICS
COOKIE POPUP FUNCTION
COUNT FUNCTION
MASONARY
OPACITY TRANSITION ON SCROLL
COUNT FUNCTION ON SCROLL
SWIPER JS
NAVIGATION ANIMATION
GRAPHICS DISPLAY
FIXED NAVIGATION
DOCUMENT ON RESIZE
-----------
==========

------------------------------------------*/


// |||||||||||||||||||||||||  LOADER  |||||||||||||||||||||//
gsap.to('.loader-text',1,{
    width:'100%',
    onComplete:function(){
      gsap.to('.loader-content',0,{
        display:'none'
      })
      gsap.to('#loader',1.2,{  
        y:'-100%',
        ease:'Expo.easeInOut',
        onComplete:function(){
            opacity()
            gsap.to('body',{
                overflowY:'scroll'
            })
        }
    })
}
})
// |||||||||||||||||||||||||  LOADER  |||||||||||||||||||||//










// |||||||||||||||||||||||||  THREE JS GRAPHICS ON HOME PAGE  |||||||||||||||||||||//
$(function() {

    const container = document.getElementById('app');

    if (container) {

        const options = {
            onSpeedUp: (ev) => {},
            onSlowDown: (ev) => {},
            // mountainDistortion || LongRaceDistortion || xyDistortion || turbulentDistortion || turbulentDistortionStill || deepDistortionStill || deepDistortion
            distortion: xyDistortion,

            length: 400,
            roadWidth: 15,
            islandWidth: 2,
            lanesPerRoad: 3,

            fov: 75,
            fovSpeedUp: 120,
            speedUp: 3,
            carLightsFade: 0,

            totalSideLightSticks: 30,
            lightPairsPerRoadWay: 30,

            // Percentage of the lane's width
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,

            /*** These ones have to be arrays of [min,max].  ***/
            lightStickWidth: [0.2, 0.05],
            lightStickHeight: [0.3, 0.7],

            movingAwaySpeed: [20, 50],
            movingCloserSpeed: [-150, -230],

            /****  Anything below can be either a number or an array of [min,max] ****/

            // Length of the lights. Best to be less than total length
            carLightsLength: [400 * 0.4, 400 * 0.2],
            // Radius of the tubes
            carLightsRadius: [0.03, 0.08],
            // Width is percentage of a lane. Numbers from 0 to 1
            carWidthPercentage: [0.1, 1],
            // How drunk the driver is.
            // carWidthPercentage's max + carShiftX's max -> Cannot go over 1. 
            // Or cars start going into other lanes 
            carShiftX: [-0, .1],
            // Self Explanatory
            carFloorSeparation: [1, 1.5],

            colors: {
                roadColor: 0x080808,
                islandColor: 0x0a0a0a,
                background: 0xF1EECE,
                shoulderLines: 0x787A91,
                brokenLines: 0x787A91,
                /***  Only these colors can be an array ***/
                leftCars: [0x7D0D1B, 0xA90519, 0xff102a],
                rightCars: [0xF1EECE, 0xE6E2B1, 0xDFD98A],
                sticks: 0xF1EECE,
            }
        };

        const myApp = new App(container, options);
        myApp.loadAssets().then(myApp.init)


    }
})


// |||||||||||||||||||||||||  THREE JS GRAPHICS ON HOME PAGE  |||||||||||||||||||||




// |||||||||||||||||||||||||  COOKIE POPUP FUNCTION  |||||||||||||||||||||
$(function() {

    var cookie_confirmation = document.querySelector('.cookie-confirmation')

    if (cookie_confirmation) {
        var cookie_popup = document.querySelector('.cookie-popup')
        cookie_confirmation.addEventListener('click', function() {
            cookie_popup.style.opacity = 0
            setTimeout(function() {
                cookie_popup.style.display = "none"
            }, 1000)
        })
    }
})


//  |||||||||||||||||||||||||  COOKIE POPUP FUNCTION  |||||||||||||||||||||



//  |||||||||||||||||||||||||  COUNT FUNCTION |||||||||||||||||||||

function count(div) {
    var increment;
    if (parseInt(div.getAttribute("data-number")) > 100) {
        increment = Math.round(parseInt(div.getAttribute("data-number")) / 200)
    } else {
        increment = 1
    }
    var stop = setInterval(function() {
        if (parseInt(div.innerHTML) < parseInt(div.getAttribute("data-number"))) {
            div.innerHTML = parseInt(div.innerHTML) + increment
        } else {
            div.innerHTML = parseInt(div.getAttribute("data-number"));
            clearInterval(stop)
        }
    }, 5000 / parseInt(div.getAttribute('data-number')))
}

//  |||||||||||||||||||||||||  COUNT FUNCTION |||||||||||||||||||||




//  |||||||||||||||||||||||||  MASONRY OF BLOG AND TESTIMONIAL |||||||||||||||||||||

$(window).load(function() {

    $('.testimonials-container').masonry({
        itemSelector: '.testimonial',
        isAnimated: true
    });


    $('.blogs-container').masonry({
        itemSelector: '.blog',
        isAnimated: true
    });

});

//  |||||||||||||||||||||||||  MASONRY OF BLOG AND TESTIMONIAL |||||||||||||||||||||




//  |||||||||||||||||||||||||  OPACITY TRANSITION ON SCROLL |||||||||||||||||||||

function opacity() {
    var elements = $(".opacity-scroll").toArray();
    $(window).scroll(function() {
        elements.forEach(function(item) {
            if ($(this).scrollTop() >= $(item).offset().top - window.innerHeight) {
                $(item).removeClass("opacity-scroll");
            }
        });
    });
    elements.forEach(function(item) {
        if ($(this).scrollTop() >= $(item).offset().top - window.innerHeight) {
            $(item).removeClass("opacity-scroll");
        }
    });
};
//  |||||||||||||||||||||||||  OPACITY TRANSITION ON SCROLL |||||||||||||||||||||




//  |||||||||||||||||||||||||  COUNTER FUNCTION ON SCROLL |||||||||||||||||||||  
$(function() {
    var elements = $(".counter").toArray();
    $(window).scroll(function() {
        elements.forEach(function(item) {
            if ($(this).scrollTop() >= $(item).offset().top - window.innerHeight) {
                count(item)
            }
        });
    });
    elements.forEach(function(item) {
        if ($(this).scrollTop() >= $(item).offset().top - window.innerHeight) {
            count(item)
        }
    });
});

//  |||||||||||||||||||||||||  COUNTER FUNCTION ON SCROLL |||||||||||||||||||||  




//  |||||||||||||||||||||||||  SWIPER JS |||||||||||||||||||||  

//  |||||||||||||||||||||||||  CASE STUDY HEIIGHT BASED ON LARGEST DIV |||||||||||||||||||||  

var projects_height = document.querySelectorAll('.project-container')
var projects_container = document.querySelector('.case-study-information')
var max_height;
projects_height.forEach(project => $(function() {
    max_height = Math.max(parseInt(project.offsetHeight + 50))
    projects_container.style.height = max_height + 'px';
}))

window.addEventListener('resize', function() {
    var projects_height = document.querySelectorAll('.project-container')
    var images_container = document.querySelector('.case-study-information')
    var max_height;
    projects_height.forEach(project => $(function() {
        max_height = Math.max(parseInt(project.offsetHeight + 50))
        images_container.style.height = max_height + 'px';
    }))
})

//  |||||||||||||||||||||||||  CASE STUDY HEIIGHT BASED ON LARGEST DIV |||||||||||||||||||||  



$(document).ready(function() {

    var parallaxSlider;
    var parallaxSliderOptions = {
        speed: 1500,
        parallax: true,
        loop: true,
        centeredSlides: true,
        mousewheel: true,
        on: {
            init: function() {
                let swiper = this;
                for (let i = 0; i < swiper.slides.length; i++) {
                    $(swiper.slides[i])
                        .find('.img-container')
                        .attr({
                            'data-swiper-parallax': 1 * swiper.width,
                        });
                }
                gsap.set('.project-container', {
                    opacity: 0
                })
                var current_slide = document.querySelector('.swiper-slide-active')
                var div = current_slide.getAttribute("data-text");
                gsap.to(div, 1, {
                    opacity: 1,
                    pointerEvents: 'all'
                })
            },
            resize: function() {
                this.update();
            },
            slideChangeTransitionEnd: function() {
                var current_slide = document.querySelector('.swiper-slide-active')
                var div = current_slide.getAttribute("data-text");
                gsap.to('.project-container', .1, {
                    opacity: 0,
                    pointerEvents: 'none',
                    onComplete: function() {
                        gsap.to(div, .5, {
                            opacity: 1,
                            pointerEvents: 'all'
                        })
                    }

                })
            },
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: true,
        },
        observer: true,
        observeParents: true,
    };

    var parallax_slider = document.querySelector('.parallax-slider')

    if (parallax_slider) {
        parallaxSlider = new Swiper('.parallax-slider', parallaxSliderOptions);
        $(window).on('resize', function() {
            parallaxSlider.destroy();
            parallaxSlider = new Swiper('.parallax-slider', parallaxSliderOptions);
        });
    }

});



//  |||||||||||||||||||||||||  SWIPER JS |||||||||||||||||||||  




//  |||||||||||||||||||||||||  NAVIGATION ANIMATION |||||||||||||||||||||  

$(function() {


    var menubar = document.querySelector('.menubar')
    var navigation = document.querySelector('#navigation')
    var navigation_links = document.querySelectorAll('.navigation-link')

    gsap.set('.navigation-opacity', {
        opacity: 0
    })

    navigation_links.forEach(a=>a.addEventListener('click',function(){
        if (menubar.classList.contains('menubar-close')) {
            menubar.classList.remove('menubar-close');
            gsap.to('.navigation-opacity', .5, {
                opacity: 0,
                onComplete: function() {
                    gsap.to(navigation, .5, {
                        transform: 'translateX(100%)'
                    })
                }
            })
            gsap.to('#navigation-fixed',.5,{
                backdropFilter:'blur(10px)',
            })
        } else {
            gsap.to(navigation, .5, {
                transform: 'translateX(0%)',
                onComplete: function() {
                    gsap.to('.navigation-opacity', .5, {
                        opacity: 1
                    })
                }
            })
            gsap.to('#navigation-fixed',.5,{
                backdropFilter:'blur(0px)',
            })
            menubar.classList.add('menubar-close');
        }
    }))

    // menubar.addEventListener('click', function() {
        
    // })



})

//  |||||||||||||||||||||||||  NAVIGATION ANIMATION |||||||||||||||||||||  




//  ||||||||||||||||||||||||| HIDE GRAPHICS WHEN NOT ON SCREEN |||||||||||||||||||||  


$(window).scroll(function() {
    if ($('#app')) {
        var scroll = $(window).scrollTop()
        if (scroll > window.innerHeight + 50) {
            $('#app').css('display', 'none')
        } else {
            $('#app').css('display', 'block')
        }
    }
});

//  ||||||||||||||||||||||||| HIDE GRAPHICS WHEN NOT ON SCREEN |||||||||||||||||||||  




//  ||||||||||||||||||||||||| COLLAPSE FIXED NAVIGATION ON SCROLL |||||||||||||||||||||  

$(window).scroll(function() {
    if ($('#navigation-fixed')) {
        var scroll = $(window).scrollTop()
        if (scroll > 50) {
            $('#navigation-fixed').css('padding', '5px')
            $('#navigation-fixed').css('border-bottom', '1px solid rgb(235,235,235,.2)')
        } else {
            $('#navigation-fixed').css('padding', '10px')
            $('#navigation-fixed').css('border-bottom', 'none')
        }
    }
});

//  ||||||||||||||||||||||||| COLLAPSE FIXED NAVIGATION ON SCROLL |||||||||||||||||||||  

//  ||||||||||||||||||||||||| RELOAD ON RESIZE |||||||||||||||||||||  

if(window.innerWidth < 676){
    
}
else{
    $(window).bind('resize', function(e)
    {
      this.location.reload(false);
    });
}

//  ||||||||||||||||||||||||| RELOAD ON RESIZE |||||||||||||||||||||  
