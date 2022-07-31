const slides = document.querySelectorAll(".carousel-item");
const leftBtn = document.querySelector("#left");
const rightBtn = document.querySelector("#right");
let currentSlide = 0;

leftBtn.addEventListener("click", () => {
  goToSlide(currentSlide - 1);
  clearInterval(slideInterval);
});

rightBtn.addEventListener("click", () => {
  goToSlide(currentSlide + 1);
  clearInterval(slideInterval);
});

function goToSlide(slideNo) {
  slideNo = slideNo < 0 ? slides.length - 1 : slideNo;
  slideNo = slideNo >= slides.length ? 0 : slideNo;
  slides[currentSlide].classList.remove("active");
  slides[slideNo].classList.add("active");
  currentSlide = slideNo;
}
const slideInterval = setInterval(() => {
  goToSlide(currentSlide + 1);
}, 3000);

const timerInterval = setInterval(() => {
    const current = new Date();
    let hr = current.getHours();
    let min = current.getMinutes();
    let sec = current.getSeconds();
    sec = 60-sec;
    min = 60-min;
    min = sec===0?min:min-1;
    hr = 24-hr;
    hr = (min===0&&sec===0)?hr:hr-1;
    document.querySelector('.hour').innerText = hr.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+"hr";
    document.querySelector('.minute').innerText = min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+"min";
    document.querySelector('.second').innerText = sec.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+"sec";
},1000);

const msInterval = setInterval(() => {
    document.querySelector('.milisecond').innerText = 1000-new Date().getMilliseconds();
}, 1);