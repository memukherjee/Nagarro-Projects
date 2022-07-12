const card = document.querySelector(".card");
const avatar = document.querySelector(".avatar");
const info = document.querySelector(".info");
const projects = document.querySelector(".projects");

function turnFront() {
  card.classList.add("cardTurningFront");
  card.classList.remove("cardBack");

  card.addEventListener(
    "animationend",
    () => {
      card.classList.add("cardFront");
      card.classList.remove("cardTurningFront");
    },
    { once: true }
  );
}

async function turnBack() {
  card.classList.add("cardTurningBack");
  card.classList.remove("cardFront");
  card.addEventListener(
    "animationend",
    () => {
      card.classList.add("cardBack");
      card.classList.remove("cardTurningBack");
    },
    { once: true }
  );
}

card.addEventListener("click", (e) => {
  if (!e.target.classList.contains("project-link")) {
    if (card.classList.contains("cardFront")) {
      turnBack();
    } else if (card.classList.contains("cardBack")) {
      turnFront();
    }
  }
});
