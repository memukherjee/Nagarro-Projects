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
