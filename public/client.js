const socket = io();

const header = document.querySelector("#header");
const playerName = document.querySelector("#playerName");
const inlogForm = document.querySelector("#inlogForm");
const gameForm = document.querySelector("#gameForm");

let player;
let handsPlayed = 0;

inlogForm.addEventListener("submit", function (e) {
  e.preventDefault();
  player = playerName.value;
  header.innerHTML = `<h4>Welcome ${player}. Let's play som Rock Scissors Paper</h4>`;
  document.getElementById("inlogView").style.display = "none";
  document.getElementById("gameView").style.display = "block";
});

gameForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let hand;
  let handShape = document.getElementsByName("handShape");
  for (i = 0; i < handShape.length; i++) {
    if (handShape[i].checked) hand = handShape[i].value;
  }
  socket.emit("play", {
    player: player,
    play: hand,
  });
  console.log(hand);
});
