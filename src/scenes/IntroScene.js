import GlobalAudio from "../components/GlobalAudio.js";

export default class IntroScene extends Phaser.Scene {
    constructor() {
        super({ key: 'IntroScene' });
    }

    preload() {
    }

    handleVisibilityChange() {
        if (document.hidden) {
            this.scene.pause();
        } else {
            this.scene.resume();
        }
    }

    create() {
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));

        GlobalAudio.music = this.sound.add('intro');
        GlobalAudio.music.play({ loop: true });

        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;
        const radius = 100; // Radius of the rotation
        const ballSize = 10; // Size of each ball

        const screenWidth = this.scale.width;
        const screenHeight = this.scale.height;

        const ballContainer = this.createRotatingBallsWithGlow(this, centerX, centerY, radius, ballSize);
        ballContainer.setVisible(false); // Hide balls initially

        // Add the sword image
        const image = this.add.image(screenWidth / 2, screenHeight + 200, 'forest_sword').setScale(0.5);

        // Create a tween to move the image to the middle of the screen
        this.tweens.add({
            targets: image,
            y: screenHeight / 3, // Target y-position (middle of the screen)
            duration: 4000, // Duration of the animation
            ease: 'Power2', // Easing function for smooth movement
            onComplete: () => {

                this.input.on('pointerdown', () => {
                    this.scene.start('CharacterSelectorScene');
                });
                // Show text when the tween is complete
                this.showText();
                this.showClickToContinueText();

                // Add scaling animation for the sword
                this.tweens.add({
                    targets: image,
                    scale: { from: 0.5, to: 0.55 }, // Scale range
                    duration: 1000, // Duration for scaling up and down
                    yoyo: true, // Reverse the animation
                    repeat: -1, // Infinite scaling
                    ease: 'Sine.easeInOut', // Smooth scaling
                });

                // Create the glowing balls after the sword animation
                ballContainer.setVisible(true);
            },
        });

       
    }

    showText() {
        const screenWidth = this.scale.width;
        const screenHeight = this.scale.height;

        // Add text in the middle of the screen
        this.add.text(screenWidth / 2, screenHeight / 2 + 150, 'Killer Debates', {
            fontFamily: 'MyCustomFont',
            fontSize: '56px',
            color: '#ffffff',
        }).setOrigin(0.5);
    }

    showClickToContinueText() {
        const screenWidth = this.scale.width;
        const screenHeight = this.scale.height;

        // Add text in the middle of the screen
        const text = this.add.text(screenWidth / 2, screenHeight / 2 + 200, 'Click anywhere to START', {
            fontFamily: 'MyCustomFont',
            fontSize: '32px',
            color: '#ffffff',
        }).setOrigin(0.5);

        // Create a timed event to toggle visibility
        this.time.addEvent({
            delay: 800, // Blink every 500ms
            callback: () => {
                text.visible = !text.visible; // Toggle the visibility
            },
            loop: true, // Repeat indefinitely
        });
    }


    createRotatingBallsWithGlow(scene, centerX, centerY, radius, ballSize) {
        const container = scene.add.container(centerX, centerY); // Create a container at the center

        for (let i = 0; i < 5; i++) {
            // Calculate angle for each ball
            const angle = Phaser.Math.DegToRad((360 / 5) * i); // Divide circle into 5 segments
            const x = Math.cos(angle) * radius; // X position for ball
            const y = Math.sin(angle) * radius; // Y position for ball

            // Add the glow (larger, semi-transparent circle)
            const glow = scene.add.circle(x, y, ballSize + 10, 0xffffff, 1); // Yellow glow
            container.add(glow); // Add the glow to the container

            // Add the main ball (circle)
            const ball = scene.add.circle(x, y, ballSize, 0x47daff); // Red ball
            container.add(ball); // Add the ball to the container
        }

        // Rotate the entire container
        scene.tweens.add({
            targets: container,
            angle: 360, // Rotate a full circle
            duration: 5000, // Rotation duration (5 seconds)
            ease: 'Linear', // Smooth rotation
            repeat: -1, // Infinite rotation
        });

        return container; // Return the container for further manipulation if needed
    }
}