export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    const screenWidth = this.cameras.main.width;
    const screenHeight = this.cameras.main.height;

    const squareCount = 4;
    const squareSize = 50;
    const totalSpacing = screenWidth - squareCount * squareSize;
    const spaceBetweenSquares = totalSpacing / (squareCount + 1);
    const yPosition = screenHeight - squareSize - 20;

    for (let i = 0; i < squareCount; i++) {
      const xPosition = spaceBetweenSquares + i * (squareSize + spaceBetweenSquares)

      this.add.rectangle(xPosition, yPosition, squareSize, squareSize, 0x00ff00)
    }

  }
}