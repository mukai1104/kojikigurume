document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".title");
  const intro = document.querySelector(".intro");
  const videos = document.querySelectorAll(".video-item");

  // タイトルから順番にアニメーション
  title.classList.add("title-animate");

  title.addEventListener("animationend", () => {
    intro.classList.add("intro-animate");
  });

  intro.addEventListener("animationend", () => {
    videos.forEach(v => v.classList.add("video-animate"));
  });

  // スキップ機能（クリック or タップ）
  const skipAnimations = () => {
    // アニメーション用クラスを外す
    title.classList.remove("title-animate");
    intro.classList.remove("intro-animate");
    videos.forEach(v => v.classList.remove("video-animate"));

    // 即表示用クラスを追加
    title.classList.add("title-done");
    intro.classList.add("intro-done");
    videos.forEach(v => v.classList.add("video-done"));
  };

  document.addEventListener("click", skipAnimations);
  document.addEventListener("touchstart", skipAnimations);
});
