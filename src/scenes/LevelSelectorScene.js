import GlobalAudio from "../components/GlobalAudio.js";

class LevelSelectorScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelSelectorScene' });
    }

    preload() {
        // Load level images (replace with your own images)

    }

    create() {
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;
        const radius = 100; // Distance from the center for each level
        const numLevels = 2; // Number of levels
        const levelSize = 150; // Size of each level

        // Create a container for rotating the levels
        const container = this.add.container(centerX, centerY);

        // Add levels to the container
        for (let i = 0; i < numLevels; i++) {
            // Calculate position for each level based on angle
            const angle = Phaser.Math.DegToRad((360 / numLevels) * i);
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            // Add level image
            const levelImage = this.add.image(x, y, `level${i + 1}`).setInteractive({ useHandCursor: true });
            levelImage.setDisplaySize(levelSize, levelSize);

            // Add text below the level
            const levelText = this.add.text(x, y, `Level ${i + 1}`, {
                fontFamily: 'MyCustomFont',
                fontSize: '32px',
                color: '#ffffff',
            }).setOrigin(0.5);

            // Add both the image and the text to the container
            container.add(levelImage);
            container.add(levelText);

            // Hover effects for the level image
            levelImage.on('pointerover', () => {
                levelImage.setTint(0x555555); // Make the image darker
            });

            levelImage.on('pointerout', () => {
                levelImage.clearTint(); // Reset the image tint
            });

            // Click event for the level
            levelImage.on('pointerdown', () => {
                switch (i +1) {
                    case 1:
                        this.scene.start('Scene1');
                        break;
                    case 2:
                        this.scene.start('DialogueScene');
                        break;
                    case 3:
                        this.scene.start('ForestScene');
                        break;
                    default:
                        this.scene.start('ForestScene');
                }

                GlobalAudio.music.stop();



            });

            this.tweens.add({
                targets: levelImage,
                angle: -360, // Full rotation
                duration: 10000, // Time for one rotation (10 seconds)
                ease: 'Linear',
                repeat: -1, // Infinite rotation
            });
            this.tweens.add({
                targets: levelText,
                angle: -360, // Full rotation
                duration: 10000, // Time for one rotation (10 seconds)
                ease: 'Linear',
                repeat: -1, // Infinite rotation
            });
        }

        // Rotate the container around its center
        this.tweens.add({
            targets: container,
            angle: 360, // Full rotation
            duration: 10000, // Time for one rotation (10 seconds)
            ease: 'Linear',
            repeat: -1, // Infinite rotation
        });
    }
}

export default LevelSelectorScene;