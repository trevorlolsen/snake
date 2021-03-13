var snakes = [];
var food = [];
var poison=[];

var score=0;







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



var board_sqr_length = 10;
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

