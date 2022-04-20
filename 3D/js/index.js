import * as THREE from "https://cdn.skypack.dev/three@0.128.0/build/three.module.js"

import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js'

import {RGBELoader} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/RGBELoader.js'



var Spine1,Spine2,LeftShoulder,RightShoulder,LeftForeArm,RightForeArm,model,Head,LeftEye,RightEye,Neck,modelbase,shadowMesh,head,smile
var avatar_rotation ;
var avatar_full_view;
var camera,model;
var baseMaterial,backMaterial,modelbaseMaterial;
var camerax,cameray,cameraz ,modelpositionx,shadowpositionx,basepositionx

// Dominant colors to choose From

var red = [0xB61919,0xBD1616,0xFF2626]
var purple = [0x2A0944,0x3F0071,0x610094]
var lightblue = [0x2F5EB4,0x035397,0x5089C6]
var darkblue = []
var green = [0x40916c,0x2d6a4f,0x40916c]
var teal = [0x023047,0x219ebc,0x126782]
var Ryzhikh = [0xe76f51,0xf4a261,0xf4a261]
var orange = [0xdb7c26,0xd8572a,0xe2711d]


var dominant_color = red //Enter the Color name 

var male = [-40]
var female = [-38]

var gender = male //Enter the gender of your avatar. (It's important to perfectly position your avatar)

// ====================

$(function(){

    var canvas = document.querySelector('canvas.webgl')
    
    var scene = new THREE.Scene()

    var renderer = new THREE.WebGLRenderer({
        canvas:canvas,
        alpha:true
    })

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize((window.innerWidth),window.innerHeight);

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;

  window.addEventListener('load', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      

  }, false);

  window.addEventListener('resize', function() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    
}, false);


    camera = new THREE.PerspectiveCamera(45,(window.innerWidth)/window.innerHeight,0.1,1000)

    

    camera.position.set(-14.1,-2.45,20.69)

    camera.rotation.set(-0.02,2.89,0)

    scene.add(camera)
    

    var hlight = new THREE.AmbientLight (0x404040,.5);
    scene.add(hlight);

    var light3 = new THREE.PointLight(0xc4c4c4,1);
    light3.position.set(0,10,-50);
    scene.add(light3);

    var light5 = new THREE.PointLight(0x7d09db,1);
    light5.position.set(7.4,4,-3);
    light5.rotation.set(0,-1,0);
    scene.add(light5);

    var light6 = new THREE.PointLight(0x1478db,1);
    light6.position.set(-5.6,9,10);
    light6.rotation.set(0,1,0);
    scene.add(light6);


    var modelbaseGeometry = new THREE.CylinderGeometry( 15, 15, 1.5, 15 );
    modelbaseMaterial = new THREE.MeshPhongMaterial({
        color: dominant_color[0],
    })

    modelbase = new THREE.Mesh(modelbaseGeometry,modelbaseMaterial)

    modelbase.position.set(-6.5,-40.8,0)

    scene.add(modelbase)


    var backGeometry = new THREE.BoxGeometry(window.innerWidth/2,window.innerHeight/2,1)
    backMaterial = new THREE.MeshLambertMaterial({
        color: dominant_color[1],

    })

    baseMaterial = new THREE.MeshLambertMaterial({
        color: dominant_color[2]
    })
    var back = new THREE.Mesh(backGeometry,backMaterial)


    var base = new THREE.Mesh(backGeometry,baseMaterial)

    back.position.set(0,0,50)
    back.rotation.set(0,-0.287,0)
    base.position.set(0,-50,0)
    base.rotation.set(1.6,0,0)
    scene.add(back)
    scene.add(base)


    const shadowMap = new THREE.TextureLoader().load('./images/roundshadow.png');

    const shadowGeo = new THREE.PlaneGeometry(30, 30);

    const shadowMat = new THREE.MeshBasicMaterial({
        map: shadowMap,
        transparent: true,    
        depthWrite: false,    
      });
      shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
      shadowMesh.position.set(3.6,-46,-9.4);
      shadowMesh.rotation.x = Math.PI * -.5;
      shadowMesh.material.opacity = .6;
      
      scene.add(shadowMesh)




    const loader3 = new GLTFLoader();

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const rgbeLoader = new RGBELoader();
    rgbeLoader.load('./textures/env_1.hdr', function(texture) {

        const envMap = pmremGenerator.fromEquirectangular(texture).texture;

        scene.environment = envMap;

        texture.dispose();
        pmremGenerator.dispose();

    })



    loader3.load(
        // resource URL
        'https://d1a370nemizbjq.cloudfront.net/43fa9897-5289-405e-878d-22ed853fae68.glb', //paste avatar link here
        // called when the resource is loaded
        function ( gltf ) {

            scene.add( gltf.scene );

            // idleAction.play()

            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object

            model = gltf.scene.children[0];
            model.position.set(-0.25,gender[0],0)
            model.scale.set(24,24,24)
            model.rotation.set(0,3,0)


            LeftShoulder = model.getObjectByName('LeftShoulder')
            RightShoulder = model.getObjectByName('RightShoulder')
            LeftForeArm = model.getObjectByName( 'LeftForeArm' );
            RightForeArm = model.getObjectByName( 'RightForeArm' );
            Spine1 = model.getObjectByName( 'Spine1' );
            Spine2 = model.getObjectByName( 'Spine2' );
            Head = model.getObjectByName( "Head" );
            Neck = model.getObjectByName( "Neck" );
            LeftEye = model.getObjectByName( "LeftEye" );
            RightEye = model.getObjectByName( "RightEye" );

            head = model.getObjectByName("Wolf3D_Head")


            head.morphTargetInfluences[1] = .1




            
            LeftShoulder.rotation.set(1.5491,-0.2196,-1.4855)
            RightShoulder.rotation.set(1.5491,0.2196,1.4855)
            RightForeArm.rotation.set(0.075,-0.1488,-0.422)
            LeftForeArm.rotation.set(0.075,0.1488,0.422)
            Neck.rotation.set(0,0,0)       
            Head.rotation.set(0,0,0) 


            
    
            initiate()
         


            }
            ,function ( xhr ) {

                var progress = ( (xhr.loaded / xhr.total) * 100 ) 

                var string = progress.toString()

                document.querySelector('.progress-percentage').textContent = string.substring(0, 4) + '%'

                gsap.to('.loader-text',{
                    width: ( (xhr.loaded / xhr.total) * 100 ) + '%'
                })
        
            },
            );



