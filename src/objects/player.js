import { Bullet } from './bullet';

export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, 500, 750, 'playerSprite');
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    scene.physics.world.enableBody(this);
    this.setImmovable(true);
    this.scene = scene;
    this.angle = 90;
    this.canFire = true;    
  }

  init() {
    if (this.active) {
      this.scene.score += 1;
      this.scene.scoreText.setText(`SCORE:${this.scene.score}`);

      if (this.scene.keyboard.space.isDown) {

        if (this.canFire) {
          this.canFire = false;
          this.scene.bullets.add(new Bullet(this.scene, this.x, this.y));
          setTimeout(() => {
            this.canFire = true;
          }, 1000)
        } 
      }
      if (this.scene.keyboard.a.isDown || this.scene.keyboard.left.isDown) {
        this.setVelocityX(-200);
      }
      if (this.scene.keyboard.d.isDown || this.scene.keyboard.right.isDown) {
        this.setVelocityX(+200);
      }
      if (this.scene.keyboard.a.isUp
        && this.scene.keyboard.d.isUp
        && this.scene.keyboard.left.isUp
        && this.scene.keyboard.right.isUp) {
          this.setVelocityX(0);
      }
    }
  }
}
