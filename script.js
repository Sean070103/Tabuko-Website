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

AOS.init();

// UPDATES FEED RENDERER //
document.addEventListener('DOMContentLoaded', () => {
    const updatesFeedEl = document.getElementById('updates-feed');
    if (!updatesFeedEl) return;

    // Credentials are hidden on serverless/PHP backends via environment variables.

    const renderItems = (items) => {
        items.sort((a, b) => new Date(b.date) - new Date(a.date));
        const html = items.map(item => {
            const date = item.date ? new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';
            const image = item.image ? `<div class="update-media"><img src="${item.image}" alt="${item.title}"></div>` : '';
            return `
            <article class="update-card">
                ${image}
                <div class="update-body">
                    <div class="update-title">${item.title || ''}</div>
                    <div class="update-meta">${date}</div>
                    <div class="update-excerpt">${item.excerpt || ''}</div>
                    <div class="update-actions">
                        ${item.sourceUrl ? `<a href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer">View on Facebook</a>` : ''}
                    </div>
                </div>
            </article>`;
        }).join('');
        updatesFeedEl.innerHTML = html;
    };

    const fetchWithFallback = async () => {
        try {
            // Prefer serverless endpoint if available (Vercel/Netlify)
            try {
                const serverlessRes = await fetch('api/fb-updates', { cache: 'no-store' });
                if (serverlessRes.ok) {
                    const data = await serverlessRes.json();
                    if (data && Array.isArray(data.items)) {
                        renderItems(data.items);
                        return;
                    }
                }
            } catch {}

            // Try Netlify functions path if deployed on Netlify
            try {
                const netlifyRes = await fetch('/.netlify/functions/fb-updates', { cache: 'no-store' });
                if (netlifyRes.ok) {
                    const data = await netlifyRes.json();
                    if (data && Array.isArray(data.items)) {
                        renderItems(data.items);
                        return;
                    }
                }
            } catch {}

            // Otherwise use PHP backend proxy (if available)
            const res = await fetch('api/fb-updates.php', { cache: 'no-store' });
            if (res.ok) {
                const data = await res.json();
                if (data && Array.isArray(data.items)) {
                    renderItems(data.items);
                    return;
                }
            }
            throw new Error('Primary feed failed');
        } catch (e) {
            // Fallback to local JSON
            try {
                const res = await fetch('data/updates.json', { cache: 'no-store' });
                const items = await res.json();
                renderItems(items);
            } catch {
                updatesFeedEl.innerHTML = '<p>Unable to load updates right now.</p>';
            }
        }
    };

    fetchWithFallback();
});