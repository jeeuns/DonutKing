// Enemy.js
class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.setVelocityX(100);
    }

    update() {
        // Add enemy-specific update logic if needed
    }
}
