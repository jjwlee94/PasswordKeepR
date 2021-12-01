// Function to copy password
function copyPassword() {
  const copyText = document.getElementById("myInput");
  navigator.clipboard.writeText(copyText.value);
}
