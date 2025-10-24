document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".title");
  const intro = document.querySelector(".intro");
  const videos = document.querySelectorAll(".video-item");
  const modal = document.getElementById("confirmModal");
  const playBtn = document.getElementById("playBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const links = document.querySelectorAll(".thumbnail-wrapper");

  let spanTimers = [];
  let introAnimationStarted = false;
  let pendingUrl = "";

  // タイトルから順番にアニメーション
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
    if (!modal.classList.contains("hidden")) return; // モーダル表示中はスキップ無効

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

  // モーダル表示と再生処理
  links.forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      pendingUrl = link.getAttribute("href");
      modal.classList.remove("hidden");
    });
  });

  playBtn.onclick = () => {
    modal.classList.add("hidden");
    if (pendingUrl) {
      window.location.href = pendingUrl;
    }
  };

  cancelBtn.onclick = () => {
    modal.classList.add("hidden");
    pendingUrl = "";
  };
});

