const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const main = document.getElementById("main");

function getMovieData() {
  const movieName = input.value;
  const url = `https://www.omdbapi.com/?t=${movieName}&apikey=4bda7f7c`;
  if (movieName !== "") {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.Response === "True") {
          main.innerHTML = `
            <div class="poster">
                <img src="${data.Poster}" alt="poster"/>
            </div>
            <div class="info">
                <h1 class="name d-inline m-0">${data.Title}</h1>
                <span class="year small">(${data.Year})</span>
                <h4 class="genre my-2">Genre: ${data.Genre}</h4>
                <h5 class="language">Language: ${data.Language}</h5>
            </div>
            <div class="plot">
                <p>${data.Plot}</p>
            </div>
            `;
        } else {
          main.innerHTML = `<h1 class="lead m-auto fw-bold">Movie Not found</h1>`;
        }
      })
      .catch((err) => console.log(err));
  }
}

searchBtn.addEventListener("click", () => {
  main.innerHTML = `
            <div class="spinner-border text-light m-auto" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            `;
  getMovieData();
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    main.innerHTML = `
            <div class="spinner-border text-light m-auto" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            `;
    getMovieData();
  }
});
