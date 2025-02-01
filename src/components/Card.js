export default class Card {
    width = 80;
    height = 120;

    destroyAudio = null;

    rectangle = 0;

    text = "";
    textComponent = 0;

    ctx = 0;

    pointModifier = 1;
    pointCallBack = null;

    index = 0;

    #initialPositionX = 0;
    #initialPositionY = 0;

    #currentPositionX = 0;
    #currentPositionY = 0;

    #targetPositionX = 0;
    #targetPositionY = 0;

    #up = true;
    #upOffset = 2;

    hoverReplicaRectangle = null;
    hoverReplicaText = null;

    constructor(initialPositionX, initialPositionY, text, ctx, pointModifier, up) {
        this.#initialPositionX = initialPositionX;
        this.#initialPositionY = initialPositionY;
        this.#currentPositionX = initialPositionX;
        this.#currentPositionY = initialPositionY;
        this.#targetPositionX = initialPositionX;
        this.#targetPositionY = initialPositionY;
        this.pointModifier = pointModifier;
        this.text = text;
        this.ctx = ctx;

        this.render();

        this.rectangle.on('pointerover', () => {
            this.rectangle.setFillStyle(0x00ff00);
            this.createHoverReplica(); // Change to green on hover
        });

        // Event listener for hover out
        this.rectangle.on('pointerout', () => {
            this.rectangle.setFillStyle(0xffffff);
            this.removeHoverReplica();// Reset to white when not hovered
        });
    }

    destroy() {
        this.removeHoverReplica();
    }

    createHoverReplica() {
        const screenWidth = this.ctx.scale.width;
        const screenHeight = this.ctx.scale.height;

        // Create a larger rectangle in the center of the screen
        this.hoverReplicaRectangle = this.ctx.add.rectangle(
            screenWidth / 2,
            screenHeight / 2,
            this.width * 2, // Double the width
            this.height * 2, // Double the height
            0xdddddd // Light gray
        );
        this.hoverReplicaRectangle.setStrokeStyle(2, 0x000000);

        // Add text to the larger card
        this.hoverReplicaText = this.ctx.add.text(
            screenWidth / 2,
            screenHeight / 2,
            this.text,
            {
                font: '24px Arial',
                resolution: 2,
                color: '#000000',
                wordWrap: { width: this.width * 2 - 20 }, // Adjust wrap for larger card
                align: 'center',
            }
        ).setOrigin(0.5);
    }

    removeHoverReplica() {
        // Remove the hover replica elements
        if (this.hoverReplicaRectangle) {
            this.hoverReplicaRectangle.destroy();
            this.hoverReplicaRectangle = null;
        }
        if (this.hoverReplicaText) {
            this.hoverReplicaText.destroy();
            this.hoverReplicaText = null;
        }
    }

    getInitialPosition() {
        return { x: initialPositionX, y: initialPositionY };
    }

    getCurrentPosition() {
        return { x: currentPositionX, y: currentPositionY };
    }

    setTargetPosition(position) {
        this.#targetPositionX = position.x;
        this.#targetPositionY = position.y;
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getUpOffsetOrNot() {
        return 0
    }

    getPoint() {
        return this.pointModifier
    }

    onClick() {
    }

    render() {
        this.rectangle = this.ctx.add.rectangle(this.initialPositionX, this.initialPositionY, this.width, this.height, 0xffffff);

        this.rectangle.setStrokeStyle(2, 0x000000);
        this.rectangle.setInteractive({ useHandCursor: true });

        this.textComponent = this.ctx.add.text(this.initialPositionX, this.initialPositionY, this.text, {
            font: '12px Arial',
            resolution: 2,
            color: '#000000',
            wordWrap: { width: this.width - 10 }, // Set wrapping width slightly smaller than the card
            align: 'center', // Align text in the center
        }).setOrigin(0.5);

        this.rectangle.on('pointerdown', () => {
            this.onClick();
        });
    }

    moveToTarget(speed) {
        this.#currentPositionX = this.#targetPositionX;
        this.#currentPositionY = this.#targetPositionY;

        this.rectangle.setPosition(this.#currentPositionX, this.#currentPositionY);
        this.textComponent.setPosition(this.#currentPositionX, this.#currentPositionY);
    }

}