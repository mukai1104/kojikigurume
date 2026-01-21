document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("confirmModal");
  const playBtn = document.getElementById("playBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const playTrigger = document.getElementById("playTrigger");
  const videoWrapper = document.querySelector(".video-thumbnail-wrapper");

  let videoUrl = videoWrapper?.dataset.video || "";

  playTrigger?.addEventListener("click", () => {
    if (videoUrl) {
      modal.classList.remove("hidden");
    }
  });

  playBtn?.addEventListener("click", () => {
    modal.classList.add("hidden");
    if (videoUrl) {
      window.open(videoUrl, "_blank");
    }
  });

  cancelBtn?.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
});





