// Removing vite from project
// import "./styles/styles.scss";

/* =========================
   REVEAL ANIMATIONS
========================= */
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.2,
  },
);

reveals.forEach((section) => {
  revealObserver.observe(section);
});

/* =========================
   VIDEO GRID (AUTO PLAY)
========================= */
const videoCards = document.querySelectorAll(".video-card");

const videoObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const card = entry.target;
      const video = card.querySelector("video");

      if (!video) return;

      if (entry.isIntersecting) {
        card.classList.add("active");

        if (!video.querySelector("source").src) {
          video.remove(); // fallback to image only
        }

        // Wait until video can actually play
        if (video.readyState >= 3) {
          card.classList.add("video-ready");
        } else {
          video.addEventListener(
            "canplay",
            () => {
              card.classList.add("video-ready");
            },
            { once: true },
          );
        }

        video.play().catch(() => {});
      } else {
        card.classList.remove("active", "video-ready");

        video.pause();
        video.currentTime = 0;
      }
    });
  },
  {
    threshold: 0.6,
  },
);

videoCards.forEach((card) => {
  videoObserver.observe(card);
});

/* =========================
   HERO VIDEO SELECTION
========================= */

// const heroVideo = document.getElementById("heroVideo");

// const desktopSrc = "/video/showreel.mp4";
// const mobileSrc = "/video/showreel_vert.mp4";

// function setHeroVideo() {
//   const isMobile = window.innerWidth <= 768;
//   const newSrc = isMobile ? mobileSrc : desktopSrc;

//   // Only update if different (prevents reload loops)
//   if (heroVideo.getAttribute("src") !== newSrc) {
//     heroVideo.src = newSrc;
//     heroVideo.load();

//     heroVideo.play().catch(() => {
//       // autoplay may fail silently
//     });
//   }
// }

// // Run on load
// setHeroVideo();

// // Run on resize
// window.addEventListener("resize", setHeroVideo);

/* =========================
   CONTACT FORM SUBMISSION
========================= */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const statusDiv = document.getElementById("formStatus");

    // Reset status
    statusDiv.textContent = "";
    statusDiv.style.color = "";

    fetch(contactForm.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          statusDiv.textContent = data.message;
          statusDiv.style.color = "green";
          contactForm.reset();
          grecaptcha.reset(); // reset reCAPTCHA
        } else {
          statusDiv.textContent = data.message;
          statusDiv.style.color = "red";
          grecaptcha.reset();
        }
      })
      .catch((error) => {
        statusDiv.textContent = "An error occurred. Please try again.";
        statusDiv.style.color = "red";
        grecaptcha.reset();
        console.error(error);
      });
  });
}
