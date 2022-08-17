const likeBtns = document.querySelectorAll(".like-btn");

likeBtns.forEach((likeBtn) => {
  likeBtn.addEventListener("click", (e) => {
    const likeIcon = e.target.firstElementChild;
    const likeCount = likeIcon.nextElementSibling;
    let isLiked = false;
    if(likeIcon.classList.toggle("fa-solid")){
        likeCount.innerText = parseInt(likeCount.innerText) + 1;
        isLiked = true;
    }
    else{
        likeCount.innerText = parseInt(likeCount.innerText) - 1;
        isLiked = false;
    }
    const data = {
        tweetId: e.target.getAttribute('data-tweetId'),
        userId: document.getElementById("userId").value,
        isLiked,
    };
    // console.log(data);
    fetch("/tweet/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => {
    //   console.log("Request complete! response:", res);
    });
  });
});
