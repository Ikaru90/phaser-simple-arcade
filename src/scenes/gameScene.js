import Phaser from 'phaser';
import { Player } from '../objects/player';
import { Enemy } from '../objects/enemy';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.player;
    this.bullets;
    this.keyboard;
    this.enemys;
    this.score = 0;
    this.scoreText;
    this.bestScore = 0;
    this.bestScoreText;
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

    this.enemys = this.physics.add.group({ immovable: true });
    this.bullets = this.physics.add.group({ immovable: true });

    this.enemys.add(new Enemy(this, 500, -50));
    this.scoreText = this.add.text(0, 0, `SCORE:${this.score}`, {fontSize: 50});
    this.bestScoreText = this.add.text(550, 0, `BEST SCORE:${this.bestScore}`, {fontSize: 50});
    this.bestScoreText.visible = false;
    this.keyboard = this.input.keyboard.addKeys('a, d, space, left, right');

    this.spawnEnemyTimer = this.time.addEvent({
      delay: 500,
      callback: () => {
        this.enemys.add(new Enemy(this, Math.floor(Math.random() * 1024), -50));
      },
      loop: true
    });

    this.physics.world.addCollider(this.bullets, this.enemys, (bullet, enemy) => {
      bullet.destroy();
      enemy.destroy();
      this.add.sprite(bullet.x, bullet.y, 'boom').play('explode');
    });
    this.physics.world.addCollider(this.player, this.enemys, (player, enemy) => {
      if (this.bestScore < this.score) {
        this.bestScore = this.score;
        this.bestScoreText.setText(`BEST SCORE:${this.bestScore}`);
      }
      player.destroy();
      enemy.destroy();
      this.add.sprite(this.player.x, this.player.y, 'boom').play('explode');
      setTimeout(() => {
        this.score = 0;
        this.spawnEnemyTimer.remove();
        this.scene.restart();
      }, 1500);
    });
  }

  update() {
    this.player.init();

    if (this.bestScore > 0) {
      this.bestScoreText.visible = true;
    }

    for(let i = 0; i < this.enemys.getChildren().length; i++) {
      this.enemys.getChildren()[i].moving();
    }

    for(let i = 0; i < this.bullets.getChildren().length; i++) {
      this.bullets.getChildren()[i].moving();
    }
  }
};
