let background, player;


function preload() {
    this.load.image('background', './assets/images/sunsetintheswamp.png');
    this.load.image('man', './assets/images/man.png');
}

function create () {

    background = this.add.image(0, 0, 'background');
    background.setOrigin (0, 0);
    background.setScale(0.7);

    player = this.add.sprite(350, 300, 'man');
    player.setScale(0.4);
    player.body.velocity.x=50;
}

function update() {

}

function playerRunning () {}



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
  