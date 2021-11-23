let background, player, actionBar, circleAction1, circleAction2, circleAction3, net, trash, mouth, timeline;

let backgroundScale = 2;


function preload() {
    this.load.image('background', './assets/images/sunsetintheswamp.png');
    this.load.image('man', './assets/images/man.png');
    this.load.image('net', './assets/images/net3.png');
    this.load.image('trash', './assets/images/trash-can.png');
    this.load.image('mouth', './assets/images/mouth.png');
}

function create () {

    // ----- CREATING ELEMENTS -----

    background = this.add.image(config.width/2, config.height/2, 'background');
    background.setScale(0.7);

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

    net = this.add.image(250, 366, 'net').setInteractive();
    net.setScale(0.07);
    net.on("pointerdown", function() {
        net.y = 300;
        net.setScale(1.3);
        net.setAlpha(0.5);
    });
    net.on("pointerup", function() {
        net.y = 366;
        net.setScale(0.07);
        net.setAlpha(1);
    });

    trash = this.add.image(350, 364, 'trash').setInteractive();
    trash.setScale(0.04);
    trash.on("pointerdown", function() {
        trash.y = 300;
        trash.setScale(0.8);
        trash.setAlpha(0.5);
    });
    trash.on("pointerup", function() {
        trash.y = 364;
        trash.setScale(0.04);
        trash.setAlpha(1);
    });

    mouth = this.add.image(450, 364, 'mouth').setInteractive();
    mouth.setScale(0.04);
    mouth.on("pointerdown", function() {
        mouth.y = 300;
        mouth.setScale(0.8);
        mouth.setAlpha(0.5);
    });
    mouth.on("pointerup", function() {
        mouth.y = 364;
        mouth.setScale(0.04);
        mouth.setAlpha(1);
    });

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

    // ----- END OF TIMELINE WITH TWEEN TO MAKE PLAYER RUN -----
}

function update() {
if (backgroundScale > 1 ) {
    backgroundScale = backgroundScale - 0.0002;
    background.setScale(backgroundScale);
}
    
}

// ----- MAKING THE WORLD RESPONSIVE -----

/*
function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}

 window.onload = function(){
    var gameConfig = {
        type: Phaser.AUTO,
        width: gameOptions.gameWidth,
        height: gameOptions.gameHeight,
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };
    var game = new Phaser.Game(gameConfig);
    resize();
    window.addEventListener("resize", resize, false);
} */

// ----- END OF MAKING THE WORLD RESPONSIVE -----


const config = {
    type: Phaser.AUTO,
    height: 400,
    width: 700,
    physics: {
        default: "arcade",
        arcade: {
          gravity: false,
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
  }
  
  new Phaser.Game(config);
  