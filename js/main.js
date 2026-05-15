$(document).ready(function() {
	/* ==========================================================================
   		Pre Loading 
   	   ========================================================================== */
	
	(function(image){
		image.onload = image.onerror = function(){
	    	$('body').addClass('ak-loaded');
	 	};
	  	image.src    = "img/MagicSpoon-HomepageImage.webp";
	})(new Image());


	/* ==========================================================================
   		Map
   	   ========================================================================== */

	let mapEl = document.getElementById("map");
	if (mapEl && typeof L !== 'undefined' && L.map) {
		let mapOptions = {
			center:[51.25384, -85.32324],
			zoom:5,
		};
		let map = L.map(mapEl, mapOptions);
		let layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a target="_blank" rel="noopener" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' });
		map.addLayer(layer);

		let marker = new L.Marker([51.25384, -85.32324], {
			title:"Magic Spoon"
		});
		marker.addTo(map);
	}


	/* ==========================================================================
   		Testomonial & Client Slider
   	   ========================================================================== */
    
    if($('.client-slider').length){
    	let clientSlider = tns({
		  container: '.client-slider',
		  items:1,
		  gutter: 30,
		  nav: false,
		  speed: 500,
		  slideBy: 'page',
		  loop: false,
		  controls: false,
		  mouseDrag: true,
		  responsive: {
		      640: {
		        items: 2
		      },
		      760: {
		        items: 3
		      },
		      1024: {
		        items: 4
		      },
		      1280: {
		        items: 5
		      },
		    }
		});
    }
    if($('.testomonial-slider').length){
		let testimonialSlider = tns({
		  container: '.testomonial-slider',
		  items: 1,
		  gutter: 1,
		  nav: false,
		  navPosition:'bottom',
		  speed: 500,
		  loop: true,
		  controls: true,
		  controlsContainer: '.testomonial-slider-controls',
		});
	}

	if($('.about-slider').length){
		let aboutSlider = tns({
		  container: '.about-slider',
		  items: 1,
		  gutter: 1,
		  nav: false,
		  speed: 500,
		  loop: true,
		  controls: true,
		  controlsContainer: '.about-slider-controls',
		  onInit: function(info) {
		    info.container.closest('.tns-outer').classList.add('about-slider-outer');
		  }
		});
		aboutSlider.events.on("transitionStart", data => {
		  var {displayIndex} = data;
		  $('.current-slide').text( numberToWords(displayIndex) );
		});
	}	

	/* ==========================================================================
   		Tabs
   	   ========================================================================== */


	$('.tabs-nav li a:not(:first)').addClass('inactive');
	$('.tabs-container').hide();
	$('.tabs-container:first').show();

	$('.tabs-nav li a').on( "click", function(e) {
		e.preventDefault();
	  	let t = $(this).attr('id');
	  	if (skillTimeout !== null) { 
		    clearTimeout(skillTimeout); 
		    skillTimeout = null;
		}
	  	if($('#'+ t + '-content .skill-bar').length){
	  		animateLine();
	  	}
	  	else{
	  		$('.skill-bar ').removeClass('enabled');
	  	}
		if($(this).hasClass('inactive')){
		    $('.tabs-nav li a').addClass('inactive');           
		    $(this).removeClass('inactive');
            $('.tabs-container').hide();
            $('#'+ t + '-content').fadeIn(400);
	 	}

	});

	/* ==========================================================================
   		Line Animations
   	   ========================================================================== */
   	let skillTimeout = null;
	function animateLine(){
		$('hr').each(function(){
			let line = $(this);
			if(line.visible(true)){
				line.addClass('enabled');
			}
		});
		$('.skill-bar').each(function(i){
			let line = $(this);
			if(line.visible(true)){
				skillTimeout = setTimeout(function() {
					line.addClass('enabled');
				}, 250*i);
			}
		});
	}
	$('.content').scroll(function(){
		animateLine();
	})
	
/* ==========================================================================
   	Heading Animations
   ========================================================================== */

	const letters = 'abcdefghijklmnopqrstuvwxyz';
	let interval = null;
	let captionInterval = null;
	let hoverTimeout = null;

	function animateHeading(t){
		let iteration = 0,
			heading = t;
		interval = setInterval(() => {
			heading.text( 
			heading.text().split("")
		      .map((letter, index) => {
		        if(index < iteration) {
		          return heading.data("value")[index];
		        }
		        return letters[Math.floor(Math.random() * 26)]
		      }).join("")
		      );
			if(iteration >= heading.data("value").length){ 
		      clearInterval(interval);
		    }
		    iteration += 1 / 2;
		}, 20);

	}

	function animatecaption(){
		$( '.portfolio-container li figcaption div' ).each(function(){
			let txt = $(this);
			let	container = $(this).parent();
			container.mouseenter(function() {
				if (hoverTimeout !== null) { 
			        clearTimeout(hoverTimeout); 
			        hoverTimeout = null;
			    }
				clearInterval(captionInterval);
				hoverTimeout = setTimeout(function(){ 
					let iter = 0;
					captionInterval = setInterval(() => {
						txt.text( 
						txt.text().split("")
					    .map((letter, index) => {
					        if(index < iter) {
						        return txt.data("value")[index];
						    }
						    return letters[Math.floor(Math.random() * 26)]
						    }).join("")
						);
						if(iter >= txt.data("value").length){ 
						    clearInterval(captionInterval);
						}
						iter += 1 / 2;
					}, 20);
					
				}, 250);
			});
			container.mouseleave(function() {
				if (hoverTimeout !== null) { 
			        clearTimeout(hoverTimeout); 
			        hoverTimeout = null;
			    }
				clearInterval(captionInterval);
			});
		});
	}

	/* ==========================================================================
   		Main Menu / Page Transitions
   	   ========================================================================== */

    $('.page header:not(.page:first-child header)').on( 'click', function() {
    	if(!$(this).parent().hasClass('active')){
    		let oldContent = $(this).parent().siblings('.active'),
	    		newContent = $(this).parent();
			    clearTimeout(skillTimeout); 
	    	$('.active .content').fadeOut( 200, function() {
	    		oldContent.removeClass('active loaded');
	    		newContent.addClass('active');
	    		$('.active hr, .active .skill-bar ').removeClass('enabled');
	    		setTimeout(function(){ 
	    			$('.active .content').fadeIn(400, function(){
	    				newContent.addClass('loaded');
	    			})
	    			animateLine();
	    			animateHeading(newContent.find('.page-header h1'));
	    			window.dispatchEvent(new Event('resize'));
	    			if(newContent.find('.portfolio-container').length){
	    				animatecaption();
	    			}
	    		}, 400);
	  		});
	    }
    });

   	$('.logo').on( 'click', function(e) {
    	e.preventDefault();
    	if(!$(this).parent().parent().hasClass('active')){
    		var oldContent = $(this).parent().parent().siblings('.active'),
	    		newContent = $(this).parent().parent();
	    	$('.active hr, .active .skill-bar ').removeClass('enabled');
	    	$('.active .content').fadeOut( 200, function() {
	    		oldContent.removeClass('active loaded');
	    		newContent.addClass('active');
	    		setTimeout(function(){ 
	    			$('.active .content').fadeIn(400, function(){
	    				newContent.addClass('loaded');
	    			});
	    		}, 400);
	  		});
	    }
    });

    /* ==========================================================================
   		Homepage Text Ticker
   	   ========================================================================== */
    if ($('.write').length && $.fn.typed) {
	    $('.write').typed({
	        strings: ["High Protein.", "0-2g Sugar."],
	        typeSpeed: 100,
	        backSpeed: 50,
	        loop:true,
	        startDelay:0,
	    });
    }

    /* ==========================================================================
   		Portfolio Filter & Popup
   	   ========================================================================== */
    var shuffleInstance = null;
    if($('.portfolio-container').length && window.Shuffle){
	 	var Shuffle = window.Shuffle;
		var element = document.querySelector('.portfolio-container');
		shuffleInstance = new Shuffle(element, {
		  itemSelector: 'li',
		  speed: 0
		});
	} 
	$('.portfolio-filter li').on('click',function(e){
		if (!shuffleInstance) { return; }
		e.preventDefault();
		$('.portfolio-filter li').removeClass('selected');
		$(this).addClass('selected'); 
		var keyword = $(this).attr('data-target');
		shuffleInstance.filter(keyword);
	});
	$('.popup-iframe a').magnificPopup({
        type: 'iframe',
        closeOnContentClick: true,
         callbacks: {
	        close: function() {
			   mouse.removeClass('zoom-out');
			}
		}
	}); 
    // Product Modal Functionality
    $('.product-item').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        var $item = $(this);
        var productName = $item.find('.product-name').text();
        var productImage = $item.find('.image-primary').attr('src');
        var isBestSeller = $item.find('.best-seller-pill').length > 0;
        
        // Populate modal
        $('#modal-product-image').attr('src', productImage);
        $('#modal-product-image').attr('alt', productName);
        $('#modal-product-name').text(productName);
        
        // Show/hide best seller badge
        if(isBestSeller) {
            $('#modal-best-seller').show();
        } else {
            $('#modal-best-seller').hide();
        }
        
        // Open modal
        $('#product-modal').addClass('active');
        $('body').addClass('modal-open');
    });
    
    // Prevent link clicks inside product items from opening magnific popup
    $('.product-item figcaption a').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
    });
    
    // Close modal
    $('.product-modal-close, .product-modal-overlay').on('click', function(){
        $('#product-modal').removeClass('active');
        $('body').removeClass('modal-open');
    });
    
    // Close modal on ESC key
    $(document).on('keydown', function(e){
        if(e.key === 'Escape' && $('#product-modal').hasClass('active')){
            $('#product-modal').removeClass('active');
            $('body').removeClass('modal-open');
        }
    });
    
    // Keep old magnific popup for other popup-image elements if needed
    $('.popup-image a').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        callbacks: {
	        close: function() {
			   mouse.removeClass('zoom-out');
			}
		}
	});
    $('.portfolio-container li a').click(function(){
    	mouse.addClass('zoom-out');
    });

	/* ==========================================================================
   		Tab Menu for Products
   	   ========================================================================== */
	
	$('.tab-button').on('click', function(e){
		e.preventDefault();
		var targetTab = $(this).attr('data-tab');
		
		// Update active tab
		$('.tab-button').removeClass('active');
		$(this).addClass('active');
		
		// Filter products
		$('.product-item').each(function(){
			var categories = $(this).attr('data-category').split(' ');
			if(targetTab === 'all' || categories.indexOf(targetTab) !== -1){
				$(this).removeClass('hidden').fadeIn(300);
			} else {
				$(this).addClass('hidden').fadeOut(300);
			}
		});
	});

	/* ==========================================================================
   		Contact Form
   	   ========================================================================== */ 

 	$('#send').on( "click", function(e) {
		e.preventDefault();
		if (!validateContact()) { return; }
		var subject = encodeURIComponent($("#subject").val());
		var body = encodeURIComponent(
			"From: " + $("#userName").val() + " <" + $("#userEmail").val() + ">\n\n" + $("#content").val()
		);
		$("#mail-status").html("<p>GitHub Pages cannot run PHP. Opening your email app with this message. You can also add a form backend (Formspree, etc.) later.</p>");
		window.location.href = "mailto:?subject=" + subject + "&body=" + body;
	});
	function validateContact() {
		let valid = true;	
		$(".demoInputBox").css('background-color','');
		$(".info").html('');
		
		if(!$("#userName").val()) {
			$("#userName-info").html("(Required)");
			valid = false;
		}
		if(!$("#userEmail").val()) {
			$("#userEmail-info").html("(Required)");
			valid = false;
		}
		if(!$("#userEmail").val().match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
			$("#userEmail-info").html("(Invalid)");
			valid = false;
		}
		if(!$("#subject").val()) {
			$("#subject-info").html("(Required)");
			valid = false;
		}
		if(!$("#content").val()) {
			$("#content-info").html("(Required)");
			valid = false;
		}
		return valid;
	}
	
	/* ==========================================================================
   		Mobile Nav & Blog Sidebar
   	   ========================================================================== */

	$(document).on('click', '.toggle-sidebar', function() { 
	    $('body').toggleClass('sidebar-open');
	});
	$(document).on('click', '.toggle-nav', function() { 
	    $('body').toggleClass('nav-open');
	});
	$(document).on('click', '.mobile-nav a, .logo a', function(e) {
		e.preventDefault();
		$('body').removeClass('nav-open');

		let link = $(this).attr('href'),
			currentTop = $(window).scrollTop(),
            rate = 0.2, 
            target = $(link).offset();
            distance = Math.abs(currentTop - target.top);
        setTimeout(function(){ 
	    	$([document.documentElement, document.body]).animate({
		        scrollTop: $(link).offset().top
		    }, distance * rate);
	    }, 100);


	});

	$(window).on('scroll', function(){
		if ($(window).width() < 960){
			$('.page').each(function(){
				let page = $(this);
				if(page.visible(true)){
					page.addClass('active')
					page.siblings().removeClass('active');
					page.find('.content').css('display', 'block');
					page.siblings().find('.content').removeAttr('style');
				}
			});
		}
	});
	/* ==========================================================================
   		Load Blog Pages
   	   ========================================================================== */
	$(document).on('click','.blog-recent-post-item a:not("a.dummy"), #nav-above a:not("a.dummy, a.blog-home")', function(e) { 
		e.preventDefault();
		let href = $(this).attr('href'),
			current,
			contentNow;
		$('.active .content').children().fadeOut(400).promise().done(function() {
		    $('.active .content').html('<i class="loader lni lni-spinner-solid"></i>');
		    $.ajax({
			   url:href,
			   type:'POST',
			   success: function(data){
			   		$("#circle").removeClass('hover');
				   	$('.loader').fadeOut(400).promise().done(function() {
				   		$('body').addClass('single-post');
				   		$('.active .content').hide().html($(data).find('.content').html()).fadeIn(400).promise().done(function(){
				   			$('.page-header hr').addClass('full');
				   		});;
				   	});
				   	
			   }
			});
		});
		if(!$('body').hasClass('single-post')){
			current = $('.active .content');
			contentNow = $('.active .content').html();
		}
		$('.page header').click(function(){
			if($('body').hasClass('single-post')){
				setTimeout(function(){ 
					current.html(contentNow);
					$('body').removeClass('single-post');
				}, 500);
			}
			
		});
	});
	$(document).on('click','.blog-home', function(e) { 
		e.preventDefault();
		$('.active .content').children().fadeOut(400).promise().done(function() {
		    $('.active .content').html('<i class="loader lni lni-spinner-solid"></i>');
			$('.page.active header').trigger('click');
		});
	});

	/* ==========================================================================
   		Mouse Trailer
   	   ========================================================================== */

	let mouse = $(".mouse"),
		mouseX = 0, 
		mouseY = 0,
		pageX = 0,
		pageY = 0,
		backgroundX = 0,
       	backgroundY = 0,
       	movementStrength = 370,
       	height = movementStrength / $(window).height(),
       	width = movementStrength / $(window).width();

    function mousePosition(){
		$(document).on('mousemove', function(e) {	
			   pageX = e.pageX - ($(window).width() / 6);
		       pageY = e.pageY - ($(window).height() / 6);
		       backgroundX = width * pageX * -0.8 - 30;
		       backgroundY = height * pageY * -0.8 - 30;
		       	if ($('#home-background:hover').length != 0) {
				   	mouseX = e.pageX;
			   		mouseY = e.pageY;
			   		mouse.removeClass('regular');
				}
				else{
					mouse.addClass('regular');
					mouseX = e.pageX;
					mouseY = e.pageY;
				}
				if ($('a:hover, .testomonial-slider-controls:hover, .about-slider-controls:hover, .portfolio-filter:hover,'
					+ ' .tabs-nav:hover, .page:not(.active) header:hover, .toggle-sidebar:hover, input[type=submit]:hover, button:hover').length != 0) {
					mouse.addClass('hover');
				}
				else{
					mouse.removeClass('hover');
				}
				if($('.portfolio-container li a:hover').length != 0){
					mouse.addClass('zoom');	
				}
				else{
					mouse.removeClass('zoom');
				}
		});
		let xp = 0, yp = 0, bxp = 0, byp = 0, mw = 0, mh = 0;
		let loop = setInterval(function(){
			    if ($(window).width() > 960){
				    xp += Math.round( (mouseX - xp) / 6 );
				    yp += Math.round( (mouseY - yp) / 6 );
				    bxp += Math.round( (backgroundX - bxp) / 12 );
				    byp += Math.round( (backgroundY - byp) / 12 );

				    $('h1').each(function(){
				    	var offset = $(this).offset();
				    	if ($('#home-background:hover').length != 0 ) {
					    	$(this).css({
					    		'--x' : (xp - offset.left) + 'px',
					    		'--y': (yp - offset.top) +'px',
					    		'--size': '125px',
					    	})
				    	}
				    	else{
				    		$(this).removeAttr('style');
			  			}
				    })
				    mouse.css({
				    	left: xp, 
				    	top: yp,
				    	backgroundPosition : bxp + "px " + Math.min(byp, 0) + "px",
				    });
				}
		}, 20);
	}
	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
	if(!isMobile) {
		mousePosition();
	}

	/* ==========================================================================
   		Person Video Loop with 5 Second Pause
   	   ========================================================================== */
	
	var person1Video = document.getElementById('person1-video');
	if(person1Video) {
		person1Video.addEventListener('ended', function() {
			// Wait 5 seconds before restarting
			setTimeout(function() {
				person1Video.currentTime = 0;
				person1Video.play();
			}, 5000);
		});
	}
	
	var person2Video = document.getElementById('person2-video');
	if(person2Video) {
		person2Video.addEventListener('ended', function() {
			// Wait 5 seconds before restarting
			setTimeout(function() {
				person2Video.currentTime = 0;
				person2Video.play();
			}, 5000);
		});
	}

	/* ==========================================================================
   		Video Hover Effect for Birthday Cake Cereal
   	   ========================================================================== */
	
	$('.product-item[data-video-hover="birthday-cake"]').each(function() {
		var $item = $(this);
		var $container = $item.find('.video-hover-item');
		var $video = $item.find('.hover-video')[0];
		if (!$video) { return; }
		var isHovering = false;
		var isReversing = false;
		var reverseAnimationFrame = null;
		var videoDuration = 0;
		var lastFrameTime = 0;
		
		// Get video duration when metadata is loaded
		$video.addEventListener('loadedmetadata', function() {
			videoDuration = $video.duration;
		});
		
		// Handle mouse enter
		$item.on('mouseenter', function() {
			isHovering = true;
			isReversing = false;
			
			// Cancel any reverse animation
			if(reverseAnimationFrame) {
				cancelAnimationFrame(reverseAnimationFrame);
				reverseAnimationFrame = null;
			}
			
			// Start video from beginning
			$video.currentTime = 0;
			$video.play();
			
			$container.addClass('video-playing');
			$container.removeClass('video-complete');
			lastFrameTime = performance.now();
		});
		
		// Handle mouse leave
		$item.on('mouseleave', function() {
			isHovering = false;
			
			// If video hasn't finished, reverse it
			if($video.currentTime > 0 && $video.currentTime < videoDuration) {
				isReversing = true;
				$video.pause();
				lastFrameTime = performance.now();
				reverseVideo();
			} else {
				// Video finished or at start, reset
				$video.pause();
				$video.currentTime = 0;
				$container.removeClass('video-playing video-complete');
			}
		});
		
		// Handle video end
		$video.addEventListener('ended', function() {
			if(isHovering) {
				// Still hovering, show final image
				$container.removeClass('video-playing');
				$container.addClass('video-complete');
			} else {
				// Not hovering, reset
				$container.removeClass('video-playing video-complete');
			}
		});
		
		// Reverse video function using requestAnimationFrame for smooth playback
		function reverseVideo() {
			if(!isReversing) {
				if(reverseAnimationFrame) {
					cancelAnimationFrame(reverseAnimationFrame);
					reverseAnimationFrame = null;
				}
				return;
			}
			
			var now = performance.now();
			var deltaTime = (now - lastFrameTime) / 1000; // Convert to seconds
			lastFrameTime = now;
			
			var currentTime = $video.currentTime;
			var reverseSpeed = 1.5; // Playback speed for reverse (1.5x normal speed)
			var newTime = Math.max(0, currentTime - (deltaTime * reverseSpeed));
			
			$video.currentTime = newTime;
			
			if(newTime <= 0) {
				// Reached start, reset to Image 1
				$video.pause();
				$video.currentTime = 0;
				isReversing = false;
				$container.removeClass('video-playing video-complete');
				if(reverseAnimationFrame) {
					cancelAnimationFrame(reverseAnimationFrame);
					reverseAnimationFrame = null;
				}
			} else {
				reverseAnimationFrame = requestAnimationFrame(reverseVideo);
			}
		}
	});
});

