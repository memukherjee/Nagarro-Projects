const surnameText = "Mukherjee";
let count = 0;
let isIncreasing = true;
setInterval(() => {
  let surname = document.querySelector(".surname");
  if (surname) {
    surname.innerHTML = surnameText.substring(0, count);
    if (isIncreasing) {
      count++;
    } else {
      count--;
    }
    isIncreasing = count > surnameText.length ? false : isIncreasing;
    isIncreasing = count < 0 ? true : isIncreasing;
  }
}, 500);

const navLinks = document.querySelectorAll(".nav-link");

loadDoc("home");
loadDoc("about");
loadDoc("skills");
loadDoc("projects");
loadDoc("contact");
loadDoc("education");

function navChange(elementIndex) {
  document.querySelector(".active-nav").classList.remove("active-nav");
  navLinks[elementIndex].classList.add("active-nav");
}

function loadDoc(filename) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.querySelector(`#${filename}`).innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", `./${filename}.html`, true);
  xhttp.send();
}

// Modal
function showModal(element) {
  document.querySelector("#box").classList.toggle("show");
  const frameMsg = document.querySelector("#frame-message");
  const projectFrame = document.querySelector("#project-frame");
  if (element.target.nextElementSibling.firstElementChild !== null) {
    projectFrame.style.display = "none";
    frameMsg.innerHTML = "Loading...";
    frameMsg.style.display = "Block";
    const frameLink = element.target.nextElementSibling.firstElementChild.href;
    console.log(frameLink);
    projectFrame.src = frameLink;
    projectFrame.onload = function () {
      console.log("loaded");
      projectFrame.style.display = "block";
      frameMsg.style.display = "none";
    };
  } else {
    projectFrame.style.display = "none";
    frameMsg.innerHTML = "Nothing to Show Here.";
    frameMsg.style.display = "Block";
  }
}
function closeModal() {
  document.querySelector("#box").classList.remove("show");
  document.querySelector("#box").classList.add("closing");
  document.querySelector("#box").addEventListener(
    "animationend",
    () => {
      document.querySelector("#box").classList.remove("closing");
    },
    { once: true }
  );
}

window.addEventListener("scroll", (e) => {
  if (window.pageYOffset > 100) {
    document.querySelector(".navbar").classList.add("navbar-transparent");
    document.querySelector(".go-to-top-btn").classList.add("visible-btn");
  } else {
    document.querySelector(".navbar").classList.remove("navbar-transparent");
    document.querySelector(".go-to-top-btn").classList.remove("visible-btn");
  }

  if (window.pageYOffset < document.querySelector("#about").offsetTop * 0.3) {
    navChange(0);
  } else if (
    window.pageYOffset <
    document.querySelector("#skills").offsetTop * 0.7
  ) {
    navChange(1);
  } else if (
    window.pageYOffset <
    document.querySelector("#projects").offsetTop * 0.8
  ) {
    navChange(2);
  } else if (
    window.pageYOffset <
    document.querySelector("#contact").offsetTop * 0.8
  ) {
    navChange(3);
  } else {
    navChange(4);
  }
});

showAlert("Welcome to my Portfolio!");

function showAlert(message) {
  const alertBox = document.querySelector("#alert-box");
  alertBox.innerHTML = message;
  alertBox.classList.add("show");
  setTimeout(() => {
    alertBox.classList.remove("show");
    alertBox.classList.add("closing");
    alertBox.addEventListener("animationend", () => {
      alertBox.classList.remove("closing");
    },{once:true});
  }, 4000);
}

// Send Email
function sendMail(e) {
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const message = document.querySelector("#message");
  const token = "903f6cf4-d6d5-4291-a279-e9c511abd0ea";

  console.log(name, email, message);

  e.preventDefault();
  Email.send({
    SecureToken: token,
    To: "akash3.11.2000@gmail.com,"+email.value,
    From: "akash3.11.2000@gmail.com",
    Subject: `Message from ${name.value}`,
    Body: message.value
  })
    .then((message) => {
      showAlert(message);
      email.value = "";
      name.value = "";
      message.value = "";
    })
    .catch((err) => console.log(err));
}