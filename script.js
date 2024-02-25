const cards = document.querySelectorAll(".card");

let cardOne;
let cardTwo;

let disabled = false;

let matchedCard = 0;

shuffleCard();

cards.forEach((item) => {
  item.addEventListener("click", flipCard);
});

function flipCard(event) {
  let clickCard = event.target;
  if (clickCard != cardOne && !disabled) {
    clickCard.classList.add("flip");
    if (!cardOne) {
      cardOne = clickCard;
    } else {
      cardTwo = clickCard;
      disabled = true;
      let cardOneImg = cardOne.querySelector("img").src;
      let cardTwoImg = cardTwo.querySelector("img").src;
      compareImg(cardOneImg, cardTwoImg);
    }
    console.log(cardOne);
    console.log(cardTwo);
  }
}

function compareImg(imgOne, imgTwo) {
  if (imgOne == imgTwo) {
    matchedCard++;
    if (matchedCard == 8) {
      handleWin();
      return;
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = "";
    cardTwo = "";
    disabled = false;
  } else {
    setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 400);
    setTimeout(() => {
      cardOne.classList.remove("flip", "shake");
      cardTwo.classList.remove("flip", "shake");
      cardOne = "";
      cardTwo = "";
      disabled = false;
    }, 1200);
  }
}

function shuffleCard() {
  cardOne = "";
  cardTwo = "";
  disabled = false;
  matchedCard = 0;
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => {
    if (Math.random() > 0.5) {
      return 1;
    } else {
      return -1;
    }
  });
  cards.forEach((item, index) => {
    item.classList.remove("flip");
    let cardImg = item.querySelector("img");
    cardImg.src = `./img/img-${arr[index]}.png`;
    item.addEventListener("click", flipCard);
  });
}

function handleWin() {
  setTimeout(() => {
    alert("Вы выиграли!");
    shuffleCard();
  }, 1500);
}
