const card = document.querySelector(".card");
const about = document.querySelector(".about");
function turnFront() {
  about.classList.add("hide-about");
  about.addEventListener(
    "transitionend",
    () => {
      card.classList.add("cardTurningFront");
      card.classList.remove("cardBack");
      about.classList.remove("hide-about");

      card.addEventListener(
        "animationend",
        () => {
          card.classList.add("cardFront");
          card.classList.remove("cardTurningFront");
        },
        { once: true }
      );
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
  if (!e.target.parentElement.classList.contains("project-link")) {
    if (card.classList.contains("cardFront")) {
      turnBack();
    } else if (card.classList.contains("cardBack")) {
      turnFront();
    }
  }
});
