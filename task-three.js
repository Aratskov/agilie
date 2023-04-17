const fs = require("fs");

const input = fs.readFileSync("input.json");
const data = JSON.parse(input);
const result = getWeightPlates(data.weight);

const output = { result };
const jsonString = JSON.stringify(output, null, 2);

fs.writeFileSync("output.json", jsonString);


function getWeightPlates(weight) {
    const availablePlates = [25, 20, 15, 10, 5, 2.5, 1, 0.5];
    const weightPlateLbs = [10, 25, 35, 45];
    const weightPlateLbsInKG = weightPlateLbs.map((el) => Number((el * 0.453592).toFixed(2)));
    let remainingWeight = (weight - 20) / 2;
    let minRemainingWeight = remainingWeight + 0.5;
    const platesNeeded = [];

    if ((weight / 0.5) % 2 === 0) {
      let remainingWeightInKg = Math.round((minRemainingWeight - weightPlateLbsInKG[1] - weightPlateLbsInKG[2]) * 100) / 100;
      platesNeeded.push(weightPlateLbsInKG[1], weightPlateLbsInKG[2]);

      for (let i = 0; i < availablePlates.length; i++) {
        const plateWeight = availablePlates[i];
        const platesCount = Math.floor(remainingWeightInKg / plateWeight);

        if (platesCount > 0) {
          for (let j = 0; j < platesCount; j++) {
            platesNeeded.push(plateWeight);
          }
          remainingWeightInKg -= plateWeight * platesCount;

          if (remainingWeightInKg === 0) {
            break;
          }
        }
      }
    } else {
      let remainingWeightInKg = Math.round((minRemainingWeight - weightPlateLbsInKG[0] - weightPlateLbsInKG[3]) * 100) / 100;
      platesNeeded.push(weightPlateLbsInKG[0], weightPlateLbsInKG[3]);

      for (let i = 0; i < availablePlates.length; i++) {
        const plateWeight = availablePlates[i];
        const platesCount = Math.floor(remainingWeightInKg / plateWeight);

        if (platesCount > 0) {
          for (let j = 0; j < platesCount; j++) {
            platesNeeded.push(plateWeight);
          }
          remainingWeightInKg -= plateWeight * platesCount;

          if (remainingWeightInKg === 0) {
            break;
          }
        }
      }
    }

    if(platesNeeded.length>12)return false
    const newRecord = platesNeeded.reduce((acc, el) => (acc += el), 0) * 2 + 20;
    return newRecord;
  }