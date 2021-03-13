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




// document.addEventListener('keydown', moveBee);

// function moveBee(e) {
//     if (e.code == 'ArrowRight') {
//         snake_angle += 0.1;
//         //anc_x += 10;
//     } else if (e.code == 'ArrowLeft') {
//         //anc_x -= 10;
//         snake_angle -= 0.1;
//     } else if (e.code =='Space' || e.code == 'ArrowUp') {
//         anc_y -= 10;

//     }else if (e.code =='ControlLeft' ||e.code == 'ArrowDown') {
//         anc_y += 10;

//     } else if (e.code == 'Enter') {
//         console.log(e.code);
//     }

// }

// document.addEventListener('keyup', stopBee);

// function stopBee(e) {
//     if (e.code == 'ArrowRight') {
//         console.log(e.code);
//     } else if (e.code == 'ArrowLeft') {
//         console.log(e.code);
//     } else if (e.code == 'Enter') {
//         console.log(e.code);
//     }

// }


document.addEventListener('mousemove', function (e) {
    var rect = myGameArea.canvas.getBoundingClientRect();

    var my_touch = [{
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }];

    click_event_function(my_touch);


    //e.preventDefault();
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


        //e.preventDefault();
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
    
        //e.preventDefault();
    },
    false
);

document.addEventListener('touchmove', function (e) {
    var my_touch = getTouchPos(myGameArea.canvas, e);
        click_event_function(my_touch);
   
    //e.preventDefault(); // prevent scrolling when inside DIV
}, false);

// document.addEventListener('touchend', function (e) {

//     // if (e.touches.length === 0 || e.changedTouches.length === 0) {

//     //     console.log("stopped 1");
//     // } else {

//     //     var my_touch = getTouchChangedPos(myGameArea.canvas, e);
//     //     for (var i = 0; i < my_touch.length; i++) {
//     //         click_event_function(my_touch);
//     //         console.log("end");
//     //         console.log(my_touch);
//     //     }
//     // }
//     e.preventDefault();


// }, false);

