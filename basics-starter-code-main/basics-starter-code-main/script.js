// var main = function (input) {
//   var myOutputValue = 'hello world';
//   return myOutputValue;
// };

// Create a basic version of Scissors Paper Stone where the user inputs one of "scissors", "paper", or "stone", the program internally randomly chooses scissors, paper, or stone, and
// the program outputs whether the user won, the program won, or it's a draw.
// Rules: scissors beats paper, paper beats stone, and stone beats scissors. If both parties choose the same object, it's a draw.

//SIDE QUEST:
//You decide to prank your friends and create an SPS game where the rules are reversed: scissors beat stone, stone beats paper, and paper beats scissors.
//Create a version where the rules are reversed. The user can choose to try their luck at reversed mode by adding the word "reversed" to their choice. For example: "reversed stone".

//Get the user's input for SPS
//Pass input into determinant helper function, return win or lose result.
//Determinant helper function generates win or lose condition, sends it back out to main.
//Get main function to generate AI input, then call determinant helper function to see if user loses or wins.
//Input validation if input does not match SPS -> all contained within "else".

//Declare global varible that stores game mode -> if "reverse", detected, switch game modes.

var gameMode = "normal";

//Modifying the diceroll function from previous exercises to return 0, 1 or 2
var rollSps = function () {
  // Generate a decimal from 0 through 2, inclusive of 0 and exclusive of 3.
  var randomDecimal = Math.random() * 3;
  // Remove the decimal with the floor operation.
  // This will be an integer from 0 to 2 inclusive, and matches 0 to scissors, 1 to paper and 2 to stone.
  var spsNumber = Math.floor(randomDecimal);
  spsOutput = ``;
  if (spsNumber === 0) {
    spsOutput = "scissors";
  } else if (spsNumber === 1) {
    spsOutput = "paper";
  } else {
    spsOutput = "stone";
  }
  console.log(`spsNumber is ${spsNumber}, AI choice is ${spsOutput}`);
  return spsOutput;
};

//Determinant helper function to compare user input to AI roll, take in AI first then input. Empty variable to be declared first.
//Draw condition to be determined first because easier to code for
var compareFunction = function (AI, input) {
  var comparisonOutcome = "";
  if (AI === input) {
    comparisonOutcome = `draw`;
    //code win conditions
  } else if (
    (AI === "scissors" && input === "stone") ||
    (AI === "stone" && input === "paper") ||
    (AI === "paper" && input === "scissors")
  ) {
    comparisonOutcome = `win`;
    //code lose conditions, basically everything else as function only triggers if input is SPS
  } else {
    comparisonOutcome = `lose`;
  }
  console.log(`User ${comparisonOutcome}s under normal circumstances`);
  if (gameMode === "reverse") {
    //Detect if game mode is reverse, and if so, mirror the output
    if (comparisonOutcome === "win") {
      comparisonOutcome = "lose";
    } else if (comparisonOutcome === "lose") {
      comparisonOutcome = "win";
    }
    console.log(`User ${comparisonOutcome}s in reverse mode`);
  }
  return comparisonOutcome;
};

var gameCheck = function (input) {
  //Game mode check: if reverse or normal are entered, switch game modes
  var modeMessage = "";
  if (input === "reverse" && gameMode === "normal") {
    modeMessage = `Reverse mode activated!<br><br>Rules have been reversed!`;
    gameMode = "reverse";
  } else if (input === "normal" && gameMode === "reverse") {
    modeMessage = `Normal mode activated!<br><br>Rules have been returned to normal!`;
    gameMode = "normal";
  } else if (
    //if already in normal or reverse, tell user
    (input === "normal" && gameMode === "normal") ||
    (input === "reverse" && gameMode === "reverse")
  ) {
    modeMessage = `You are already in ${gameMode} game mode!`;
  }
  return modeMessage;
};

var main = function (input) {
  //Call AI roll, declare container for myOutputVariable first
  var comRoll = rollSps();
  var myOutputValue = "";
  if (input === "normal" || input === "reverse") {
    //only run gameCheck function if normal/reverse detected, otherwise proceed with game
    myOutputValue = gameCheck(input);
  } else if (input === "scissors" || input === "paper" || input === "stone") {
    //only run comparison function if input is valid (SPS), otherwise move to error catch
    myOutputValue = `The computer played ${comRoll} and you played ${input}. <br><br> You ${compareFunction(
      comRoll,
      input
    )}!`;
    //error catch for others
  } else {
    myOutputValue = "Please enter either 'scissors', 'paper' or 'stone'.";
  }
  return myOutputValue;
};
