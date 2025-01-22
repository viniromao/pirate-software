// main.js
class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
    // Load your assets here (e.g., images, audio)
    this.load.image('background', '../assets/16jam_background.png');
    this.load.image('tree', '../assets/16jam_tree.png');
    this.load.image('table', '../assets/16jam_table.png');
    this.load.audio('backgroundMusic', 'assets/sounds/argument song(new option).mp3'); // Replace 'music.mp3' with your file
  }

  create() {
    const graphics = this.add.graphics();
    graphics.fillStyle(0x78acff, 1); // Blue color with full opacity
    graphics.fillRect(0, 0, this.scale.width, this.scale.height);
//=====================================================================
    // Add your game objects here
    const bg = this.add.image(0, 0, 'background');

    // Set the origin of the image to the top-left corner
    bg.setOrigin(0, 0);

    // Scale the background to cover the entire screen
    bg.displayWidth = this.scale.width; // Match the canvas width
    bg.displayHeight = this.scale.height; // Match the canvas height

    //=====================================================================
    // Add your game objects here
    const tree = this.add.image(0, 0, 'tree');

    // Set the origin of the image to the top-left corner
    tree.setOrigin(0, 0);

    // Scale the background to cover the entire screen
    tree.displayWidth = this.scale.width; // Match the canvas width
    tree.displayHeight = this.scale.height; // Match the canvas height

    //=====================================================================
    // Add your game objects here
    const table = this.add.image(0, 0, 'table');

    // Set the origin of the image to the top-left corner
    table.setOrigin(0, 0);

    // Scale the background to cover the entire screen
    table.displayWidth = this.scale.width; // Match the canvas width
    table.displayHeight = this.scale.height; // Match the canvas height

    //================================================
    const music = this.sound.add('backgroundMusic', { loop: true }); // Enable looping
    music.play(); //

    //=============================================

    const cardWidth = 70; // Width of each card
        const cardHeight = 100; // Height of each card
        const numCards = 6; // Total number of cards

        const screenWidth = this.scale.width;
        const screenHeight = this.scale.height;

        const maxCardsPerRow = Math.floor(screenWidth / (cardWidth + 10)); // Maximum cards per row with minimum spacing
        const rows = Math.ceil(numCards / maxCardsPerRow); // Calculate the number of rows required

        const horizontalPadding = 20; // Padding on the left and right of the screen
        const verticalSpacing = 20; // Vertical spacing between rows

        let cardIndex = 0;

        for (let row = 0; row < rows; row++) {
            // Calculate cards in the current row
            const cardsInRow = Math.min(numCards - cardIndex, maxCardsPerRow);

            // Calculate the total width of cards and dynamic spacing
            const totalWidth = cardsInRow * cardWidth;
            const totalSpacing = screenWidth - totalWidth - 2 * horizontalPadding;
            const spacing = totalSpacing / (cardsInRow - 1);
            const xoffset = 35;
            const yoffset = 150;

            for (let i = 0; i < cardsInRow; i++) {
                const x = (horizontalPadding + i * (cardWidth + spacing))+ xoffset;
                const y = (screenHeight * 0.5 + row * (cardHeight + verticalSpacing))  + yoffset;

                // Create a rectangle for the card
                const card = this.add.rectangle(x, y, cardWidth, cardHeight, 0xffffff);
                card.setStrokeStyle(2, 0x000000); // Add a border to the card

                // Add text inside the card
                const text = this.add.text(x, y, `Card ${cardIndex + 1}`, {
                    font: '18px Arial',
                    color: '#000000',
                }).setOrigin(0.5); // Center the text in the card

                cardIndex++;
            }
        }
  }

  update(time, delta) {
    // Update your game objects here
  }
}

const config = {
  type: Phaser.AUTO, // Choose WebGL or Canvas based on browser support
  width: 512,
  height: 512,
  backgroundColor: '#2d2d2d',
  scene: MainScene, // Attach your scene
};

const game = new Phaser.Game(config);