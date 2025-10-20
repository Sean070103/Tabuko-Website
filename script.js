/** MODERN HAMBURGER MENU **/ 
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Check if elements exist
  if (!hamburger || !mobileMenu) {
    console.error('Hamburger or mobile menu elements not found');
    console.log('Hamburger element:', hamburger);
    console.log('Mobile menu element:', mobileMenu);
    return;
  }
  
  console.log('Hamburger menu initialized successfully');

  // Toggle mobile menu
  hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Hamburger clicked!');
    
    // Toggle active classes
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    console.log('Hamburger active:', hamburger.classList.contains('active'));
    console.log('Mobile menu active:', mobileMenu.classList.contains('active'));
    
    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // Close menu when clicking on navigation links
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Close menu
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
      
      // Navigate to the page
      const href = link.getAttribute('href');
      if (href && href !== '#') {
        window.location.href = href;
      }
    });
  });

  // Close menu when clicking outside of it
  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Prevent menu from closing when clicking inside it
  mobileMenu.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});

// TEAMS //

document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".sidebar ul li");
  const members = document.querySelectorAll(".team-member");

  menuItems.forEach(item => {
      item.addEventListener("click", () => {
          // Remove 'active' from the previously active tab
          document.querySelector(".sidebar .active").classList.remove("active");
          item.classList.add("active");

          // Get the selected category
          const targetGroup = item.getAttribute("data-target");

          // Show only members that belong to the selected group
          members.forEach(member => {
              if (member.getAttribute("data-group") === targetGroup) {
                  member.style.display = "block";
              } else {
                  member.style.display = "none";
              }
          });
      });
  });
});

const contactForm = document.querySelector(".form-container");
if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let formData = {
        firstname: document.querySelector('input[placeholder="Firstname"]').value,
        lastname: document.querySelector('input[placeholder="Lastname"]').value,
        email: document.querySelector('input[placeholder="Email"]').value,
        subject: document.querySelector('input[placeholder="Subject"]').value,
        message: document.querySelector('textarea[placeholder="Message"]').value
    };

    fetch("https://script.google.com/home/projects/1biNxMbwX_Tzgt5IMQDE5P_9Xf5SpUrj_w1NsootwSQSSVRhM0yREB9_f/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => alert("Message sent!"))
    .catch(error => console.error("Error:", error));
});
}

const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const target = button.getAttribute('data-target');

        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Filter product cards
        productCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (target === 'all' || category === target) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', () => {
        const moreText = button.previousElementSibling.querySelector('.more-text');
        if (moreText.style.display === 'inline') {
            moreText.style.display = 'none';
            button.textContent = 'Read more';
        } else {
            moreText.style.display = 'inline';
            button.textContent = 'Read less';
        }
    });
});

document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', () => {
        const descContainer = button.previousElementSibling;

        descContainer.classList.toggle('expanded');

        if (descContainer.classList.contains('expanded')) {
            button.textContent = 'Read less';
        } else {
            button.textContent = 'Read more';
        }
    });
});

// Get elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

// Open Lightbox on image click
if (lightbox && lightboxImg) {
document.querySelectorAll('.zoomable').forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'block';
        lightboxImg.src = img.src;
    });
});
}

// Close Lightbox
if (closeLightbox && lightbox) {
closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});
}

// Also close if clicked outside the image
if (lightbox) {
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});
}

document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".fade-in, .fade-in-right, .fade-in-left");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          // Optional: unobserve after animation triggers once
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  });

if (typeof AOS !== 'undefined' && AOS && typeof AOS.init === 'function') {
AOS.init();
}

