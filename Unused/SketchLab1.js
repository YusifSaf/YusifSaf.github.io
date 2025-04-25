




// redBrick = {
//     x: 0,
//     y: 0,
//     w: 100,
//     h: 100,
//     xSpeed: 3,
//     ySpeed: 3,
//     colour: 'blue',

//     draw: function(){
//         fill(redBrick.colour);
//         rect(redBrick.x, redBrick.y, redBrick.w, redBrick.h);
//     },

//     move: function(){
//         redBrick.x += redBrick.xSpeed;
//         redBrick.y += redBrick.ySpeed;

//         //flip on Y
//         if(redBrick.y > height - this.h || redBrick.y < 0){
//             redBrick.ySpeed *= -1;
//         }

//         //flip on X
//         if (redBrick.x > width - this.w || redBrick.x < 0){
//             redBrick.xSpeed *= -1;
//         }
//     }
// }

// function setup(){
//     createCanvas(720, 480);
// }

// function draw(){
//     background("grey");
//     redBrick.draw();
//     redBrick.move();
// }