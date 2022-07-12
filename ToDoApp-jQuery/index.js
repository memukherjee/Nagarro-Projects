$(document).ready(function () {
  $("#input").change(function () {
    var input = $(this).val();
    if (input !== "") {
      $("ul").append(
        "<li>" + input + '<i class="fas fa-check fa-trash "> </li>'
      );
      $(this).val("");
    }
  });
  $("#add-btn").click(() => {
    var input = $("#input").val();
    if (input !== "") {
      $("ul").append(
        "<li>" + input + '<i class="fas fa-check fa-trash "> </li>'
      );
      $("#input").val("");
    }
  });
  $("ul").on("click", ".fa-trash", function () {
    $(this).parent("li").fadeOut(200);
  });
});
