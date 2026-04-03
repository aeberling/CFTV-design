(function ($) {
  'use strict';

  // 1. Preloader
  $(window).on('load', function () {
    $('.preloader').delay(350).fadeOut('slow');
    $('body').delay(350).css({ overflow: 'visible' });
  });

  // 2. Mobile Menu Toggle
  var $hamburgerBtn = $('.hamburger-menu > button');
  $hamburgerBtn.on('click', function (e) {
    e.preventDefault();
    $('.slide-bar').toggleClass('show');
    $('body').addClass('on-side');
    $('.body-overlay').addClass('active');
    $hamburgerBtn.attr('aria-expanded', 'true');
    // Move focus into the mobile menu
    $('.close-mobile-menu > button').focus();
  });

  $('.close-mobile-menu > button').on('click', function (e) {
    e.preventDefault();
    closeMobileMenu();
  });

  // Helper: close mobile menu
  function closeMobileMenu() {
    $('.slide-bar').removeClass('show');
    $('body').removeClass('on-side');
    $('.body-overlay').removeClass('active');
    $hamburgerBtn.attr('aria-expanded', 'false');
    $hamburgerBtn.focus();
  }

  // Helper: close login panel
  function closeLoginPanel() {
    $('.login-panel').removeClass('show');
    $('body').removeClass('on-side');
    $('.body-overlay').removeClass('active');
    $('.login-trigger').focus();
  }

  // Close all panels when overlay is clicked
  $('.body-overlay').on('click', function (e) {
    e.preventDefault();
    if ($('.slide-bar').hasClass('show')) {
      closeMobileMenu();
    }
    if ($('.login-panel').hasClass('show')) {
      closeLoginPanel();
    }
  });

  // Mobile submenu toggle — button toggles submenu, link navigates
  $('.side-mobile-menu .submenu-toggle').on('click', function (e) {
    e.preventDefault();
    var $parent = $(this).parent();
    var $submenu = $parent.children('.submenu');
    $submenu.slideToggle(200);
    var isExpanded = $submenu.is(':visible');
    $(this).attr('aria-expanded', isExpanded);
    // Rotate chevron
    $(this).toggleClass('is-open', isExpanded);
  });

  // Mobile login toggle — opens login links inline instead of panel
  $('.mobile-login-toggle').on('click', function (e) {
    e.preventDefault();
    var $parent = $(this).parent();
    var $submenu = $parent.children('.submenu');
    var $toggle = $parent.children('.submenu-toggle');
    $submenu.slideToggle(200);
    var isExpanded = $submenu.is(':visible');
    $toggle.attr('aria-expanded', isExpanded);
    $toggle.toggleClass('is-open', isExpanded);
  });

  // 2b. Login Panel Toggle
  $('.login-trigger').on('click', function (e) {
    e.preventDefault();
    $('.login-panel').addClass('show');
    $('body').addClass('on-side');
    $('.body-overlay').addClass('active');
    // Move focus into the login panel
    $('.login-panel__close button').focus();
  });

  $('.login-panel__close > button').on('click', function (e) {
    e.preventDefault();
    closeLoginPanel();
  });

  // 2c. ESC key handler for panels
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      if ($('.login-panel').hasClass('show')) {
        closeLoginPanel();
      }
      if ($('.slide-bar').hasClass('show')) {
        closeMobileMenu();
      }
    }
  });

  // 2d. Focus trap for login panel
  $('.login-panel').on('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var $focusable = $(this).find('a[href], button, input, [tabindex]:not([tabindex="-1"])').filter(':visible');
    var $first = $focusable.first();
    var $last = $focusable.last();

    if (e.shiftKey) {
      if (document.activeElement === $first[0]) {
        e.preventDefault();
        $last.focus();
      }
    } else {
      if (document.activeElement === $last[0]) {
        e.preventDefault();
        $first.focus();
      }
    }
  });

  // 2e. Focus trap for mobile menu
  $('.slide-bar').on('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var $focusable = $(this).find('a[href], button, input, [tabindex]:not([tabindex="-1"])').filter(':visible');
    var $first = $focusable.first();
    var $last = $focusable.last();

    if (e.shiftKey) {
      if (document.activeElement === $first[0]) {
        e.preventDefault();
        $last.focus();
      }
    } else {
      if (document.activeElement === $last[0]) {
        e.preventDefault();
        $first.focus();
      }
    }
  });

  // 3. Sticky Header
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 200) {
      $('.main-header-area').addClass('sticky');
    } else {
      $('.main-header-area').removeClass('sticky');
    }
  });

  // 4. Hero Slider (right side)
  if ($('.hero-slider-active').length) {
    $('.hero-slider-active').slick({
      autoplay: true,
      autoplaySpeed: 5000,
      dots: true,
      fade: true,
      speed: 1000,
      arrows: false,
      cssEase: 'linear'
    });
  }

  // 5. Counter Animation
  if ($('.counter').length) {
    $('.counter').counterUp({
      delay: 10,
      time: 3000
    });
  }

  // 6. WOW Animations
  new WOW({
    offset: 100,
    mobile: true
  }).init();

  // 7. Flip Card Tap Support (mobile)
  $('.flip-card').on('click', function () {
    if (window.innerWidth <= 1024) {
      $(this).toggleClass('flipped');
    }
  });

  // 8. Seasonal CTA Content
  function setSeasonalContent() {
    var month = new Date().getMonth();
    var data;

    if (month >= 4 && month <= 7) {
      // May - August: Tin Cup Challenge
      data = {
        heading: 'Join the Tin Cup Challenge',
        text: 'Support local nonprofits through our annual giving event that amplifies your donations.',
        cta: 'Get Involved',
        link: '/get-involved/'
      };
    } else if (month >= 8 && month <= 10) {
      // September - November: Grant Season
      data = {
        heading: 'Grant Season is Open',
        text: 'Apply for funding to support your nonprofit\'s mission in Teton Valley.',
        cta: 'Apply for Grants',
        link: '/nonprofits/'
      };
    } else {
      // December - April: Year End Giving
      data = {
        heading: 'Give Before December 31',
        text: 'Make a tax-deductible gift to support the causes you care about in Teton Valley.',
        cta: 'Donate Now',
        link: '/give/'
      };
    }

    $('.seasonal-cta__heading').text(data.heading);
    $('.seasonal-cta__text').text(data.text);
    $('.seasonal-cta__btn').html(data.cta + ' <span></span>').attr('href', data.link);
  }

  setSeasonalContent();

  // 9. Post Grid — Show More
  // Shows 6 cards initially, reveals the rest on click.
  // In WordPress, this becomes AJAX load-more pagination.
  var $showMoreBtn = $('.post-grid__show-more');
  if ($showMoreBtn.length) {
    var INITIAL_COUNT = 6;
    var $grid = $showMoreBtn.closest('.post-grid');
    var $cards = $grid.find('.post-card');
    var $status = $grid.find('.post-grid__status');
    var totalCount = $cards.length;

    if (totalCount > INITIAL_COUNT) {
      $cards.slice(INITIAL_COUNT).addClass('post-card--hidden');
      $status.text('Showing ' + INITIAL_COUNT + ' of ' + totalCount + ' news posts.');

      $showMoreBtn.on('click', function () {
        var $hidden = $grid.find('.post-card--hidden');
        $hidden.slice(0, 6).removeClass('post-card--hidden');
        var remaining = $grid.find('.post-card--hidden').length;
        var showing = totalCount - remaining;
        $status.text('Showing ' + showing + ' of ' + totalCount + ' news posts.');

        if (remaining === 0) {
          $showMoreBtn.attr('aria-expanded', 'true').fadeOut(200);
          $status.text('Showing all ' + totalCount + ' news posts.');
        } else {
          $showMoreBtn.attr('aria-expanded', 'false');
        }
      });
    } else {
      $showMoreBtn.hide();
    }
  }

  // 10. Copyright Year
  var $dateEl = $('#date');
  if ($dateEl.length) {
    $dateEl.html(new Date().getFullYear());
  }

  // 11. Nonprofit Directory Filter
  // WP_NOTE: In WordPress, replace with AJAX taxonomy filter or FacetWP integration.
  var $filterBtns = $('.np-directory__filter');
  if ($filterBtns.length) {
    var $cards = $('.np-directory__card');
    var $countLabel = $('.np-directory__visible-count');
    var totalCount = $cards.length;

    $filterBtns.on('click', function () {
      var filter = $(this).data('filter');

      $filterBtns.removeClass('is-active');
      $(this).addClass('is-active');

      if (filter === 'all') {
        $cards.removeClass('is-hidden');
      } else {
        $cards.each(function () {
          var sector = $(this).data('sector');
          $(this).toggleClass('is-hidden', sector !== filter);
        });
      }

      var visibleCount = $cards.not('.is-hidden').length;
      $countLabel.text(visibleCount);
    });
  }

})(jQuery);
