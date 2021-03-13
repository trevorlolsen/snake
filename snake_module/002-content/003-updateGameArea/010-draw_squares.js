function draw_squares() {


    ctx = myGameArea.context;


    ctx.globalAlpha = .2;
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'grey';
    ctx.fillStyle = 'grey';

    var start_sqr = get_current_sqr(anc_x, anc_y);

    for (var i = 0; i < (WIDTH / square_size) + 1; i++) {
        var view_x = get_ref_x(start_sqr[0] * square_size + i * square_size);


        for (var j = 0; j < (HEIGHT / square_size) + 1; j++) {

            var view_y = get_ref_y(start_sqr[1] * square_size + j * square_size);


            if ((start_sqr[0] + i) >= 0 && (start_sqr[1] + j) >= 0 && (start_sqr[0] + i) < board_sqr_length && (start_sqr[1] + j) < board_sqr_length) {

                if (board[start_sqr[0] + i][start_sqr[1] + j] === 1) {


                    ctx.strokeRect(view_x, view_y, square_size, square_size);

                } else {

                    ctx.fillRect(view_x, view_y, square_size, square_size);
                    ctx.strokeRect(view_x, view_y, square_size, square_size);

                }

            }






        }






    }






    ctx.globalAlpha = 1;

}