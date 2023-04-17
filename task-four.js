const fs = require("fs");

const input = fs.readFileSync("input.json");
const data = JSON.parse(input);
const { participants, sizes } = data;
const result = canGiftAll(sizes, participants);

const output = { result };
const jsonString = JSON.stringify(output, null, 2);

fs.writeFileSync("output.json", jsonString);



function canGiftAll(sizes, participantSizes) {
  const totalTShirts = Object.values(sizes).reduce(
    (acc, size) => (acc += size),
    0
  );
  const totalParticipants = Object.values(participants).length;

  if (totalParticipants > totalTShirts)
    return "Not all participants will have enough t-shirts";

  let errorMessage;

  for (let { size } of participantSizes) {
    const arrSizes = size.split(",").slice(0, 2);

    switch (arrSizes.length) {
      case 1:
        if (sizes[size] > 0) {
          sizes[size] -= 1;
        } else {
          errorMessage = `Not so many t-shirts in size ${size}`;
          break;
        }
        break;

      case 2:
        const firstSize = Object.keys(sizes).indexOf(arrSizes[0]);
        const secondSize = Object.keys(sizes).indexOf(arrSizes[1]);

        if (firstSize + 1 === secondSize || secondSize + 1 === firstSize) {
          if (sizes[arrSizes[0]] > 0 || sizes[arrSizes[1]] > 0) {
            sizes[arrSizes[0]] > sizes[arrSizes[1]]
              ? (sizes[arrSizes[0]] -= 1)
              : (sizes[arrSizes[1]] -= 1);
          } else {
            errorMessage = `Not all participants will have enough t-shirts`;
            break;
          }
        }
        break;

      default:
        errorMessage = `Not all participants will have enough t-shirts`;
        break;
    }

    if (errorMessage) {
      break;
    }
  }

  if (!errorMessage) {
    return "All t-shirts have been assigned to participants";
  } else {
    return errorMessage;
  }
}
