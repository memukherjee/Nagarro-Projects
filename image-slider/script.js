let currentSlideIndex = 1;
const bgcolors = ["#ffc28d","#7bc3a8","#c98eda"]
currentSlide(currentSlideIndex);

document.querySelector("#left").addEventListener("click", () => {
  currentSlide(currentSlideIndex - 1);
  clearInterval(slideInterval);
});

document.querySelector("#right").addEventListener("click", () => {
  currentSlide(currentSlideIndex + 1);
  clearInterval(slideInterval);
});

function currentSlide(n) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  n = n > slides.length ? 1 : n;
  n = n === 0 ? slides.length : n;
  slides[currentSlideIndex - 1].classList.add("slide-out");
  slides[currentSlideIndex - 1].addEventListener(
    "animationend",
    () => {
      slides[currentSlideIndex - 1].classList.remove("slide-out");
      slides[currentSlideIndex - 1].classList.remove('visible');
      dots[currentSlideIndex - 1].classList.remove("active-dot");
      slides[n - 1].classList.add('visible');
      dots[n - 1].classList.add("active-dot");
      document.querySelector('body').style.backgroundColor = bgcolors[n-1];
      currentSlideIndex = n;
    },
    { once: true }
  );
}

let slideInterval = setInterval(()=>{
    currentSlide(currentSlideIndex+1);
},3000)
