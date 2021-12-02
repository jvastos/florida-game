let background,
    player,
    actionBar,
    circleAction1,
    circleAction2,
    circleAction3,
    net, trash, mouth,
    timeline,
    backgroundScale = 2,
    score = 0,
    scoreDisplay,
    lives = 5,
    livesDisplay,
  

class Intro extends Phaser.Scene {
    constructor() {
        super("Intro");

    }

    preload() {
        this.load.image('background', './assets/images/sunsetintheswamp.png');
        this.load.image('man', './assets/images/man.png');
        this.load.image('net', './assets/images/net3.png');
        this.load.image('trash', './assets/images/trash-can.png');
        this.load.image('mouth', './assets/images/mouth.png');
        
    }
    
    create() {

        this.hsv = Phaser.Display.Color.HSVColorWheel();

        theTimer = setInterval(() => {
            speed += 0.6;
            scaleSpeed += 0.006
        }, 8000);

        // ----- CREATING ELEMENTS -----

        background = this.add.image(config.width / 2, config.height / 2, 'background');
        background.setScale(0.7);

        scoreDisplay = this.add.text(20, 20, "Threats conquered: " + score, {
            fontFamily: 'IM Fell French Canon SC',
            fontSize: "25px"
        });
        scoreDisplay.setTint(0x20b344, 0x20b378, 0x20b3a7, 0x2031b3);

        livesDisplay = this.add.text(20, 50, "Lives: " + lives, {
            fontFamily: 'IM Fell French Canon SC',
            fontSize: "25px"
        });
        livesDisplay.setTint(0x20b344, 0x20b378, 0x20b3a7, 0x2031b3);


        this.createThreat();

        player = this.add.sprite(350, 280, 'man');
        player.setScale(0.4);

        actionBar = this.add.graphics();
        actionBar.fillStyle(0x15702b, 1);
        actionBar.fillRoundedRect(200, 330, 300, 70, {
            tl: 30,
            tr: 30,
            bl: 0,
            br: 0
        });

        circleAction1 = this.add.circle(250, 365, 25, 0xffffff).setInteractive({
            cursor: 'pointer'
        });
        circleAction1.setStrokeStyle(2, 0x000000);
        circleAction2 = this.add.circle(350, 365, 25, 0xffffff).setInteractive({
            cursor: 'pointer'
        });
        circleAction2.setStrokeStyle(2, 0x000000);
        circleAction3 = this.add.circle(450, 365, 25, 0xffffff).setInteractive({
            cursor: 'pointer'
        });
        circleAction3.setStrokeStyle(2, 0x000000);

        

        net = this.add.image(250, 366, 'net').setInteractive();
        net.setScale(0.07);

        trash = this.add.image(350, 364, 'trash').setInteractive();
        trash.setScale(0.04);

        mouth = this.add.image(450, 364, 'mouth').setInteractive();
        mouth.setScale(0.04);

    }
}