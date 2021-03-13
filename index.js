// new comment
function game_obj(game_settings) {
var snakes = [];
var food = [];
var poison=[];

var score=0;
var seconds =0;




var startDate=0;



var snake_angle = 0;

var game_over1 = false;
var HEIGHT = 480 * .8;
var WIDTH = 854 * .8;
var PLOT_LEFT = WIDTH / 10;
var PLOT_RIGHT = WIDTH * 9 / 10;
var SCALE = 0;
var wind_speed_x = 0;
var wind_speed_y = 0;
var level_i = 0;
var runif_a = 0;
var runif_b = 0;
var runif_m = 0;
var runif_x = 200;
var all_food=false;
var all_poison=false;

var food_look_up = {};

var f_anc_x=0;
var f_anc_y=0;

var mouse_x=0;
var mouse_y=0;



var board_sqr_length = game_settings["input-squares"];
var square_size = 100;
var board = new Array(board_sqr_length);
for (var i = 0; i < board_sqr_length; i++) {
  board[i] = new Array(board_sqr_length).fill(0);

}

var anc_x = 0;
var anc_y = 0;




var pause_game = false;
var pause_game_draw = false;
var pause_game_fade_in = 0;




function get_current_sqr(x, y) {

  var squ_x = Math.floor(x / square_size);
  var squ_y = Math.floor(y / square_size);
  return [squ_x, squ_y];

}


function in_view(x, y) {
  var m1 = get_ref_x(x);
  var m2 = get_ref_y(y);
  if (m1 > 0 && m1 < WIDTH && m2 > 0 && m2 < HEIGHT) {
    return true;

  }

  return false;

}


function get_ref_x(x) {

  return x - anc_x;

}


function get_ref_y(y) {

  return y - anc_y;

}



function get_go_to(f_x, f_y, t_x, t_y, scaler) {

  var return_vals = [0, 0];

  if (f_x > t_x) {
    return_vals[0] = t_x - f_x;
  } else {
    return_vals[0] = t_x - f_x;
  }


  if (f_y > t_y) {
    return_vals[1] = t_y - f_y;
  } else {
    return_vals[1] = t_y - f_y;
  }
  

  return get_normalized(return_vals, scaler);

}

function get_distance(f_x, f_y, t_x, t_y) {

  var return_vals = [0, 0];

  if (f_x > t_x) {
    return_vals[0] = t_x - f_x;
  } else {
    return_vals[0] = t_x - f_x;
  }


  if (f_y > t_y) {
    return_vals[1] = t_y - f_y;
  } else {
    return_vals[1] = t_y - f_y;
  }

  var dlength = Math.sqrt(return_vals[0] * return_vals[0] + return_vals[1] * return_vals[1]);
  return dlength;

}

function get_normalized(points, scaler) {
  var dlength = Math.sqrt(points[0] * points[0] + points[1] * points[1]);
  if(dlength<0.0001){
    return [0,0];
  }else{
  return [scaler * points[0] / dlength, scaler * points[1] / dlength];
  }
}


function random_color(){
  var randomColor = Math.floor(Math.random()*16777215).toString(16);
  return "#" + randomColor;

}



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

function won_game_function() {
    if (pause_game_draw === false) {
        document.getElementById("won_points").innerHTML= score;
        document.getElementById("won_seconds").innerHTML= seconds;

        myGameArea.stop();
        myGameArea.clear();
        var modal = document.getElementById("myModalWon");
        modal.style.display = "block";
    }
}


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


function manage_menus() {
    if (game_over1 === true) {
        myGameArea.stop();
        // Get the modal
        var modal = document.getElementById("myModal");


        modal.style.display = "block";

    } else if (false) {
        myGameArea.stop();
        var modal = document.getElementById("myModalWon");

        modal.style.display = "block";



    } else {

        if (game_over1 === false) {
            // bee.update();
        }

    }

}
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
var myGameArea = {
    canvas: document.getElementById("game_canvas"),
    start: function () {
        var window_width = window.innerWidth * .98;
        var window_height = window.innerHeight * .98;
        this.context = this.canvas.getContext("2d");
        if ((window_width / window_height) > (WIDTH / HEIGHT)) {

            this.canvas.width = window_height * WIDTH / HEIGHT;
            this.canvas.height = window_height;
            this.context.scale(window_height / HEIGHT, window_height / HEIGHT);
            SCALE = window_height / HEIGHT;


        } else {
            this.canvas.width = window_width;
            this.canvas.height = window_width * HEIGHT / WIDTH;
            this.context.scale(window_width / WIDTH, window_width / WIDTH);
            SCALE = window_width / WIDTH;

        }


        this.interval = setInterval(updateGameArea, 50);
    },
    stop: function () {
        clearInterval(this.interval);
    },
    clear: function () {
        this.context.clearRect(0, 0, WIDTH, HEIGHT);

    }
};
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

function click_event_function(my_touch) {
    if (pause_game===false) {
        for (var i = 0; i < my_touch.length; i++) {
            // if (press_pause_btn(my_touch[i])) {
            //     pause_game = true;
            // } else if (my_touch[i].x / SCALE > PLOT_RIGHT) {
            //     console.log("6");
            // } else if (my_touch[i].x / SCALE < PLOT_LEFT) {
            //     console.log("7");
            // }else if (press_bee(my_touch[i])) {
            //     console.log("8");
            // } else {
            //     console.log("9");
            // }

            mouse_x=(my_touch[i]['x']/ SCALE-WIDTH/2);
            mouse_y=(my_touch[i]['y']/ SCALE-HEIGHT/2);
            snake_angle = Math.atan2(mouse_y,mouse_x);
            // console.log(Math.atan2(mouse_y,mouse_x));
        }
    }
}

function press_pause_btn(touch_event) {

    return (touch_event.x / SCALE > (PLOT_RIGHT - 4 * WIDTH / 80) && touch_event.x / SCALE < (PLOT_RIGHT - 1.5 * WIDTH / 80) && touch_event.y / SCALE > (HEIGHT / 30) && touch_event.y / SCALE < (HEIGHT / 30 + HEIGHT / 20));
}

function press_bee(touch_event) {

    return false;
}




document.addEventListener('keydown', moveBee);

function moveBee(e) {
    if (e.code == 'ArrowRight') {
        snake_angle += 0.1;
        //anc_x += 10;
    } else if (e.code == 'ArrowLeft') {
        //anc_x -= 10;
        snake_angle -= 0.1;
    } else if (e.code =='Space' || e.code == 'ArrowUp') {
        anc_y -= 10;

    }else if (e.code =='ControlLeft' ||e.code == 'ArrowDown') {
        anc_y += 10;

    } else if (e.code == 'Enter') {
        console.log(e.code);
    }

}

document.addEventListener('keyup', stopBee);

function stopBee(e) {
    if (e.code == 'ArrowRight') {
        console.log(e.code);
    } else if (e.code == 'ArrowLeft') {
        console.log(e.code);
    } else if (e.code == 'Enter') {
        console.log(e.code);
    }

}


document.addEventListener('mousemove', function (e) {
    var rect = myGameArea.canvas.getBoundingClientRect();

    var my_touch = [{
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }];

    click_event_function(my_touch);


    e.preventDefault();
},
false
);


document.addEventListener("click", function (e) {
        var rect = myGameArea.canvas.getBoundingClientRect();

        var my_touch = [{
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }];

        click_event_function(my_touch);


        e.preventDefault();
    },
    false
);


// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    var my_touch_events = [];
    for (var i = 0; i < touchEvent.touches.length; i++) {

        my_touch_events.push({
            x: touchEvent.touches[i].clientX - rect.left,
            y: touchEvent.touches[i].clientY - rect.top
        });
    }

    return my_touch_events;
}

