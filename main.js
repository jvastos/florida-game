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
    iguana,
    coconut,
    throwSound,
    metalSound,
    biteSound,
    alligatorhiss,
    snakeHiss,
    queRico,
    islandBoySong,
    trumpStupid,
    trumpAmerica,
    soundtrack,
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
    lives = 5,
    livesDisplay,
    gameOverText,
    restartText,
    recordScoreText,
    looseMsg1,
    looseMsg2,
    looseMsg3,
    looseMsg4,
    looseMsg5,
    gameOverText2,
    scaleSpeed = 0.003,
    delay = 1000;

class Main extends Phaser.Scene {
    constructor() {
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
        this.load.image('coconut', './assets/images/coconut.png');
        this.load.image('iguana', './assets/images/iguana.png');
        this.load.audio('throw', './assets/sounds/throw.mp3')
        this.load.audio('metal', './assets/sounds/metal-sound.mp3')
        this.load.audio('bite', './assets/sounds/bite.mp3')
        this.load.audio('soundtrack', './assets/sounds/pitbull_soundtrack.mp3')
        this.load.audio('alligatorhiss', './assets/sounds/hissing_alligator_sfx_producer.mp3')
        this.load.audio('islandBoySong', './assets/sounds/islandBoySong.mp3')
        this.load.audio('snakeHiss', './assets/sounds/snakeHissSFXProducer.mp3')
        this.load.audio('queRico', './assets/sounds/queRico.mp3')
        this.load.audio('trumpStupid', './assets/sounds/trumpStupid.mp3')
        this.load.audio('trumpAmerica', './assets/sounds/trumpAmerica.mp3')
    }

