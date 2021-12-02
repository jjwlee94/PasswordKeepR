$(document).ready(function () {
  // Define constants from password_create.ejs
  const passwordLengthRange = document.getElementById("passwordLengthRange");
  const passwordLengthNumber = document.getElementById("passwordLengthNumber");
  const includeUppercaseElement = document.getElementById("includeUppercase");
  const includeNumbersElement = document.getElementById("includeNumbers");
  const includeSymbolsElement = document.getElementById("includeSymbols");
  const generateButton = document.getElementById("generate");
  const passwordDisplay = document.getElementById("passwordDisplay");

  // Synchronize range and number-input values on input
  passwordLengthNumber.addEventListener("input", syncPasswordLength);
  passwordLengthRange.addEventListener("input", syncPasswordLength);

  // Function to synchronize range and number-input values
  function syncPasswordLength(e) {
    const value = e.target.value;
    passwordLengthNumber.value = value;
    passwordLengthRange.value = value;
  }

  // Function to generate an array of characters by type
  const characterArray = function (low, high) {
    const result = [];
    for (let i = low; i <= high; i++) {
      result.push(i);
    }
    return result;
  };
  // Arrays of uppercase, lowercase, number, and symbol characters
  const uppercaseCharCodes = characterArray(65, 90);
  const lowercaseCharCodes = characterArray(97, 122);
  const numberCharCodes = characterArray(48, 57);
  const symbolCharCodes = characterArray(33, 47)
    .concat(characterArray(58, 64))
    .concat(characterArray(91, 96))
    .concat(characterArray(123, 126));

  // Function to generate random password
  const generatePassword = function (
    passwordLength,
    includeUppercase,
    includeNumbers,
    includeSymbols
  ) {
    let charCodes = lowercaseCharCodes;
    if (includeUppercase) charCodes = charCodes.concat(uppercaseCharCodes);
    if (includeSymbols) charCodes = charCodes.concat(symbolCharCodes);
    if (includeNumbers) charCodes = charCodes.concat(numberCharCodes);

    const passwordCharacters = [];
    for (let i = 0; i < passwordLength; i++) {
      const characterCode =
        charCodes[Math.floor(Math.random() * charCodes.length)];
      passwordCharacters.push(String.fromCharCode(characterCode));
    }
    return passwordCharacters.join("");
  };

  // const password = generatePassword();
  // console.log(password);

  // Function to display generated password on submit
  generateButton.addEventListener("click", function () {
    // e.preventDefault(e);
    const passwordLength = passwordLengthNumber.value;
    const includeUppercase = includeUppercaseElement.checked;
    const includeNumbers = includeNumbersElement.checked;
    const includeSymbols = includeSymbolsElement.checked;
    const password = generatePassword(
      passwordLength,
      includeUppercase,
      includeNumbers,
      includeSymbols
    );
    passwordDisplay.innerText = password;
    $("#password").val(password);
  });
});
