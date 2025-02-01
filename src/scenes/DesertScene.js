import Card from '../components/Card.js'
import PlayerData from '../components/PlayerData.js';

const cardText = ["Your Majesty, I'd rather slice cake than chicken. More fun!",
    "Think of the eggs, sire. Endless breakfast, no chicken tragedy!",
    "A veggie feast is trendier, and I won't get messy.",
    "Chickens gossip, sire. They might tarnish your royal reputation!",
    "What if this chicken is the next poultry prophet?",
    "Chickens dream of flight. Don't clip its skyward aspirations!",
    "Knives are better suited for slicing cheese, not chicken dreams.",
    "Royal peace is priceless. Chickens may revolt if you proceed!",
    "A vegetarian king is poetic. History loves surprising rulers.",
    "Chicken soup tomorrow means chicken alive today. Patience is noble!"
]

let initialCardsConfig = [
    { points: -1, text: "Majesty, eating sand is more filling than chicken. Try it!" },
    { points: 1, text: "A live chicken is entertainment. A cooked one is just food!" },
    { points: -1, text: "Killing it might make you king of chickens! Wait…" },

    { points: 1, text: "Sire, what if this chicken is your long-lost pet?" },
    { points: 1, text: "Chickens make great pets. Just imagine the royal 'Cluckington Palace'!" },
    { points: -1, text: "Chickens are tiny dragons. It might breathe fire! (Probably not…)" },

    { points: 1, text: "This chicken has seen things, Majesty. It holds desert secrets!" },
    { points: 1, text: "Killing it? What if it's the chosen one of poultry?" },
    { points: -1, text: "The chicken looked at me funny. It must be evil!" },

    { points: 1, text: "Think of the chicken's family. Or worse… its angry ghost!" },
    { points: 1, text: "What if this is the last chicken on Earth?" },
    { points: -1, text: "Sire, it's been following us. Clearly, it's meant to rule!" },
    { points: 1, text: "It survived the desert. We should take notes, not eat it!" },
    
    { points: -1, text: "The chicken looked at me funny. It must be evil!" },
    { points: -1, text: "Desert chicken? That sounds *extra* tasty. Proceed, Majesty!" },
    { points: -1, text: "What if it's cursed? Eh, worth the risk." }
];

let cardsConfig = [];

let cards = []


export default class DesertScene extends Phaser.Scene {

    music = null;


