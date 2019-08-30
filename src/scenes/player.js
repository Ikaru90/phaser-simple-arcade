export class Player {
  constructor(scene) {
    this.scene = scene;
    this.scene.playerSprite = this.scene.physics.add.sprite(500, 750, 'playerSprite');
    this.scene.playerSprite.angle = 90;
    this.canFire = true;
  }

  init() {
    if (this.scene.playerSprite.active) {
      this.scene.score += 1;
      this.scene.scoreText.setText(this.scene.score);

      if (this.scene.keyboard.SPACE.isDown) {

        if (this.canFire) {
          this.canFire = false;
          this.scene.fires.add(
            this.scene.physics.add.sprite(
              this.scene.playerSprite.x,
              this.scene.playerSprite.y,
              'bullet'
            )
          );
          setTimeout(() => {
            this.canFire = true;
          }, 1000)
        } 
      }
      if (this.scene.keyboard.A.isDown) {
        this.scene.playerSprite.setVelocityX(-200);
      }
      if (this.scene.keyboard.D.isDown) {
        this.scene.playerSprite.setVelocityX(+200);
      }
      if (this.scene.keyboard.A.isUp && this.scene.keyboard.D.isUp) {
        this.scene.playerSprite.setVelocityX(0);
      }
    }
  }
}
