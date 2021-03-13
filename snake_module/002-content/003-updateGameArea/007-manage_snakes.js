

function manage_snakes() {
    for (var i = snakes.length - 1; i >= 0; i--) {

        snakes[i].move();
        snakes[i].update();

    }
}

function manage_food() {

    while (food.length < game_settings["input-food"] && all_food===false) {

        var rad = Math.random() * 4 + 1;
        var d = Math.random() * 1000;
        var food_angle = (Math.random() * 10) - 5;

        var change_x = (d * Math.cos(food_angle));
        var change_y = (d * Math.sin(food_angle));


        if((f_anc_x + change_x)>0 && (f_anc_y + change_y)>0 && (f_anc_x + change_x)<(board_sqr_length*square_size) && (f_anc_y + change_y)<(board_sqr_length*square_size)){
            food.push(new Food(f_anc_x + change_x, f_anc_y + change_y, rad));
        }
        
    }
    all_food=true;
  
    for (var i = food.length - 1; i >= 0; i--) {

        food[i].move();
        food[i].update();

    }


}


function manage_poison() {

    while (poison.length < game_settings["input-poison"] && all_poison===false) {

        var rad = Math.random() * 4 + 1;
        var d = Math.random() * 1000;
        var food_angle = (Math.random() * 10) - 5;

        var change_x = (d * Math.cos(food_angle));
        var change_y = (d * Math.sin(food_angle));


        if((f_anc_x + change_x)>0 && (f_anc_y + change_y)>0 && (f_anc_x + change_x)<(board_sqr_length*square_size) && (f_anc_y + change_y)<(board_sqr_length*square_size)){
            poison.push(new Poison(f_anc_x + change_x, f_anc_y + change_y, rad));
        }
        
    }
    all_poison=true;
  
    for (var i = poison.length - 1; i >= 0; i--) {

        poison[i].move();
        poison[i].update();

    }


}

