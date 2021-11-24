let background, player;


function preload() {
    this.load.image('background', './assets/images/sunsetintheswamp.png');
    this.load.image('man', './assets/images/man.png');
    this.load.image('alligator', './assets/images/alligator.png');
}

function create () {

    background = this.add.image(0, 0, 'background');
    background.setOrigin (0, 0);
    background.setScale(0.7);

    player = this.add.sprite(350, 300, 'man');
    player.setScale(0.4);
    //player.body.velocity.x=50;

    alligator = this.add.sprite(150, 250, 'alligator');
    alligator.setScale(0.05);
}

function update() {
//this.threatAppears(this.alligator);
if(scale<0.10) {
scale = scale + 0.0002
alligator.setScale(scale)
}
}

function playerRunning () {}

var scale = 0
var alligator;
/*function threatAppears () {
this.tweens.add({
    targets: alligator,
    
    ease: "Linear", // 'Cubic', 'Elastic', 'Bounce', 'Back'
    duration: 400,
    repeat: 0,
    yoyo: false
    });
}
*/


/*function threatappears() {
    var addTween = game.add.tween(alligator);
    growTween.to({x:0.2,y:0.2}, 400, Phaser.Easing.Linear.None);
}
*/

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