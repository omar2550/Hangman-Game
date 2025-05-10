// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";
// Get Letters In Array
let lettersArray = Array.from(letters);
// Select Letters Conteinar
let lettersContainer = document.querySelector(".letters");
// Ganerate Letters
lettersArray.forEach((letter) => {
  let span = document.createElement("span");

  span.appendChild(document.createTextNode(letter));

  span.className = "letter-box";

  lettersContainer.appendChild(span);
});

// category

async function getWords() {
  let words = await fetch("category.json");
  words = await words.json();
  try {
    let allKeys = Object.keys(words);

    let randemPropNumber = Math.floor(Math.random() * allKeys.length);

    let randemPropName = allKeys[randemPropNumber];

    let randomPropValue = words[randemPropName];

    let randemValueNumber = Math.floor(Math.random() * randomPropValue.length);

    let randomWord = randomPropValue[randemValueNumber];

    document.querySelector(".category span").innerHTML = randemPropName;

    // Letters Guess
    let letterGuessContainer = document.querySelector(".letters-guess");

    let lettersAndSpace = Array.from(randomWord);

    lettersAndSpace.forEach((letter) => {
      let span = document.createElement("span");

      if (letter === " ") {
        span.className = "with-space";
      }

      letterGuessContainer.appendChild(span);
    });

    // Handle Clicking on litters

    let guessSpans = document.querySelectorAll(".letters-guess span");

    let wrongCount = 0;

    let hangDraw = document.querySelector(".hangman-draw");
    let clickedLetterArray = [];

    document.addEventListener("click", (e) => {
      let theStatus = false;

      if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");

        let clickedLetter = e.target.innerHTML.toLowerCase();

        lettersAndSpace.forEach((wordletter, i) => {
          if (wordletter.toLowerCase() === clickedLetter) {
            theStatus = true;
            clickedLetterArray[i] = clickedLetter;

            guessSpans.forEach((span, spanI) => {
              if (spanI === i) {
                span.innerHTML = clickedLetter;
              }
            });
          }
        });

        if (!theStatus) {
          wrongCount++;

          hangDraw.classList.add(`wrong-${wrongCount}`);

          if (wrongCount === 8) {
            endGame(wrongCount);
            lettersContainer.classList.add("finshed");
          }
        }

        if (
          clickedLetterArray.join("") ===
          lettersAndSpace.join("").split("").join("").toLowerCase()
        ) {
          endGame(wrongCount);
          lettersContainer.classList.add("finshed");
        }
      }
    });

    function endGame(counter) {
      let div = document.createElement("div");
      let divWin = document.createElement("div");
      if (counter < 8) {
        div.append(document.createTextNode("Congratulation, You Win!"));
        divWin.append(
          document.createTextNode(`Number Of Fails Is: ${counter}`)
        );
        div.appendChild(divWin);
        if (counter < 4) {
          let pro = document.createElement("div");
          pro.append(document.createTextNode(`You Are Pro`));
          div.appendChild(pro);
        } else {
          let noob = document.createElement("div");
          noob.append(document.createTextNode(`You Are Noob`));
          div.appendChild(noob);
        }
      } else {
        div.append(
          document.createTextNode(`Game Over, The Word Is ${randomWord}`)
        );
      }
      div.classList.add("popup");
      document.body.append(div);
    }
  } catch (e) {
    console.log(Error(`Data Not Found ${e}`));
  }
}
getWords();
