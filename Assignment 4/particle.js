class Particle {
    constructor(x, y) {
        colorMode(HSB, 255);
        
        //the spawning positions of vectors
        this.pos = createVector(x, y);
        this.vel = createVector(0,0);
        this.acc = p5.Vector.random2D();
        this.acc.mult(0.1);

        this.life = 255;
        this.brightness = 255
        this.done = false;

        //I created the lines below to pick random letters and symbols from a list of characters and spawn them as particles, because I think it looks cool
        this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789;[]{}:.,/?<>/*-+';

        //I think this is pretty clear
        this.a = random(0,80);
        this.b = random(this.a, this.a+4);
        this.result = '';
        this.result = this.chars.slice(this.a,this.b);
    }

    update() {
        this.finished();

        this.vel.add(this.acc);
        this.pos.add(this.vel);

        //fading time of particles. Change this to increased or decrease it
        this.life -= 10;
        this.brightness -=15

        //I've mapped hue value of the trail color to the mouse position
        this.hueValue = map(mouseX, 0, (width-200), 0, 255);
    }

    display() {
        //changing hue and brightness based on mouse position and time since particle spawn
        fill(this.hueValue, this.brightness, this.life);
        //circle(this.pos.x, this.pos.y, 5, 5);
        textSize(32);
        //textFont()
        text(this.result, this.pos.x, this.pos.y);;
    }

    //checks if the particle should fade out
    finished() {
        if (this.life < 0) {
            this.done = true;
        }
        else {
            this.done = false;
        }
    }
}   