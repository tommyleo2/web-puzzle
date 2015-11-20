var blank = {
    x: 3,
    y: 3
}
var onGame = false;

function startGame() {
    if (this.id == "shuffleButton") {
        return;
    }
    if (onGame) {
        if (this.id == "quit") {
            this.textContent = "Sure?";
            this.id = "ensure";
        }
        else if (this.id == "ensure") {
            onGame = false;
            this.textContent = "Start";
            this.id = start;
            clearInterval(window.timer);
            var blocks = document.getElementsByClassName("block");
            for (var i = 0; i < blocks.length; i++) {
                blocks[i].style.left = 25 * blocks[i].initPosi.x + "%";
                blocks[i].style.top = 25 * blocks[i].initPosi.y + "%";
            }
        }
    } else {
        var start = document.getElementById("start");
        var picContainer = document.getElementsByClassName("pic");
        var winBar = document.getElementById("_win");
        var count = 0;
        var blocks = document.getElementsByClassName("block");
        var ldir = 1;//  record previous step
        var step = document.getElementById("step");
        var timer = document.getElementById("timer");
        timer.time = 0;
        step.count = 0;
        timer.textContent = "Time: 0s";
        step.textContent = "Step: 0";
        this.textContent = "Shuffling";
        this.id = "shuffleButton";
        if (winBar) {
            winBar.id = "win";
        }
        picContainer[0].className += " blur";
        window.shuffleTimer = setInterval(function() {
            /*
              move the blank block to shuffle the blocks for 5s.
            */
            if (count == 500) {
                start = document.getElementsByTagName("button");
                start[0].textContent = "Quit";
                start[0].id = "quit";
                picContainer[0].className = "pic";
                window.timer = setInterval(function() {
                    timer.textContent = "Time: " + ++timer.time + "s";
                }, 1000);
                clearInterval(window.shuffleTimer);
            }
            count++;
            var direction;
            var moveX = [1, 0, 0, -1], moveY = [0, 1, -1, 0];
            while (1) {//  determine the direction
                direction = Math.round(Math.random() * 4);
                //  eliminate overflow and redoing
                if (moveX[direction] + blank.x < 4 && moveX[direction] + blank.x >= 0 &&
                    moveY[direction] + blank.y < 4 && moveY[direction] + blank.y >= 0 && 3 - direction != ldir) {
                    ldir = direction;
                    break;
                }
            }
            var move = 0;
            while (blocks[move].posi.x != blank.x + moveX[direction] ||
                   blocks[move].posi.y != blank.y + moveY[direction]) {//  find the right block to move
                    move++;
            }
            blocks[move].posi.x = blank.x;
            blocks[move].posi.y = blank.y;
            blank.x += moveX[direction];
            blank.y += moveY[direction];
            blocks[move].style.left = 25 * blocks[move].posi.x + "%";
            blocks[move].style.top = 25 * blocks[move].posi.y + "%";
        }, 5);
        onGame = true;
    }
}

function move() {
    var posi = this.posi;
    var move = false;
    var win = true;
    if (onGame) {
        var start = document.getElementsByTagName("button");
        if (start[0].id == "ensure") {
            start[0].textContent = "Quit";
            start[0].id = "quit";
        }
        if (posi.y == blank.y) {
            if (posi.x + 1 == blank.x) {
                posi.x++;
                blank.x--;
                move = true;
            }
            else if (posi.x - 1 == blank.x) {
                posi.x--;
                blank.x++;
                move = true;
            }
        }
        else if (posi.x == blank.x) {
            if (posi.y + 1 == blank.y) {
                posi.y++;
                blank.y--;
                move = true;
            }
            else if (posi.y - 1 == blank.y) {
                posi.y--;
                blank.y++;
                move = true;
            }
        }
        if (move) {
            var step = document.getElementById("step");
            step.textContent = "Step: " + ++step.count;
            this.style.left = 25 * posi.x + "%";
            this.style.top = 25 * posi.y + "%";
            blocks = document.getElementsByClassName("block");
            for (var i  = 0; i < blocks.length; i++) {
                if (blocks[i].posi.x != blocks[i].initPosi.x || blocks[i].posi.y != blocks[i].initPosi.y) {
                    win = false;
                }
            }
            if (win) {
                var picContainer = document.getElementsByClassName("pic");
                var winBar = document.getElementById("win");
                var button = document.getElementById("quit");
                picContainer[0].className += " blur";
                winBar.id = "_win";
                button.textContent = "Restart";
                button.id = "restart";
                onGame = false;
            }
        }
    }
}

window.onload = function() {
    var start = document.getElementsByTagName("button");
    var picBlocks = document.getElementsByClassName("block");
    for (var i = 0; i < picBlocks.length; i++) {
        picBlocks[i].addEventListener("click", move);
    }
    start[0].addEventListener("click", startGame);
}
