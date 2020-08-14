//defining variables   
    const board_border = 'red';
    const board_background = 'black';
    const snake_col = 'yellow';
    const snake_border = 'darkblue';

    let snake = [  {x: 200, y: 200},
                    {x: 190, y: 200},
                    {x: 180, y: 200},
                    {x: 170, y: 200},
                    {x: 160, y: 200} 
                ];

    //horizontal and vertical velocities
    let dx = 10;
    let dy = 0;

    //changing snake speed
    let delay = 100;

    //true if changing direction
    let changing_direction = false;

    //initialize score
    let score = 0;

    //food position
    let food_x;
    let food_y;

    const snakeboard = document.getElementById("gameCanvas");
    const snakeboard_ctx = gameCanvas.getContext("2d");
//

//computing part
    function random_food(min, max) {
        return Math.round((Math.random() * (max-min) + min) / 10) * 10;
    }

    function gen_food() {
        // Generate a random number the food x-coordinate
        food_x = random_food(0, snakeboard.width - 10);
        // Generate a random number for the food y-coordinate
        food_y = random_food(0, snakeboard.height - 10);
        // if the new food location is where the snake currently is, generate a new food location
        snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten) gen_food();
        });
    }

    function move_snake() {
        // Create the new Snake's head
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        // Add the new head to the beginning of snake body
        snake.unshift(head);
        const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
        if (has_eaten_food) {
        // Increase score
        score += 10;
        // Display score on screen
        document.getElementById('score').innerHTML = score;
        //increase snake speed
        delay = delay - 2;
        // Generate new food location
        gen_food();
        } else {
        // Remove the last part of snake body
        snake.pop();
        }
    }

    function change_direction(event) 
    {  
        const LEFT_KEY = 37;
        const RIGHT_KEY = 39;
        const UP_KEY = 38;
        const DOWN_KEY = 40;
        
        if (changing_direction) return;
        changing_direction = true;
        const keyPressed = event.keyCode;
        const goingUp = dy === -10;
        const goingDown = dy === 10;
        const goingRight = dx === 10;  
        const goingLeft = dx === -10;
        
            if (keyPressed === LEFT_KEY && !goingRight)
            {    
                dx = -10;
                dy = 0;  
            }
        
            if (keyPressed === UP_KEY && !goingDown)
            {    
                dx = 0;
                dy = -10;
            }
        
            if (keyPressed === RIGHT_KEY && !goingLeft)
            {    
                dx = 10;
                dy = 0;
            }
        
            if (keyPressed === DOWN_KEY && !goingUp)
            {    
                dx = 0;
                dy = 10;
            }
    }

    function has_game_ended()
    {  
        for (let i = 4; i < snake.length; i++)
        {    
            const has_collided = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
            if (has_collided)
            {   return true;    }
        }
        const hitLeftWall = snake[0].x < 0;  
        const hitRightWall = snake[0].x > snakeboard.width - 10;
        const hitToptWall = snake[0].y < 0;
        const hitBottomWall = snake[0].y > snakeboard.height - 10;
        
        return hitLeftWall ||  hitRightWall || hitToptWall || hitBottomWall;
    }
//

//graphics part
    function clearCanvas(){
        snakeboard_ctx.fillStyle = board_background;
        snakeboard_ctx.strokestyle = board_border;
        snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
        snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
    }

    // Draw the snake on the canvas
    function drawSnake() {
        // Draw each part
        snake.forEach(drawSnakePart)
    }

    //draw food
    function drawFood() {
        snakeboard_ctx.fillStyle = 'violet';
        snakeboard_ctx.strokestyle = 'darkviolet';
        snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
        snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
    }

    // Draw one snake part
    function drawSnakePart(snakePart) {

        // Set the colour of the snake part
        snakeboard_ctx.fillStyle = snake_col;
        // Set the border colour of the snake part
        snakeboard_ctx.strokestyle = snake_border;
        // Draw a "filled" rectangle to represent the snake part at the coordinates
        // the part is located
        snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
        // Draw a border around the snake part
        snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }
//

//game control
    //main();
    //gen_food();
    document.getElementById('play').onclick = main ;

    document.getElementById('stop').onclick = stop ;

    document.getElementById('reset').onclick = reset ;
    
    document.addEventListener("keydown", change_direction);

    document.addEventListener('DOMContentLoaded', ()=>{
        clearCanvas();
        gen_food();
        drawSnake();
    });

    function main(){
        if (has_game_ended()) {
            alert(`Your score is ${score} !`);
            reset();
        }
        else {
            changing_direction = false;
            setTimeout(function onTick() {
                clearCanvas();
                drawFood();
                move_snake();
                drawSnake();
                //call main again
                main();
            }, delay)
        }
    }

    function stop(){
        alert(`Your score is ${score} !`);
        reset();
    }
    
    function reset(){
        location.reload();
    }
//





