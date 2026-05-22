/* ===== HEADER ===== */
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
});

/* ===== MOBILE MENU ===== */
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  document.body.classList.toggle("menu-open");
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    navLinks.classList.remove("open");
  });
});

/* ===== LAZY-LOAD TILE VIDEOS ===== */
/* Loads source on first viewport entry, then plays/pauses based on visibility
   so off-screen tiles stop streaming. */
const lazyVideoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const video = entry.target;
    if (entry.isIntersecting) {
      const src = video.querySelector("source[data-src]");
      if (src) {
        src.src = src.dataset.src;
        delete src.dataset.src;
        video.load();
      }
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });
}, { rootMargin: "150px" });

document.querySelectorAll(".work-item video").forEach(v => lazyVideoObserver.observe(v));

/* ===== WORK CATEGORY TABS ===== */
document.querySelectorAll("button.work-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.target;

    document.querySelectorAll(".work-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    document.querySelectorAll(".work-group").forEach(g => {
      g.classList.toggle("active", g.dataset.group === target);
    });
  });
});

/* ===== LIGHTBOX ===== */
const collections = {
  characters: [
    "./assets/exploration/characters/MariaMech.png",
    "./assets/exploration/characters/JoleneCut.png",
    "./assets/exploration/characters/DetonateLogos-05.png",
    "./assets/exploration/characters/studio_001.jpg",
    "./assets/exploration/characters/studio_003.jpg",
    "./assets/exploration/characters/studio_040.jpg",
    "./assets/exploration/characters/studio_075.jpg"
  ],
  environments: [
    "./assets/exploration/environments/InTheTrees.png",
    "./assets/exploration/environments/Fog.png",
    "./assets/exploration/environments/DancingCircles.png",
    "./assets/exploration/environments/double-double-1.2_0058_00000.png",
    "./assets/exploration/environments/floater0041.png",
    "./assets/exploration/environments/floater.mp4",
    "./assets/exploration/environments/studio_005.jpg",
    "./assets/exploration/environments/studio_052.jpg",
    "./assets/exploration/environments/studio_064.jpg"
  ],
  art: [
    "./assets/exploration/art/studio_010.jpg",
    "./assets/exploration/art/studio_032.jpg",
    "./assets/exploration/art/studio_044.jpg",
    "./assets/exploration/art/studio_047.jpg",
    "./assets/exploration/art/studio_048.jpg",
    "./assets/exploration/art/studio_049.jpg",
    "./assets/exploration/art/studio_051.jpg",
    "./assets/exploration/art/studio_053.jpg",
    "./assets/exploration/art/studio_056.jpg",
    "./assets/exploration/art/studio_059.jpg",
    "./assets/exploration/art/studio_061.jpg",
    "./assets/exploration/art/studio_062.jpg",
    "./assets/exploration/art/studio_063.jpg",
    "./assets/exploration/art/studio_065.jpg",
    "./assets/exploration/art/studio_068.jpg",
    "./assets/exploration/art/studio_070.jpg"
  ],
  fashion: [
    "./assets/exploration/Fashion/studio_036.jpg",
    "./assets/exploration/Fashion/studio_037.jpg",
    "./assets/exploration/Fashion/studio_039.jpg",
    "./assets/exploration/Fashion/studio_042.jpg",
    "./assets/exploration/Fashion/studio_050.jpg",
    "./assets/exploration/Fashion/studio_054.jpg",
    "./assets/exploration/Fashion/studio_055.jpg",
    "./assets/exploration/Fashion/studio_057.jpg",
    "./assets/exploration/Fashion/studio_058.jpg",
    "./assets/exploration/Fashion/studio_067.jpg"
  ],
  photography: [
    "./assets/exploration/photography/20180124_135438.jpg",
    "./assets/exploration/photography/eeeeeet5t5.jpg",
    "./assets/exploration/photography/q23fq4f.jpg"
  ]
};

const lightbox = document.getElementById("lightbox");
const lbImg = lightbox.querySelector(".lb-img");
const lbVideo = lightbox.querySelector(".lb-video");
let currentImages = [];
let idx = 0;

function isVideo(src) {
  return /\.(mp4|webm|mov)$/i.test(src);
}

function showLbItem(src) {
  if (isVideo(src)) {
    lightbox.classList.add("video-mode");
    lbImg.src = "";
    lbVideo.src = src;
    lbVideo.play().catch(() => {});
  } else {
    lightbox.classList.remove("video-mode");
    lbVideo.pause();
    lbVideo.src = "";
    lbImg.src = src;
  }
}

document.querySelectorAll(".art-item").forEach(item => {
  item.addEventListener("click", () => {
    const name = item.dataset.collection;
    currentImages = collections[name] || [];
    if (currentImages.length === 0) return;
    idx = 0;
    showLbItem(currentImages[idx]);
    lightbox.classList.add("open");
    document.body.classList.add("no-scroll");
  });
});

function close() {
  lightbox.classList.remove("open");
  document.body.classList.remove("no-scroll");
  lbVideo.pause();
}

lightbox.querySelector(".lightbox-bg").addEventListener("click", close);
lightbox.querySelector(".lb-close").addEventListener("click", close);

lightbox.querySelector(".lb-prev").addEventListener("click", () => {
  if (!currentImages.length) return;
  idx = (idx - 1 + currentImages.length) % currentImages.length;
  showLbItem(currentImages[idx]);
});

lightbox.querySelector(".lb-next").addEventListener("click", () => {
  if (!currentImages.length) return;
  idx = (idx + 1) % currentImages.length;
  showLbItem(currentImages[idx]);
});

document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") close();
  if (e.key === "ArrowLeft") lightbox.querySelector(".lb-prev").click();
  if (e.key === "ArrowRight") lightbox.querySelector(".lb-next").click();
});

/* ===== FADE IN ON SCROLL ===== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
}, { threshold: 0.1 });

document.querySelectorAll(".about-inner").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

document.head.insertAdjacentHTML("beforeend",
  `<style>.visible{opacity:1!important;transform:translateY(0)!important}</style>`
);
