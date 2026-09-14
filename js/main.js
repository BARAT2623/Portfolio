 AOS.init({
 	duration: 800,
 	easing: 'slide'
 });

(function($) {

	"use strict";

	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
			counter();
		}, 4500);
	};
	loader();

	// Scrollax
   $.Scrollax();



   // Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){

			event.preventDefault();

			if ( $('#ftco-nav').is(':visible') ) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');	
			}

			
			
		});

	};
	burgerMenu();


	var onePageClick = function() {


		$(document).on('click', '#ftco-nav a[href^="#"]', function (event) {
	    event.preventDefault();

	    var href = $.attr(this, 'href');

	    $('html, body').animate({
	        scrollTop: $($.attr(this, 'href')).offset().top - 70
	    }, 500, function() {
	    	// window.location.hash = href;
	    });
		});

	};

	onePageClick();
	

	var carousel = function() {
		$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:0,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:false,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
	    responsive:{
	      0:{
	        items:1
	      },
	      600:{
	        items:1
	      },
	      1000:{
	        items:1
	      }
	    }
		});
	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	

	var counter = function() {
		
		$('#section-counter, .hero-wrap, .ftco-counter, .ftco-about').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						experience = $this.data('experience');
					if (experience && !$this.data('expDone')) {
						$this.data('expDone', true);
						animateExperience($this, new Date(experience), 2000);
					} else {
						num = $this.data('number');
						$this.animateNumber(
						  {
						    number: num,
						    numberStep: comma_separator_number_step
						  }, 7000
						);
					}
				});
				
			}

		} , { offset: '95%' } );

	}

	function animateExperience($el, startDate, duration) {
		var now = new Date(),
			totalMonths = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth()),
			startTime = null;

		function format(months) {
			var years = Math.floor(months / 12),
				rest = months % 12;
			if (years === 0) return rest + ' mo';
			if (rest === 0) return years + ' yr';
			return years + ' yr ' + rest + ' mo';
		}

		function step(ts) {
			if (!startTime) startTime = ts;
			var progress = Math.min((ts - startTime) / duration, 1),
				current = Math.max(1, Math.round(progress * totalMonths));
			$el.text(format(current));
			if (progress < 1) requestAnimationFrame(step);
		}

		requestAnimationFrame(step);
	}


	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

	// Skills marquee
	var skillsMarquee = function () {
		var $marquees = $('.skills-marquee');
		if (!$marquees.length) return;

		$marquees.each(function () {
			var $marquee = $(this),
				$track = $marquee.find('.skills-track').first(),
				half = 0,
				offset = 0,
				playing = true,
				dragging = false,
				lastX = 0,
				speed = $track.hasClass('skills-track--slow') ? 0.5 : 1.0,
				raf = null;

			if ($track.children().length && !$track.data('skillsDuplicated')) {
				$track.append($track.children().clone());
				$track.data('skillsDuplicated', true);
			}

			var measure = function () {
				half = $track[0].scrollWidth / 2;
			};
			measure();
			$(window).on('resize', measure);

			var tick = function () {
				if (playing && !dragging) offset += speed;
				if (half > 0) {
					offset = offset % half;
					if (offset < 0) offset += half;
					$track.css('transform', 'translate3d(' + (-offset) + 'px, 0, 0)');
				}
				raf = requestAnimationFrame(tick);
			};
			raf = requestAnimationFrame(tick);

			$marquee.on('mouseenter', function () {
				playing = false;
			});

			$marquee.on('mouseleave', function () {
				playing = true;
				dragging = false;
				$marquee.removeClass('skills-dragging');
			});

			$marquee.on('mousedown', function (e) {
				dragging = true;
				lastX = e.pageX;
				$marquee.addClass('skills-dragging');
				e.preventDefault();
			});

			$(window).on('mousemove', function (e) {
				if (!dragging) return;
				offset -= (e.pageX - lastX);
				lastX = e.pageX;
			});

			$(window).on('mouseup', function () {
				dragging = false;
				$marquee.removeClass('skills-dragging');
			});

			$marquee.on('wheel', function (e) {
				e.preventDefault();
				offset += e.originalEvent.deltaY;
			});
		});
	};
	skillsMarquee();

// Experience tabs
	var closeExperience = function () {
		$('.experience-detail').removeClass('open');
		$('.experience-tab').removeClass('active');
		$('#experience-overlay').removeClass('show');
		$('body').removeClass('experience-modal-lock');
	};

	$('.experience-tab').on('click', function () {
		var target = $(this).data('target'),
			$panel = $('#' + target);
		$('.experience-tab').removeClass('active');
		$(this).addClass('active');
		$('.experience-detail').removeClass('open');
		$panel.addClass('open');
		$('#experience-overlay').addClass('show');
		$('body').addClass('experience-modal-lock');
	});

	$('.experience-close').on('click', closeExperience);
	$('#experience-overlay').on('click', closeExperience);
	$(document).on('keyup', function (e) {
		if (e.key === 'Escape' || e.keyCode === 27) closeExperience();
	});

	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });

  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var status = document.getElementById('formStatus');
      var btn = contactForm.querySelector('input[type="submit"]');
      var data = new FormData(contactForm);

      status.style.color = '#fff';
      status.textContent = 'Sending...';
      status.style.display = 'block';
      btn.disabled = true;

      fetch(contactForm.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function(res) {
        if (res.ok) {
          status.textContent = "Thanks! Your message has been sent. I'll get back to you soon.";
          status.style.color = '#ffbd39';
          contactForm.reset();
        } else {
          return res.json().then(function(err) { throw new Error(err.errors ? err.errors.map(function(e){return e.message;}).join(', ') : 'Something went wrong.'); });
        }
      }).catch(function(err) {
        status.textContent = err.message || 'Sorry, something went wrong. Please try again.';
        status.style.color = '#ff6b6b';
      }).then(function() {
        btn.disabled = false;
      });
    });
  }

})(jQuery);