    constructor() {
        super({ key: 'DesertScene' });
    }


    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
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
        this.changingScene = false;
        this.numRectangles = 2; // Initial number of rectangles
        this.rectangles = [];
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));

        cards = [];
        cardsConfig = JSON.parse(JSON.stringify(initialCardsConfig));


        // console.log(
        //   `%c
        //    ███╗   ██╗ %c███████╗ %c ██████╗ 
        //   %c ████╗  ██║ %c██╔════╝ %c██╔═══██╗
        //   %c ██╔██╗ ██║ %c█████╗   %c██║   ██║
        //   %c ██║╚██╗██║ %c██╔══╝   %c██║   ██║
        //   %c ██║ ╚████║ %c███████╗ %c╚██████╔╝
        //   %c ╚═╝  ╚═══╝ %c╚══════╝  %c╚═════╝ 
        //   `,
        //   'color: #4dccff; font-size: 16px;', // N (Tomato)
        //   'color: #ffad0a; font-size: 16px;', // E (Orange)
        //   'color: #ff0a0a; font-size: 16px;', // O (Dodger Blue)
        //   'color: #4dccff; font-size: 16px;', // N (Tomato)
        //   'color: #ffad0a; font-size: 16px;', // E
        //   'color: #ff0a0a; font-size: 16px;', // O
        //   'color: #4dccff; font-size: 16px;', // N (Tomato)
        //   'color: #ffad0a; font-size: 16px;', // E
        //   'color: #ff0a0a; font-size: 16px;', // O
        //   'color: #4dccff; font-size: 16px;', // N (Tomato)
        //   'color: #ffad0a; font-size: 16px;', // E
        //   'color: #ff0a0a; font-size: 16px;', // O
        //   'color: #4dccff; font-size: 16px;', // N (Tomato)
        //   'color: #ffad0a; font-size: 16px;', // E
        //   'color: #ff0a0a; font-size: 16px;', // O
        //   'color: #4dccff; font-size: 16px;', // N (Tomato)
        //   'color: #ffad0a; font-size: 16px;', // E
        //   'color: #ff0a0a; font-size: 16px;'  // O
        // );

        // console.log(`%c We love making games! ❤️`, 'color: #4dccff; font-size: 16px;');

        // console.log(`%cIf you found this message you might wanna know how we've made this game 👌`, 'color: #ffad0a; font-size: 16px;');
        // console.log(`%cWe've used Phaser library to make it and it is entirely written in javascript`, 'color: #ff0a0a; font-size: 16px;');
        // console.log(`%cOur team is all around the world!`, 'color: #4dccff; font-size: 16px;');
        // console.log(`%cThe code for this game is entirely public, checkout its Github page https://github.com/viniromao/pirate-software👍`, 'color: #ffad0a; font-size: 16px;');

        this.music = this.sound.add('backgroundMusic');
        this.music.play({ loop: true });


        const graphics = this.add.graphics();
        graphics.fillStyle(0x78acff, 1); // Blue color with full opacity
        graphics.fillRect(0, 0, this.scale.width, this.scale.height);
        //==================================================================

        //=====================================================================
        //=====================================================================
        //=====================================================================
        // Add your game objects here
        const bg = this.add.sprite(0, 0, 'backgroundDesert'); // Use sprite instead of image

        // Set the origin of the sprite to the top-left corner
        bg.setOrigin(0, 0);

        // Scale the background to cover the entire screen
        bg.displayWidth = this.scale.width; // Match the canvas width
        bg.displayHeight = this.scale.height; // Match the canvas height

        // Background frames to cycle through
        const backgrounds = ['backgroundDesert'];
        let currentIndex = 0;

        // Function to update background
        const updateBackground = () => {
            currentIndex = (currentIndex + 1) % backgrounds.length; // Loop through backgrounds
            bg.setTexture(backgrounds[currentIndex]); // Change texture

            // Reapply scaling to ensure full screen coverage
            bg.displayWidth = this.scale.width;
            bg.displayHeight = this.scale.height;
        };

        // Set a timer to update the background every 2 seconds
        this.time.addEvent({
            delay: 500, // Change background every 2000ms (2 seconds)
            callback: updateBackground,
            loop: true
        });
        //=====================================================================
        // // Add your game objects here
        // const tree = this.add.image(0, 0, 'tree');

        // // Set the origin of the image to the top-left corner
        // tree.setOrigin(0, 0);

        // // Scale the background to cover the entire screen
        // tree.displayWidth = this.scale.width; // Match the canvas width
        // tree.displayHeight = this.scale.height; // Match the canvas height
        //==================================================================
        const king = this.add.image(bg.displayWidth / 2, bg.displayHeight / 2, 'king');

        // Scale and center the imag
        king.setScale(1.3).setOrigin(0.5, 0.5);

        const originalWidth = king.width;
        const originalHeight = king.height;

        // Crop the top 50 pixels of the image
        king.setCrop(0, 5, originalWidth, originalHeight);
        //=====================================================================

        // // Add your game objects here
        const table = this.add.image(0, 0, 'table');

        // Set the origin of the image to the top-left corner
        table.setOrigin(0, 0);

        // Scale the background to cover the entire screen
        table.displayWidth = this.scale.width; // Match the canvas width
        table.displayHeight = this.scale.height; // Match the canvas height
        //================================================
        const sword = this.add.image(bg.displayWidth - 100, bg.displayHeight - 300, PlayerData.selectedCharacter);

        // Scale and center the imag
        sword.setScale(.5).setOrigin(0.5, 0.5);

        //==================================================================
        //=============================================
        this.createCards();

        const screenWidth = this.scale.width;
        const screenHeight = this.scale.height;

        // Frame dimensions
        this.frameWidth = screenWidth * 0.8; // 80% of screen width
        this.frameHeight = 50; // Fixed height
        this.frameX = (screenWidth - this.frameWidth) / 2; // Centered horizontally
        this.frameY = 20; // Position at the top of the screen
        this.framePadding = 10; // Padding between frame and inner rectangles

        // Draw the frame
        this.frame = this.add.rectangle(
            this.frameX + this.frameWidth / 2,
            this.frameY + this.frameHeight / 2,
            this.frameWidth,
            this.frameHeight,
            0xffffff // White color for the frame
        );
        this.frame.setStrokeStyle(2, 0x000000); // Add a black border

        // Draw initial rectangles
        this.drawRectangles();
    }

    update(time, delta) {
        for (let index = 0; index < cards.length; index++) {
            const card = cards[index];
            card.moveToTarget(5);
        }
    }

    onClick() {

    }

    createCards() {
        let upCard = true;
        const cardWidth = 80; // Width of each card
        const cardHeight = 120; // Height of each card
        const screenWidth = this.scale.width;
        const screenHeight = this.scale.height;

        const horizontalPadding = 20; // Padding on the left and right of the screen
        const verticalSpacing = 20; // Vertical spacing between rows

        let cardIndex = 0;
        const rows = 1;

        for (let row = 0; row < rows; row++) {
            // Calculate cards in the current row
            const cardsInRow = cardsConfig.length;


            // Calculate the total width of cards and dynamic spacing
            const totalWidth = cardsInRow * cardWidth;
            const totalSpacing = screenWidth - totalWidth - 2 * horizontalPadding;
            const spacing = cardsInRow == 1 ? 220 : totalSpacing / (cardsInRow - 1);
            const xoffset = 35;
            const yoffset = 150;

            for (let i = 0; i < cardsInRow; i++) {
                const x = cardsInRow == 1 ? 250 : (horizontalPadding + i * (cardWidth + spacing)) + xoffset;
                const y = (screenHeight * 0.5 + row * (cardHeight + verticalSpacing)) + yoffset;

                const card = new Card(x, y, cardsConfig[cardIndex].text, this, cardsConfig[cardIndex].points, upCard);

                if (cardsConfig[cardIndex].points > 0) {
                    card.destroyAudio = this.sound.add('positive');
                    card.pointCallBack = () => { this.incrementRectangles() };
                } else {
                    card.destroyAudio = this.sound.add('negative');
                    card.pointCallBack = () => { this.decrementRectangles() };
                }

                cards.push(card);
                card.index = cardIndex;


                // Add click listener for each card
                card.rectangle.on('pointerdown', () => {
                    if (this.changingScene) {
                        return;
                    }

                    card.destroyAudio.play();
                    this.removeCard(card);
                    refreshCards(this);
                });

                upCard = !upCard;
                cardIndex++;
            }
        }
    }

    removeCard(card) {
        if (this.changingScene) {
            return;
        }

        const index = card.index;

        if (index > -1) {
            cards.splice(index, 1);
            cardsConfig.splice(index, 1);

            card.pointCallBack();

            card.rectangle.destroy(); // Remove the rectangle
            card.textComponent.destroy(); // Remove the text
            card.destroy();

            if (cards.length <= 0) {
                this.callGameOver();
                this.music.stop();
            }

            if (this.rectangles.length <= 0) {
                this.callGameOver();
                this.music.stop();
            }

            if (this.rectangles.length >= 6) {
                this.callWinScene();
                this.music.stop();
            }


        } else {
            console.warn('Card not found in the array');
        }
    }

    callGameOver() {
        this.changingScene = true;

        this.time.delayedCall(2000, () => {
            this.scene.start('GameOverScene', { lastScene: 'DesertScene' });
        });
    }

    callWinScene() {
        this.changingScene = true;

        this.time.delayedCall(2000, () => {
            this.scene.start('WinScene', { lastScene: 'LevelSelectorScene' });
        });
    }

    drawRectangles() {
        if (this.changingScene) {
            return;
        }
        // Clear existing rectangles
        this.rectangles.forEach((rect) => rect.destroy());
        this.rectangles = [];

        // Fixed rectangle dimensions
        const rectangleWidth = 56; // Fixed width
        const rectangleHeight = this.frameHeight - this.framePadding * 2; // Height based on frame

        // Start position for the first rectangle (aligned to the beginning of the frame)
        const startX = this.frameX + this.framePadding + 30;

        for (let i = 0; i < this.numRectangles; i++) {
            const rectX = startX + i * (rectangleWidth + this.framePadding); // Position for each rectangle
            const rectY = this.frameY + this.framePadding + rectangleHeight / 2; // Center in frame vertically

            let rect;

            if (this.numRectangles <= 1) {
                rect = this.add.rectangle(
                    rectX,
                    rectY,
                    rectangleWidth,
                    rectangleHeight,
                    0xff0000 // Blue color
                );
            } else if (this.numRectangles > 1 && this.numRectangles < 5) {
                rect = this.add.rectangle(
                    rectX,
                    rectY,
                    rectangleWidth,
                    rectangleHeight,
                    0x12bafc // Blue color
                );
            } else {
                rect = this.add.rectangle(
                    rectX,
                    rectY,
                    rectangleWidth,
                    rectangleHeight,
                    0x35fc12 // Blue color
                );
            }

            this.rectangles.push(rect); // Store the rectangle
        }
    }

    incrementRectangles() {
        if (this.changingScene) {
            return;
        }
        if (this.numRectangles < 10) { // Set a maximum limit if needed
            this.numRectangles++;
            this.drawRectangles();
        }
    }

    decrementRectangles() {
        if (this.changingScene) {
            return;
        }
        if (this.numRectangles > 0) { // Set a minimum limit
            this.numRectangles--;
            this.drawRectangles();
        }
    }
}

