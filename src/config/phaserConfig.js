import { GameScene } from '../scenes/gameScene';

export const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1024,
    height: 800
  },
  scene: [ GameScene ],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
};
