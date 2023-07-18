const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this.field = field;
    this.currentPosition = [0, 0];
  }

  print() {
    for (let row of this.field) {
      console.log(row.join(""));
    }
  }

  move(direction) {
    const [x, y] = this.currentPosition;
    let newRow = x;
    let newColumn = y;

    if (direction === "up") {
      newRow--;
    } else if (direction === "down") {
      newRow++;
    } else if (direction === "left") {
      newColumn--;
    } else if (direction === "right") {
      newColumn++;
    }

    if (this.isOutOfBounds(newRow, newColumn)) {
      console.log("You moved outside the field. Game over!");
      return false;
    }

    const newPosition = this.field[newRow][newColumn];

    if (newPosition === hat) {
      console.log("Congratulations! You found your hat. You win!");
      return false;
    } else if (newPosition === hole) {
      console.log("You fell into a hole. Game over!");
      return false;
    }

    this.field[x][y] = pathCharacter;
    this.field[newRow][newColumn] = pathCharacter;
    this.currentPosition = [newRow, newColumn];

    return true;
  }

  isOutOfBounds(row, column) {
    return (
      row < 0 ||
      row >= this.field.length ||
      column < 0 ||
      column >= this.field[0].length
    );
  }

  static generateField(height, width, holePercentage) {
    const field = [];

    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        row.push(fieldCharacter);
      }
      field.push(row);
    }

    const totalTiles = height * width;
    const numHoles = Math.floor((totalTiles * holePercentage) / 100);
    const hatRow = Math.floor(Math.random() * height);
    const hatColumn = Math.floor(Math.random() * width);

    field[hatRow][hatColumn] = hat;

    let holes = 0;
    while (holes < numHoles) {
      const row = Math.floor(Math.random() * height);
      const column = Math.floor(Math.random() * width);

      if (field[row][column] === fieldCharacter) {
        field[row][column] = hole;
        holes++;
      }
    }

    return field;
  }
}

const height = 3;
const width = 3;
const holePercentage = 20;

const myField = new Field(Field.generateField(height, width, holePercentage));

myField.print();

while (true) {
  const direction = prompt("Which direction would you like to move? ");
  const isGameRunning = myField.move(direction);

  if (!isGameRunning) {
    break;
  }

  myField.print();
}
