import "./styles/styles.scss";

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

        // Try to play (required for autoplay policies)
        video.play().catch(() => {
          // Fails silently if browser blocks autoplay
        });
      } else {
        card.classList.remove("active");

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
   OPTIONAL: DEBUG LOGGING
========================= */
// Uncomment if videos still don't show
// videoCards.forEach(card => {
//   const video = card.querySelector("video");
//   console.log("Video found:", video?.src);
// });