function initiate(){

    gsap.to('.loader-content',.8,{
        opacity:0,
        onComplete:function(){
          gsap.to('.loader-content',0,{
            display:'none'
          })
          gsap.to('#loader',1.2,{   //LOADING PAGE TRANSITION
            y:'-100%',
            ease:'Expo.easeInOut',
            onComplete:function(){
                scrollAnimations()
                gsap.to('body',{
                    height:$(document).height(),
                    overflowY:'scroll'
            
                })
            

            

            }
        })
        }
      })



    camerax = 14.12;
    cameray = -24.28;
    cameraz = -85;
    modelpositionx = -6.5;
    basepositionx = -6.5;
    shadowpositionx = -6.5;
    
    
    function scrollAnimations(){
    
    
                gsap.to( camera.position,2,{
                    x: 3.8,
                    y: -0.45,
                    z: -15.69,
                    onComplete:function(){
    
    
                        gsap.to('.cursor',1,{
                            opacity:1
                        })
    
                        
                        gsap.to('.cursor-two',1,{
                            opacity:1
                        })
    
                        gsap.to(camera.position, 1 ,{ 
                            scrollTrigger : {
                                trigger:"#about",
                                scrub: 2,
                                start:'top center',
                                end:'center center',
                                onEnter: function(){
                                    avatar_full_view = true ;
                                    avatar_rotation = true;
                                    gsap.to('.home-opacity',1,{
                                        opacity: 0
                                    })
                                },
                                onLeaveBack: function(){
                                    avatar_full_view = false ;
                                    avatar_rotation = false;
                                    gsap.to('.home-opacity',1,{
                                        opacity: 1
                                    })
                                },
                               },
                               x: camerax,
                               y: cameray,
                               z: cameraz,
                           })
                       gsap.to(model.position, 1 ,{ 
                           scrollTrigger : {
                               trigger:"#about",
                               scrub: 2,
                               start:'top center',
                               end:'center center'
                              },
                           x: modelpositionx,
                           })
                   
                       gsap.to(modelbase.position, 1 ,{ 
                           scrollTrigger : {
                               trigger:"#about",
                               scrub: 2,
                               start:'top center',
                               end:'center center'
    
                              },
                           x: basepositionx,
                           })
           
                       gsap.to(shadowMesh.position, 1 ,{ 
                           scrollTrigger : {
                               trigger:"#about",
                               scrub: 2,
                               start:'top center',
                               end:'center center'
                              },
                           x: shadowpositionx,
                           })                           
    
    
    
    
                           gsap.to('.webgl', 0,{ 
                            scrollTrigger : {
                                trigger:"#about",
                                start:'top 0%',
                                onEnter: function(){
                                    gsap.to('.webgl',0,{
                                        position:'relative',
                                        top:'100%',
                                    })
                                },
                                onLeaveBack: function(){
                                    gsap.to('.webgl',0,{
                                        position:'fixed',
                                        top:'0%',
                                    })
                                },
                               },
                            })
    
                           let targets = gsap.utils.toArray([".block-scroll", ".opacity-scroll"]);
                           targets.forEach((target) => {
                             gsap.from(target, {
                               scrollTrigger: {
                                 start: 'top bottom',
                                 end: 'bottom top',
                                 trigger: target,
                                 onEnter :()=> target.classList.add('reveal')
                               }
                             });
                           });
    
                    }
                });


    //SCROLL INDICATOR PROGRESS ON SCROLL
    const divheight = document.querySelector('.scroll-link').offsetHeight


    gsap.set('.background-blur',{
        height:$(document).height()
    })
    gsap.set('#fullpage',{
        height:$(document).height()
    })  
    
    gsap.set('.scroll-link',{
        height:divheight
       });
    
    
    $(window).scroll(function() {
        var scroll = $(window).scrollTop(),
          dh = $(document).height(),
          wh = $(window).height();
        var scrollPercent = ((scroll / (dh - wh)) * 100);
        gsap.to('.fill-width',{
            width:scrollPercent+'%'
        })
      });

    
        
    }
    

    
    
    
    
      
     
      
      new Swiper(' .swiper-container', {
        slidesPerView: 'auto',
        speed: 1000,
        spaceBetween: 20,
        centeredSlides: true,
        grabCursor: true,
        on: {
            slideChangeTransitionEnd: function() {
            var current_slide = document.querySelector('.swiper-slide-active')
            var div = current_slide.getAttribute("data-text");
            gsap.to('.project-info',.5,{
                opacity:0,
                onComplete:function(){
                    gsap.to(div,.5,{
                        opacity:.9
                    })
                }
    
            })
          },
          init:function(){
            gsap.set('.project-info',{
                opacity:0
            })
            var current_slide = document.querySelector('.swiper-slide-active')
            var div = current_slide.getAttribute("data-text");
            gsap.to(div,1,{
                opacity:.9,
            })
          },
          resize: function() {
            this.update();
          }
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: true,
        },
        pagination: {
          el: ' .swiper-pagination',
          type: 'fraction',
        },
        navigation: {
            nextEl: '.swiper-control-right',
            prevEl: '.swiper-control-left'
          },
        // mousewheel: true,
        observer: true,  
        observeParents: true,
        loop:true
      });
      // SLIDER ON GALLERY PAGE        
      
    
    
      $(document).ready(function() {
        $(".project-name").lettering();
        $(".project-name-overlay").lettering();
      });
    
    
    
    
    
    
    
      // CURSOR
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
              rotate : '+=' +10
             })
          }
          function cursorhover(){
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
         function linkhover(){
          gsap.to( $cursor,{
            width:'100px',
            height:'100px',
            opacity:1,
            background:'rgb(235,235,235)',
            background:'transparent',
            border:'none',
            innerHTML:'VIEW&nbsp;LIVE',
            top:'-50px',
            left:'-50px',
           })
           gsap.to( $cursortwo,{
            width:'110px',
            height:'110px',
            border:'2px dotted rgb(235,235,235)',
            background:'transparent',
            top:'-55px',
            left:'-55px',
           })
         }
         function cursor(){
           gsap.to( $cursor, {
            width:'50px',
            height:'50px',
            top:'-25px',
            left:'-25px',
            opacity:1,
            scale:1,
            background:'transparent',
            border:'1px solid rgb(235,235,235)',
            innerHTML:''
           }) 
           gsap.to( $cursortwo,{
            scale:1,
            opacity:1,
            width:'8px',
            height:'8px',
            border:'0px solid rgb(235,235,235)',
            background:'rgb(235,235,235)',
            top:'-4px',
            left:'-4px',
           })
         }
         $(window).on('mousemove',cursormover);
         $('.project-container img').hover(linkhover,cursor);
         $('.hover').hover(cursorhover,cursor);
      })
    // CURSOR
    
    
    
    
    
    
    
    
    
    let userAgent = navigator.userAgent;
    
    if(userAgent.match(/firefox|fxios/i)){
        gsap.to('.contact-background',{
            display:'none',
            opacity:0
        })
        gsap.to('.services-background',{
            display:'none',
            opacity:0
        })
    
        }
    
    
    
      //CONTACT FORM 
    
    
      var submit = document.getElementById('submit');
    
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    
      function sendEmail() {
        var name = $("#name");
        var email = $('#email');
        var subject = $("#subject");
        var body = $("#body");
        
    
        
    
        if (isNotEmpty(name) && isNotEmpty(email) && isNotEmpty(subject) && isNotEmpty(body) ) {
            if($("#email").val().match(mailformat)){
              $('#submit').text("Sending");
              $.ajax({
                  url: 'mail.php',
                  method: 'POST',
                  dataType: 'json',
                  data: {
                      name: name.val(),
                      email: email.val(),
                      subject: subject.val(),
                      body: body.val()
                      
                  }, success: function (response) {
                       $('form')[0].reset();
                       $('#submit').text("Sent!!!");
                       $('.contact-form-message').css('opacity', '1');
                       setTimeout(function(){
                        $('.contact-form-message').css('opacity', '0');
                        },4000)
                  }
                  
               });
            }
            else{
              $('#message').css('opacity', '1');
              setTimeout(function(){
              $('#message').css('opacity', '0');
              },4000)
          }
    
        }
    }
    
    function isNotEmpty(caller) {
        if (caller.val() == "" ) {
            caller.css('border', '1px solid #790c5a');
        $('#submit').text("Send");
            return false;
        }
    
         else
            caller.css('border', '');
        return true;
    }
    
    submit.addEventListener('click',sendEmail)
}         



    
    //MOUSE COORDINATES

    document.addEventListener('mousemove', function(e) {
        var mousecoords = getMousePos(e);
    if (Head ,RightEye,LeftEye) {
        moveJoint(mousecoords, Head, 20);
        moveJoint(mousecoords, LeftEye, 25);
        moveJoint(mousecoords, RightEye, 25);
    }
    });

    function getMousePos(e) {
    return { x: e.clientX, y: e.clientY };
    }



    //MODEL MOUSEMOVE ANIMATIONS

    function moveJoint(mouse, joint, degreeLimit) {
        let degrees = getMouseDegrees(mouse.x, mouse.y, degreeLimit);
        joint.rotation.y = THREE.Math.degToRad(degrees.x);
        joint.rotation.x = THREE.Math.degToRad(degrees.y);
    }


    //MOUSEDEGREES FUNCTION FUNCTION

    function getMouseDegrees(x, y, degreeLimit) {
        let dx = 0,
            dy = 0,
            xdiff,
            xPercentage,
            ydiff,
            yPercentage;

        let w = { x: window.innerWidth, y: window.innerHeight };

        // Left (Rotates neck left between 0 and -degreeLimit)
        
        // 1. If cursor is in the left half of screen
        if (x <= w.x / 2) {
            // 2. Get the difference between middle of screen and cursor position
            xdiff = w.x / 2 - x;  
            // 3. Find the percentage of that difference (percentage toward edge of screen)
            xPercentage = (xdiff / (w.x / 2)) * 100;
            // 4. Convert that to a percentage of the maximum rotation we allow for the neck
            dx = ((degreeLimit * xPercentage) / 100) * -1; }
        // Right (Rotates neck right between 0 and degreeLimit)
        if (x >= w.x / 2) {
            xdiff = x - w.x / 2;
            xPercentage = (xdiff / (w.x / 2)) * 100;
            dx = (degreeLimit * xPercentage) / 100;
        }
        // Up (Rotates neck up between 0 and -degreeLimit)
        if (y <= w.y / 2) {
            ydiff = w.y / 2 - y;
            yPercentage = (ydiff / (w.y / 2)) * 100;
            // Note that I cut degreeLimit in half when she looks up
            dy = (((degreeLimit/2) * yPercentage) / 100) * -1;
            }
        
        // Down (Rotates neck down between 0 and degreeLimit)
        if (y >= w.y / 2) {
            ydiff = y - w.y / 2;
            yPercentage = (ydiff / (w.y / 2)) * 100;
            dy = (degreeLimit * yPercentage) / 100;
        }
        return { x: dx, y: dy };
        }



    var t = 3.5
    var m = 0


    function animate(){
        t += 0.01 

        requestAnimationFrame(animate)


        if ( model ) {


            if(avatar_rotation == true){
                model.rotation.y += 0.015
                modelbase.rotation.y += 0.015
            }
            if(avatar_rotation == false){
                gsap.to(model.rotation,{
                    y : 3
                })  
                   }

            if(avatar_full_view == true){

                m += 0.01

                model.position.y = -40-  Math.sin( m * 5 ) * 1.5;
                modelbase.position.y = -40.8-  Math.sin( m * 5 ) * 1.5;
                shadowMesh.material.opacity = .6 +  Math.sin( m * 5 ) * 0.1;
                
            }


            //MAKING THE MODEL SMILE ON HOVER ON LINKS

            $('.text-overlay-effect').mouseenter( function(){
                head.morphTargetInfluences[1] = .5
            } ).mouseleave( function(){
                head.morphTargetInfluences[1] = .1
            });


                

            if(avatar_full_view == false){

                m = 0

                gsap.to(model.rotation,{
                    y : 3
                })  
                gsap.to( model.position, 1,{
                    y: gender[0],
                } );
            }

            Spine1.rotation.set(.1 * Math.abs(Math.sin(t)),0,0)
            RightShoulder.rotation.y = 0.15+(.1 * Math.abs(Math.sin(t)))
            RightForeArm.rotation.y = 0.15+(.1 * Math.abs(Math.sin(t)))
            LeftForeArm.rotation.y = 0.15+(.1 * Math.abs(Math.sin(t)))
            LeftShoulder.rotation.y = -0.15-(.1 * Math.abs(Math.sin(t)))


        }

        renderer.render(scene,camera)
    }

    animate()

}) 


