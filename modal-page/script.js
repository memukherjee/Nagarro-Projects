$(document).ready(() => {
  $(".clicks").on("click", function () {
    $("#box").toggleClass("show");
  });
  $(".close").on("click", function () {
    $("#box").removeClass("show");
    $("#box").addClass("closing");
    $("#box").on("animationend", () => {
      $("#box").removeClass("closing");
    });
  });
  $("#submit-btn").click((e) => {
    let isUsernameValid = false;
    let isEmailValid = false;
    let username = $("#username").val();
    if (username.length < 3) {
      isUsernameValid = false;
      $("#username-warning").text("Invalid username");
    } else {
      isUsernameValid = true;
      $("#username-warning").text("");
    }
    let email = $("#email").val();
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      isEmailValid = false;
      $("#email-warning").text("Invalid email id");
    } else {
      isEmailValid = true;
      $("#email-warning").text("");
    }
    if (!(isUsernameValid && isEmailValid)) {
      return false;
    }
    else{
        $("box").removeClass("show")
        $("box").addClass("closing")
    }
  });
});
