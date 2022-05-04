gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray("section").forEach((section, index) => {
    const w = section.querySelector(".wrapper");
    const [x, xEnd] =
      index % 2
        ? ["100%", (w.scrollWidth - section.offsetWidth) * -1]
        : [w.scrollWidth * -1, 0];
    gsap.fromTo(
      w,
      { x },
      {
        x: xEnd,
        scrollTrigger: {
          trigger: section,
          scrub: 0.5
        }
      }
    );
  });

  gsap.to(".scimmia", {
    yPercent: -15,
    xPercent: 5,
    rotation: 2,
    ease: Elastic.easeOut.config(10, 1),
    scrollTrigger: {
      trigger: ".scimmia",
      scrub: 3
    }, 
  });

  gsap.to(".banana", {
    yPercent: 1,
    xPercent: 2,
    rotation: 20,
    ease: Elastic.easeOut.config(10, 0),
    scrollTrigger: {
      trigger: ".banana",
      scrub: 1
    }, 
  });

// sezione lavori
const sezioni = gsap.utils.toArray("sezione");
let maxWidth = 0;

const getMaxWidth = () => {
  maxWidth = 0;
  sezioni.forEach((sezione) => {
    maxWidth += sezione.offsetWidth;
  });
};
getMaxWidth();
ScrollTrigger.addEventListener("refreshInit", getMaxWidth);

gsap.to(sezioni, {
  x: () => `-${maxWidth - window.innerWidth}`,
  ease: "none",
  scrollTrigger: {
    trigger: ".wrapper-sezione",
    pin: true,
    scrub: true,
    end: () => `+=${maxWidth}`,
    invalidateOnRefresh: true
  }
});

sezioni.forEach((sct, i) => {
  ScrollTrigger.create({
    trigger: sct,
    start: () => 'top top-=' + (sct.offsetLeft - window.innerWidth/2) * (maxWidth / (maxWidth - window.innerWidth)),
    end: () => '+=' + sct.offsetWidth * (maxWidth / (maxWidth - window.innerWidth)),
    toggleClass: {targets: sct, className: "active"}
  });
});

// contatti foglie
const leftLeaves = document.querySelectorAll('[href="#leftLeave"]');
const rightLeaves = document.querySelectorAll('[href="#rightLeave"]');
const smallLeaves = document.querySelectorAll('[href="#smallLeaf"]');
const text = document.querySelector('.text');
const letters = document.querySelectorAll('.text path');
leftLeaves.forEach((leaf, i) => {
  const index = i / (leftLeaves.length - 1);
  gsap.set(leaf, {
    rotate: index * -45 + 10,
    transformOrigin: 'right bottom'
  });
  gsap.to(leaf, {
    scrollTrigger: {
      trigger: ".contatti",
      scrub: 0.2,
      start: `${index * 40}% top`,
      end: `${index * 60 + 40}% bottom`,
    },
    x: 150,
    y: 300,
    rotate: 15 - (Math.sin(index * Math.PI / 2 - (Math.PI / 2)) * 10),
    scale: 1.3
  });
});
rightLeaves.forEach((leaf, i) => {
  const index = i / (rightLeaves.length - 1);
  gsap.set(leaf, {
    rotate: index * 45 - 10,
    transformOrigin: 'left bottom'
  });
  gsap.to(leaf, {
    scrollTrigger: {
      trigger: ".contatti",
      scrub: 0.2,
      start: `${index * 40}% top`,
      end: `${index * 60 + 40}% bottom`,
    },
    x: -150,
    y: 300,
    rotate: -15 + (Math.sin(index * Math.PI / 2 - (Math.PI / 2)) * 10),
    scale: 1.3
  });
});

smallLeaves.forEach((leaf, i) => {
  gsap.set(leaf, {
    y: Math.random() * 900,
    x: Math.random() * 1000,
    scale: Math.random() * 0.5 + 0.2,
    transformOrigin: '50% 50%'
  });
  const start = Math.random() * 40 + 40;
  const end = Math.min(100, start + Math.random() * 50);
  gsap.to(leaf, {
    scrollTrigger: {
      trigger: ".contatti",
      scrub: 0.2,
      start: `top top`,
      end: `bottom bottom`
    },
    scale: Math.random() * 0.5 + 0.2,
    x: Math.random() * 1600,
    y: Math.random() * 900,
    rotate: Math.random() * 1000 + 360
  });
});

letters.forEach((letter, i) => {
  gsap.from(letter, {
    scrollTrigger: {
      trigger: ".contatti",
      scrub: 0.2,
      start: `${(i / (letters.length - 1)) * 50 + 30}% bottom`,
      end: `${(i / (letters.length - 1)) * 50 + 50}% bottom`
    },
    opacity: 0,
    y: '+=100',
    rotate: 180,
    scale: 2,
    transformOrigin: '50% 50%'
  });
});

// Hack to hide the render of the SVG
requestAnimationFrame(() => {
  document.querySelector('.foglie').style.opacity = 1;
});