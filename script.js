let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");

let turnO = true;
let count = 0; // playerX / playerO

//winning patterns are stored in array but here have array of array. 2d array[[ "praveen","madhu"]["praneeth",rakesh]]
const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6] // diagonals
];



const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}



boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // console.log("box was clicked")
        if (turnO === true) { ///playerO
            box.textContent = "O";
            turnO = false;
        } else {
            box.textContent = "X";
            turnO = true;
        }

        //here when we click on same x or o it is changing its accordingly 
        box.disabled = true;
        count++;
        //then it will not be repeat
        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }

    });
});

// if game was draw 
function gameDraw() {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}



//after game winning its again when we click its working it shold not be like that 
function disableBoxes() {
    for (let box of boxes) {
        box.disabled = true;
    }
}

// after disabling we have to enable the btns after game to reset
function enableBoxes() {
    for (let box of boxes) {
        //box.enableBoxes = false;
        box.disabled = false;
        box.textContent = "";
    }
}



function showWinner(winner) {
    msg.textContent = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes(); // calling box disable function
}

function checkWinner() {
    for (let pattern of winningPatterns) {
        // console.log(pattern[0], pattern[1], pattern[2]) ;
        // //to see wiining patterns
        // console.log(
        //     boxes[pattern[0]].innerText,
        //     boxes[pattern[1]].innerText,
        //     boxes[pattern[2]].innerText,
        //     );
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {

            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("winner", pos1val);
                showWinner(pos1val);
                return true;
            }
        }
    }
}

// here we arem adding resetnew game 
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);