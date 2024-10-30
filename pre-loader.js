window.onload = function() {
  // Re-split the text every time to reset animations on page refresh
  const splitTitle = new SplitType('.h-h1', { types: 'words' });
  
  const tl = gsap.timeline();

  // Counter animation to complete within 1.5 seconds
  tl.to({}, {
    duration: 1.5,
    onUpdate: function() {
      document.querySelector('#counter').textContent = Math.round(this.progress() * 100) + '%';
    }
  });

  // Animation for .loader_col_01 (stagger from center)
  tl.to(".top_wrap .loader_col_01", {
    scaleY: 0,
    transformOrigin: "bottom center",
    stagger: { amount: 0.2, from: "center" },
    duration: 0.5,
    ease: "power3.out"
  }, "<");

  tl.to(".bottom_wrap .loader_col_01", {
    scaleY: 0,
    transformOrigin: "top center",
    stagger: { amount: 0.2, from: "center" },
    duration: 0.5,
    ease: "power3.out"
  }, "<");

  // Fade-in for main elements and lines
  tl.to(["#counter", ".loading_text", ".blokkplay_logo", ".lottie_logo"], {
    opacity: 1,
    duration: 0.3,
    ease: "power2.out"
  }, "+=0.5")
    .to(".line_left", { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "<")
    .to(".line_right", { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "<");

  // Fade-out of elements and animation of .loader_col_02 immediately after 1.5s
  tl.to(["#counter", ".loading_text", ".blokkplay_logo", ".lottie_logo", ".line_left", ".line_right"], {
    opacity: 0,
    duration: 0.5,
    ease: "power4.out"
  }, "+=0.1");

  // Animate .loader_col_02 without affecting title text or other sections
  tl.to(".top_wrap .loader_col_02", {
    y: "-100%",
    transformOrigin: "bottom center",
    stagger: { amount: 0.2, from: "center" },
    duration: 0.6,
    ease: "power3.out"
  }, "<");

  tl.to(".bottom_wrap .loader_col_02", {
    y: "100%",
    transformOrigin: "top center",
    stagger: { amount: 0.2, from: "center" },
    duration: 0.6,
    ease: "power3.out",
    onComplete: () => {
      // Set display: none after all animations complete
      gsap.set(".pre_loader_wrap", { display: "none" });
    }
  }, "<");

  // Title word animation (.h-h1) (move from y:20 to y:0 with opacity from 0 to 1)
  tl.from(splitTitle.words, {
    opacity: 0,
    y: 20,
    duration: 1.2,
    stagger: { amount: 0.4, from: "center" },
    ease: "power3.out"
  }, "<");  // Start with .loader_col_02
};
