const joke = document.getElementById("joke");
const jokeTitle = document.getElementById("joke-title");
const reloadBtn = document.getElementById("reload-btn");
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input')

function getJoke() {
  fetch("/joke")
    .then((res) => res.json())
    .then((data) => {
      joke.innerHTML = data.joke;
      jokeTitle.innerHTML = "Joke #" + data.jokeId;
      reloadBtn.classList.remove('rotate');
    })
    .catch((err) => console.log(err));
}

function gotoUrl(){
  const id = searchInput.value
  if(id!=="")
    window.location = `/joke/${id}`
}

getJoke();

reloadBtn.addEventListener("click", () => {
  joke.innerHTML = `<div class="spinner-border text-light" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>`;
  reloadBtn.classList.add('rotate')
  getJoke();
});

searchInput.addEventListener('keypress',(e)=>{
  if(e.key==='Enter'){
    gotoUrl();
  }
})

searchBtn.addEventListener('click',()=>{
  gotoUrl();
})
