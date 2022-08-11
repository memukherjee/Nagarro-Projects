const card = document.querySelector(".card");
const about = document.querySelector(".about");
const avatar = document.querySelector(".avatar");

document.addEventListener("DOMContentLoaded", function () {
  avatar.classList.remove('img-cap');
  avatar.addEventListener('transitionend',()=>{
    document.querySelector('.projects').classList.remove('invisible');
    document.querySelector('.info').classList.remove('info-start');
  })
})

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
  if (card.classList.contains("cardFront")) {
    turnBack();
  } else if (card.classList.contains("cardBack")) {
    turnFront();
  }
});

document.querySelector(".projects").addEventListener("click", (e) => {
  e.stopPropagation();
});

document.querySelectorAll(".info span").forEach((e) =>
  e.addEventListener("click", (e) => {
    e.stopPropagation();
  })
);

// Dark mode

const moonPath =
  "M15.1881 29.3293C19.4644 43.9027 35.2643 51.5767 35.6866 53.016C21.1133 57.2923 5.83258 48.9449 1.5563 34.3715C-2.71998 19.7981 5.62748 4.5174 20.2009 0.241121C20.2009 0.241121 10.9118 14.7559 15.1881 29.3293Z";
const sunPath =
  "M55 27.5C55 42.6878 42.6878 55 27.5 55C12.3122 55 0 42.6878 0 27.5C0 12.3122 12.3122 0 27.5 0C42.6878 0 55 12.3122 55 27.5Z";
const darkMode = document.querySelector("#darkmode");
let toggle = false;
darkmode.addEventListener("click", () => {
  const timeline = anime.timeline({
    duration: 750,
    easing: "easeOutExpo",
  });
  timeline
    .add({
      targets: ".sun",
      d: [{ value: toggle ? sunPath : moonPath }],
    })
    .add(
      {
        targets: "#darkmode",
        rotate: toggle ? 540 : 360,
      },
      "-= 350"
    );
  document.querySelector("body").classList.toggle("dark");
  if (!toggle) {
    toggle = true;
  } else {
    toggle = false;
  }
});

// Populate Projects
function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

readTextFile("projects.json", function (text) {
  var data = JSON.parse(text);
  var projects = document.querySelector("#project-body");
  projects.innerHTML = "";
  data.forEach((project) => {
    let inner = "";
    inner += `<tr>
      <td> 
        <span>
          ${project.name}
        </span>
      </td>
      <td>`;
    if (project.site_url !== "") {
      inner += `<a href="${
        "." + project.site_url
      }" target="_blank" rel="noopener noreferrer" class="project-link">
          <i class="fa-solid fa-link"></i>
        </a>`;
    }
    inner += `</td>
    <td>
        <a href="${project.repo_url}" target="_blank" class="project-link" rel="noopener noreferrer"><i class="fa-solid fa-code"></i></a>
      </td>
    </tr>`;
    projects.innerHTML += inner;
  });
});
