function resume() {
    pause_game = false;
    var modal = document.getElementById("myModalPaused");
    modal.style.display = "none";
    pause_game_fade_in = 30;
}

function pause_game_function() {
    if (pause_game_draw === false) {
        var modal = document.getElementById("myModalPaused");
        modal.style.display = "block";
    }
}