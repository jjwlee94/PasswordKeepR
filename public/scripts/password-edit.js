// Functions to edit and save the new password

const editText = function (element) {
  const paragraph = document.getElementById(`password-${element}`);
  paragraph.contentEditable = true;
  paragraph.style.backgroundColor = "#dddbdb";
};

const saveText = function (element) {
  const paragraph = document.getElementById(`password-${element}`);
  paragraph.contentEditable = false;
  paragraph.style.backgroundColor = "transparent";
};
