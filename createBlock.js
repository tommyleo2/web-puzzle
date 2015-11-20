function createBlock() {
    var blocks = document.createDocumentFragment;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var block = document.createElement("div");
            block.className = "block";
            blocks.appendChild(block);
        }
    }
}
