const header = document.querySelector("header");

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

// const ml_section = document.querySelector(".milestones");
// const ml_counters = document.querySelectorAll(".number span");
let skillsPlayed = false;
// let mlPlayed = false;

const links = document.querySelectorAll(".nav-link");
const toggle_btn = document.querySelector(".toggle-btn");
const hamburger = document.querySelector(".hamburger");


window.addEventListener("scroll", () => {
  activeLink();
  if (!skillsPlayed) skillsCounter();
  // if (!mlPlayed) mlCounter();
});

function updateCount(num, maxNum) {
  let currentNum = +num.innerText;

  if (currentNum < maxNum) {
    num.innerText = currentNum + 1;
    setTimeout(() => {
      updateCount(num, maxNum);
    }, 12);
  }
}

// sticky navbar

function stickyNavbar() {
  header.classList.toggle("scrolled", window.pageYOffset > 0);
}

stickyNavbar();

window.addEventListener("scroll", stickyNavbar);

// Reveal Animation on Page load

let sr = ScrollReveal({
  duration: 2500,
  distance: "60px",
});

sr.reveal(".showcase-info", { delay: 500 });
sr.reveal(".showcase-image", { origin: "top", delay: 600 });

// Skills Progress Bar
function hasReached(el) {
  let topPosition = el.getBoundingClientRect().top;
  if (window.innerHeight >= topPosition + el.offsetHeight) return true;
  return false;
}

function skillsCounter() {
  if (!hasReached(first_skill)) return;

  skillsPlayed = true;

  sk_counters.forEach((counter, i) => {
    let target = +counter.dataset.target;
    let strokeValue = 427 - 427 * (target/100);
    progress_bars[i].style.setProperty("--target", strokeValue);

    setTimeout(() => {
      updateCount(counter, target);
    }, 400);
  });

  progress_bars.forEach(
    (p) => (p.style.animation = "progress 2s ease-in-out forwards")
  );
}

// Services Counter Animation

// function mlCounter() {
//   if(!hasReached(ml_section)) return;

//   mlPlayed = true;
//   ml_counters.forEach((ctr) => {
//     let target = +ctr.dataset.target;
//     setTimeout(() => {
//       updateCount(ctr, target);
//     }, 400);
//   });
// }

// mlCounter();

// Portfolio Filter Animation
let mixer = mixitup(".portfolio-gallery", {
  selectors: {
    target: ".prt-card",
  },
  animation: {
    duration: 500,
  },
});

function activeLink() {
  let sections = document.querySelectorAll("section[id]");
  let passedSections = Array.from(sections).map((sct, i) => {
    return {
      y:sct.getBoundingClientRect().top - header.offsetHeight,
      id: i
    };
  }).filter(sct => sct.y <= 0);

  let currSectionID = passedSections.at(-1).id;
  
  links.forEach(l => l.classList.remove("active"));
  links[currSectionID].classList.add("active");
}

activeLink();

// Change theme

let firstTheme = localStorage.getItem("dark");
changeTheme(+firstTheme);

function changeTheme(isDark) {
  if (isDark) {
    document.body.classList.add("dark");
    toggle_btn.classList.replace("uil-moon","uil-sun");
    localStorage.setItem("dark", 1);
  }
  else {
    document.body.classList.remove("dark");
    toggle_btn.classList.replace("uil-sun","uil-moon");
    localStorage.setItem("dark", 0);
  }
}


toggle_btn.addEventListener("click", () => {
  changeTheme(!document.body.classList.contains("dark"));
});


// Open and close hamburger

hamburger.addEventListener("click", () => {
  document.body.classList.toggle("open");
  document.body.classList.toggle("stopScrolling");
});

links.forEach((link) => link.addEventListener("click", () => {
  document.body.classList.remove("open");
  document.body.classList.remove("stopScrolling");
}));