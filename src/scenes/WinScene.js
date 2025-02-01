export default class WinScene extends Phaser.Scene {
    constructor() {
      super({ key: 'WinScene' });
    }
  
    init(data) {
      this.lastScene = data.lastScene;
    }
  
    create() {
      this.music = this.sound.add('winSound');
      this.music.play({ loop: false });

      const screenWidth = this.scale.width;
      const screenHeight = this.scale.height;
  
      // Display the "Press any button" text
      this.add.text(screenWidth / 2, screenHeight / 2, 'King agrees\nChicken lives!\nVictory!', {
        fontFamily: 'MyCustomFont',
        fontSize: '64px',
        color: '#ffffff',
        align: 'center'
      }).setOrigin(0.5);
  
      // Listen for any key press or pointer click
      this.input.keyboard.on('keydown', () => {
        this.scene.start(this.lastScene); // Go back to the last scene
      });
  
      this.input.on('pointerdown', () => {
        this.scene.start(this.lastScene); // Go back to the last scene
      });
    }
  }