async function loadFacebookFeed() {
  const updatesFeedEl = document.getElementById("updates-feed");
  const loader = document.getElementById("loader");

  // If we're not on the Updates page (elements not present), skip safely
  if (!updatesFeedEl || !loader) {
    console.log("Updates elements not found");
    return;
  }

  console.log("Loading updates for mobile...");

  try {
    // Load from local JSON file instead of RSS
    console.log('Attempting to fetch updates from JSON...');
    const res = await fetch('./data/updates.json');
    console.log('Fetch response status:', res.status);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const updates = await res.json();
    console.log('Successfully loaded updates:', updates);

    loader.style.display = "none";
    updatesFeedEl.innerHTML = ""; // Clear old content

    console.log("Found", updates.length, "updates from JSON");

    updates.forEach((update, index) => {
      const { title, date, image, excerpt, sourceUrl } = update;
      
      console.log(`Update ${index + 1}:`, { title, date, hasImage: !!image });

      const card = document.createElement("article");
      card.className = "update-card";

      // Format date for display
      const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      card.innerHTML = `
        <div class="modern-card-header">
          ${image ? `<div class="modern-image-container"><img src="${image}" alt="${title}" class="modern-image" onerror="this.style.display='none'"></div>` : `<div class="modern-placeholder"><div class="placeholder-icon">📱</div><div class="placeholder-text">Update</div></div>`}
          <div class="modern-overlay">
            <div class="modern-badge">Update</div>
          </div>
        </div>
        <div class="modern-card-content">
          <div class="modern-title">${title}</div>
          ${excerpt ? `<div class="modern-description">${excerpt}</div>` : ''}
          <div class="modern-actions">
            <a href="${sourceUrl}" target="_blank" rel="noopener noreferrer" class="modern-button">
              <svg class="modern-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>View Post</span>
            </a>
          </div>
        </div>
      `;
      
      // Make entire card clickable
      card.addEventListener('click', (e) => {
        // Don't trigger if clicking on the button
        if (e.target.closest('.modern-button')) return;
        
        // Open the source URL
        if (sourceUrl) {
          window.open(sourceUrl, '_blank', 'noopener,noreferrer');
        }
      });
      
      // Add keyboard accessibility
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View update: ${title}`);
      
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (sourceUrl) {
            window.open(sourceUrl, '_blank', 'noopener,noreferrer');
          }
        }
      });
      
      updatesFeedEl.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading updates:", error);
    if (loader) loader.style.display = "none";
    
    // Fallback: Create some hardcoded updates if JSON fails
    console.log("Creating fallback updates...");
    const fallbackUpdates = [
      {
        id: "fallback-1",
        title: "Industrial Engineering, IT & Computer Science Students OJT at Tabuko Energy",
        date: "2025-01-25",
        image: "Images/update_photos/ojt.jpg",
        excerpt: "Our INDUSTRIAL ENGINEERING, INFORMATION TECHNOLOGY & COMPUTER SCIENCE Students doing their ON THE JOB TRAININGS at TABUKO ENERGY NETWORK CORP.",
        sourceUrl: "https://www.facebook.com/share/p/18kAfpcGMZ/"
      },
      {
        id: "fallback-2", 
        title: "Space Heater Control Panel for Cummins Generator Set",
        date: "2025-01-24",
        image: "Images/update_photos/heater.jpg",
        excerpt: "SPACE HEATER CONTROL PANEL FOR CUMMINS GENERATOR SET - Professional installation and setup of heating control systems.",
        sourceUrl: "https://www.facebook.com/share/p/19iE1Bt8jd/"
      },
      {
        id: "fallback-3",
        title: "Pioneer Adhesive 4th Automatic 10AMPS Battery Charger Panel Assembly",
        date: "2025-01-23",
        image: "Images/update_photos/adhesive.jpg",
        excerpt: "PIONEER ADHESIVE 4TH AUTOMATIC 10AMPS BATTERY CHARGER PANEL ASSY - Advanced battery charging system installation.",
        sourceUrl: "https://www.facebook.com/share/p/1NYzRBgdHU/"
      }
    ];
    
    if (updatesFeedEl) {
      updatesFeedEl.innerHTML = "";
      fallbackUpdates.forEach((update, index) => {
        const { title, image, excerpt, sourceUrl } = update;
        
        const card = document.createElement("article");
        card.className = "update-card";
        
        card.innerHTML = `
          <div class="modern-card-header">
            ${image ? `<div class="modern-image-container"><img src="${image}" alt="${title}" class="modern-image" onerror="this.style.display='none'"></div>` : `<div class="modern-placeholder"><div class="placeholder-icon">📱</div><div class="placeholder-text">Update</div></div>`}
            <div class="modern-overlay">
              <div class="modern-badge">Update</div>
            </div>
          </div>
          <div class="modern-card-content">
            <div class="modern-title">${title}</div>
            ${excerpt ? `<div class="modern-description">${excerpt}</div>` : ''}
            <div class="modern-actions">
              <a href="${sourceUrl}" target="_blank" rel="noopener noreferrer" class="modern-button">
                <svg class="modern-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>View Post</span>
              </a>
            </div>
          </div>
        `;
        
        card.addEventListener('click', (e) => {
          if (e.target.closest('.modern-button')) return;
          if (sourceUrl) {
            window.open(sourceUrl, '_blank', 'noopener,noreferrer');
          }
        });
        
        updatesFeedEl.appendChild(card);
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Only attempt to load the feed if the container exists on the page
  if (document.getElementById("updates-feed")) {
    // Immediate load for mobile
    loadFacebookFeed();
    // Also try again after a short delay
    setTimeout(() => {
      loadFacebookFeed();
    }, 500);
  }
  initTraditionalCarousel();
  removeAutoScrollElements();
});

// Also try on window load as backup
window.addEventListener('load', () => {
  if (document.getElementById("updates-feed")) {
    loadFacebookFeed();
  }
});

// Remove any auto-scroll elements
function removeAutoScrollElements() {
  // Remove any elements with auto-scroll related classes or IDs
  const autoElements = document.querySelectorAll(
    '.auto-scroll-indicator, .auto-play-indicator, #autoPlayIndicator, #auto-scroll-indicator, [class*="auto-scroll"], [class*="auto-play"]'
  );
  
  autoElements.forEach(element => {
    element.remove();
  });
  
  // Also remove any elements that might contain "Auto-scrolling" text
  const allElements = document.querySelectorAll('*');
  allElements.forEach(element => {
    if (element.textContent && element.textContent.includes('Auto-scrolling')) {
      element.remove();
    }
  });
}

// Automatic carousel functionality
let currentSlide = 0;
let totalSlides = 0;
let cardsPerView = 3;
let autoPlayInterval = null;
let lastPostCount = 0;

function initTraditionalCarousel() {
  const updatesGrid = document.getElementById('updates-feed');
  const indicators = document.getElementById('carouselIndicators');
  
  if (!updatesGrid) return;

  // Wait for cards to load, then initialize
  setTimeout(() => {
    setupCarousel();
  }, 1000);
  
  // Fallback: Try to initialize again after 2 seconds if no cards found
  setTimeout(() => {
    const cards = updatesGrid.querySelectorAll('.update-card');
    if (cards.length > 0 && totalSlides === 0) {
      console.log('Fallback: Re-initializing carousel...');
      setupCarousel();
    }
  }, 2000);
  
  // Additional fallback after 5 seconds
  setTimeout(() => {
    const cards = updatesGrid.querySelectorAll('.update-card');
    if (cards.length > 0) {
      console.log('Final fallback: Setting up carousel...');
      setupCarousel();
    }
  }, 5000);

  function setupCarousel() {
    const cards = updatesGrid.querySelectorAll('.update-card');
    console.log('Setting up carousel with', cards.length, 'cards');
    if (cards.length === 0) {
      console.log('No cards found, skipping carousel setup');
      return;
    }

    // Check if new posts were added
    if (cards.length > lastPostCount) {
      currentSlide = 0; // Reset to first slide for new posts
      lastPostCount = cards.length;
    }

    // Calculate cards per view based on screen size
    updateCardsPerView();
    
    // Calculate total slides
    totalSlides = Math.ceil(cards.length / cardsPerView);
    
    // Create infinite loop by duplicating cards
    createInfiniteLoop();
    
    // Create indicators
    createIndicators();
    
    // Start continuous auto-play
    startContinuousAutoPlay();
    console.log('Infinite carousel initialized with', totalSlides, 'slides');
  }

  function createInfiniteLoop() {
    const cards = updatesGrid.querySelectorAll('.update-card');
    if (cards.length === 0) return;

    // Clone all cards and append them for seamless loop
    const clonedCards = Array.from(cards).map(card => card.cloneNode(true));
    clonedCards.forEach(clonedCard => {
      clonedCard.classList.add('cloned-card');
      updatesGrid.appendChild(clonedCard);
    });

    // Set initial position to show first set of cards
    const cardWidth = cards[0].offsetWidth;
    const gap = 32;
    updatesGrid.style.transform = `translateX(0px)`;
  }

  function updateCardsPerView() {
    const containerWidth = window.innerWidth;
    if (containerWidth < 480) {
      cardsPerView = 1;
    } else if (containerWidth < 768) {
      cardsPerView = 1;
    } else if (containerWidth < 1024) {
      cardsPerView = 2;
    } else {
      cardsPerView = 3;
    }
    console.log('Cards per view set to:', cardsPerView, 'for width:', containerWidth);
  }

  function createIndicators() {
    if (!indicators) return;
    
    indicators.innerHTML = '';
    
    // Limit to maximum 5 dots for better mobile experience
    const maxDots = Math.min(totalSlides, 5);
    
    for (let i = 0; i < maxDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot';
      if (i === (currentSlide % maxDots)) {
        dot.classList.add('active');
      }
      
      dot.addEventListener('click', () => {
        // Calculate which slide to go to based on dot position
        const targetSlide = Math.floor((currentSlide / totalSlides) * totalSlides) + i;
        goToSlide(targetSlide % totalSlides);
      });
      
      indicators.appendChild(dot);
    }
    
    // Page indicator removed for cleaner look
  }

  function updateCarousel() {
    const cards = updatesGrid.querySelectorAll('.update-card:not(.cloned-card)');
    if (cards.length === 0) return;

    // Add sliding class for smooth animation
    updatesGrid.classList.add('sliding');

    const cardWidth = cards[0].offsetWidth;
    const gap = 32; // 2rem gap
    const translateX = -(currentSlide * (cardWidth + gap) * cardsPerView);
    
    // Apply smooth transform
    updatesGrid.style.transform = `translateX(${translateX}px)`;
    
    // Add slide animations to visible cards
    const allCards = updatesGrid.querySelectorAll('.update-card');
    allCards.forEach((card, index) => {
      const isVisible = index >= currentSlide * cardsPerView && 
                       index < (currentSlide + 1) * cardsPerView;
      
      if (isVisible) {
        card.classList.add('slide-in');
        card.classList.remove('slide-out');
      } else {
        card.classList.add('slide-out');
        card.classList.remove('slide-in');
      }
    });
    
    // Handle infinite loop reset
    if (currentSlide >= totalSlides) {
      setTimeout(() => {
        console.log('Resetting to start for infinite loop');
        updatesGrid.style.transition = 'none';
        updatesGrid.style.transform = 'translateX(0px)';
        currentSlide = 0;
        setTimeout(() => {
          updatesGrid.style.transition = 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }, 50);
      }, 1200);
    }
    
    // Remove sliding class after animation
    setTimeout(() => {
      updatesGrid.classList.remove('sliding');
    }, 1500);
    
    // Update indicators
    if (indicators) {
      const dots = indicators.querySelectorAll('.carousel-dot');
      const maxDots = Math.min(totalSlides, 5);
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === (currentSlide % maxDots));
      });
      
      // Page indicator removed
    }
  }

  function nextSlideInfinite() {
    const cards = updatesGrid.querySelectorAll('.update-card:not(.cloned-card)');
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth;
    const gap = 16; // Reduced gap for mobile
    const slideWidth = (cardWidth + gap) * cardsPerView;
    
    currentSlide++;
    
    // Calculate the new position
    const newPosition = -(currentSlide * slideWidth);
    updatesGrid.style.transform = `translateX(${newPosition}px)`;
    
    console.log(`Infinite slide ${currentSlide}, position: ${newPosition}px, total slides: ${totalSlides}, cardWidth: ${cardWidth}`);
    
    // If we've moved past all original slides, reset to beginning
    if (currentSlide >= totalSlides) {
      setTimeout(() => {
        console.log('Resetting to start for infinite loop');
        currentSlide = 0;
        updatesGrid.style.transition = 'none';
        updatesGrid.style.transform = 'translateX(0px)';
        setTimeout(() => {
          updatesGrid.style.transition = 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }, 50);
      }, 1200);
    }
    
    // Update indicators
    if (indicators) {
      const dots = indicators.querySelectorAll('.carousel-dot');
      const maxDots = Math.min(totalSlides, 5);
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === (currentSlide % maxDots));
      });
      
      // Page indicator removed
    }
  }

  function nextSlide() {
    console.log(`Moving from slide ${currentSlide} to ${currentSlide + 1}`);
    currentSlide++;
    updateCarousel();
  }

  function prevSlide() {
    console.log(`Moving from slide ${currentSlide} to ${(currentSlide - 1 + totalSlides) % totalSlides}`);
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
    resetAutoPlay();
  }

  function startContinuousAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    console.log('Starting continuous infinite carousel...');
    autoPlayInterval = setInterval(() => {
      console.log('Auto-moving to next slide...');
      nextSlideInfinite();
    }, 3000); // 3 seconds for continuous movement
  }

  function startAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    console.log('Starting auto-play carousel...');
    autoPlayInterval = setInterval(() => {
      console.log('Auto-moving to next slide...');
      nextSlide();
    }, 4000); // 4 seconds for more dynamic movement
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  function resetAutoPlay() {
    stopAutoPlay();
    setTimeout(startContinuousAutoPlay, 1000); // Resume after 1 second
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
      resetAutoPlay();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
      resetAutoPlay();
    }
  });

  // Enhanced touch/swipe support for mobile
  let startX = 0;
  let startY = 0;
  let isDragging = false;
  let hasMoved = false;

  updatesGrid.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDragging = true;
    hasMoved = false;
    stopAutoPlay();
    console.log('Touch start at:', startX, startY);
  });

  updatesGrid.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = Math.abs(currentX - startX);
    const diffY = Math.abs(currentY - startY);
    
    // Only prevent default if it's a horizontal swipe
    if (diffX > diffY && diffX > 10) {
      e.preventDefault();
      hasMoved = true;
    }
  });

  updatesGrid.addEventListener('touchend', (e) => {
    if (!isDragging || !hasMoved) {
      isDragging = false;
      return;
    }
    
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = startX - endX;
    const diffY = Math.abs(startY - endY);
    const threshold = 30; // Reduced threshold for better sensitivity

    console.log('Touch end at:', endX, 'diffX:', diffX, 'diffY:', diffY);

    // Only trigger if it's a horizontal swipe
    if (Math.abs(diffX) > threshold && Math.abs(diffX) > diffY) {
      if (diffX > 0) {
        console.log('Swipe left - next slide');
        nextSlide();
      } else {
        console.log('Swipe right - prev slide');
        prevSlide();
      }
    }
    
    isDragging = false;
    hasMoved = false;
    setTimeout(startContinuousAutoPlay, 3000); // Resume after 3 seconds
  });

  // Add click handlers for manual navigation
  updatesGrid.addEventListener('click', (e) => {
    const rect = updatesGrid.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const centerX = rect.width / 2;
    
    if (clickX > centerX) {
      console.log('Click right side - next slide');
      nextSlide();
    } else {
      console.log('Click left side - prev slide');
      prevSlide();
    }
  });

  // Pause on hover
  updatesGrid.addEventListener('mouseenter', stopAutoPlay);
  updatesGrid.addEventListener('mouseleave', () => {
    startContinuousAutoPlay();
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    updateCardsPerView();
    totalSlides = Math.ceil(updatesGrid.querySelectorAll('.update-card').length / cardsPerView);
    currentSlide = Math.min(currentSlide, totalSlides - 1);
    createIndicators();
    updateCarousel();
  });

  // Check for new posts every 30 seconds
  setInterval(() => {
    const cards = updatesGrid.querySelectorAll('.update-card');
    if (cards.length > lastPostCount) {
      currentSlide = 0; // Reset to first slide for new posts
      lastPostCount = cards.length;
      setupCarousel();
    }
  }, 30000);
}