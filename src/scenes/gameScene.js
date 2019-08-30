import Phaser from 'phaser';
import { Player } from './player';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({key: 'GameScene'})
    this.player;
    this.fires;
    this.keyboard;
    this.enemyShips;
    this.score = 0;
    this.scoreText;
    this.bestScore = 0;
    this.bestScoreText;
    this.bestScoreTextValue;
    this.spawnEnemyTimer;
  }

  preload() {
    this.load.spritesheet('boom', 'explosion.png', { frameWidth: 64, frameHeight: 64, endFrame: 23 });
    this.load.image('playerSprite', 'ship1.png');
    this.load.image('enemyShip', 'ship2.png');
    this.load.image('bullet', 'bullet.png');
    this.load.image('dark', 'dark.png');
  }

  create() {
    this.add.sprite(0, 0, 'dark').setOrigin(0, 0);

    const config = {
      key: 'explode',
      frames: this.anims.generateFrameNumbers('boom'),
      frameRate: 20,
    };

    this.anims.create(config);

    this.player = new Player(this);

    this.enemyShips = this.physics.add.group();
    this.fires = this.physics.add.group();

    this.enemyShips.add(this.physics.add.sprite(500, -50, 'enemyShip'));
    this.add.text(0, 0, 'SCORE: ', {fontSize: 50});
    this.scoreText = this.add.text(200, 0, this.score, {fontSize: 50});
    this.bestScoreText = this.add.text(550, 0, 'BEST SCORE: ', {fontSize: 50});
    this.bestScoreText.visible = false;
    this.bestScoreTextValue = this.add.text(900, 0, this.bestScore, {fontSize: 50});
    this.bestScoreTextValue.visible = false;
    this.keyboard = this.input.keyboard.addKeys('A, D, SPACE');

    this.spawnEnemyTimer = setInterval(() => {
      this.enemyShips.add(this.physics.add.sprite(Math.floor(Math.random() * 1024), -50, 'enemyShip'));
    }, 500)

    this.physics.world.addCollider(this.fires, this.enemyShips, (fire, enemyShip) => {
      fire.destroy();
      enemyShip.destroy();
      this.add.sprite(fire.x, fire.y, 'boom').play('explode');
    });
    this.physics.world.addCollider(this.playerSprite, this.enemyShips, (playerSprite, enemyShip) => {
      if (this.bestScore < this.score) {
        this.bestScore = this.score;
        this.bestScoreTextValue.setText(this.bestScore);
      }
      playerSprite.destroy();
      enemyShip.destroy();
      this.add.sprite(this.playerSprite.x, this.playerSprite.y, 'boom').play('explode');
      setTimeout(() => {
        this.score = 0;
        clearTimeout(this.spawnEnemyTimer);
        this.scene.restart();
      }, 1500)
    })
  }

  update() {
    this.player.init();

    if (this.bestScore > 0) {
      this.bestScoreText.visible = true;
      this.bestScoreTextValue.visible = true;
    }

    for(let i = 0; i < this.enemyShips.getChildren().length; i++){
      this.enemyShips.getChildren()[i].angle = 270;
      this.enemyShips.getChildren()[i].setVelocityY(500)
      if (this.enemyShips.getChildren()[i].y > 850) {
        this.enemyShips.getChildren()[i].setY(-50);
        this.enemyShips.getChildren()[i].setX(Math.floor(Math.random() * 1024));
      }
    }

    for(let i = 0; i < this.fires.getChildren().length; i++){
      this.fires.getChildren()[i].setVelocityY(-1000);
      this.fires.getChildren()[i].angle = 270;
      this.fires.getChildren()[i].setScale(0.2);
      if (this.fires.getChildren()[i].y < 0) {
        this.fires.getChildren()[i].destroy();
      }
    }
  }
};
