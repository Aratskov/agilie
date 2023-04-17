const fs = require("fs");

const input = fs.readFileSync("input.json");
const data = JSON.parse(input);

const result = findDuplicate(data.duplicate);

const output = { result };
const jsonString = JSON.stringify(output, null, 2);

fs.writeFileSync("output.json", jsonString);


function findDuplicate(arr) {
  for (let i = 0; i < arr.length; i++) {
    let index = arr[i];

    if (arr[index] < 0) {
      return index;
    }
    arr[index] = -arr[index];
  }

  return null;
}