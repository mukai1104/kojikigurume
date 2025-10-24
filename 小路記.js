document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".title");
  const intro = document.querySelector(".intro");
  const videos = document.querySelectorAll(".video-item");

  let spanTimers = [];

  // タイトルから順番にアニメーション
  title.classList.add("title-animate");

  title.addEventListener("animationend", () => {
    intro.classList.add("intro-animate");
  });

 intro.addEventListener("animationend", () => {
  const spans = intro.querySelectorAll("span");

  spans.forEach((span, i) => {
  const timerId = setTimeout(() => {
    span.classList.add("intro-line-animate");
  }, i * 2000);
  spanTimers.push(timerId);
});


  // 最後のスパンが出終わるタイミングを正確に計算
  const lastSpanDelay = (spans.length - 1) * 2000;
  const lastSpanDuration = 1500; // 1.5秒（CSSのアニメーション時間）
  const buffer = 300; // 少し余裕を持たせる

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

  // スパン即表示＋タイマーキャンセル
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



  const modal = document.getElementById("confirmModal");
  const playBtn = document.getElementById("playBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  const links = document.querySelectorAll(".thumbnail-wrapper");

  links.forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // 一旦止める
      const url = link.getAttribute("href");

      modal.classList.remove("hidden");

      playBtn.onclick = () => {
        modal.classList.add("hidden");
        window.location.href = url;
      };

      cancelBtn.onclick = () => {
        modal.classList.add("hidden");
      };
    });
  });

});
