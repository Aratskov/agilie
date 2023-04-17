const fs = require("fs");

const input = fs.readFileSync("input.json");
const data = JSON.parse(input);

const { start, end } = data;
const result = numberSearch(start, end);

const output = { result };
const jsonString = JSON.stringify(output, null, 2);

fs.writeFileSync("output.json", jsonString);


function numberSearch(start, end){
  if (start > end || !start || !end) return false;

  const arr = [start, start * 10 + 1];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === end) return true;
    const [firstNum, secondNum] = [arr[i] * 2, arr[i] * 10 + 1];

    if (firstNum <= end) arr.push(firstNum);
    if (secondNum <= end) arr.push(secondNum);
  }

  return false;
};