// Get the position of a touch relative to the canvas
function getTouchChangedPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    var my_touch_events = [];
    for (var i = 0; i < touchEvent.changedTouches.length; i++) {

        my_touch_events.push({
            x: touchEvent.changedTouches[i].clientX - rect.left,
            y: touchEvent.changedTouches[i].clientY - rect.top
        });
    }

    return my_touch_events;
}


document.addEventListener('touchstart', function (e) {
        var my_touch = getTouchPos(myGameArea.canvas, e);
        click_event_function(my_touch);
        console.log("start");
        console.log(my_touch);
        e.preventDefault();
    },
    false
);

document.addEventListener('touchmove', function (e) {
    var my_touch = getTouchPos(myGameArea.canvas, e);
        click_event_function(my_touch);
        console.log("move");
        console.log(my_touch);
    e.preventDefault(); // prevent scrolling when inside DIV
}, false);

document.addEventListener('touchend', function (e) {

    // if (e.touches.length === 0 || e.changedTouches.length === 0) {

    //     console.log("stopped 1");
    // } else {

    //     var my_touch = getTouchChangedPos(myGameArea.canvas, e);
    //     for (var i = 0; i < my_touch.length; i++) {
    //         click_event_function(my_touch);
    //         console.log("end");
    //         console.log(my_touch);
    //     }
    // }
    e.preventDefault();


}, false);



return {
    start_game:start_game,
    resume:resume,
};
}
