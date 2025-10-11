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

// ==== DIRECT FACEBOOK FETCH ====
document.addEventListener("DOMContentLoaded", () => {
  const updatesFeedEl = document.getElementById("updates-feed");
  const loader = document.getElementById("loader");
  if (!updatesFeedEl) return;

  const pageId = "1831901967082582"; // Your Page ID
  const accessToken = "EAAWWP39dzKYBPtxOZBlV4ZAdR4dZCUSQLj6vWBMmZCNUpOy9nqRcfUfcxWDtnciYdUMKd64W8DFYQ1w6kqWAcaQECIviQD14heESbwXJGlNgWHGGGr3pTRuElqYNYuoTqOfz69ZBtIkFezKduDndc9yMsFQaf3COaMo78gTdSinLT2TIvhQug1lDZAFlU1"; // Your Page access token

  fetch(
    `https://graph.facebook.com/v20.0/${pageId}/feed?fields=message,created_time,full_picture,permalink_url&access_token=${accessToken}&limit=6`
  )
    .then((res) => res.json())
    .then((data) => {
      loader.style.display = "none";
      if (!data.data) {
        updatesFeedEl.innerHTML = "<p>No posts found.</p>";
        return;
      }

      updatesFeedEl.innerHTML = data.data
        .map((post) => {
          const imageHTML = post.full_picture
            ? `<img src="${post.full_picture}" alt="Facebook post image" style="width:100%;height:200px;object-fit:cover;border-top-left-radius:12px;border-top-right-radius:12px;">`
            : `<div style="height:200px;display:flex;align-items:center;justify-content:center;background:#f0f0f0;color:#888;">⭐</div>`;

          const date = new Date(post.created_time).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          const text = post.message
            ? post.message.split("\n")[0].slice(0, 100)
            : "Facebook Update";

          return `
            <article class="update-card" style="background:#fff;border-radius:12px;box-shadow:0 4px 8px rgba(0,0,0,0.1);overflow:hidden;max-width:360px;">
              ${imageHTML}
              <div style="padding:16px;">
                <div style="font-weight:700;font-size:1rem;margin-bottom:4px;">${text}</div>
                <div style="color:#777;font-size:0.9rem;margin-bottom:8px;">${date}</div>
                <a href="${post.permalink_url}" target="_blank" style="color:#007bff;text-decoration:none;font-weight:600;">View on Facebook</a>
              </div>
            </article>
          `;
        })
        .join("");
    })
    .catch((err) => {
      console.error("Error fetching posts:", err);
      loader.style.display = "none";
      updatesFeedEl.innerHTML = "<p>Failed to load updates.</p>";
    });
});