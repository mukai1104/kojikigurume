document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".title");
  const intro = document.querySelector(".intro");
  const videos = document.querySelectorAll(".video-item");

  let spanTimers = [];
  let introAnimationStarted = false;

  const hasVisited = sessionStorage.getItem("visited");

  if (!hasVisited) {
    // 初回アクセス時のみアニメーション実行
    sessionStorage.setItem("visited", "true");

    title.classList.add("title-animate");

    title.addEventListener("animationend", () => {
      intro.classList.add("intro-animate");
    });

    intro.addEventListener("animationend", () => {
      if (introAnimationStarted) return;
      introAnimationStarted = true;

      const spans = intro.querySelectorAll("span");

      spans.forEach((span, i) => {
        const timerId = setTimeout(() => {
          span.classList.add("intro-line-animate");
        }, i * 2000);
        spanTimers.push(timerId);
      });

      const lastSpanDelay = (spans.length - 1) * 2000;
      const lastSpanDuration = 1500;
      const buffer = 300;

      setTimeout(() => {
        videos.forEach(v => v.classList.add("video-animate"));
      }, lastSpanDelay + lastSpanDuration + buffer);
    });

    // スキップ機能（クリック or タップ）
    const skipAnimations = () => {
      title.classList.remove("title-animate");
      intro.classList.remove("intro-animate");
      videos.forEach(v => v.classList.remove("video-animate"));

      title.classList.add("title-done");
      intro.classList.add("intro-done");
      videos.forEach(v => v.classList.add("video-done"));

      const spans = intro.querySelectorAll("span");
      spanTimers.forEach(id => clearTimeout(id));
      spanTimers = [];
      spans.forEach(span => {
        span.classList.remove("intro-line-animate");
        span.style.opacity = "1";
        span.style.transform = "translateY(0)";
      });
    };

    document.addEventListener("click", skipAnimations);
    document.addEventListener("touchstart", skipAnimations);
  } else {
    // 2回目以降は即表示
    title.classList.add("title-done");
    intro.classList.add("intro-done");
    videos.forEach(v => v.classList.add("video-done"));

    const spans = intro.querySelectorAll("span");
    spans.forEach(span => {
      span.style.opacity = "1";
      span.style.transform = "translateY(0)";
    });
  }

  // 動画アイテムクリックでローカルページに遷移
  videos.forEach(item => {
    item.addEventListener("click", () => {
      const episodePath = item.getAttribute("data-episode");
      if (episodePath) {
        window.location.href = episodePath;
      }
    });
  });
});