//SCROLL INDICATOR PROGRESS ON SCROLL
const divheight = document.querySelector('.scroll-link').offsetHeight/5


gsap.set('.background-blur',{
    height:$(document).height()
})
gsap.set('#fullpage',{
    height:$(document).height()
})      

$(window).scroll(function() {
    var scroll = $(window).scrollTop(),
      dh = $(document).height(),
      wh = $(window).height();
    var scrollPercent = ((scroll / (dh - wh)) * 100);
    gsap.to('.fill-width',{
        width:scrollPercent+'%'
    })
  });


// RELOAD THE PAGE ON WINDOW RESIZE

if(window.innerWidth < 676){
    
}
else{
    $(window).bind('resize', function(e)
    {
      this.location.reload(false);
    });
}



//TESTIMONALS SWIPER

new Swiper(' .mySwiper', {
    // slidesPerView: 'auto',
    speed: 1000,
    // spaceBetween: 20,
    centeredSlides: true,
    grabCursor: true,
    on: {
      resize: function() {
        this.update();
      }
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    navigation: {
        nextEl: '.testimonial-forward',
        prevEl: '.testimonial-back'
      },
    // mousewheel: true,
    observer: true,  
    observeParents: true,
    loop:true
  });
  // SLIDER ON GALLERY PAGE




  const tilt = $('.tilt').tilt({
    maxTilt:        2,
     perspective:    80,   // Transform perspective, the lower the more extreme the tilt gets.
     scale:          1,      // 2 = 200%, 1.5 = 150%, etc..
     speed:          500,    // Speed of the enter/exit transition.
     transition:     true,   // Set a transition on enter/exit.
     disableAxis:    null,   // What axis should be disabled. Can be X or Y.
     reset:          true,   // If the tilt effect has to be reset on exit.
     glare:          false,  // Enables glare effect
     maxGlare:       1       // From 0 - 1.
});



