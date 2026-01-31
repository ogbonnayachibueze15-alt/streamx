document.addEventListener("DOMContentLoaded", function() {
  const trendingContainer = document.getElementById("trending");
  const searchInput = document.getElementById("search");
  const searchBtn = document.getElementById("searchBtn");

  // Load default movies from TVMaze API
  async function loadMovies() {
    trendingContainer.innerHTML = "";
    try {
      const res = await fetch("https://api.tvmaze.com/shows");
      const data = await res.json();

      data.slice(0, 20).forEach(movie => {
        if (movie.image) {
          const img = document.createElement("img");
          img.src = movie.image.medium;
          img.alt = movie.name;
          img.classList.add("movie");
          trendingContainer.appendChild(img);
        }
      });
    } catch (err) {
      trendingContainer.innerHTML = "<p>Failed to load movies.</p>";
      console.error(err);
    }
  }

  loadMovies();

  // Search functionality
  searchBtn.addEventListener("click", async function() {
    const query = searchInput.value.trim();
    if (!query) return;

    trendingContainer.innerHTML = "";
    try {
      const res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
      const data = await res.json();

      if (data.length === 0) {
        trendingContainer.innerHTML = "<p>No results found.</p>";
        return;
      }

      data.forEach(item => {
        if (item.show.image) {
          const img = document.createElement("img");
          img.src = item.show.image.medium;
          img.alt = item.show.name;
          img.classList.add("movie");
          trendingContainer.appendChild(img);
        }
      });
    } catch (err) {
      trendingContainer.innerHTML = "<p>Search failed.</p>";
      console.error(err);
    }
  });
});
