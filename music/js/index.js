// LOADER
paceOptions = {
  ajax: true,
  document: true,
  eventLag: false
  };

  Pace.on('done', function() {
      gsap.to('.p',1,{
        opacity:0,
        y:'-15%',
        stagger:-.1,
      })

  gsap.to('#preloader',1.5,{
      y:'-100%',
      ease:'Expo.easeInOut',
      delay:1,
      onComplete : function(){


        gsap.to('.fade-in',2,{duration:1,opacity:1,delay:0});


function theme(){
  if(document.querySelector('.theme') ){
    $(function () {
      var elements = $(".theme").toArray();
      $(window).scroll(function () {
          elements.forEach(function (item) {
              if ($(this).scrollTop() >= $(item).offset().top - window.innerHeight) {
                
                  $(item).addClass("reveal");
             
              }
          });
      });
      elements.forEach(function (item) {
          if ($(this).scrollTop() >= $(item).offset().top - window.innerHeight ) {
          
        
              $(item).addClass("reveal");
          
         
          }
      });
  });
}
}
theme();

if(document.querySelector('.cursor')){
  gsap.to('.cursor',1,{opacity:1,delay:1,scale:1,stagger:.2})
  gsap.to('.cursor-two',1,{opacity:1,delay:1,scale:1,stagger:.2})
}


      }
 });
})


const tilt = $('img').tilt({
    maxTilt:        -1,
     perspective:    100,   // Transform perspective, the lower the more extreme the tilt gets.
     easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
     scale:          1,      // 2 = 200%, 1.5 = 150%, etc..
     speed:          500,    // Speed of the enter/exit transition.
     transition:     true,   // Set a transition on enter/exit.
     disableAxis:    null,   // What axis should be disabled. Can be X or Y.
     reset:          true,   // If the tilt effect has to be reset on exit.
     glare:          false,  // Enables glare effect
     maxGlare:       1       // From 0 - 1.
});


  //CUSTOM CURSOR ANIMATION
  $(function(){
    var $cursor = $('.cursor');
    var $cursortwo = $('.cursor-two')
      function cursormover(e){
       
       gsap.to( $cursor , {
         x : e.clientX ,
         y : e.clientY,
        })
        gsap.to( $cursortwo , {
          x : e.clientX ,
          y : e.clientY,
         })
      }
      function cursorhover(e){
       gsap.to( $cursor,{
        scale:1.5,
        opacity:.4,
        background:'rgb(235,235,235)',
        border:'none',
        ease: Expo.easeOut,
       })
       gsap.to( $cursortwo,{
        scale:0,
        opacity:0
       })
     }
     function cursor(e){
       gsap.to( $cursor, {
        scale:1,
        opacity:1,
        background:'transparent',
        border:'1px solid rgb(235,235,235)',
        innerHTML:''
       }) 
       gsap.to( $cursortwo,{
        scale:1,
        opacity:1
       })
     }
     $(window).on('mousemove',cursormover);
     $('a').hover(cursorhover,cursor);
     
  })

   // SCROLL PROGRESS ANIMATION

   $(window).scroll(function() {
    var scroll = $(window).scrollTop(),
      dh = $(document).height(),
      wh = $(window).height();
    scrollPercent = (scroll / (dh - wh)) * 100;
    $(".progressbar").css("height", scrollPercent + "%");
  });