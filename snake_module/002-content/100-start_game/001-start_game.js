function start_game() {

    startDate = new Date();


    anc_x = (board_sqr_length / 2) * square_size -WIDTH/2 +square_size/2;
    anc_y = (board_sqr_length / 2) * square_size -HEIGHT/2 +square_size/2;

    var start_x = (board_sqr_length / 2) * square_size +square_size/2;
    var start_y = start_x;

   
    f_anc_x=start_x;
    f_anc_y=start_y;

    



    snakes.push(new Snake(start_x, start_y));

    myGameArea.start();
}
