export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    // this.load.image('logo', 'assets/images/phaser-logo.png')
  }

  create() {
    this.scene.start('GameScene');
  }
}