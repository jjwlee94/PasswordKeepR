const paragraph = document.getElementById("myInput");
const edit_button = document.getElementById("edit-button");
const end_button = document.getElementById("save-button");

edit_button.addEventListener("click", function () {
  paragraph.contentEditable = true;
  paragraph.style.backgroundColor = "#dddbdb";
});

end_button.addEventListener("click", function () {
  paragraph.contentEditable = false;
  paragraph.style.backgroundColor = "#ffe44d";
});
