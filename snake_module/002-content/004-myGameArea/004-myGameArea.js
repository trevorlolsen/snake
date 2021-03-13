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