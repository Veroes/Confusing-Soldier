const urlParams = new URLSearchParams(window.location.search);
const troopsDataParam = urlParams.get("troopsData");
const troopsData = JSON.parse(troopsDataParam);
const labelApproach = document.getElementById("algorithm-approach");

let arrayOfSolider = [];
for (let key in Object.keys(troopsData)) {
  if (key != 0) {
    arrayOfSolider.push(troopsData[key]);
  }
}

const checkMax = (arrayOfSolider) => {
  if (n === 1) {
    return 0;
  } else {
    let arrayPower = new Array();
    for (let i = 0; i < arrayOfSolider.length; i++) {
      arrayPower.push(arrayOfSolider[i].power);
    }
    let maxIndex = arrayPower.indexOf(Math.max(...arrayPower));
    return maxIndex;
  }
};

const checkArray = (arrayOfSolider) => {
  for (let i = 0; i < arrayOfSolider.length; i++) {
    if (arrayOfSolider[i].power !== 0) {
      return true;
    }
  }
  return false;
};
const greedyApproach = () => {
  let arrayOfResult = new Array();
  let total = 0;
  let i = 0;
  while (checkArray(arrayOfSolider)) {
    i = checkMax(arrayOfSolider);
    arrayOfResult.push();
  }
};

const dpApproach = () => {
  // Coin Row
  let F = new Array();
  F.push(arrayOfSolider[0].power);
  F.push(arrayOfSolider[1].power);
  for (let i = 2; i < arrayOfSolider.length; i++) {
    F.push(Math.max(F[i - 1], F[i - 2] + arrayOfSolider[i].power));
  }

  // Chosen
  let X = F.length - 1;
  while (X >= 0) {
    if (F[X] > F[X - 1] || X + 2 === 2) {
      arrayOfSolider[X].status = true;
      X -= 2;
    } else {
      X--;
    }
  }
};
console.log(arrayOfSolider);
if (troopsData[0].greedy === true) {
  labelApproach.innerHTML = "Greedy Approach";
  greedyApproach();
} else {
  labelApproach.innerHTML = "Dynamic Programming Approach";
  dpApproach();
}
