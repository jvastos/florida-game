// ----- CONFIG -----

const config = {
    type: Phaser.AUTO,
    height: window.innerHeight,
    width: window.innerWidth,
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