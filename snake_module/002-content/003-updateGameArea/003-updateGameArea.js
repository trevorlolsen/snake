function updateGameArea() {

    if (pause_game) {
        pause_game_function();
        return true;
    } else if (pause_game_fade_in > 0) {
        pause_game_fade_in -= 1;
        return true;
    }

    myGameArea.clear();

    draw_squares();


    manage_food();
    manage_poison();


    manage_snakes();


    var ctx = myGameArea.context;


    ctx.font = "18px Arial";
    ctx.fillText(food.length, 10 + 1, 30 - 1);

    ctx.font = "18px Arial";
    ctx.fillStyle = '#FF0000';
    ctx.fillText(poison.length, 10 + 1, 50 - 1);

    ctx.font = "18px Arial";
    ctx.fillStyle = '#FFD700';
    ctx.fillText(score, 10 + 1, 70 - 1);

    // Do your operations
    var endDate = new Date();
    seconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);

    ctx.font = "18px Arial";
    ctx.fillStyle = '#009dFF';
    ctx.fillText(seconds, 10 + 1, 90 - 1);



    if (food.length <= 0) {

        won_game_function();
    }

    // manage_balls();

    manage_menus();


}