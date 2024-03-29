//* ------ Selectors ------- */
const selectionArticle = document.querySelector(".selection");

//? Secilen elemanlarin tayicilari
const yourChoiceDiv = document.getElementById("your-choice");
const pcChoiceDiv = document.getElementById("pc-choice");

//? message
const messagePar = document.querySelector(".message");

//? Score
const scoreCardSection = document.querySelector(".score-card");
const pcScoreSpan = document.getElementById("pc-score");
const yourScoreSpan = document.getElementById("your-score");
const topScoreSpan = document.getElementById("top-score");
// console.log(topScoreSpan.textContent);
// localStorage.setItem("topScore",topScoreSpan.textContent) //"1:10" gibi
// localStorage.setItem("highestDifference",0) // baslangicta 0
// let newDifference=Math.abs(Number(pcScoreSpan.textContent)-Number(yourScoreSpan.textContent))// 3, 5 gibi bir sayi
// console.log(typeof newDifference,newDifference);

//? Modal
const modalCardSection = document.querySelector(".modal-card");
const finalMessagePar = document.getElementById("final-message");
const playAgainBtn = document.getElementById("play-again");

//* ------- Variables ------- */
let userSelectImg = document.createElement("img");
let pcSelectImg = document.createElement("img");
let pcRandom;
//? Colors
const YELLOW = "#ffc538";
const RED = "#fb778b";
const GREEN = "#5ab7ac";

//* ------- Event Listeners ------- */
selectionArticle.addEventListener("click", (e) => {
    // console.log(e.target.id) //*BU TIKLANAN YERİ YAZDIRIR OBJECT ÇIKTI VERİRİ.BU ÇIKTILAR ARASINDA TARGET.ALT TARGET.İD GENELDE KULLANILIR
    if (e.target.id) {
        userSelectImg.src = `./assets/${e.target.id}.png`;
        userSelectImg.alt = e.target.id;
        yourChoiceDiv.appendChild(userSelectImg);
        createPcSelection();
    }
});

playAgainBtn.addEventListener("click", () => {
    // modalCardSection.classList.toggle("show")
    // modalCardSection.classList.toggle("remove")
    modalCardSection.style.display = "none";
    // pcScoreSpan.textContent=0
    // yourScoreSpan.textContent=0
    location.reload();
});
//! Sayfa her yuklendikten sonra calisan event
window.addEventListener("load", () => {
    topScoreSpan.textContent = localStorage.getItem("topScore")||"0:0";
});

//* ------- Functions ------- */

const createPcSelection = () => {
    const pcArr = ["rock", "paper", "scissor"];
    pcRandom = pcArr[Math.floor(Math.random() * 3)];
    // pcRandom = pcArr[0]
    pcSelectImg.src = `./assets/${pcRandom}.png`;
    pcSelectImg.alt = pcRandom;
    pcChoiceDiv.appendChild(pcSelectImg);
    calculateResult();
};

const calculateResult = () => {
    // console.log(userSelectImg.alt)
    // console.log(pcSelectImg.alt)

    //? Esitlik durumu
    if (userSelectImg.alt === pcRandom) {
        draw();
    } else {
        if (userSelectImg.alt === "rock") {
            pcRandom === "paper" ? youLost() : youWin();
        } else if (userSelectImg.alt === "scissor") {
            pcRandom === "rock" ? youLost() : youWin();
        } else if (userSelectImg.alt === "paper") {
            pcRandom === "scissor" ? youLost() : youWin();
        }
    }

    if (
        pcScoreSpan.textContent === "10" ||
        yourScoreSpan.textContent === "10"
    ) {
        topScore();

        openModal();
    }
};

const draw = () => {
    messagePar.textContent = "Its a draw";
    scoreCardSection.style.color = YELLOW;
    messagePar.style.backgroundColor = YELLOW;
};

const youLost = () => {
    messagePar.textContent = "You Lost";
    scoreCardSection.style.color = RED;
    messagePar.style.backgroundColor = RED;
    pcScoreSpan.textContent++;
};

const youWin = () => {
    messagePar.textContent = "You Win";
    scoreCardSection.style.color = GREEN;
    messagePar.style.backgroundColor = GREEN;
    yourScoreSpan.textContent++;
};


const topScore = () => {
    let newDifference = Math.abs(
        Number(pcScoreSpan.textContent) - Number(yourScoreSpan.textContent)
    );//baslangicta 0 ve sonra  1,3 gibi bir sayi
    if (newDifference > +localStorage.getItem("highestDifference")) {
        console.log(+newDifference);
        // console.log(+localStorage.getItem("highestDifference"));
        localStorage.setItem("highestDifference", newDifference);
        localStorage.setItem(
            "topScore",
            `${+yourScoreSpan.textContent} : ${+pcScoreSpan.textContent}`
        );
        topScoreSpan.textContent = localStorage.getItem("topScore");
    }
};

//? modal aç
const openModal = () => {
    modalCardSection.classList.add("show");

    if (yourScoreSpan.textContent === "10") {
        //? eger kullanici 10 puana usalti ise kullanici kazanmistir.
        finalMessagePar.textContent = "💃 You Win🕺";
        document.querySelector(".modal").style.backgroundColor = GREEN;
        playAgainBtn.style.color = GREEN;
    } else {
        //? eger pc 10 puana ulasti ise pc kazanmistir.
        finalMessagePar.textContent = "☹️ You Lost ☹️";
        document.querySelector(".modal").style.backgroundColor = RED;
        playAgainBtn.style.color = RED;
    }
};

//! Local Storage'a veri yazma ve okuma
// localStorage.setItem("highScore", 5) //? veri yazma
// console.log(localStorage.getItem("highScore")) //? veri okuma

//! İlkel Yontem
//? Resimler
// const rockImg = document.getElementById("rock")
// const paperImg = document.getElementById("paper")
// const scissorImg = document.getElementById("scissor")

// rockImg.addEventListener("click", () => {
//   image.src = "./assets/rock.png"
//   image.alt = "rock"
//   yourChoiceDiv.appendChild(image)

//   //? innerHTML
//   // yourChoiceDiv.innerHTML = `<img src="./assets/rock.png" alt="rock">`
// })

// paperImg.addEventListener("click", () => {
//   image.src = "./assets/paper.png"
//   image.alt = "paper"
//   yourChoiceDiv.appendChild(image)
// })

// scissorImg.addEventListener("click", () => {
//   image.src = "./assets/scissor.png"
//   image.alt = "scissor"
//   yourChoiceDiv.appendChild(image)
// })
