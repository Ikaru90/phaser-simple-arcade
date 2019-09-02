import Phaser from 'phaser';
import { Player } from './player';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' })
    this.player;
    this.bullets;
    this.keyboard;
    this.enemys;
    this.score = 0;
    this.scoreText;
    this.bestScore = 0;
    this.bestScoreText;
    this.bestScoreTextValue;
    this.spawnEnemyTimer;
  }

  preload() {
    this.load.spritesheet('boom', './assets/explosion.png', { frameWidth: 64, frameHeight: 64, endFrame: 23 });
    this.load.image('playerSprite', './assets/ship1.png');
    this.load.image('enemyShip', './assets/ship2.png');
    this.load.image('bullet', './assets/bullet.png');
    this.load.image('dark', './assets/dark.png');
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

    this.enemys = this.physics.add.group();
    this.bullets = this.physics.add.group();

    this.enemys.add(this.physics.add.sprite(500, -50, 'enemyShip'));
    this.add.text(0, 0, 'SCORE: ', {fontSize: 50});
    this.scoreText = this.add.text(200, 0, this.score, {fontSize: 50});
    this.bestScoreText = this.add.text(550, 0, 'BEST SCORE: ', {fontSize: 50});
    this.bestScoreText.visible = false;
    this.bestScoreTextValue = this.add.text(900, 0, this.bestScore, {fontSize: 50});
    this.bestScoreTextValue.visible = false;
    this.keyboard = this.input.keyboard.addKeys('A, D, SPACE');

    this.spawnEnemyTimer = setInterval(() => {
      this.enemys.add(this.physics.add.sprite(Math.floor(Math.random() * 1024), -50, 'enemyShip'));
    }, 500)

    this.physics.world.addCollider(this.bullets, this.enemys, (bullet, enemyShip) => {
      bullet.destroy();
      enemyShip.destroy();
      this.add.sprite(bullet.x, bullet.y, 'boom').play('explode');
    });
    this.physics.world.addCollider(this.player, this.enemys, (player, enemyShip) => {
      if (this.bestScore < this.score) {
        this.bestScore = this.score;
        this.bestScoreTextValue.setText(this.bestScore);
      }
      player.destroy();
      enemyShip.destroy();
      this.add.sprite(this.player.x, this.player.y, 'boom').play('explode');
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

    for(let i = 0; i < this.enemys.getChildren().length; i++){
      this.enemys.getChildren()[i].angle = 270;
      this.enemys.getChildren()[i].setVelocityY(500)
      if (this.enemys.getChildren()[i].y > 850) {
        this.enemys.getChildren()[i].setY(-50);
        this.enemys.getChildren()[i].setX(Math.floor(Math.random() * 1024));
      }
    }

    for(let i = 0; i < this.bullets.getChildren().length; i++){
      this.bullets.getChildren()[i].setVelocityY(-1000);
      this.bullets.getChildren()[i].angle = 270;
      this.bullets.getChildren()[i].setScale(0.2);
      if (this.bullets.getChildren()[i].y < 0) {
        this.bullets.getChildren()[i].destroy();
      }
    }
  }
};
