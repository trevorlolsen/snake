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
    ctx.fillStyle = '#00FF00';
    ctx.fillText(score, 10 + 1, 70 - 1);

 

    if (game_over1 === false) {
        // bee.newPos();
    }

    // manage_balls();
 
    manage_menus();


}