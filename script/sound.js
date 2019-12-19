class BallSound {
    constructor()
    {
  
        this.collision=new Audio('sound/collision.mp3');
        this.addBall=new Audio('sound/addBall.mp3');
        this.gameover=new Audio('sound/gameover.mp3');
    
    }

    startSound=()=>{
        this.startgame.play();
    }
        collisionSound=()=>{
            this.collision.play();
        }
        addballsound=()=>{
            this.addBall.play();
        }
        gameOversound=()=>{
            this.gameover.play();
        }
     
  }