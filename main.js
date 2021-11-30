let background, 
player, 
actionBar, 
circleAction1, 
circleAction2, 
circleAction3, 
net, trash, mouth, 
timeline, 
alligator, 
cuban,
snake,
islandboys,
trump,
throwSound, 
metalSound, 
biteSound,
scale = 0,
backgroundScale = 2,
randomX,
addThreat,
threat,
score = 0,
scoreDisplay,
destroyListener,
randomNumber,
randomThreat,
speed = 0.8,
ifAddThreat = true,
initialYPosition = 80,
theTimer,
lives = 3,
livesDisplay,
gameOverText,
restartText,
scaleSpeed = 0.003,
delay = 1000;

class Main extends Phaser.Scene {
    constructor () {
        super("Main");
        
    }

    preload() {
        this.load.image('background', './assets/images/sunsetintheswamp.png');
        this.load.image('man', './assets/images/man.png');
        this.load.image('net', './assets/images/net3.png');
        this.load.image('trash', './assets/images/trash-can.png');
        this.load.image('mouth', './assets/images/mouth.png');
        this.load.image('alligator', './assets/images/alligator.png');
        this.load.image('cuban', './assets/images/cuban.png');
        this.load.image('islandboys', './assets/images/islandboys.png');
        this.load.image('snake', './assets/images/snake.png');
        this.load.image('trump', './assets/images/trump.png');
        this.load.audio('throw', './assets/sounds/throw.mp3')
        this.load.audio('metal', './assets/sounds/metal-sound.mp3')
        this.load.audio('bite', './assets/sounds/bite.mp3')
    }

    create () {

    theTimer = setInterval(() => {speed += 0.6; scaleSpeed += 0.006}, 10000);

    // ----- CREATING ELEMENTS -----

    background = this.add.image(config.width/2, config.height/2, 'background');
    background.setScale(0.7);

    scoreDisplay = this.add.text(20, 20, "You have survived to: " + "0" + " Florida threats", {fontSize: "25px"});

    livesDisplay = this.add.text(20, 50, "Lives: " + "3", {fontSize: "25px"});

    this.createThreat();

    player = this.add.sprite(350, 280, 'man');
    player.setScale(0.4);

    actionBar = this.add.graphics();
    actionBar.fillStyle(0x15702b, 1);
    actionBar.fillRoundedRect(200, 330, 300, 70, { tl: 30, tr: 30, bl: 0, br: 0 });

    circleAction1 = this.add.circle(250, 365, 25, 0xffffff).setInteractive({ cursor: 'pointer' });
    circleAction1.setStrokeStyle(2, 0x000000);
    circleAction2 = this.add.circle(350, 365, 25, 0xffffff).setInteractive({ cursor: 'pointer' });
    circleAction2.setStrokeStyle(2, 0x000000);
    circleAction3 = this.add.circle(450, 365, 25, 0xffffff).setInteractive({ cursor: 'pointer' });
    circleAction3.setStrokeStyle(2, 0x000000);

    throwSound = this.sound.add("throw");    
    metalSound = this.sound.add("metal");    
    biteSound = this.sound.add("bite");    

    net = this.add.image(250, 366, 'net').setInteractive();
    net.setScale(0.07);

    trash = this.add.image(350, 364, 'trash').setInteractive();
    trash.setScale(0.04);

    mouth = this.add.image(450, 364, 'mouth').setInteractive();
    mouth.setScale(0.04);

    // ----- CREATE KEY BIDING FOR 1,2 AND 3 TO FIRE ACTIONS -----

    this.input.keyboard.on('keydown', function (e) {

        if (e.key == "1") {

            throwSound.play();
            net.y = 300;
            net.setScale(1.3);
            net.setAlpha(0.5);
            alligator.destroy();
            addThreat = "alligator";

        } else if (e.key == "2") {
            metalSound.play();
            trash.y = 300;
            trash.setScale(0.8);
            trash.setAlpha(0.5);

            if(threat===snake) {
                snake.destroy();
                addThreat = "snake";

            } else if (threat===trump) {
                trump.destroy();
                addThreat = "trump";

            } else if (threat===islandboys) {
                islandboys.destroy();
                addThreat = "islandboys";
            }
        
        } else if (e.key == "3") {
            biteSound.play();
            mouth.y = 300;
            mouth.setScale(0.8);
            mouth.setAlpha(0.5);
            cuban.destroy();
            addThreat = "cuban";
        }
    }, this);

    this.input.keyboard.on('keyup', function (e) {
        if (e.key == "1") {
            net.y = 366;
            net.setScale(0.07);
            net.setAlpha(1);
        } else if (e.key == "2") {
            trash.y = 364;1
            trash.setScale(0.04);
            trash.setAlpha(1);
        } else if (e.key == "3") {
            mouth.y = 364;
            mouth.setScale(0.04);
            mouth.setAlpha(1);
        }
    }, this);
        
    // ----- END OF CREATE KEY BIDING FOR 1,2 1AND 3 TO FIRE ACTIONS -----

    // ----- TWEEN FOR THE PLAYER RUNNIG -----

    timeline = this.tweens.timeline({

        targets: player,
        loop: Infinity,
        yoyo: true,
        tweens: [
            {
                y: 270,
                duration: 200,
                ease: 'power2',
                loop: 10,
                yoyo: true
            },
            {
                y: 275,
                duration: 300,
                ease: 'power2',
                loop: 4,
                yoyo: true
            }
        ]
    });

    }

