document.addEventListener("DOMContentLoaded", function() {
    const photoContainers = document.querySelectorAll(".photo-container");
    const videoContainer = document.getElementById("video-display");
    const videoTextContainer = document.getElementById("video-text-display");

    function smoothScrollTo(targetY, duration) {
        const startY = window.scrollY;
        const distance = targetY - startY;
        let startTime = null;

        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1); // Easing factor
            window.scrollTo(0, startY + distance * easeInOutQuad(progress));

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        }

        requestAnimationFrame(animation);
    }

    photoContainers.forEach(photo => {
        photo.addEventListener("click", function() {
            const img = this.querySelector("img"); // retreive nested img element
            const videoId = img.getAttribute("data-video-id");

            const videoText = img.getAttribute("video-text")

            // Remove existing video
            videoContainer.innerHTML = "";

            // Create new iframe and insert it
            const iframe = document.createElement("iframe");
            iframe.src = `https://player.vimeo.com/video/${videoId}`;
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture");
            iframe.setAttribute("allowfullscreen", "true");
            iframe.setAttribute("loading", "lazy");

            videoContainer.appendChild(iframe);
            videoContainer.style.display = "block";

            // Adds custom text when added as 'video-text' in the photo container element
            videoTextContainer.innerHTML = videoText;




            // Custom smooth scroll to video
            const targetPosition = videoContainer.getBoundingClientRect().top + window.scrollY - 20; // Offset for better alignment
            smoothScrollTo(targetPosition, 800); // Adjust duration (800ms)
        });
    });
});