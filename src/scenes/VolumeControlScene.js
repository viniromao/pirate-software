class VolumeControlScene extends Phaser.Scene {
    constructor() {
        super({ key: 'VolumeControlScene' });
    }

    preload() {
        // Load the background music
        this.load.audio('backgroundMusic', 'assets/audio/background.mp3'); // Replace with your MP3 path
    }

    create() {
        const screenWidth = this.scale.width;
        const screenHeight = this.scale.height;

        // Play the background music
        const music = this.sound.add('adjustSound', { loop: true });
        music.play();

        // Default global sound volume
        this.sound.volume = 0.5;

        // Add a label for the volume slider
        this.add.text(screenWidth / 2, screenHeight / 2 - 100, 'Adjust Volume', {
            fontFamily: 'MyCustomFont',
            fontSize: '56px',
            color: '#ffffff',
        }).setOrigin(0.5);

        // Add a slider
        const sliderWidth = 200;
        const slider = this.add.rectangle(screenWidth / 2, screenHeight / 2 - 50, sliderWidth, 10, 0xaaaaaa).setOrigin(0.5);
        const sliderHandle = this.add.circle(screenWidth / 2, screenHeight / 2 - 50, 10, 0xffffff).setInteractive({ useHandCursor: true });

        // Drag event for the slider
        this.input.setDraggable(sliderHandle);
        this.input.on('drag', (pointer, gameObject, dragX) => {
            if (gameObject === sliderHandle) {
                const clampedX = Phaser.Math.Clamp(dragX, screenWidth / 2 - sliderWidth / 2, screenWidth / 2 + sliderWidth / 2);
                gameObject.x = clampedX;

                // Adjust volume based on slider position
                const volume = Phaser.Math.Clamp((clampedX - (screenWidth / 2 - sliderWidth / 2)) / sliderWidth, 0, 1);
                this.sound.volume = volume;
            }
        });

        // Add a custom button with text
        const buttonWidth = 250;
        const buttonHeight = 50;
        const button = this.add.rectangle(screenWidth / 2, screenHeight / 2 + 100, buttonWidth, buttonHeight, 0x6666ff).setOrigin(0.5).setInteractive({ useHandCursor: true });

        // Add text to the button
        const buttonText = this.add.text(screenWidth / 2, screenHeight / 2 + 100, 'Click to Continue', {
            fontFamily: 'MyCustomFont',
            fontSize: '32px',
            color: '#ffffff',
        }).setOrigin(0.5);

        // Button hover effects
        button.on('pointerover', () => {
            button.setFillStyle(0x8888ff); // Change color on hover
        });
        button.on('pointerout', () => {
            button.setFillStyle(0x6666ff); // Reset color when not hovered
        });

        // Button click
        button.on('pointerdown', () => {
            music.stop(); // Stop the music if needed
            this.scene.start('IntroScene'); // Transition to the next scene
        });
    }
}

export default VolumeControlScene;