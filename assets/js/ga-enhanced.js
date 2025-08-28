// Google Analytics Custom Metrics and Enhanced Tracking
// This script should be included after the main GA script

document.addEventListener('DOMContentLoaded', function() {
  // Ensure gtag is available
  if (typeof gtag !== 'function') {
    console.warn('Google Analytics not loaded, skipping custom tracking');
    return;
  }

  // Track custom events for service cards
  const serviceCards = document.querySelectorAll('[data-ga-category="Service"]');
  serviceCards.forEach(function(card) {
    card.addEventListener('click', function() {
      const serviceLabel = this.getAttribute('data-ga-label');
      gtag('event', 'service_view', {
        'event_category': 'Service',
        'event_label': serviceLabel,
        'value': 1
      });
    });
    
    // Track when service cards come into view (impression tracking)
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const serviceLabel = entry.target.getAttribute('data-ga-label');
          gtag('event', 'service_impression', {
            'event_category': 'Service',
            'event_label': serviceLabel,
            'value': 1
          });
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5 // Trigger when 50% of the element is visible
    });
    
    observer.observe(card);
  });

  // Enhanced form tracking
  const contactForm = document.querySelector('[data-ga-category="Contact Form"]');
  if (contactForm) {
    // Track form start (when user interacts with any field)
    let formStarted = false;
    const formFields = contactForm.querySelectorAll('[data-ga-field]');
    formFields.forEach(function(field) {
      field.addEventListener('focus', function() {
        if (!formStarted) {
          formStarted = true;
          gtag('event', 'form_start', {
            'event_category': 'Contact Form',
            'event_label': 'Form Interaction Started',
            'value': 1
          });
        }
      });
      
      // Track individual field completion
      field.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
          gtag('event', 'field_complete', {
            'event_category': 'Contact Form',
            'event_label': this.getAttribute('data-ga-field'),
            'value': 1
          });
        }
      });
    });
    
    // Track form submission success/failure
    contactForm.addEventListener('submit', function(e) {
      // Prevent default to handle tracking first
      e.preventDefault();
      
      gtag('event', 'form_submit_attempt', {
        'event_category': 'Contact Form',
        'event_label': 'Form Submission Attempt',
        'value': 1
      });
      
      // Submit the form after a short delay to ensure tracking
      setTimeout(() => {
        contactForm.submit();
      }, 100);
    });
  }

  // Track WhatsApp clicks with more detail
  const whatsappButton = document.querySelector('.whatsapp');
  if (whatsappButton) {
    whatsappButton.addEventListener('click', function() {
      gtag('event', 'click', {
        'event_category': 'Contact',
        'event_label': 'WhatsApp Click',
        'value': 1
      });
    });
  }

  // Track phone call clicks
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      gtag('event', 'click', {
        'event_category': 'Contact',
        'event_label': 'Phone Call Click',
        'value': 1
      });
    });
  });

  // Track email clicks
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      gtag('event', 'click', {
        'event_category': 'Contact',
        'event_label': 'Email Click',
        'value': 1
      });
    });
  });

  // Track social media clicks
  const socialLinks = document.querySelectorAll('.social a, [aria-label*="Facebook"], [aria-label*="Instagram"]');
  socialLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      const platform = this.getAttribute('aria-label') || this.textContent.trim();
      gtag('event', 'click', {
        'event_category': 'Social',
        'event_label': platform,
        'value': 1
      });
    });
  });

  // Track navigation menu clicks
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      gtag('event', 'navigation_click', {
        'event_category': 'Navigation',
        'event_label': this.getAttribute('href'),
        'value': 1
      });
    });
  });

  // Track promo banner interactions
  const promoBanner = document.querySelector('.s-promo');
  if (promoBanner) {
    promoBanner.addEventListener('click', function(e) {
      gtag('event', 'click', {
        'event_category': 'Promotion',
        'event_label': 'Promo Banner Click',
        'value': 1
      });
    });
  }

  // Track time on page (engagement metric)
  let timeSpent = 0;
  const timeInterval = setInterval(function() {
    timeSpent += 10;
    
    // Track time milestones
    if (timeSpent === 30 || timeSpent === 60 || timeSpent === 120 || timeSpent === 300) {
      gtag('event', 'time_on_page', {
        'event_category': 'Engagement',
        'event_label': timeSpent + ' seconds',
        'value': timeSpent
      });
    }
    
    // Stop tracking after 10 minutes
    if (timeSpent >= 600) {
      clearInterval(timeInterval);
    }
  }, 10000); // Check every 10 seconds

  // Track page visibility (tab switching)
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      gtag('event', 'page_hidden', {
        'event_category': 'Engagement',
        'event_label': 'Page Hidden',
        'value': 1
      });
    } else {
      gtag('event', 'page_visible', {
        'event_category': 'Engagement',
        'event_label': 'Page Visible',
        'value': 1
      });
    }
  });

  // Track outbound links
  const outboundLinks = document.querySelectorAll('a[href^="http"]:not([href*="alexahousecleaning.com"])');
  outboundLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      gtag('event', 'outbound_click', {
        'event_category': 'Engagement',
        'event_label': this.href,
        'value': 1
      });
    });
  });
});