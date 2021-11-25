// ----- CONFIG -----

const config = {
    type: Phaser.AUTO,
    height: 400,
    width: 700,
    physics: {
        default: "arcade",
        arcade: {
          gravity: false,
          debug: true
        }
    },
    scene: [Main]
  }

  // ----- END OF CONIG -----
  
  new Phaser.Game(config);