const fs = require("fs");

const input = fs.readFileSync("input.json");
const data = JSON.parse(input);

const result = countGoodPositions(data.actors);

const output = { count: result };
const jsonString = JSON.stringify(output, null, 2);

fs.writeFileSync("output.json", jsonString);

function countGoodPositions(actors) {
  const n = actors.length;
  const m = actors[0].length;

  let count = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      for (let direction of ["left", "up", "right", "down"]) {
        let hasActor = false;
        let projectorRow = i;
        let projectorCol = j;

        while (true) {
          if (direction === "left") {
            projectorCol--;
          } else if (direction === "up") {
            projectorRow--;
          } else if (direction === "right") {
            projectorCol++;
          } else if (direction === "down") {
            projectorRow++;
          }

          if (
            projectorRow < 0 ||
            projectorRow >= n ||
            projectorCol < 0 ||
            projectorCol >= m
          ) {
            break;
          }
          if (actors[projectorRow][projectorCol]) {
            hasActor = true;
            console.log(hasActor);
            break;
          }
        }

        if (!actors[i][j] && hasActor) {
          count++;
        }
      }
    }
  }

  return count;
}
