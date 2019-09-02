export class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'bullet');
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    scene.physics.world.enableBody(this);
    this.setImmovable(true);
    this.angle = 270;
    this.setScale(0.2);
  }

  moving() {
    this.setVelocityY(-1000)
    if (this.y < 0) {
      this.destroy();
    }
  }
}