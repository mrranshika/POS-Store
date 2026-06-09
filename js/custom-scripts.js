jQuery(function($) {
    'use strict';

    // ===== Preloader =====
    $(window).on('load', function() {
        setTimeout(function() {
            $('#preloader').addClass('loaded');
        }, 800);
    });

    // ===== Back to Top Button =====
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#back-to-top').addClass('visible');
        } else {
            $('#back-to-top').removeClass('visible');
        }
    });

    $('#back-to-top').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 600);
    });

    // ===== Navbar Scroll Effect =====
    $(window).scroll(function() {
        Scroll();
        // Navbar background on scroll
        if ($(window).scrollTop() > 50) {
            $('#main-nav').addClass('scrolled');
        } else {
            $('#main-nav').removeClass('scrolled');
        }
    });

    // ===== Smooth Scroll Navigation =====
    $('.navbar-collapse ul li a').on('click', function() {
        $('html, body').animate({
            scrollTop: $(this.hash).offset().top - 70
        }, 800, 'easeInOutQuart');
        if ($(window).width() < 768) {
            $('.navbar-collapse').collapse('hide');
        }
        return false;
    });

    function Scroll() {
        var contentTop = [];
        var contentBottom = [];
        var winTop = $(window).scrollTop();
        var rangeTop = 200;
        var rangeBottom = 500;
        $('.navbar-collapse').find('.scroll a').each(function() {
            var target = $($(this).attr('href'));
            if (target.length) {
                contentTop.push(target.offset().top);
                contentBottom.push(target.offset().top + target.height());
            }
        });
        $.each(contentTop, function(i) {
            if (winTop > contentTop[i] - rangeTop) {
                $('.navbar-collapse li.scroll')
                    .removeClass('active')
                    .eq(i).addClass('active');
            }
        });
    }

    // ===== Slider with Progress Bar =====
    $(document).ready(function() {
        var time = 7;
        var $progressBar,
            $bar,
            $elem,
            isPause,
            tick,
            percentTime;

        $("#main-slider").find('.owl-carousel').owlCarousel({
            slideSpeed: 500,
            paginationSpeed: 500,
            singleItem: true,
            navigation: true,
            navigationText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            afterInit: progressBar,
            afterMove: moved,
            startDragging: pauseOnDragging,
            transitionStyle: "fade"
        });

        function progressBar(elem) {
            $elem = elem;
            buildProgressBar();
            start();
        }

        function buildProgressBar() {
            $progressBar = $("<div>", { id: "progressBar" });
            $bar = $("<div>", { id: "bar" });
            $progressBar.append($bar).appendTo($elem);
        }

        function start() {
            percentTime = 0;
            isPause = false;
            tick = setInterval(interval, 10);
        }

        function interval() {
            if (isPause === false) {
                percentTime += 1 / time;
                $bar.css({ width: percentTime + "%" });
                if (percentTime >= 100) {
                    $elem.trigger('owl.next');
                }
            }
        }

        function pauseOnDragging() {
            isPause = true;
        }

        function moved() {
            clearTimeout(tick);
            start();
        }
    });

    // ===== WOW.js Animations =====
    new WOW({
        offset: 80,
        mobile: true
    }).init();

    // ===== Smooth Scroll =====
    if (typeof smoothScroll !== 'undefined') {
        smoothScroll.init();
    }

    // ===== Stats Counter Animation =====
    var statsAnimated = false;
    $(window).scroll(function() {
        if (!statsAnimated) {
            var statsSection = $('#stats');
            if (statsSection.length) {
                var statsTop = statsSection.offset().top - $(window).height() + 200;
                if ($(window).scrollTop() > statsTop) {
                    statsAnimated = true;
                    $('.stat-number').each(function() {
                        var $this = $(this);
                        var target = parseInt($this.attr('data-count'));
                        $({ count: 0 }).animate({ count: target }, {
                            duration: 2000,
                            easing: 'swing',
                            step: function() {
                                $this.text(Math.floor(this.count).toLocaleString());
                            },
                            complete: function() {
                                $this.text(target.toLocaleString());
                            }
                        });
                    });
                }
            }
        }
    });

    // ===== Portfolio / Gallery Isotope Filter =====
    $(window).on('load', function() {
        'use strict';
        var $portfolio_selectors = $('.portfolio-filter >li>a');
        var $portfolio = $('.portfolio-items');
        if ($portfolio.length) {
            $portfolio.isotope({
                itemSelector: '.portfolio-item',
                layoutMode: 'fitRows'
            });
            $portfolio_selectors.on('click', function() {
                $portfolio_selectors.removeClass('active');
                $(this).addClass('active');
                var selector = $(this).attr('data-filter');
                $portfolio.isotope({ filter: selector });
                return false;
            });
        }
    });

    // ===== Gallery Isotope Filter & Popup =====
    $(document).ready(function() {
        var $container = $('#isotope-gallery-container');
        var $filter = $('.filter');

        $(window).on('load', function() {
            if ($container.length) {
                $container.isotope({
                    itemSelector: '.gallery-item-wrapper'
                });
                $('.filter a').click(function() {
                    var selector = $(this).attr('data-filter');
                    $container.isotope({ filter: selector });
                    return false;
                });
                $filter.find('a').click(function() {
                    var selector = $(this).attr('data-filter');
                    $filter.find('a').parent().removeClass('active');
                    $(this).parent().addClass('active');
                });
            }
        });

        $(window).smartresize(function() {
            if ($container.length) {
                $container.isotope('reLayout');
            }
        });

        // Gallery Popup
        $('.gallery-zoom').magnificPopup({
            type: 'image',
            mainClass: 'mfp-with-zoom',
            zoom: {
                enabled: true,
                duration: 300,
                easing: 'ease-in-out',
                opener: function(openerElement) {
                    return openerElement.is('i') ? openerElement : openerElement.find('i');
                }
            }
        });
    });

    // ===== Animated Progress Bars =====
    $(document).ready(function() {
        $('.progress-bar').bind('inview', function(event, visible) {
            if (visible) {
                $(this).css('width', $(this).data('width') + '%');
                $(this).unbind('inview');
            }
        });
    });

    // ===== Google Map =====
    var latitude = $('#google-map').data('latitude');
    var longitude = $('#google-map').data('longitude');

    function initialize_map() {
        var myLatlng = new google.maps.LatLng(latitude, longitude);
        var mapOptions = {
            zoom: 12,
            scrollwheel: false,
            center: myLatlng,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [{"color": "#121D29"}]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [{"color": "#ffffff"}]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [{"color": "#45aed6"}, {"lightness": 50}]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": [{"color": "#ffb74d"}, {"lightness": 70}]
                }
            ]
        };
        var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
            }
        });
    }

    if (typeof google !== 'undefined' && google.maps) {
        google.maps.event.addDomListener(window, 'load', initialize_map);
    }

    // ===== Newsletter Form (prevent default) =====
    $('.newsletter-form').on('submit', function(e) {
        e.preventDefault();
        var $input = $(this).find('input');
        $input.val('');
        $input.attr('placeholder', 'Thank you!');
        setTimeout(function() {
            $input.attr('placeholder', 'Enter your email');
        }, 2000);
    });

});