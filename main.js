var root;
var board;
var cancel;
var points = 0;
var showPoints;
function createBoard(){
  var bigBoard = [];
  for(var i = 0; i < 10; i++){
    var littlArr = Array(10).fill("", 0, 10);
    bigBoard.push(littlArr);
  }
  return bigBoard;
}

function moveChar(){
 var piece = document.getElementById("movingPiece");
 piece.x += 1;
}
var playerX = 9;
var playerY = 4;

function placeBoard(bord){
  var row = document.createElement('ul');
  for(var i = 0; i < board.length; i++){
    let innerBoard = bord[i];
    for(var j = 0; j < innerBoard.length; j++){
      var li = document.createElement('li');
      li.x = i;
      li.y = j;
      if (innerBoard[j] === player){
        li.appendChild(player);
      }else if (innerBoard[j] === computerPlayer){
        li.appendChild(computerPlayer);
      }
      else {
          li.innerText = innerBoard[j];
      }

      row.appendChild(li);
    }
  }
  return row;
}


function playerShape(){
  var chr = document.createElement('div');
  chr.style.cssText = "width: 20px; height:20px; background: violet; border: 1px solid #000; border-radius: 50%";
  chr.setAttribute("id", "movingPiece");
  return chr;
}

var player = playerShape();

function compPlayer(){
  var num = Math.round(Math.random() * (1-0) + 0);
  var players = ["P", "Z"];
  return compPlayerShape(players[num]);
}

function compPlayerShape(type){
  var chr = document.createElement('div');
  if (type === "P"){
    chr.style.cssText = "width: 10px; height:30px; background:white; border: 1px solid #000; border-radius: 50%";
  }else {
    chr.style.cssText = "width: 10px; height:30px; background:red; border: 1px solid #000; border-radius: 50%";
  }
  chr.setAttribute("id", "movingPiece");
  return chr;
}

var computerPlayer = compPlayer();

function placePiece(x, y){
  board = createBoard();
  board[x][y] = computerPlayer;
  board[playerX][playerY] = player;
  clash(x, y);
  var row = placeBoard(board);
  root = document.getElementById("root");
  if (root.hasChildNodes()){
    root.removeChild(root.childNodes[0]);
    root.appendChild(row);
  }else {
    root.appendChild(row);
  }
}

var x = -1;
var y = Math.floor(Math.random() * (9 - 0) + 0);
// var y = 0;
var playerMoved = true;
function movePiece(){
    if (x >= 9){
      x = 0;
      y = Math.floor(Math.random() * (9 - 0) + 0);
      computerPlayer = compPlayer();
    }else {
      x+=1;
    }
    placePiece(x, y);
}

function clash(ax, ay){
  if (board[ax][ay] === player && computerPlayer.style.background === "white"){
    points+=10;
    showPoints.innerText = `Points: ${points}`;
    x = -1;
    y = Math.floor(Math.random() * (9 - 0) + 0);
    computerPlayer = compPlayer();
  }else if (board[ax][ay] === player && computerPlayer.style.background === "red"){
    points-=10;
    showPoints.innerText = `Points: ${points}`;
    x = -1;
    y = Math.floor(Math.random() * (9 - 0) + 0);
    computerPlayer = compPlayer();
  }
}


  window.onkeydown = function(e){
    if (e.keyCode === 39 && playerY < 9){
      playerY+=1;
    }else if (e.keyCode === 37 && playerY > 0){
      playerY-=1;
    }else if (e.keyCode === 38 && playerX > 6){
      playerX-=1;
    }else if (e.keyCode === 40 && playerX < 9){
      playerX+=1;
    }
    // justRedrawPlayer(board);
    placePiece(x, y);
    // playerMoved = false;
    // movePiece();
  };


function play(){
  // placePiece(x, y);
  window.setInterval(function(){
    cancel = window.requestAnimationFrame(movePiece);
  }, 700);

}



document.addEventListener("DOMContentLoaded", () => {
  showPoints = document.getElementById("points");
  play();

});