function refreshCards(ctx) {

    let upCard = true;
    const cardWidth = 80; // Width of each card
    const cardHeight = 120; // Height of each card
    const screenWidth = ctx.scale.width;
    const screenHeight = ctx.scale.height;

    const horizontalPadding = 20; // Padding on the left and right of the screen
    const verticalSpacing = 20; // Vertical spacing between rows

    let cardIndex = 0;
    const rows = 1;
    const row = 0;

    // Calculate cards in the current row
    const cardsInRow = cardsConfig.length;


    // Calculate the total width of cards and dynamic spacing
    const totalWidth = cardsInRow * cardWidth;
    const totalSpacing = screenWidth - totalWidth - 2 * horizontalPadding;
    const spacing = cardsInRow == 1 ? 220 : totalSpacing / (cardsInRow - 1);
    const xoffset = 35;
    const yoffset = 150;

    for (let i = 0; i < cardsInRow; i++) {
        const x = cardsInRow == 1 ? 250 : (horizontalPadding + i * (cardWidth + spacing)) + xoffset;
        const y = (screenHeight * 0.5 + row * (cardHeight + verticalSpacing)) + yoffset;

        // const card = new Card(x, y, cardsConfig[cardIndex], ctx, 1, upCard);
        const card = cards[cardIndex];
        card.index = cardIndex;

        const newPosition = { x: x, y: y }

        card.setTargetPosition(newPosition);

        upCard = !upCard;
        cardIndex++;
    }
}