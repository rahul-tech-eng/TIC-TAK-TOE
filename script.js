// select elements
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

// true -> O's turn, false -> X's turn
let turnOfO = true;

// All winning patterns (indices of boxes)
const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const resetGame = () => {
  turnOfO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// add click listener to each box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnOfO) {
      box.innerText = "O";
      turnOfO = false;
    } else {
      box.innerText = "X";
      turnOfO = true;
    }

    box.disabled = true;
    checkWinner();
  });
});

const checkWinner = () => {
  for (let pattern of winningPatterns) {
    const pos1 = boxes[pattern[0]].innerText;
    const pos2 = boxes[pattern[1]].innerText;
    const pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1);
        return;
      }
    }
  }
};

// hook reset + new game buttons
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);