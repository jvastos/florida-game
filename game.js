// ----- CONFIG -----

const config = {
    type: Phaser.AUTO,
    height: 400,
    width: 700,
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
        gravity: { y: 0 }
      }
    },
    scene: [Main]
  }

  // ----- END OF CONIG -----
  
  new Phaser.Game(config);