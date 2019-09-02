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
      this.scene.scoreText.setText(this.scene.score);

      if (this.scene.keyboard.SPACE.isDown) {

        if (this.canFire) {
          this.canFire = false;
          this.scene.bullets.add(
            this.scene.physics.add.sprite(
              this.x,
              this.y,
              'bullet'
            )
          );
          setTimeout(() => {
            this.canFire = true;
          }, 1000)
        } 
      }
      if (this.scene.keyboard.A.isDown) {
        this.setVelocityX(-200);
      }
      if (this.scene.keyboard.D.isDown) {
        this.setVelocityX(+200);
      }
      if (this.scene.keyboard.A.isUp && this.scene.keyboard.D.isUp) {
        this.setVelocityX(0);
      }
    }
  }
}
