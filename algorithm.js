const urlParams = new URLSearchParams(window.location.search);
const troopsDataParam = urlParams.get("troopsData");
const troopsData = JSON.parse(troopsDataParam);
const labelApproach = document.getElementById("algorithm-approach");

let arrayOfSoldier = [];
for (let key in Object.keys(troopsData)) {
  if (key != 0) {
    arrayOfSoldier.push(troopsData[key]);
  }
}
const checkArray = (arrayOfSoldier) => {
  for (let i = 0; i < arrayOfSoldier.length; i++) {
    if (arrayOfSoldier[i].order === 0) {
      return true;
    }
  }
  return false;
};

const checkMaxIndex = (arrayOfSoldier) => {
  let arrayPower = new Array();
  for (let i = 0; i < arrayOfSoldier.length; i++) {
    if (arrayOfSoldier[i].status === false && arrayOfSoldier[i].order === 0) {
      arrayPower.push([i, arrayOfSoldier[i].power]);
    }
  }
  let maxIndex = -1;
  let maxValue = -Infinity;

  for (let i = 0; i < arrayPower.length; i++) {
    const currentValue = arrayPower[i][1];
    if (currentValue > maxValue) {
      maxValue = currentValue;
      maxIndex = i;
    }
  }
  return maxIndex;
};

const terminatePick = (arrayOfSoldier, maxIndex) => {
  console.log(maxIndex);
  if (maxIndex === 0) {
    arrayOfSoldier[maxIndex + 1].order--;
  } else if (maxIndex === arrayOfSoldier.length - 1) {
    arrayOfSoldier[maxIndex - 1].order--;
  } else {
    arrayOfSoldier[maxIndex - 1].order--;
    arrayOfSoldier[maxIndex + 1].order--;
  }
};

const greedyApproach = () => {
  let pickOrder = 1;
  while (checkArray(arrayOfSoldier)) {
    let maxIndex = checkMaxIndex(arrayOfSoldier);
    arrayOfSoldier[maxIndex].order = pickOrder;
    arrayOfSoldier[maxIndex].status = true;
    pickOrder++;
    terminatePick(arrayOfSoldier, maxIndex);
  }
};

const dpApproach = () => {
  // Coin Row
  let F = new Array();
  F.push(arrayOfSoldier[0].power);
  F.push(arrayOfSoldier[1].power);
  for (let i = 2; i < arrayOfSoldier.length; i++) {
    F.push(Math.max(F[i - 1], F[i - 2] + arrayOfSoldier[i].power));
  }

  // Chosen
  let X = F.length - 1;
  while (X >= 0) {
    if (F[X] > F[X - 1] || X + 2 === 2) {
      arrayOfSoldier[X].status = true;
      X -= 2;
    } else {
      X--;
    }
  }
};
console.log(arrayOfSoldier);
if (troopsData[0].greedy === true) {
  labelApproach.innerHTML = "Greedy Approach";
  greedyApproach();
} else {
  labelApproach.innerHTML = "Dynamic Programming Approach";
  dpApproach();
}
