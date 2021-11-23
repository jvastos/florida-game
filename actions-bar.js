let background, player, actionBar, circleAction1, circleAction2, circleAction3;


function preload() {
    this.load.image('background', './assets/images/sunsetintheswamp.png');
    this.load.image('man', './assets/images/man.png');
}

function create () {

    background = this.add.image(0, 0, 'background');
    background.setOrigin (0, 0);
    background.setScale(0.7);

    player = this.add.sprite(350, 280, 'man');
    player.setScale(0.4);

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
    },

    actionBar = this.add.graphics(),
    actionBar.fillStyle(0x15702b, 1),
    actionBar.fillRoundedRect(200, 330, 300, 70, { tl: 30, tr: 30, bl: 0, br: 0 }),

    circleAction1 = this.add.circle(250, 365, 25, 0xffffff).setInteractive({ cursor: 'pointer' }),
    circleAction1.setStrokeStyle(2, 0x000000).setInteractive({ cursor: 'pointer' }),
    circleAction2 = this.add.circle(350, 365, 25, 0xffffff).setInteractive({ cursor: 'pointer' }),
    circleAction2.setStrokeStyle(2, 0x000000).setInteractive({ cursor: 'pointer' }),
    circleAction3 = this.add.circle(450, 365, 25, 0xffffff).setInteractive({ cursor: 'pointer' }),
    circleAction3.setStrokeStyle(2, 0x000000).setInteractive({ cursor: 'pointer' })
    );
}

function update() {

}



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
  