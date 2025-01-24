class Card {
    width = 80;
    height = 120;

    rectangle = 0;

    text = "";
    textComponent = 0;

    ctx = 0;

    pointModifier = 1;

    #initialPositionX = 0;
    #initialPositionY = 0;

    #currentPositionX = 0;
    #currentPositionY = 0;

    #targetPositionX = 0;
    #targetPositionY = 0;

    #up = true;
    #upOffset = 2;

    constructor(initialPositionX, initialPositionY, text, ctx, pointModifier, up) {
        this.up = up;
        this.initialPositionX = initialPositionX;
        this.initialPositionY = initialPositionY + this.getUpOffsetOrNot();
        this.pointModifier = pointModifier;
        this.text = text;
        this.ctx = ctx;

        this.render();
    }

    getInitialPosition() {
        return { x: initialPositionX, y: initialPositionY };
    }

    getCurrentPosition() {
        return { x: currentPositionX, y: currentPositionY };
    }

    setTargetPosition(position) {
        targetPositionX = position.x;
        targetPositionY = position.y;
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getUpOffsetOrNot() {
        return this.up ? 3 : 0
    }

    getPoint() {
        return this.pointModifier
    }

    onClick() {
        console.log("internal card clicked")
    }

    render() {
        this.rectangle = this.ctx.add.rectangle(this.initialPositionX, this.initialPositionY, this.width, this.height, 0xffffff);

        this.rectangle.setStrokeStyle(2, 0x000000);
        this.rectangle.setInteractive({ useHandCursor: true });

        this.textComponent = this.ctx.add.text(this.initialPositionX, this.initialPositionY, this.text, {
            font: '12px Arial',
            color: '#000000',
            wordWrap: { width: this.width - 10 }, // Set wrapping width slightly smaller than the card
            resolution: 5,
            align: 'center', // Align text in the center
        }).setOrigin(0.5);

        this.rectangle.on('pointerdown', () => {
            this.onClick();
        });
    }
}