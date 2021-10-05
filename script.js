"use strict";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");

  //Add eventListeners
  document.querySelector("#fading-button").addEventListener("click", fadeText);
  document
    .querySelector("#fading-text")
    .addEventListener("keydown", enterKeyHandler);
});

function enterKeyHandler(event) {
  if (event.keyCode === 13) {
    //Prevent linebreak
    event.preventDefault();

    //Remove focus
    document.activeElement.blur();

    //Start animation
    fadeText();
  }
}

function fadeText() {
  //Get textToFade
  const textToFade = getTextToFade();

  //Remove the text from DOM
  removeTextToFade();

  //Split textToFade into an array
  const characters = getTextToFadeCharacters(textToFade);

  //Declare incrementable variable for delay
  let delay = 0;

  //Iterate through characters
  characters.forEach((character) => {
    //Create span element and fill with character
    const charSpan = document.createElement("span");

    //Add character to span element
    charSpan.textContent = character;

    //Add width to circumvent spaces collapsing
    if (character === " ") {
      charSpan.style.width = "0.85rem";
    }

    //Add fade animation class
    charSpan.classList.add("fade");

    //Add animation delay
    charSpan.style.animationDelay = `${delay * 10}ms`;

    //Add eventListener to last span
    if (characters.length - 1 === delay) {
      charSpan.addEventListener("animationend", focusText);
    }

    //Append span to text container
    document.querySelector("#fading-text").appendChild(charSpan);

    //Increment delay
    delay++;
  });
}

function getTextToFade() {
  return document.querySelector("#fading-text").textContent;
}

function removeTextToFade() {
  document.querySelector("#fading-text").textContent = "";
}

function getTextToFadeCharacters(string) {
  return string.split("");
}

function focusText() {
  document.querySelector("#fading-text").focus();
}
