/*global $, jQuery, ga, WeixinJSBridge, _report, _, Swiper, campaignTools, FastClick*/

/* 
* @Author: Jiyun
* @Date:   2015-05-23 15:21:59
* @Last Modified by:   Jiyun
* @Last Modified time: 2015-06-26 17:22:55
*/

/* jshint ignore:start */
function canvas() {
    function Particle( x, y, radius ) {
        this.init( x, y, radius );
    }

    Particle.prototype = {
        init: function( x, y, radius ) {
            this.alive = true;
            this.radius = radius || 10;
            this.wander = 0.15;
            this.theta = random(TWO_PI);
            this.drag = 0.92;
            this.color = '#fff';
            this.x = x || 0.0;
            this.y = y || 0.0;
            this.vx = 0.0;
            this.vy = 0.0;
        },
        move: function() {
            this.x += this.vx;
            this.y += this.vy;
            this.vx *= this.drag;
            this.vy *= this.drag;
            this.theta += random( -0.5, 0.5 ) * this.wander;
            this.vx += sin( this.theta ) * 0.2;
            this.vy += cos( this.theta ) * 0.1;
            this.radius *= 0.96;
            this.alive = this.radius > 0.5;
        },
        draw: function( ctx ) {
            ctx.beginPath();
            ctx.arc( this.x, this.y, this.radius, 0, TWO_PI );
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    };
    // ----------------------------------------
    // Example
    // ----------------------------------------
    var MAX_PARTICLES = 280;
    var COLOURS = [ '#3720ca', '#41a19c', '#fff428', '#F38630', '#9600c8', '#FF4E50', '#1dce39' ];
    var particles = [];
    var pool = [];

    var demo = Sketch.create({
        container: document.getElementById( 'container' )
    });
    demo.setup = function() {
        // Set off some initial particles.
        var i, x, y;
        for ( i = 0; i < 20; i++ ) {
            x = ( demo.width * 0.5 ) + random( -100, 100 );
            y = ( demo.height * 0.5 ) + random( -100, 100 );
            demo.spawn( x, y );
        }

        this.r = random(30, 80);
        this.g = random(80, 180);
        this.b = random(70, 180);
    };
    demo.spawn = function( x, y ) {
        if ( particles.length >= MAX_PARTICLES )
            pool.push( particles.shift() );
        particle = pool.length ? pool.pop() : new Particle();
        particle.init(x, y, random(5, 10));
        particle.wander = random(0.5, 2.0);
        particle.color = random(COLOURS);
        particle.drag = random(0.5, 0.99);
        theta = random(TWO_PI);
        force = random(2, 8);
        particle.vx = sin(theta) * force;
        particle.vy = cos(theta) * force;
        particles.push(particle);
    };
    demo.update = function() {
        var i, particle;
        for ( i = particles.length - 1; i >= 0; i-- ) {
            particle = particles[i];
            if (particle.alive) {
                particle.move();
            } else {
                pool.push(particles.splice(i, 1)[0]);
            }
        }
    };
    demo.draw = function() {
        demo.globalCompositeOperation  = 'lighter';
        // particles.length = 20;
        for ( var i = particles.length - 1; i >= 0; i-- ) {
            particles[i].draw( demo );
        }

        var grd = this.createLinearGradient(10, 0, this.width - 10, this.height);
            // console.log(~~this.r, ~~this.g, ~~this.b);
            // this.fillStyle = 'rgb(' + ~~this.r + ',' + ~~this.g + ',' + ~~this.b + ')';
        
        grd.addColorStop(0, 'rgb(' + ~~this.r + ',' + ~~this.b + ',' + ~~this.g + ')');
        // grd.addColorStop(0.4, 'rgb(' + ~~(this.r - 30) + ',' + ~~(this.g - 30) + ',' + (~~this.b - 30) + ')');
        grd.addColorStop(1, 'rgb(' + ~~(this.g) + ',' + ~~(this.r) + ',' + ~~(this.b) + ')');
        this.fillStyle = grd;
        this.fillRect(0, 0, this.width, this.height);
    };
    demo.mousemove = function() {
        var particle, theta, force, touch, max, i, j, n;
        for ( i = 0, n = demo.touches.length; i < n; i++ ) {
            touch = demo.touches[i];
            max = random(1, 4);
            for ( j = 0; j < max; j++ ) {
              demo.spawn( touch.x, touch.y );
            }
        }
        
        // change background color
        // this.r = 155 * ( this.mouse.x / this.width );
        // this.g = 155 * ( this.mouse.y / this.height );
        // this.b = 155 * abs( cos( PI * this.mouse.y / this.width ) );
    };
}
canvas();
/* jshint ignore:end */

// var mySwiper;


// function swiperSetup() {
//     var animated = false;
//     mySwiper = new Swiper('#slider', {
//         direction: 'horizontal',
//         // direction: 'vertical',
//         loop: false,
//         // slidesPerView: 1,
//         slidesPerView: 'auto',
//         centeredSlides: true,
//         // nextButton: '.next',
//         keyboardControl: true,
//         pagination: '.swiper-pagination',
//         // mousewheelControl: true,
//         // mousewheelForceToAxis: true,
//         // hashnav: true,
//         // speed: 400,
//         // freeMode: true,
//         spaceBetween: 20,

//         onTransitionStart: function (swiper) {
//             var index = swiper.activeIndex;
//         },

//         onTransitionEnd: function (swiper) {

//         }
//     });

//     mySwiper.on('slideChangeStart', function (swiper) {
        
//     });
// }


$(function (){

    // var worksArray = [
    //     {
    //         'title': '杩欐槸1',
    //         'image': 'http://perber.qiniudn.com/U2NyZWVuU2hvdDIwMTUtMDQtMDZhdDEyLjQzLjA1QU0ucG5n_1431154498673',
    //         'url': 'http://www.doubam.com'
    //     }, {
    //         'title': '杩欐槸2',
    //         'image': 'http://perber.qiniudn.com/cDIyMjYwMTIyMzcuanBn_1431154515785',
    //         'url': 'http://www.doubam.com'
    //     }, {
    //         'title': '杩欐槸2',
    //         'image': 'http://perber.qiniudn.com/cDIyMjYwMTIyMzcuanBn_1431154515785',
    //         'url': 'http://www.doubam.com'
    //     }, {
    //         'title': '杩欐槸2',
    //         'image': 'http://perber.qiniudn.com/cDIyMjYwMTIyMzcuanBn_1431154515785',
    //         'url': 'http://www.doubam.com'
    //     }, {
    //         'title': '杩欐槸2',
    //         'image': 'http://perber.qiniudn.com/cDIyMjYwMTIyMzcuanBn_1431154515785',
    //         'url': 'http://www.doubam.com'
    //     }, {
    //         'title': '杩欐槸2',
    //         'image': 'http://perber.qiniudn.com/cDIyMjYwMTIyMzcuanBn_1431154515785',
    //         'url': 'http://www.doubam.com'
    //     }, {
    //         'title': '杩欐槸2',
    //         'image': 'http://perber.qiniudn.com/cDIyMjYwMTIyMzcuanBn_1431154515785',
    //         'url': 'http://www.doubam.com'
    //     }, {
    //         'title': '杩欐槸2',
    //         'image': 'http://perber.qiniudn.com/cDIyMjYwMTIyMzcuanBn_1431154515785',
    //         'url': 'http://www.doubam.com'
    //     }, {
    //         'title': '杩欐槸2',
    //         'image': 'http://perber.qiniudn.com/cDIyMjYwMTIyMzcuanBn_1431154515785',
    //         'url': 'http://www.doubam.com'
    //     }, {
    //         'title': '杩欐槸2',
    //         'image': 'http://perber.qiniudn.com/cDIyMjYwMTIyMzcuanBn_1431154515785',
    //         'url': 'http://www.doubam.com'
    //     }, {
    //         'title': '杩欐槸2',
    //         'image': 'http://perber.qiniudn.com/cDIyMjYwMTIyMzcuanBn_1431154515785',
    //         'url': 'http://www.doubam.com'
    //     }, {
    //         'title': '杩欐槸2',
    //         'image': 'http://perber.qiniudn.com/cDIyMjYwMTIyMzcuanBn_1431154515785',
    //         'url': 'http://www.doubam.com'
    //     }
    // ];

    // var render = {
    //     templates: {
    //         worksTpl: _.template($('script#worksTpl').html())
    //     },

    //     renderWorks: function () {

    //         $('#works-wrap').html(render.templates.worksTpl({
    //             works: worksArray
    //         }));

    //         // setTimeout(function () {
    //             // 缈婚〉鎻掍欢鍚姩
    //             swiperSetup();
    //         // }, 500);
            


    //         $('#cont').velocity({
    //             translateY: - ($('#cont').height()) + 70
    //         }, {
    //             // duration: 650,
    //             complete: function () {
                    
    //                 $('#works-wrap').css('z-index', 0).velocity('transition.slideUpIn', {
    //                     complete: function () {
                            
    //                     }
    //                 });
    //             }
    //         });
    //     }
    // };

    // $('#nav a').click(function () {
    //     var $t = $(this);
    //     var target = $t.attr('data-link');

    //     switch (target) {
    //         case 'works':
    //             render.renderWorks();
    //             break;
    //     }
    // });

});