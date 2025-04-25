//this object is basically what stores multiple objects of smaller particles

class System {
    constructor(x,y) {
        this.x = x;
        this.y = y;


        this.particles = [];
        this.num = 5; //amount of smaller particles
        //each time pushing/creating a new particle object in the array. Basically spawning smaller particles into a group of particles
        for (let i=0; i<this.num; i++) {
            this.particles.push(new Particle(this.x, this.y));
        }

        this.done = false; //bool we use to fade out the particles after some time
    }

    update() {
        //this is what fades out the particles after some time
        this.finished();
        for (let i=this.particles.length-1; i>=0; i--) {
            this.particles[i].update();
            if (this.particles[i].done) {
                this.particles.splice(i, 1);
            }
        }
    }

    //where we display the particles
    display() {
        for (let i=0; i<this.particles.length; i++) {
            this.particles[i].display();
        }
    }

    //checks if the particle should fade
    finished() {
        if (this.particles.length == 0) {
            this.done = true;
        }
        else {
            this.done = false;
        }
    }
}