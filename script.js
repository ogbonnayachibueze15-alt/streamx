document.addEventListener("DOMContentLoaded", function() {
  const trendingContainer = document.getElementById("trending");
  const searchInput = document.getElementById("search");
  const searchBtn = document.getElementById("searchBtn");

  const videoModal = document.getElementById("video-modal");
  const player = document.getElementById("player");
  const downloadLink = document.getElementById("download-link");
  const closeVideo = document.getElementById("close-video");

  // Example movies with sample MP4 URLs
  const movies = [
    {
      title: "Sample Movie 1",
      image: "https://via.placeholder.com/200x300.png?text=Movie+1",
      video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
    },
    {
      title: "Sample Movie 2",
      image: "https://via.placeholder.com/200x300.png?text=Movie+2",
      video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
    },
    {
      title: "Sample Movie 3",
      image: "https://via.placeholder.com/200x300.png?text=Movie+3",
      video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
    },
    {
      title: "Sample Movie 4",
      image: "https://via.placeholder.com/200x300.png?text=Movie+4",
      video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
    }
  ];

  // Show movies
  function showMovies(list) {
    trendingContainer.innerHTML = "";
    list.forEach(movie => {
      const movieDiv = document.createElement("div");
      movieDiv.classList.add("movie");

      movieDiv.innerHTML = `<img src="${movie.image}" alt="${movie.title}">`;

      // Play movie on click
      movieDiv.addEventListener("click", () => {
        player.src = movie.video;
        downloadLink.href = movie.video;
        videoModal.style.display = "flex";
        player.play();
      });

      trendingContainer.appendChild(movieDiv);
    });
  }

  showMovies(movies);

  // Search
  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;

    const filtered = movies.filter(m => m.title.toLowerCase().includes(query));
    showMovies(filtered);
  });

  // Close video
  closeVideo.addEventListener("click", () => {
    player.pause();
    videoModal.style.display = "none";
  });

  window.addEventListener("click", e => {
    if (e.target == videoModal) {
      player.pause();
      videoModal.style.display = "none";
    }
  });
});
