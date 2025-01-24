// main.js

cardText = ["Your Majesty, I'd rather slice cake than chicken. More fun!",
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

cards = []

class MainScene extends Phaser.Scene {



  constructor() {
    super('MainScene');
  }


  preload() {
    // Load your assets here (e.g., images, audio)
    this.load.image('background', 'assets/16jam_background.png');
    this.load.image('tree', 'assets/16jam_tree.png');
    this.load.image('table', 'assets/16jam_table.png');
    this.load.image('king', 'assets/king.png');
    this.load.audio('backgroundMusic', 'assets/sounds/argument song(new option).mp3'); // Replace 'music.mp3' with your file
  }

  create() {

   


    const graphics = this.add.graphics();
    graphics.fillStyle(0x78acff, 1); // Blue color with full opacity
    graphics.fillRect(0, 0, this.scale.width, this.scale.height);
    //==================================================================

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
    //==================================================================
    const king = this.add.image(bg.displayWidth / 2, bg.displayHeight / 2, 'king');

    // Scale and center the imag
    king.setScale(1.3).setOrigin(0.5, 0.5);

    const originalWidth = king.width;
    const originalHeight = king.height;

    // Crop the top 50 pixels of the image
    king.setCrop(0, 5, originalWidth, originalHeight);
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
    refreshCards(this);
  }

  update(time, delta) {
    // Update your game objects here
  }

  onClick() {
    

  }
}

function refreshCards(ctx) {

  let upCard = true;
  const cardWidth = 80; // Width of each card
  const cardHeight = 120; // Height of each card
  const numCards = 10; // Total number of cards

  const screenWidth = ctx.scale.width;
  const screenHeight = ctx.scale.height;

  const maxCardsPerRow = 10; // Maximum cards per row with minimum spacing
  const rows = 1; // Calculate the number of rows required

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
      const x = (horizontalPadding + i * (cardWidth + spacing)) + xoffset;
      const y = (screenHeight * 0.5 + row * (cardHeight + verticalSpacing)) + yoffset;

      const card = new Card(x, y, cardText[cardIndex], ctx, 1, upCard);

      cards.push(card);

      // Add click listener for each card
      card.rectangle.on('pointerdown', () => {
          removeCard(card); // Remove the card on click
      });

      upCard = !upCard;
      cardIndex++;
    }
  }
}

function removeCard(card) {
  const index = cards.indexOf(card);
  if (index > -1) {
      // Remove the card from the array
      cards.splice(index, 1);

      // Destroy the card's visual elements
      card.rectangle.destroy(); // Remove the rectangle
      card.textComponent.destroy(); // Remove the text

      console.log(`Removed card: ${card.text.text}`);
  } else {
      console.warn('Card not found in the array');
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