    // ----- END OF TWEEN FOR THE PLAYER RUNNIG -----

    // ----- END OF CREATING ELEMENTS -----

    // ----- FUNCTIONS -----

    update() {
        if (backgroundScale > 1 ) {
            backgroundScale = backgroundScale - 0.0002;
            background.setScale(backgroundScale);
        };

        if(ifAddThreat) {
            this.createThreat();
        } else {
            this.moveThreat(threat)
        };
        
        //to stop the timer
        if(speed > 5)clearInterval(theTimer);

        if(lives === 0) {
            this.gameOver()
        }
    }

    createThreat() {
        
        let randomX = Phaser.Math.Between(0, config.width);

        randomNumber = Math.floor(Math.random() * 5);
        console.log(randomNumber);

        if(randomNumber === 0){
            alligator = this.add.sprite(randomX, initialYPosition, 'alligator');
            threat = alligator
            alligator.setScale(0);
            alligator.on('destroy', this.addToScore)
        } else if (randomNumber === 1) {
            cuban = this.add.sprite(randomX, initialYPosition, 'cuban');
            threat = cuban
            cuban.setScale(0);
            cuban.on('destroy', this.addToScore)
        } else if (randomNumber === 2) {
            snake = this.add.sprite(randomX, initialYPosition, 'snake');
            threat = snake
            snake.setScale(0);
            snake.on('destroy', this.addToScore)
        } else if (randomNumber === 3) {
            islandboys = this.add.sprite(randomX, initialYPosition, 'islandboys');
            threat = islandboys
            islandboys.setScale(0);
            islandboys.on('destroy', this.addToScore)
        } else if (randomNumber === 4) {
            trump = this.add.sprite(randomX, initialYPosition, 'trump');
            threat = trump
            trump.setScale(0);
            trump.on('destroy', this.addToScore)
        }

        ifAddThreat = false;
        scale = 0;


    }


    
    // TIMER INSIDE CREATE FUNCTION TO BOTH CALL NEW DANGER AND
    // 
    moveThreat(threat) {
            threat.y += speed;
            scale = scale + scaleSpeed
            threat.setScale(scale)

            if(threat.y > config.height) {
            if (threat.visible) {this.lifeTaking();}
            this.resetThreat(threat);
            this.createThreat();
            console.log("threat hit bottom");
            }
        }

    resetThreat(threat) {
        threat.destroy()
        }

    addToScore() {
        if(threat.y < config.height) {
            score++;
            scoreDisplay.setText("You have survived to: " + score + " Florida threats");
        }
       console.log('score', score)
    }

    lifeTaking () {
        lives--;
        livesDisplay.setText("Lives: " + lives);
    }
    
    gameOver () {
        this.scene.pause();
    }

}


