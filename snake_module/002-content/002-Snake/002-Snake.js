
function Poison(x, y, rad) {
    this.x = x;
    this.y = y;
    this.color = "#FF0000";

    this.radius = rad;
    this.angle2 = Math.random() * 4 - 2;
    this.d = .5;

    this.update = function () {


        var x = this.x;
        var y = this.y;
        if (in_view(x, y)) {



            var view_x = get_ref_x(x);
            var view_y = get_ref_y(y);
            var ctx = myGameArea.context;

            ctx.strokeStyle = this.color;
            ctx.beginPath();
            ctx.moveTo(view_x - this.radius, view_y);
            ctx.lineTo(view_x + this.radius, view_y);
            ctx.stroke();


            ctx.beginPath();
            ctx.moveTo(view_x, view_y - this.radius);
            ctx.lineTo(view_x, view_y + this.radius);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(view_x, view_y, this.radius / 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#003300';
            ctx.stroke();


        }
    };

    this.move = function () {

        var dlength = get_distance(this.x, this.y, snakes[0].y, snakes[0].x);
        if (dlength < 200) {

            var tar_angle = Math.atan2(snakes[0].y - this.y, snakes[0].x - this.x);

            this.angle2 = tar_angle;



            let change_x = (this.d * Math.cos(this.angle2));
            let change_y = (this.d * Math.sin(this.angle2));


            this.radius = Math.min(Math.max(this.radius + Math.random() * .5 - .25, 4), 50);
            this.d = Math.min(Math.max(this.d + Math.random() * .01 - .005, .5), 2);

            this.x += change_x;
            this.y += change_y;
            this.angle2 += Math.random() * .1 - .05;

            
        }else{


         

            this.angle2 = this.angle2;



            let change_x = (this.d * Math.cos(this.angle2));
            let change_y = (this.d * Math.sin(this.angle2));


            this.radius = Math.min(Math.max(this.radius + Math.random() * .5 - .25, 2), 50);
            this.d = Math.min(Math.max(this.d + Math.random() * .01 - .005, 0), .5);

            this.x += change_x;
            this.y += change_y;
            this.angle2 += Math.random() * .1 - .05;

        }

        if (this.x < 0) {
            this.x += board_sqr_length * square_size;

        } else if (this.x > (board_sqr_length * square_size)) {
            this.x -= board_sqr_length * square_size;

        }

        if (this.y < 0) {
            this.y += board_sqr_length * square_size;

        } else if (this.y > (board_sqr_length * square_size)) {
            this.y -= board_sqr_length * square_size;

        }



    }

    this.get_loc = function () {

        return [this.x, this.y, this.radius];
    }

}


function Food(x, y, rad) {
    this.x = x;
    this.y = y;
    this.color = random_color();
    this.radius = rad;
    this.angle2 = Math.random() * 4 - 2;
    this.d = .5;

    this.update = function () {


        var x = this.x;
        var y = this.y;
        if (in_view(x, y)) {



            var view_x = get_ref_x(x);
            var view_y = get_ref_y(y);
            var ctx = myGameArea.context;




            ctx.beginPath();
            ctx.arc(view_x, view_y, this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#003300';
            ctx.stroke();


        }
    };

    this.move = function () {

        let change_x = (this.d * Math.cos(this.angle2));
        let change_y = (this.d * Math.sin(this.angle2));


        this.d = Math.min(Math.max(this.d + Math.random() * .01 - .001, 0), .75);

        this.x += change_x;
        this.y += change_y;
        this.angle2 += Math.random() * .1 - .05;

        if (this.x < 0) {
            this.x += board_sqr_length * square_size;

        } else if (this.x > (board_sqr_length * square_size)) {
            this.x -= board_sqr_length * square_size;

        }

        if (this.y < 0) {
            this.y += board_sqr_length * square_size;

        } else if (this.y > (board_sqr_length * square_size)) {
            this.y -= board_sqr_length * square_size;

        }



    }

    this.get_loc = function () {

        return [this.x, this.y, this.radius];
    }

}

function Snake(x, y) {




    this.type = 1;
    this.speed = 1;
    this.food_c = 4000;
    this.gather_c = 4000;

    this.x = x;
    this.y = y;

    this.d = 1;
    this.dx = 0;
    this.dy = 0;
    this.radians = Math.random() * 4;

    this.radius = game_settings["input-snake-size"];

    this.speedy = 0;

    this.rho = 0;

    this.tail = [new Tail(x, y, random_color())];


    for (var i = 3; i >= 0; i--) {


        this.tail.push(new Tail(x, y, random_color()));

    }



    this.update = function () {



        if (in_view(this.x, this.y)) {

            for (var i = this.tail.length - 1; i >= 0; i--) {


                this.tail[i].update(this.radius);

            }



            var change_x = (this.radius * 2 * Math.cos(snake_angle));
            var change_y = (this.radius * 2 * Math.sin(snake_angle));

            var change_x1 = (this.radius * .7 * Math.cos(snake_angle + Math.PI / 2));
            var change_y1 = (this.radius * .7 * Math.sin(snake_angle + Math.PI / 2));
            var change_x2 = (this.radius * .7 * Math.cos(snake_angle - Math.PI / 2));
            var change_y2 = (this.radius * .7 * Math.sin(snake_angle - Math.PI / 2));



            var head_x1 = this.x - change_x + change_x1;
            var head_y1 = this.y - change_y + change_y1;

            var head_x2 = this.x - change_x + change_x2;
            var head_y2 = this.y - change_y + change_y2;

            var view_x1 = get_ref_x(head_x1);
            var view_y1 = get_ref_y(head_y1);
            var view_x2 = get_ref_x(head_x2);
            var view_y2 = get_ref_y(head_y2);
            var ctx = myGameArea.context;





            ctx.beginPath();
            ctx.arc(view_x1, view_y1, this.radius * .5, 0, 2 * Math.PI, false);
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
            ctx.lineWidth = .5;
            ctx.strokeStyle = '#003300';
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(view_x1, view_y1, this.radius / 6, 0, 2 * Math.PI, false);
            ctx.fillStyle = '#000000';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(view_x2, view_y2, this.radius * .5, 0, 2 * Math.PI, false);
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
            ctx.lineWidth = .5;
            ctx.strokeStyle = '#003300';
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(view_x2, view_y2, this.radius / 6, 0, 2 * Math.PI, false);
            ctx.fillStyle = '#000000';
            ctx.fill();





        }
    };

    this.move = function () {


        var change_x = (this.d * Math.cos(snake_angle));
        var change_y = (this.d * Math.sin(snake_angle));

        anc_x += change_x;
        anc_y += change_y;

        this.x += change_x;
        this.y += change_y;


        if (this.x < 0) {
            this.x += board_sqr_length * square_size;
            anc_x += board_sqr_length * square_size;

        } else if (this.x > (board_sqr_length * square_size)) {
            this.x -= board_sqr_length * square_size;
            anc_x -= board_sqr_length * square_size;

        }

        if (this.y < 0) {
            this.y += board_sqr_length * square_size;
            anc_y += board_sqr_length * square_size;

        } else if (this.y > (board_sqr_length * square_size)) {
            this.y -= board_sqr_length * square_size;
            anc_y -= board_sqr_length * square_size;

        }


        var last_x = this.x;
        var last_y = this.y;


        for (var i = food.length - 1; i >= 0; i--) {
            var food_loc = food[i].get_loc();
            var dlength = get_distance(this.x, this.y, food_loc[0], food_loc[1]);
            if (dlength < (this.radius + food_loc[2])) {

                var last_loc = this.tail[this.tail.length - 1].get_loc();

                this.tail.push(new Tail(last_loc[0], last_loc[1], food[i].color));

                food.splice(i, 1);
                this.radius += .3;
                this.d += .075;
                score += 1;

            }


        }

        for (var i = poison.length - 1; i >= 0; i--) {
            var poison_loc = poison[i].get_loc();
            var dlength = get_distance(this.x, this.y, poison_loc[0], poison_loc[1]);
            if (dlength < (this.radius + poison_loc[2])) {


                if(this.tail.length>2){
                    this.tail.splice(this.tail.length - 1, 1);
                }

                
                poison.splice(i, 1);
                this.radius -= .4;
                this.d -= .1;
                score -= 2;

            }


        }


        this.radius = Math.max(this.radius,1);
        this.d = Math.max(this.d,.5);

        for (var i = 0; i < this.tail.length; i++) {

            this.tail[i].move(last_x, last_y);
            var last_loc = this.tail[i].get_loc();
            last_x = last_loc[0];
            last_y = last_loc[1];


        }


    };


}


function Tail(x, y, color) {


    this.color = color;



    this.last_places = [[x, y], [x, y], [x, y], [x, y], [x, y], [x, y]];





    this.update = function (cur_rad) {
        cur_rad = Math.max(cur_rad,.2);

        var x = this.last_places[0][0];
        var y = this.last_places[0][1];
        if (in_view(x, y)) {



            var view_x = get_ref_x(x);
            var view_y = get_ref_y(y);
            ctx = myGameArea.context;


            // ctx.font = "5px Arial";
            // ctx.fillText(this.type, view_x + 1, view_y - 1);

            // ctx.font = "8px Arial";
            // ctx.fillText(this.gather, view_x + 1, view_y + 9);

            ctx.beginPath();
            ctx.arc(view_x, view_y, cur_rad, 0, 2 * Math.PI, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#003300';
            ctx.stroke();


        }
    };

    this.move = function (x, y) {


        this.last_places.shift();
        this.last_places.push([x, y]);



    };

    this.get_loc = function () {

        return this.last_places[0];
    }


}