// imageEffect (slower / smoother)
if (!('ontouchstart' in window) && !(navigator.maxTouchPoints > 0)) {
  document.querySelectorAll(".elem").forEach(function (elem) {
    var lastClientX = 0;
    var img = elem.querySelector("img");
    if (!img) return;

    var targetX = 0, targetY = 0;
    var raf = null;

    // hide on leave (smooth fade out)
    elem.addEventListener("mouseleave", function () {
      // cancel pending RAF so it doesn't force-show again
      if (raf) {
        cancelAnimationFrame(raf);
        raf = null;
      }
      gsap.to(img, {
        opacity: 0,
        duration: 0.45,
        ease: "power3.out"
      });
    });

    // update targets on mousemove but don't animate directly here
    elem.addEventListener("mousemove", function (dets) {
      var rect = elem.getBoundingClientRect();
      targetX = dets.clientX - rect.left; // left/top will be center due to CSS translate
      targetY = dets.clientY - rect.top;

      // keep a lightweight delta for rotation feel
      var deltaX = dets.clientX - lastClientX;
      lastClientX = dets.clientX;

      // schedule a single RAF if not already scheduled
      if (!raf) {
        raf = requestAnimationFrame(function tick() {
          // animate position + rotation + opacity in one GSAP tween
          gsap.to(img, {
            left: targetX,
            top: targetY,
            rotation: gsap.utils.clamp(-14, 14, deltaX * 0.4), // softer rotation
            opacity: 1,
            duration: 0.45,         // longer duration = smoother follow
            ease: "power3.out",
            overwrite: true
          });

          // clear raf handle so next mousemove schedules another frame
          raf = null;
        });
      }
    });
  });
} else {
  document.documentElement.classList.add('is-touch');
}
