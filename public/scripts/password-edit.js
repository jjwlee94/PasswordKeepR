$(document).ready(function () {
  const paragraph = document.getElementById("password");
  const edit_button = document.getElementById("edit-button");
  const save_button = document.getElementById("save-button");

  edit_button.addEventListener("click", function () {
    paragraph.contentEditable = true;
    paragraph.style.backgroundColor = "#dddbdb";
  });

  save_button.addEventListener("click", function () {
    paragraph.contentEditable = false;
    paragraph.style.backgroundColor = "white";
  });
});
