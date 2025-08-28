// Google Analytics Custom Events Configuration
// This configuration file defines custom events and parameters for enhanced tracking

window.GAConfig = {
  // Custom event categories
  categories: {
    SERVICE: 'Service',
    CONTACT: 'Contact',
    NAVIGATION: 'Navigation',
    ENGAGEMENT: 'Engagement',
    PROMOTION: 'Promotion',
    FORM: 'Form'
  },
  
  // Custom event actions
  actions: {
    VIEW: 'view',
    CLICK: 'click',
    SUBMIT: 'submit',
    IMPRESSION: 'impression',
    START: 'start',
    COMPLETE: 'complete'
  },
  
  // Service types for tracking
  services: {
    HOUSE_CLEANING: 'House Cleaning',
    MAID_SERVICE: 'Maid Service',
    DEEP_CLEANING: 'Deep Cleaning',
    JANITORIAL: 'Janitorial Services'
  },
  
  // Tracking thresholds
  scroll: {
    DEPTH_25: 25,
    DEPTH_50: 50,
    DEPTH_75: 75,
    DEPTH_100: 100
  },
  
  // Time tracking milestones (in seconds)
  time: {
    MILESTONE_30: 30,
    MILESTONE_60: 60,
    MILESTONE_120: 120,
    MILESTONE_300: 300
  },
  
  // Form field tracking
  formFields: {
    NAME: 'name',
    EMAIL: 'email',
    PHONE: 'phone',
    MESSAGE: 'message',
    SERVICE: 'service'
  }
};

// Enhanced tracking functions
window.GATracking = {
  // Track service view
  trackServiceView: function(serviceName) {
    if (typeof gtag === 'function') {
      gtag('event', window.GAConfig.actions.VIEW, {
        'event_category': window.GAConfig.categories.SERVICE,
        'event_label': serviceName,
        'value': 1
      });
    }
  },
  
  // Track service impression
  trackServiceImpression: function(serviceName) {
    if (typeof gtag === 'function') {
      gtag('event', window.GAConfig.actions.IMPRESSION, {
        'event_category': window.GAConfig.categories.SERVICE,
        'event_label': serviceName,
        'value': 1
      });
    }
  },
  
  // Track form start
  trackFormStart: function() {
    if (typeof gtag === 'function') {
      gtag('event', window.GAConfig.actions.START, {
        'event_category': window.GAConfig.categories.FORM,
        'event_label': 'Form Started',
        'value': 1
      });
    }
  },
  
  // Track form field completion
  trackFieldComplete: function(fieldName) {
    if (typeof gtag === 'function') {
      gtag('event', window.GAConfig.actions.COMPLETE, {
        'event_category': window.GAConfig.categories.FORM,
        'event_label': fieldName,
        'value': 1
      });
    }
  },
  
  // Track form submission
  trackFormSubmit: function() {
    if (typeof gtag === 'function') {
      gtag('event', window.GAConfig.actions.SUBMIT, {
        'event_category': window.GAConfig.categories.FORM,
        'event_label': 'Form Submitted',
        'value': 1
      });
    }
  },
  
  // Track scroll depth
  trackScrollDepth: function(depth) {
    if (typeof gtag === 'function') {
      gtag('event', 'scroll', {
        'event_category': window.GAConfig.categories.ENGAGEMENT,
        'event_label': depth + '%',
        'value': depth
      });
    }
  },
  
  // Track time on page
  trackTimeOnPage: function(seconds) {
    if (typeof gtag === 'function') {
      gtag('event', 'time_on_page', {
        'event_category': window.GAConfig.categories.ENGAGEMENT,
        'event_label': seconds + ' seconds',
        'value': seconds
      });
    }
  }
};