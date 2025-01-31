document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.getElementById("menu-icon");
    const mobileMenu = document.getElementById("mobile-menu");
    const body = document.body;

    menuIcon.addEventListener("click", function() {
        if (mobileMenu.classList.contains("active")) {
            mobileMenu.style.height = "0px";
            mobileMenu.classList.remove("active");
        } else {
            mobileMenu.style.height = mobileMenu.scrollHeight + "px";
            mobileMenu.classList.add("active");
        }
    });
});