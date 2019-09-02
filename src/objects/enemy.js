export class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemyShip');
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    scene.physics.world.enableBody(this);
    this.setImmovable(true);
    this.angle = 270;
  }

  moving() {
    this.setVelocityY(500);
    if (this.y > 850) {
      this.setY(-50);
      this.setX(Math.floor(Math.random() * 1024));
    }
  }
}
