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

loadDoc("home");

function navChange(element) {
  document.querySelector(".active-nav").classList.remove("active-nav");
  element.classList.add("active-nav");
}

function loadDoc(filename, e) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.querySelector(".main-body").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", `./${filename}.html`, true);
  xhttp.send();
  if (typeof e !== "undefined") {
    navChange(e.target);
  }
}

// Modal
function showModal(element) {
  document.querySelector("#box").classList.toggle("show");
  if(element.target.nextElementSibling.firstElementChild!==null){
    document.querySelector("#project-frame").style.display = "block";
    document.querySelector("#nothing").style.display = "none";
    const frameLink = element.target.nextElementSibling.firstElementChild.href;
    document.querySelector("#project-frame").src = frameLink;
  }
  else{
    document.querySelector("#project-frame").style.display = "none";
    document.querySelector("#nothing").style.display = "Block";
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