    create() {


        theTimer = setInterval(() => {
            speed += 0.9;
            scaleSpeed += 0.01
            console.log(speed);
        }, 6000);

        // ----- CREATING ELEMENTS -----

        background = this.add.image(config.width / 2, config.height / 2, 'background');
        background.setScale(0.7);

        scoreDisplay = this.add.text(20, 20, "Threats conquered: " + score, {
            fontFamily: 'Kanit',
            fontSize: "40px"
        });
        scoreDisplay.setTint(0x20b344, 0x20b378, 0x20b3a7, 0x2031b3);

        livesDisplay = this.add.text(20, 70, "Lives: " + lives, {
            fontFamily: 'Kanit',
            fontSize: "40px"
        });
        livesDisplay.setTint(0x20b344, 0x20b378, 0x20b3a7, 0x2031b3);


        this.createThreat();

        player = this.add.sprite(window.innerHeight - 20, window.innerWidth / 2, 'man');
        player.setScale(0.6);
        player.setOrigin(0.5, 1);

        actionBar = this.add.graphics();
        actionBar.fillStyle(0x15702b, 1);
        actionBar.fillRoundedRect(window.innerWidth / 2 - 280
            , window.innerHeight - 70, 500, 70, {
            tl: 30,
            tr: 30,
            bl: 0,
            br: 0
        });

        circleAction1 = this.add.circle(window.innerWidth / 2 - 240, window.innerHeight - 35, 25, 0xffffff);
        circleAction1.setStrokeStyle(2, 0x000000);

        circleAction2 = this.add.circle(window.innerWidth / 2 - 30, window.innerHeight - 35, 25, 0xffffff);
        circleAction2.setStrokeStyle(2, 0x000000);

        circleAction3 = this.add.circle(window.innerWidth / 2 + 180, window.innerHeight - 35, 25, 0xffffff);
        circleAction3.setStrokeStyle(2, 0x000000);

        throwSound = this.sound.add("throw");
        metalSound = this.sound.add("metal");
        biteSound = this.sound.add("bite");
        soundtrack = this.sound.add("soundtrack", {volume: 0.4});
        soundtrack.play();

        alligatorhiss = this.sound.add("alligatorhiss");
        islandBoySong = this.sound.add("islandBoySong");
        snakeHiss = this.sound.add("snakeHiss");
        queRico = this.sound.add('queRico');
        trumpStupid = this.sound.add('trumpStupid');
        trumpAmerica = this.sound.add('trumpAmerica');

        net = this.add.image(window.innerWidth / 2 - 240, window.innerHeight - 34, 'net').setInteractive();
        net.setScale(0.07);

        trash = this.add.image(window.innerWidth / 2 - 30, window.innerHeight - 36, 'trash').setInteractive();
        trash.setScale(0.04);

        mouth = this.add.image(window.innerWidth / 2 + 180, window.innerHeight - 36, 'mouth').setInteractive();
        mouth.setScale(0.04);

        // ----- CREATE KEY BIDING FOR 1,2 AND 3 TO FIRE ACTIONS -----

        this.input.keyboard.on('keydown', function (e) {

            if (e.key == "1") {
                score = score - 2;
                scoreDisplay.setText("Threats conquered: " + score);
                throwSound.play();
                net.y = net.y - 300;
                net.setScale(2);
                net.setAlpha(0.5);

                if (threat === alligator) {
                    alligator.destroy();
                    addThreat = "alligator";
                    alligatorhiss.play();
                } else if (threat === iguana) {
                    iguana.destroy();
                    addThreat = "iguana";
                }

            } else if (e.key == "2") {
                score = score - 2;
                scoreDisplay.setText("Threats conquered: " + score);
                metalSound.play();
                trash.y = trash.y - 400;
                trash.setScale(1);
                trash.setAlpha(0.5);

                if (threat === snake) {
                    snake.destroy();
                    addThreat = "snake";
                    snakeHiss.play();

                } else if (threat === trump) {
                    trump.destroy();
                    addThreat = "trump";
                    trumpAmerica.play();

                } else if (threat === islandboys) {
                    islandboys.destroy();
                    addThreat = "islandboys";
                    islandBoySong.play();
                }

            } else if (e.key == "3") {
                score = score - 2;
                scoreDisplay.setText("Threats conquered: " + score);
                biteSound.play();
                mouth.y = mouth.y - 300;
                mouth.setScale(1);
                mouth.setAlpha(0.5);


                if (threat === cuban) {
                    cuban.destroy();
                    addThreat = "cuban";
                    queRico.play();

                } else if (threat === coconut) {
                    coconut.destroy();
                    addThreat = "coconut";
                }
            }
        }, this);

        this.input.keyboard.on('keyup', function (e) {
            if (e.key == "1") {
                net.y = window.innerHeight - 34;
                net.setScale(0.07);
                net.setAlpha(1);
            } else if (e.key == "2") {
                trash.y = window.innerHeight - 36;
                trash.setScale(0.04);
                trash.setAlpha(1);
            } else if (e.key == "3") {
                mouth.y = window.innerHeight - 36;
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
            tweens: [{
                    y: player.y - 30,
                    duration: 200,
                    ease: 'power2',
                    loop: 10,
                    yoyo: true
                },
                {
                    y: player.y - 25,
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
        if (backgroundScale > 1.5) {
            backgroundScale = backgroundScale - 0.0002;
            background.setScale(backgroundScale);
        };

        if (ifAddThreat) {
            this.createThreat();
        } else {
            this.moveThreat(threat)
        };

        //to stop the timer
        if (speed > 15) clearInterval(theTimer);

        if (lives === 0) {
            this.gameOver();

        }
    }

    createThreat() {

        let randomX = Phaser.Math.Between(0, config.width);

        randomNumber = Math.floor(Math.random() * 7);
        console.log(randomNumber);

        if (randomNumber === 0) {
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
        } else if (randomNumber === 5) {
            iguana = this.add.sprite(randomX, initialYPosition, 'iguana');
            threat = iguana
            iguana.setScale(0);
            iguana.on('destroy', this.addToScore)
        } else if (randomNumber === 6) {
            coconut = this.add.sprite(randomX, initialYPosition, 'coconut');
            threat = coconut
            coconut.setScale(0);
            coconut.on('destroy', this.addToScore)
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

        if (threat.y > config.height) {
            if (threat.visible) {
                this.lifeTaking();
            }
            this.resetThreat(threat);
            this.createThreat();
            console.log("threat hit bottom");
        }
    }

    resetThreat(threat) {
        threat.destroy()
    }

    addToScore() {
        if (threat.y < config.height) {
            score = score + 3;
            scoreDisplay.setText("Threats conquered: " + score);
        }
        console.log('score', score)
    }

    lifeTaking() {
        lives--;
        livesDisplay.setText("Lives: " + lives);
    }

    gameOver() {
        this.scene.pause();

        gameOverText = this.add.text(window.innerWidth / 2, window.innerHeight / 2 - 50, "You survived " + score + " threats", {
            fontFamily: 'Kanit',
            fontSize: "30px"
        })
        gameOverText.setOrigin(0.5);

        gameOverText2 = this.add.text(window.innerWidth / 2, window.innerHeight / 2 + 100, "Wait some seconds and you can try again", {
            fontFamily: 'Kanit',
            fontSize: "20px"
        })
        gameOverText2.setOrigin(0.5);

        if (score < 10) {
            looseMsg1 = this.add.text(window.innerWidth / 2, window.innerHeight / 2, "Would you even survive a Christmas dinner?", {
                fontFamily: 'Kanit',
                fontSize: "30px"
            });
            looseMsg1.setOrigin(0.5);
    
        } else if (score >= 10 && score < 30 ) {
            looseMsg2 = this.add.text(window.innerWidth / 2, window.innerHeight / 2, "Nice try! But you’re still gator bait", {
                fontFamily: 'Kanit',
                fontSize: "30px"
            });
            looseMsg2.setOrigin(0.5);

        } else if (score >= 30 && score < 40 ) {
            looseMsg3 = this.add.text(window.innerWidth / 2, window.innerHeight / 2, "Dale! You are a natural.", {
                fontFamily: 'Kanit',
                fontSize: "30px"
            });
            looseMsg3.setOrigin(0.5);

        } else if (score >= 40 && score < 50 ) {
            looseMsg4 = this.add.text(window.innerWidth / 2, window.innerHeight / 2, "You are the new Mr. 305, Mr. Worldwide!", {
                fontFamily: 'Kanit',
                fontSize: "30px"
            });
            looseMsg4.setOrigin(0.5);

        }else if (score >= 50) {
            looseMsg5 = this.add.text(window.innerWidth / 2, window.innerHeight / 2, "Wow. You are now officially a honorary citizen of the great state of Florida, amigo", {
                fontFamily: 'Kanit',
                fontSize: "30px"
        });
            looseMsg5.setOrigin(0.5);
    };
        setTimeout(() => {
            return window.location.assign("index.html");
        }, 20000); // Goes back to index.html with a 20 seconds delay. Increase delay?
    }

}