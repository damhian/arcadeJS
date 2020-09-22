import Phaser from 'phaser'

let holes = [];
// if (window.location)

// socket.on('current_players', (players) => {
//   console.log(players);
//   const keys = Object.keys(players);
//   for (let i = 0; i < keys.length; i++) {
//     // if (keys[i] === playerID) {
//     //   setScores({ ...scores, player: players[keys[i]].score });
//     // } else {
//     //   setScores({ ...scores, enemy: players[keys[i]].score });
//     // }
//   }
// });
// socket.on('game_update', (game_state) => {
//   console.log(game_state); // Dijalankan selama interval "1 detik"
//   // setTimer(game_state.timer);
//   // setHoles(game_state.holes);
// });
// socket.on('score_update', (players) => {
//   console.log(players) // Terpanggil setiap kali player pukul tikus
// });

// config biasa
// const config = {
//     width: 800,
//     height: 600,
//     type: Phaser.AUTO,
//     backgroundColor: '#008000',
//     scene: {
//       preload: preload,
//       create: create,
//       update: update,
//       clickHandler: clickHandler.bind({ scene: this })
//     },
//     physics: {
//       default: 'arcade',
//       arcade: {
//         gravity: { y: 200 }
//       }
//     },
//     pixelArt: true,
//     parent: 'game-container',
//     canvas: document.getElementById('game-container'),
//     autoCenter: Phaser.Scale.Center
// };

// // config rusak
const config = (socket) => {
  console.log(socket);
  return {
    width: 800,
    height: 600,
    type: Phaser.CANVAS,
    backgroundColor: '#008000',
    scene: {
      preload: preload,
      create: create,
      update: update,
      clickHandler: clickHandler.bind({ scene: this, socket })
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 }
      }
    },
    pixelArt: true,
    canvas: document.getElementById('game-container'),
    autoCenter: Phaser.Scale.Center
  }
}

// const game = new Phaser.Game(config)

function preload() {
  this.load.image({ key: "background", url: require("../assets/WhackAMole/bg_1.png") })
  this.load.image("hole", require("../assets/WhackAMole/hole.png"), {})
  this.load.image("mole", require("../assets/WhackAMole/mole 2.png"), {})
  this.score = 0
}

function create() {
  this.add.image(400, 300, "background")
  this.add.text(0.5, 0.5, "Hello World", { color: '#000000' })
  const holePos = [[100, 150], [366.67, 150], [633.3367, 150], [100, 450], [366.67, 450], [633.3367, 450]]

  for (let i = 0; i < 6; i++) {
    var hole1 = this.add.sprite(holePos[i][0], holePos[i][1], "hole")
  }
  this.info = this.add.text(700, 10, '', { font: '20px Arial' });
  this.timer = this.time.addEvent({ delay: 3000, loop: true, callback: showMole, callbackScope: this })

  this.moles = []
  const pos = [[100, 120], [366.67, 120], [633.3367, 120], [100, 420], [366.67, 420], [633.3367, 420]]
  // socket.on

  for (let i = 0; i < 6; i++) {
    let x = pos[i][0]
    let y = pos[i][1]
    let moleSprite = this.add.sprite(x, y, "mole")
    moleSprite.setVisible(false)
    // moleSprite.once('clicked', clickHandler.bind(this));

    this.moles.push(moleSprite)
  }

  // var sceneShowBall = showBall.bind(this)
  //     sceneShowBall()
}
function message() {
  console.log('seelsai')
}
function update() {
  this.info.setText('Score: ' + this.score + '\nTime: ' + Math.floor(10000 - this.timer.getElapsed()));
}
function clickHandler() {
  // this.socket.emit('hit', ({ id: localStorage.id, holes }));
  console.log(this)
  // this.mole.setVisible(false)
  // this.score += 5
  // this.mole.off('clicked', clickHandler);
  // this.mole.input.enabled = false;
  // this.mole.setVisible(false);
}
function showMole() {
  let i = Math.ceil(Math.random() * 5)
  // eslint-disable-next-line
  this.moles.filter((mole, index) => {
    if (index !== i) {
      mole.setVisible(false)
    } else {
      this.mole = this.moles[i].setVisible(true)
      this.mole.setInteractive()
      this.input.on('gameobjectup', function (pointer, gameObject) {
        gameObject.emit('clicked', gameObject);
      }, this);
      this.mole.once('clicked', clickHandler.bind(this));
    }
  })
}

// ReactDOM.render(<Test />, document.getElementById("root"));

export default config;