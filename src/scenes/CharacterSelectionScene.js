import PlayerData from "../components/PlayerData.js";

export default class CharacterSelectorScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CharacterSelectorScene' });
    }

    preload() {
    }

    create() {

        // Character selection setup
        this.characters = ['sword4', 'sword2', 'sword3', 'sword1'];
        this.currentIndex = 0;

        // Display background
        this.add.rectangle(this.scale.width / 2, this.scale.height / 2, this.scale.width, this.scale.height, 0x000000);

        // Display left arrow
        this.arrowLeft = this.add.image(100, this.scale.height / 2, 'arrowLeft')
            .setInteractive()
            .setScale(0.2)
            .setRotation(-(Math.PI / 2))
            .on('pointerdown', () => this.changeCharacter(-1))
            .on('pointerover', () => this.arrowLeft.setAlpha(0.7))
            .on('pointerout', () => this.arrowLeft.setAlpha(1));

        // Display right arrow
        this.arrowRight = this.add.image(this.scale.width - 100, this.scale.height / 2, 'arrowRight')
            .setInteractive()
            .setScale(0.2)
            .setRotation(Math.PI / 2)
            .on('pointerdown', () => this.changeCharacter(1))
            .on('pointerover', () => this.arrowRight.setAlpha(0.7))
            .on('pointerout', () => this.arrowRight.setAlpha(1));

        // Display the current character
        this.characterImage = this.add.image(this.scale.width / 2, this.scale.height / 2, this.characters[this.currentIndex])
            .setInteractive()
            .setScale(.5);

        // Hover effect for the character
        this.characterImage.on('pointerover', () => {
            this.characterImage.setAlpha(0.7);
            this.input.setDefaultCursor('pointer');
        });

        this.characterImage.on('pointerout', () => {
            this.characterImage.setAlpha(1);
            this.input.setDefaultCursor('default');
        });

        // Select character on click
        this.characterImage.on('pointerdown', () => this.selectCharacter());

        
        const screenWidth = this.scale.width;
        const screenHeight = this.scale.height;

        this.add.text(screenWidth / 2, screenHeight / 2 -200, 'Select your character', {
            fontFamily: 'MyCustomFont',
            fontSize: '56px',
            color: '#ffffff',
        }).setOrigin(0.5);
    }

    changeCharacter(direction) {
        // Change index and loop around
        this.currentIndex = (this.currentIndex + direction + this.characters.length) % this.characters.length;
        
        // Update character texture
        this.characterImage.setTexture(this.characters[this.currentIndex]);
    }

    selectCharacter() {
        // Save the selected character
        PlayerData.selectedCharacter = this.characters[this.currentIndex];

        this.scene.start('LevelSelectorScene');
    }
}



