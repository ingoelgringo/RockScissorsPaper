const socket = io();

const header = document.querySelector("#header");
const playerName = document.querySelector("#playerName");
const inlogForm = document.querySelector("#inlogForm");
const gameForm = document.querySelector("#gameForm");
const result = document.querySelector("#result");
const playBtn = document.querySelector("#playBtn");

let player;

inlogForm.addEventListener("submit", function (e) {
  e.preventDefault();
  player = playerName.value;
  header.innerHTML = `<h4>Welcome ${player}. Let's play som Rock Scissors Paper</h4>`;
  document.getElementById("inlogView").style.display = "none";
  document.getElementById("gameView").style.display = "block";
  socket.emit("login", player);
});

gameForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let hand;
  let handShape = document.getElementsByName("handShape");
  for (i = 0; i < handShape.length; i++) {
    if (handShape[i].checked) hand = handShape[i].value;
  }
  socket.emit("showHand", hand);
  playBtn.disabled = true;
  // result.innerHTML = "<p>" + player + " played " + hand + "</p>";
});

socket.on("result", function (winner) {
  let p1 = document.createElement("p");
  let p2 = document.createElement("p");
  let p3 = document.createElement("p");
  p1.textContent = winner[0];
  p2.textContent = winner[1];
  p3.textContent = winner[2];
  result.insertBefore(p3, result.firstChild);
  result.insertBefore(p2, result.firstChild);
  result.insertBefore(p1, result.firstChild);
  playBtn.disabled = false;
});
