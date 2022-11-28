//menuscroll
$(function () {
    $("a.scr[href*=#]:not([href=#])").click(function () {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var e = $(this.hash);
            if (e = e.length ? e : $("[name=" + this.hash.slice(1) + "]"), e.length) return $("html,body").animate({
                scrollTop: e.offset().top -70
            }, "slow"), !1
        };
        $(".menu").toggleClass("mshow");
    })
});
//menu animate
var a=$("header").height();
var t = $("nav");
$(window).scroll(function() {
            if ($(this).scrollTop() > a && t.hasClass("hiden")) {
                t.removeClass("hiden").addClass("shown");
            } else if ($(this).scrollTop() <= a && t.hasClass("shown")) {
                t.removeClass("shown").addClass("hiden");
            }
});
//menu adaptiv

$(".menu").click(function(){
    $(this).toggleClass("mshow");
});

//carousel
$('.gal1').owlCarousel({
    nav: false,
    navText: "",
    items: 1,
animateOut: 'fadeOut',
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
});



//mask
jQuery(function ($) {
    $("input[type='tel']").mask("+7 (999) 999 9999");
});




$("form").submit(function () {

    $.ajax({
        type: "POST",
        url: "js/mail.php",
        data: $(this).serialize(),
        success: function(result){
            if(result){
                //console.log(result);
                e(result);
            }
        },
    })/*.done(function () {
        e();
        //fbq('track', 'Purchase', {value: '38.00', currency:'USD'});
        //ga('send','pageview','/thanks.html');
        //yaCounter41096429.reachGoal('ZAYAVKA')
    })*/;
    return false;
});



function e(result) {
    $.fancybox.close();
    $.fancybox.open({
        src: '#thanks',
        type: 'inline',
    });
    $("#thanks .answer").html(result);
    $("input, textarea").val("");
};

$(".map").click(function(){
    maps();
});
function maps() {
    
    $.fancybox.open({
        src: '#map1',
        type: 'inline',
    });

};





particlesJS('particles-js',
{
  "particles": {
    "number": {
      "value": 10,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "image",
      "stroke": {
        "width": 0,
        "color": "#fff"
      },
      "polygon": {
        "nb_sides": 30
      },
      "image": {
        "src": "img/angle.png",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.1,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 50,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,

    },
    "move": {
      "enable": true,
      "speed": 3,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "bounce",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 90,
        "duration": 2,
        "opacity": 2,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}

);


//map

function mm() {

    //map2
    var map = new ymaps.Map("map", {
        center: [45.032305,38.973721],
        zoom: 16,
        controls: ["zoomControl"],
        type: "yandex#map",
        behaviors: ['drag', 'dblClickZoom']
    }, {
        suppressMapOpenBlock: true
    });

    map.geoObjects.add(new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: [45.032305,38.973721]

        },
        properties: {
            balloonContent: decodeURIComponent("Кафе-бар Министерство"),
            iconCaption: decodeURIComponent("Кафе-бар Министерство"),
            hintCaption: decodeURIComponent("Кафе-бар Министерство"),
        }
    }, {
        iconLayout: "default#image",
        iconImageSize: [64, 64],
        iconImageOffset: [-32, -64],
        iconImageHref: "img/loc.svg",
    }));
    //----------------------------------------
    var map1 = new ymaps.Map("map1", {
        center: [45.032305,38.973721],
        zoom: 16,
        controls: ["zoomControl"],
        type: "yandex#map",
        behaviors: ['drag', 'dblClickZoom']
    }, {
        suppressMapOpenBlock: true
    });

    map1.geoObjects.add(new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: [45.032305,38.973721]

        },
        properties: {
            balloonContent: decodeURIComponent("Кафе-бар Министерство"),
            iconCaption: decodeURIComponent("Кафе-бар Министерство"),
            hintCaption: decodeURIComponent("Кафе-бар Министерство"),
        }
    }, {
        iconLayout: "default#image",
        iconImageSize: [64, 64],
        iconImageOffset: [-32, -64],
        iconImageHref: "img/loc.svg",
    }));

}







