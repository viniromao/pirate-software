export default class GameOverScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameOverScene' });
    }
  
    init(data) {
      this.lastScene = data.lastScene;
    }
  
    create() {
      this.music = this.sound.add('loseSound');
      this.music.play({ loop: false });

      const screenWidth = this.scale.width;
      const screenHeight = this.scale.height;
  
      // Display the "Press any button" text
      this.add.text(screenWidth / 2, screenHeight / 2, 'Mission failed. \nChicken is... gone.\n\nPress any button', {
        fontFamily: 'MyCustomFont',
        fontSize: '64px',
        color: '#ffffff',
        align: 'center',
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