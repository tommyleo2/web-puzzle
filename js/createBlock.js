function createBlock() {
    var blocks = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var block = document.createElement("div");
            var x = j * (33.33), y = i * (33.33);
            block.className = "block";
            block.posi = {y: i, x: j};
            block.initPosi = {y: i, x: j};
            block.style.backgroundPosition = x.toString() + "% " + y.toString() + "%";
            //block.style.backgroundPositionX = x.toString() + "%";
            //block.style.backgroundPositionY = y.toString() + "%";
            block.style.left = (j * 25).toString() + "%";
            block.style.top =  (i * 25).toString() + "%";
            blocks.appendChild(block);
        }
    }
    blocks.removeChild(blocks.childNodes[15]);
    document.getElementsByClassName("pic")[0].appendChild(blocks);
}

createBlock();
