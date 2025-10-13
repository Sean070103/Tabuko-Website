/** FOR HAMBURGER **/ 
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navbarCollapse = document.getElementById('navbar-collapse');

  hamburger.addEventListener('click', () => {
      navbarCollapse.classList.toggle('active');
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
  const rssUrl = "https://rss.app/feeds/7KsSSyE0yrfuuBfB.xml";
  const updatesFeedEl = document.getElementById("updates-feed");
  const loader = document.getElementById("loader");

  try {
    const res = await fetch(rssUrl);
    const text = await res.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");

    loader.style.display = "none";
    updatesFeedEl.innerHTML = ""; // Clear old content
    const items = xml.querySelectorAll("item");

    console.log("Found", items.length, "RSS items");

    items.forEach((item, index) => {
      const title = item.querySelector("title")?.textContent || "No title";
      const link = item.querySelector("link")?.textContent;
      const desc = item.querySelector("description")?.textContent || "";
      
      // Simple image extraction - just from description HTML
      let imageUrl = null;
      if (desc.includes('<img')) {
        const imgMatch = desc.match(/<img[^>]+src="([^"]+)"/);
        if (imgMatch) imageUrl = imgMatch[1];
      }

      console.log(`Item ${index + 1}:`, { title, link, hasImage: !!imageUrl });

      const card = document.createElement("article");
      card.className = "update-card";

      // Clean up description HTML and limit length
      const cleanDesc = desc.replace(/<[^>]*>/g, '').substring(0, 150);
      
      card.innerHTML = `
        <div class="modern-card-header">
          ${imageUrl ? `<div class="modern-image-container"><img src="${imageUrl}" alt="${title}" class="modern-image" onerror="this.style.display='none'"></div>` : `<div class="modern-placeholder"><div class="placeholder-icon">📱</div><div class="placeholder-text">Facebook Post</div></div>`}
          <div class="modern-overlay">
            <div class="modern-badge">Facebook</div>
          </div>
        </div>
        <div class="modern-card-content">
          <div class="modern-title">${title}</div>
          ${cleanDesc ? `<div class="modern-description">${cleanDesc}${cleanDesc.length >= 150 ? '...' : ''}</div>` : ''}
          <div class="modern-actions">
            <a href="${link}" target="_blank" rel="noopener noreferrer" class="modern-button">
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
        
        // Open the Facebook post
        if (link) {
          window.open(link, '_blank', 'noopener,noreferrer');
        }
      });
      
      // Add keyboard accessibility
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View Facebook post: ${title}`);
      
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (link) {
            window.open(link, '_blank', 'noopener,noreferrer');
          }
        }
      });
      
      updatesFeedEl.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading feed:", error);
    loader.style.display = "none";
    updatesFeedEl.innerHTML = "<p>Unable to load updates at this time.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadFacebookFeed();
  initTraditionalCarousel();
  removeAutoScrollElements();
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
  
  // Fallback: Try to initialize again after 3 seconds if no cards found
  setTimeout(() => {
    const cards = updatesGrid.querySelectorAll('.update-card');
    if (cards.length > 0 && totalSlides === 0) {
      console.log('Fallback: Re-initializing carousel...');
      setupCarousel();
    }
  }, 3000);

  function setupCarousel() {
    const cards = updatesGrid.querySelectorAll('.update-card');
    if (cards.length === 0) return;

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
    if (containerWidth < 768) {
      cardsPerView = 1;
    } else if (containerWidth < 1024) {
      cardsPerView = 2;
    } else {
      cardsPerView = 3;
    }
  }

  function createIndicators() {
    if (!indicators) return;
    
    indicators.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot';
      if (i === currentSlide) {
        dot.classList.add('active');
      }
      
      dot.addEventListener('click', () => {
        goToSlide(i);
      });
      
      indicators.appendChild(dot);
    }
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
    const dots = indicators.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  function nextSlideInfinite() {
    const cards = updatesGrid.querySelectorAll('.update-card:not(.cloned-card)');
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth;
    const gap = 32;
    const slideWidth = (cardWidth + gap) * cardsPerView;
    
    currentSlide++;
    
    // Calculate the new position
    const newPosition = -(currentSlide * slideWidth);
    updatesGrid.style.transform = `translateX(${newPosition}px)`;
    
    console.log(`Infinite slide ${currentSlide}, position: ${newPosition}px`);
    
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
    const dots = indicators.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === (currentSlide % totalSlides));
    });
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

  // Touch/swipe support
  let startX = 0;
  let isDragging = false;

  updatesGrid.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    stopAutoPlay();
  });

  updatesGrid.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
  });

  updatesGrid.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    isDragging = false;
    setTimeout(startContinuousAutoPlay, 2000); // Resume after 2 seconds
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